export const prosConsDiscusserStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) {
      throw new Error('No se pudo realizar la comparación');
    }

    const reader = resp.body?.getReader();
    if (!reader) {
      throw new Error('No se pudo leer la respuesta');
    }

    /* const decoder = new TextDecoder();
    let text = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
    } */

    return reader;
  } catch {
    return null;
  }
};
