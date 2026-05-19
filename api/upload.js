export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { title, user, content, fileName } = req.body;
    const TOKEN = process.env.GITHUB_TOKEN; 
    const USER = "ChocolateBorodca";
    const REPO = "cotakbass_music";

    try {
        const targetUrl = "https://github.com" + USER + "/" + REPO + "/contents/music/" + fileName;

        const response = await fetch(targetUrl, {
            method: 'PUT',
            headers: {
                "Authorization": "token " + TOKEN,
                "Content-Type": "application/json",
                "User-Agent": "Vercel-Serverless"
            },
            body: JSON.stringify({
                message: "Upload track: " + title + " by " + user,
                content: content
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
