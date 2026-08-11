// api/sync.js - Vercel Serverless Persistent Cloud Sync Endpoint
const JSONBLOB_API = 'https://jsonblob.com/api/jsonBlob';
let memoryCache = {};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { email, blobId } = req.query;

    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const targetEmail = (body && body.email) ? body.email.toLowerCase().trim() : (email ? email.toLowerCase().trim() : 'admin@flyfishing.com');
            const payloadData = body.payload || body;

            // Push payload to persistent jsonblob cloud vault
            let newBlobId = '';
            try {
                const blobRes = await fetch(JSONBLOB_API, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({ email: targetEmail, payload: payloadData, updatedAt: new Date().toISOString() })
                });
                const loc = blobRes.headers.get('Location') || blobRes.headers.get('location');
                if (loc) {
                    const parts = loc.split('/');
                    newBlobId = parts[parts.length - 1];
                }
            } catch(e){}

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
        const targetEmail = email ? email.toLowerCase().trim() : 'admin@flyfishing.com';
        
        if (blobId) {
            try {
                const blobRes = await fetch(`${JSONBLOB_API}/${blobId}`, {
                    headers: { 'Accept': 'application/json' }
                });
                if (blobRes.ok) {
                    const blobData = await blobRes.json();
                    res.status(200).json({ success: true, vault: blobData.payload || blobData, updatedAt: blobData.updatedAt });
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
