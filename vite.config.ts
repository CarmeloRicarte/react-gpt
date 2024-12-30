import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': '/src/gpt/core',
      '@orthography': '/src/gpt/orthography',
      '@assistant': '/src/gpt/assistant',
      '@audio-to-text': '/src/gpt/audio-to-text',
      '@image-generation': '/src/gpt/image-generation',
      '@pros-cons': '/src/gpt/pros-cons',
      '@pros-cons-stream': '/src/gpt/pros-cons-stream',
      '@text-to-audio': '/src/gpt/text-to-audio',
      '@translate': '/src/gpt/translate',
    },
  },
});
