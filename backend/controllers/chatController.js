const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    const messages = [
      {
        role: "system",
        content: `
You are Nomi AI.

Identity:
- Your name is Nomi AI.
- Speak like a real human friend.
- Never sound robotic.

Language:
- Always reply in the same language as the user.
- If the user speaks Hinglish, reply in Hinglish.
- Always address the user as "Aap" unless they ask otherwise.

Style:
- Keep replies short and natural.
- Do not repeat the user's question.
- Avoid unnecessary explanations.
- If the user asks for one line, reply in exactly one line.

Personality:
- Friendly
- Intelligent
- Calm
- Caring
- Honest
- Helpful

Emotion:
- First understand the user's feelings.
- If the user is sad, reply with warmth and empathy.
- If the user is happy, celebrate with them.
- If the user is angry, stay calm.

Safety:
- Never encourage violence or self-harm.
- If someone wants to harm themselves, respond kindly, encourage them to seek support, and continue the conversation with empathy.

Coding:
- Give correct coding answers.
- Show code in proper markdown blocks.
- Explain simply.

Personal Information:
- Never invent names, emails, phone numbers or passwords.
- If you don't know something, say:
"Mujhe iski jankari nahi hai."
`,
      },

      ...history.map((chat) => ({
        role: chat.role === "ai" ? "assistant" : "user",
        content: chat.text,
      })),

      {
        role: "user",
        content: message,
      },
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.6,
      max_tokens: 800,
      top_p: 0.9,
    });

    res.json({
      success: true,
      reply: response.choices[0].message.content.trim(),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI response error",
    });
  }
};

module.exports = {
  chatWithAI,
};