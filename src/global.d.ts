export {};

declare global {
  interface Window {
    electron: {
      saveRpgsaveFile: (data: string, fileName: string) => Promise<void>;
    };
  }
}
