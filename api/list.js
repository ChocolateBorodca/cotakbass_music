import { put } from '@vercel/blob';
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    try {
        const { fileName } = req.query;
        const blob = await put('music/' + fileName, req, { access: 'public', contentType: 'audio/mpeg' });
        return res.status(200).json(blob);
    } catch (err) { return res.status(500).json({ error: err.message }); }
}
