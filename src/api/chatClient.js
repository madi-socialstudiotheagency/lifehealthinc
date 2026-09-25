// Sends the assistant chat transcript to the "chat-transcript" Netlify
// function, which emails Matthew a copy. Fire-and-forget: a failure here
// should never interrupt the visitor's conversation.

const ENDPOINT = '/.netlify/functions/chat-transcript';

export function sendChatTranscript(messages, { beacon = false, initial = false } = {}) {
  try {
    const payload = JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, content: m.content, time: m.time })),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      initial,
    });

    if (beacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
      return;
    }

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch((err) => console.error('chat transcript send failed:', err));
  } catch (err) {
    console.error('chat transcript send failed:', err);
  }
}
