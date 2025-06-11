import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock do Supabase para testes
vi.mock("@/supabaseClient", () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signOut: vi.fn(),
      signInWithPassword: vi.fn(),
    },
  },
}));

// Mock das variáveis de ambiente
Object.defineProperty(import.meta, "env", {
  value: {
    VITE_SUPABASE_URL: "http://localhost:54321",
    VITE_SUPABASE_ANON_KEY: "test-key",
  },
  writable: true,
});