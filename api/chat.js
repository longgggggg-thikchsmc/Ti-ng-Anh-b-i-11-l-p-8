export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; // Key này sẽ cài trên Vercel

    try {
        // ĐÃ ĐỔI TÊN MODEL Ở ĐƯỜNG LINK BÊN DƯỚI 👇
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }],
                systemInstruction: {
                    parts: [{ text: "Bạn là trợ lý ảo trong buổi thuyết trình Unit 11 Science and Technology. Sản phẩm là SmartPack - Balo thông minh. Trả lời tiếng Việt, ngắn gọn, sáng tạo, hỗ trợ người thuyết trình trả lời câu hỏi của khán giả." }]
                }
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi kết nối API' });
    }
}
