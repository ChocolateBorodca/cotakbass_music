import { list } from '@vercel/blob';
export default async function handler(req, res) {
    try {
        const { blobs } = await list({ prefix: 'music/' });
        return res.status(200).json({ blobs });
    } catch (err) { return res.status(500).json({ error: err.message }); }
}
