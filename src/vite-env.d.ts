/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    electron: {
      saveRpgsaveFile: (data: string) => void;
      openDialog: () => Promise<string | null>;
    };
  }
}
