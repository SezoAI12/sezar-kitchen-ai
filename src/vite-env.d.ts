
/// <reference types="vite/client" />

// Extend Window interface to include translations property
interface Window {
  translations?: Record<string, Record<string, string>>;
}
