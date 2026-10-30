import type { CountryCode } from '../core/route';

/** Paleta tła per kraj (grafika zastępcza do czasu docelowych teł). */
export interface Palette {
  skyTop: string;
  skyBottom: string;
  hillsFar: string;
  hillsNear: string;
  accent: string;
}

export const PALETTES: Record<CountryCode, Palette> = {
  BE: { skyTop: '#8fb8d8', skyBottom: '#d9e8f0', hillsFar: '#9db58a', hillsNear: '#6f9a5c', accent: '#f2c230' },
  NL: { skyTop: '#7fb2e5', skyBottom: '#e3f0fb', hillsFar: '#a8cf8e', hillsNear: '#73b05a', accent: '#f08a24' },
  DE: { skyTop: '#6fa3d6', skyBottom: '#dcebf7', hillsFar: '#95b88a', hillsNear: '#5f8f52', accent: '#e0b400' },
  UK: { skyTop: '#9fb3c4', skyBottom: '#dfe6ec', hillsFar: '#9cbf8f', hillsNear: '#6a9a5e', accent: '#c8102e' },
  FR: { skyTop: '#76abe0', skyBottom: '#e6f1fb', hillsFar: '#b6c98a', hillsNear: '#88a65a', accent: '#2a5bd7' },
  CH: { skyTop: '#5d9ee0', skyBottom: '#e8f3fd', hillsFar: '#c9d6e3', hillsNear: '#6f9e63', accent: '#e8202a' },
  NO: { skyTop: '#4f86c6', skyBottom: '#d6e6f5', hillsFar: '#8aa3b8', hillsNear: '#4f7a5a', accent: '#ba0c2f' },
  DK: { skyTop: '#7aaedb', skyBottom: '#e2eef8', hillsFar: '#a9c98f', hillsNear: '#77a660', accent: '#c60c30' },
  SE: { skyTop: '#6aa6dc', skyBottom: '#e0eefa', hillsFar: '#9fbf8c', hillsNear: '#5d8f55', accent: '#fecc02' },
  PL: { skyTop: '#6db0e8', skyBottom: '#eef6fc', hillsFar: '#b8d48f', hillsNear: '#7cb257', accent: '#dc143c' },
};
