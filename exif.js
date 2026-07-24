// exif.js - Lightweight EXIF Parser for Fly Fishing companion app photo metadata extraction
const EXIF = {
    readFromBinaryFile(arrayBuffer) {
        const dataView = new DataView(arrayBuffer);
        
        // Check SOI marker (0xFFD8)
        if (dataView.getUint16(0) !== 0xFFD8) {
            return null; // Not a valid JPEG
        }
        
        let length = dataView.byteLength;
        let offset = 2;
        
        while (offset < length) {
            // If we run out of buffer, stop
            if (offset + 4 > length) break;
            
            const marker = dataView.getUint16(offset);
            
            // Find APP1 marker (0xFFE1)
            if (marker === 0xFFE1) {
                return this.parseEXIFData(dataView, offset + 4);
            } else {
                const step = 2 + dataView.getUint16(offset + 2);
                offset += step;
            }
        }
        return null;
    },
    
    parseEXIFData(dataView, offset) {
        if (offset + 6 > dataView.byteLength) return null;
        
        // Check Exif header: 'Exif\0\0' (0x457869660000)
        if (dataView.getUint32(offset) !== 0x45786966 || dataView.getUint16(offset + 4) !== 0x0000) {
            return null;
        }
        
        const tiffOffset = offset + 6;
        if (tiffOffset + 8 > dataView.byteLength) return null;
        
        // Check Byte Order
        let littleEndian = false;
        const byteOrder = dataView.getUint16(tiffOffset);
        if (byteOrder === 0x4949) {
            littleEndian = true;
        } else if (byteOrder === 0x4D4D) {
            littleEndian = false;
        } else {
            return null; // Invalid byte order
        }
        
        // Check TIFF magic number
        if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {
            return null;
        }
        
        const firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
        if (firstIFDOffset < 8 || (tiffOffset + firstIFDOffset) >= dataView.byteLength) {
            return null;
        }
        
        const tags = {};
        this.readIFD(dataView, tiffOffset, tiffOffset + firstIFDOffset, tags, littleEndian);
        
        // Extract ExifSubIFD (tag 0x8769)
        if (tags[0x8769]) {
            this.readIFD(dataView, tiffOffset, tiffOffset + tags[0x8769], tags, littleEndian);
        }
        
        // Extract GPS IFD (tag 0x8825)
        const gpsTags = {};
        if (tags[0x8825]) {
            this.readIFD(dataView, tiffOffset, tiffOffset + tags[0x8825], gpsTags, littleEndian);
        }
        
        return this.formatTags(tags, gpsTags);
    },
    
    readIFD(dataView, tiffOffset, ifdOffset, tags, littleEndian) {
        if (ifdOffset + 2 > dataView.byteLength) return;
        const numEntries = dataView.getUint16(ifdOffset, littleEndian);
        
        for (let i = 0; i < numEntries; i++) {
            const entryOffset = ifdOffset + 2 + i * 12;
            if (entryOffset + 12 > dataView.byteLength) break;
            
            const tag = dataView.getUint16(entryOffset, littleEndian);
            const type = dataView.getUint16(entryOffset + 2, littleEndian);
            const count = dataView.getUint32(entryOffset + 4, littleEndian);
            const valueOffset = dataView.getUint32(entryOffset + 8, littleEndian);
            
            const val = this.readTagValue(dataView, tiffOffset, entryOffset + 8, type, count, valueOffset, littleEndian);
            if (val !== null) {
                tags[tag] = val;
            }
        }
    },
    
    readTagValue(dataView, tiffOffset, offsetInEntry, type, count, valueOffset, littleEndian) {
        // Types:
        // 1: BYTE, 2: ASCII, 3: SHORT, 4: LONG, 5: RATIONAL, 7: UNDEFINED, 9: SLONG, 10: SRATIONAL
        let size = 0;
        switch (type) {
            case 1: case 2: case 7: size = 1; break;
            case 3: size = 2; break;
            case 4: case 9: size = 4; break;
            case 5: case 10: size = 8; break;
            default: return null;
        }
        
        const valueSize = size * count;
        let actualOffset = offsetInEntry;
        if (valueSize > 4) {
            actualOffset = tiffOffset + valueOffset;
        }
        
        if (actualOffset + valueSize > dataView.byteLength) {
            return null;
        }
        
        if (type === 2) { // ASCII string
            let str = "";
            const charCount = count > 0 ? count - 1 : 0;
            for (let i = 0; i < charCount; i++) {
                str += String.fromCharCode(dataView.getUint8(actualOffset + i));
            }
            return str.trim();
        }
        
        if (type === 5 || type === 10) { // Rational or Srational
            if (count === 1) {
                const num = dataView.getUint32(actualOffset, littleEndian);
                const den = dataView.getUint32(actualOffset + 4, littleEndian);
                return den === 0 ? 0 : num / den;
            }
            const vals = [];
            for (let i = 0; i < count; i++) {
                const num = dataView.getUint32(actualOffset + i * 8, littleEndian);
                const den = dataView.getUint32(actualOffset + i * 8 + 4, littleEndian);
                vals.push(den === 0 ? 0 : num / den);
            }
            return vals;
        }
        
        // Single numeric values
        if (count === 1) {
            if (type === 3) return dataView.getUint16(actualOffset, littleEndian);
            if (type === 4) return dataView.getUint32(actualOffset, littleEndian);
            if (type === 9) return dataView.getInt32(actualOffset, littleEndian);
        }
        
        return null;
    },
    
    formatTags(tags, gpsTags) {
        const result = {};
        
        // DateTimeOriginal (0x9003) or DateTimeDigitized (0x9004) or DateTime (0x0132)
        const dateTimeStr = tags[0x9003] || tags[0x9004] || tags[0x0132];
        if (dateTimeStr && typeof dateTimeStr === 'string') {
            // Standard EXIF datetime format: "YYYY:MM:DD HH:MM:SS"
            const parts = dateTimeStr.split(' ');
            if (parts.length === 2) {
                result.date = parts[0].replace(/:/g, '-');
                result.time = parts[1].substring(0, 5); // HH:MM
            }
        }
        
        // GPS coordinates
        // Latitude tags: 0x0001 (Ref: 'N' or 'S'), 0x0002 (Values: Deg, Min, Sec rational array)
        // Longitude tags: 0x0003 (Ref: 'E' or 'W'), 0x0004 (Values: Deg, Min, Sec rational array)
        if (gpsTags[0x0002] && gpsTags[0x0001] && gpsTags[0x0004] && gpsTags[0x0003]) {
            const latVals = gpsTags[0x0002];
            const latRef = gpsTags[0x0001];
            const lngVals = gpsTags[0x0004];
            const lngRef = gpsTags[0x0003];
            
            if (Array.isArray(latVals) && latVals.length >= 3 && Array.isArray(lngVals) && lngVals.length >= 3) {
                let lat = latVals[0] + latVals[1] / 60 + latVals[2] / 3600;
                let lng = lngVals[0] + lngVals[1] / 60 + lngVals[2] / 3600;
                
                if (latRef === 'S') lat = -lat;
                if (lngRef === 'W') lng = -lng;
                
                result.lat = parseFloat(lat.toFixed(6));
                result.lng = parseFloat(lng.toFixed(6));
            }
        }
        
        return result;
    }
};

window.EXIF = EXIF;
