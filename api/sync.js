// api/sync.js - Vercel Serverless Cross-Device Sync & Backup Endpoint
let globalMemoryVault = {};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { email } = req.query;

    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const targetEmail = (body && body.email) ? body.email.toLowerCase().trim() : (email ? email.toLowerCase().trim() : 'global');
            const payloadData = body.payload || body;

            globalMemoryVault[targetEmail] = {
                payload: payloadData,
                updatedAt: new Date().toISOString()
            };

            res.status(200).json({ success: true, message: 'Cloud Vault updated successfully', email: targetEmail });
        } catch (err) {
            res.status(400).json({ error: 'Failed to process sync payload', message: err.message });
        }
        return;
    }

    if (req.method === 'GET') {
        const targetEmail = email ? email.toLowerCase().trim() : 'global';
        const vault = globalMemoryVault[targetEmail] || globalMemoryVault['global'] || null;

        if (!vault) {
            res.status(200).json({ success: false, message: 'No cloud vault found for this account', email: targetEmail });
            return;
        }

        res.status(200).json({ success: true, vault: vault.payload, updatedAt: vault.updatedAt });
        return;
    }

    res.status(405).json({ error: 'Method not allowed' });
}
