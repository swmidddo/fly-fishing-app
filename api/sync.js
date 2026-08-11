// api/sync.js - Vercel Serverless Persistent Cloud Sync Proxy via JSONBlob
const JSONBLOB_API = 'https://jsonblob.com/api/jsonBlob';
let memoryCache = {};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Expose-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { email, blobId } = req.query;
    const targetEmail = email ? email.toLowerCase().trim() : 'admin@flyfishing.com';

    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const payloadData = body.payload || body;
            let activeBlobId = blobId || body.blobId || (memoryCache[targetEmail] ? memoryCache[targetEmail].blobId : '');

            let newBlobId = activeBlobId;
            
            if (activeBlobId) {
                // Update existing blob via PUT
                try {
                    await fetch(`${JSONBLOB_API}/${activeBlobId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify({ email: targetEmail, payload: payloadData, updatedAt: new Date().toISOString() })
                    });
                } catch(e){}
            }

            if (!newBlobId) {
                // Create new blob via POST
                try {
                    const bRes = await fetch(JSONBLOB_API, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify({ email: targetEmail, payload: payloadData, updatedAt: new Date().toISOString() })
                    });
                    const loc = bRes.headers.get('Location') || bRes.headers.get('location');
                    if (loc) {
                        const parts = loc.split('/');
                        newBlobId = parts[parts.length - 1];
                    }
                } catch(e){}
            }

            memoryCache[targetEmail] = {
                blobId: newBlobId,
                payload: payloadData,
                updatedAt: new Date().toISOString()
            };

            res.status(200).json({
                success: true,
                message: 'Cloud Vault saved successfully',
                email: targetEmail,
                blobId: newBlobId,
                updatedAt: new Date().toISOString()
            });
        } catch (err) {
            res.status(500).json({ error: 'Failed to save cloud vault', message: err.message });
        }
        return;
    }

    if (req.method === 'GET') {
        let activeBlobId = blobId || (memoryCache[targetEmail] ? memoryCache[targetEmail].blobId : '');
        
        if (activeBlobId) {
            try {
                const bRes = await fetch(`${JSONBLOB_API}/${activeBlobId}`, {
                    headers: { 'Accept': 'application/json' }
                });
                if (bRes.ok) {
                    const blobData = await bRes.json();
                    res.status(200).json({
                        success: true,
                        vault: blobData.payload || blobData,
                        updatedAt: blobData.updatedAt,
                        blobId: activeBlobId
                    });
                    return;
                }
            } catch(e){}
        }

        const cached = memoryCache[targetEmail] || memoryCache['admin@flyfishing.com'];
        if (cached && cached.payload) {
            res.status(200).json({ success: true, vault: cached.payload, updatedAt: cached.updatedAt, blobId: cached.blobId });
            return;
        }

        res.status(200).json({ success: false, message: 'No cloud vault found for this account', email: targetEmail });
        return;
    }

    res.status(405).json({ error: 'Method not allowed' });
}
