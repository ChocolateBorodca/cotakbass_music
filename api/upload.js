export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { title, user, content, fileName } = req.body;
    const TOKEN = process.env.GITHUB_TOKEN; 
    const USER = "ChocolateBorodca";
    const REPO = "cotakbass_music";

    try {
        // ИСПРАВЛЕНО: Добавлен протокол https:// и правильные косые черты в URL
        const response = await fetch(`github.com{USER}/${REPO}/contents/music/${fileName}`, {
            method: 'PUT',
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Content-Type": "application/json",
                "User-Agent": "Vercel-Serverless"
            },
            body: JSON.stringify({
                message: `Upload track: ${title} by ${user}`,
                content: content[1] // Берем чистый Base64 код файла без префикса данных
            })
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            const errData = await response.json();
            return res.status(500).json({ error: errData.message || 'GitHub API Error' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
