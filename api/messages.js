import { turso } from '../../lib/turso.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id, conversation_id, role, content, created_at } = req.body;

  if (!id || !conversation_id || !role || !content) {
    return res.status(400).json({ error: 'missing fields' });
  }

  try {
    await turso.execute({
      sql: `INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)`,
      args: [id, conversation_id, role, content, created_at]
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('save message error:', e);
    res.status(500).json({ error: e.message });
  }
                  }
