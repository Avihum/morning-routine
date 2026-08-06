import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

const store = new Map<string, string>();
const storageMock: Storage = {
  get length() { return store.size; },
  clear: () => store.clear(),
  getItem: (key) => store.get(key) ?? null,
  key: (index) => [...store.keys()][index] ?? null,
  removeItem: (key) => { store.delete(key); },
  setItem: (key, value) => { store.set(key, String(value)); }
};
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storageMock });
Object.defineProperty(window, 'localStorage', { configurable: true, value: storageMock });

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

class AudioContextMock {
  currentTime = 0;
  destination = {};
  resume = vi.fn();
  createOscillator() { return { type: 'sine', frequency: { value: 0 }, connect: vi.fn().mockReturnThis(), start: vi.fn(), stop: vi.fn() }; }
  createGain() { return { gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn().mockReturnThis() }; }
}

Object.defineProperty(window, 'AudioContext', { writable: true, value: AudioContextMock });
Object.defineProperty(globalThis, 'AudioContext', { writable: true, value: AudioContextMock });
