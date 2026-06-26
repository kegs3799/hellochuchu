import { turso } from '../../lib/turso.js';

export default async function handler(req, res) {

if (req.method !== 'POST') return res.status(405).end();

const { messages } = req.body;

try {

const resp = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions ', {
  method: 'POST',

headers: {

'Content-Type': 'application/json',

'Authorization':  Bearer ${process.env.ZHIPU_API_KEY} 

},

body: JSON.stringify({

model: 'glm-4-flash',

messages: messages?.map(m => ({

role: m.role === 'assistant' ? 'assistant' : m.role === 'user' ? 'user' : 'system',

content: m.content

})),

temperature: 0.7,

max_tokens: 2048

})

});

const data = await resp.json();

if (!resp.ok) return res.status(resp.status).json(data);

res.status(200).json({ content: data.choices?.[0]?.message?.content || '' });

} catch (e) {

console.error(e);

res.status(500).json({ error: 'ai request failed' });

}

  }
