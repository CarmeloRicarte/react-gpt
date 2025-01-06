import { ProsConsDiscusserResponse } from '../domain';

export const prosConsDiscusserUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) {
      throw new Error('No se pudo realizar la comparación');
    }

    const { content }: ProsConsDiscusserResponse = await resp.json();
    return {
      ok: true,
      message: content,
    };
  } catch {
    return {
      ok: false,
      message: 'No se pudo realizar la comparación',
    };
  }
};
