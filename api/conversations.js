import { turso } from '../../lib/turso.js';

export default async function handler(req, res) {
  const { userId, conversationId } = req.query;

  try {
    // 获取某对话的消息
    if (req.method === 'GET' && conversationId) {
      const msgs = await turso.execute({
        sql: `SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC`,
        args: [conversationId]
      });
      return res.status(200).json(msgs.rows);
    }

    // 获取对话列表
    if (req.method === 'GET' && userId) {
      const convs = await turso.execute({
        sql: `SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC`,
        args: [userId]
      });
      return res.status(200).json(convs.rows);
    }

    // 新建对话
    if (req.method === 'POST') {
      const { id, user_id, title, created_at, updated_at } = req.body;
      await turso.execute({
        sql: `INSERT INTO conversations (id, user_id, title, created_at, updated_at) VALUES (?,?,?,?,?)`,
        args: [id, user_id, title, created_at, updated_at]
      });
      return res.status(200).json({ ok: true });
    }

    res.status(405).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
