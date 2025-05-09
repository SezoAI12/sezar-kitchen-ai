
/// <reference types="vite/client" />

interface Window {
  translations: {
    [key: string]: {
      pageTitle: string;
      selectPrompt: string;
      continueButton: string;
      languageSelected: string;
    };
  };
}
