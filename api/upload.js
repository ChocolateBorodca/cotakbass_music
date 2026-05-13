export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { fileName, title, user } = req.body;
    const TOKEN = process.env.GITHUB_TOKEN;
    const USER = "ChocolateBorodca";
    const REPO = "cotakbass_music";

    try {
        // Запрашиваем у GitHub SHA, если файл обновляется, или просто готовим адрес
        const url = `github.com{USER}/${REPO}/contents/music/${fileName}`;
        
        // Передаем на фронтенд чистые данные для прямой загрузки
        return res.status(200).json({
            uploadUrl: url,
            token: TOKEN,
            message: `Upload track: ${title} by ${user}`
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
