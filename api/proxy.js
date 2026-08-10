// api/proxy.js - Vercel & Netlify Serverless Proxy Function for WillyWeather and BOM APIs
export default async function handler(req, res) {
    // Set CORS headers so client browser on Vercel can access cleanly
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { target } = req.query;
    if (!target) {
        res.status(400).json({ error: 'Missing target URL parameter' });
        return;
    }

    try {
        const decodedUrl = decodeURIComponent(target);
        const fetchRes = await fetch(decodedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const contentType = fetchRes.headers.get('content-type') || '';
        const bodyText = await fetchRes.text();

        if (contentType.includes('json')) {
            try {
                res.status(fetchRes.status).json(JSON.parse(bodyText));
            } catch(e) {
                res.status(fetchRes.status).send(bodyText);
            }
        } else {
            res.setHeader('Content-Type', contentType || 'text/plain');
            res.status(fetchRes.status).send(bodyText);
        }
    } catch (err) {
        res.status(500).json({ error: 'Proxy request failed', message: err.message });
    }
}
