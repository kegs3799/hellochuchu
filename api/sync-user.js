import { turso } from '../../lib/turso.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id, email, username } = req.body;
  if (!id || !username) return res.status(400).json({ error: 'missing fields' });

  try {
    await turso.execute({
      sql: `INSERT OR IGNORE INTO users (id, username, created_at) VALUES (?, ?, ?)`,
      args: [id, username, Date.now()]
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'sync user failed' });
  }
      }
