/**
 * Generates a stream of text discussing the pros and cons based on the given prompt.
 *
 * @param prompt - The input string for which the pros and cons discussion is generated.
 * @returns An async generator that yields the text of the discussion incrementally.
 *
 * @throws Will throw an error if the fetch request fails or if the response cannot be read.
 */
export async function* prosConsDiscusserStreamGeneratorUseCase(
  prompt: string,
  abortSignal: AbortSignal
) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      }
    );

    if (!resp.ok) {
      throw new Error('No se pudo realizar la comparación');
    }

    const reader = resp.body?.getReader();
    if (!reader) {
      throw new Error('No se pudo leer la respuesta');
    }

    const decoder = new TextDecoder();
    let text = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    }

    return reader;
  } catch {
    return null;
  }
}
