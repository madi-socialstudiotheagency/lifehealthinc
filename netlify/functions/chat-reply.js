// Generates the website assistant's reply. Replaces the old Base44 InvokeLLM
// call, whose backend returns 404 on the Netlify-hosted site.
//
// Uses ANTHROPIC_API_KEY if set, otherwise GEMINI_API_KEY (both secret Netlify
// env vars). With neither set it returns 503 and the widget shows its
// fallback reply, which points visitors at the apply links.

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'POST only' };
  try {
    const { prompt } = JSON.parse(event.body || '{}');
    if (!prompt || typeof prompt !== 'string' || prompt.length > 20000) {
      return { statusCode: 400, body: JSON.stringify({ error: 'bad prompt' }) };
    }

    if (process.env.ANTHROPIC_API_KEY) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 400,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      if (!res.ok) throw new Error('Anthropic ' + res.status + ' ' + (await res.text()));
      const j = await res.json();
      const text = (j.content || []).map((c) => c.text || '').join('').trim();
      return { statusCode: 200, body: JSON.stringify({ reply: text }) };
    }

    if (process.env.GEMINI_API_KEY) {
      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 400 } }),
        }
      );
      if (!res.ok) throw new Error('Gemini ' + res.status + ' ' + (await res.text()));
      const j = await res.json();
      const text = (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim();
      return { statusCode: 200, body: JSON.stringify({ reply: text }) };
    }

    return { statusCode: 503, body: JSON.stringify({ error: 'no AI key configured' }) };
  } catch (err) {
    console.error('chat-reply error', err);
    return { statusCode: 502, body: JSON.stringify({ error: 'upstream error' }) };
  }
};
