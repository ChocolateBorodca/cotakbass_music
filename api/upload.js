import { generateClientTokenFromReadWriteToken } from '@vercel/blob';

export default async function handler(req, res) {
    // Разрешаем только POST запросы
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { fileName } = req.body;

        // Создаем защищенный одноразовый токен для загрузки напрямую
        const clientToken = await generateClientTokenFromReadWriteToken({
            token: process.env.BLOB_READ_WRITE_TOKEN,
            username: 'cotakbass_user',
            onUploadCompleted: async (payload) => {
                console.log('Upload completed', payload);
            },
        });

        return res.status(200).json({ clientToken });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
