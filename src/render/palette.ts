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
  IE: { skyTop: '#85aab8', skyBottom: '#e6eef0', hillsFar: '#87a68b', hillsNear: '#5d8b69', accent: '#d88b42' },
  ES: { skyTop: '#76b9e5', skyBottom: '#fff0c0', hillsFar: '#d5b27c', hillsNear: '#a88850', accent: '#ef883b' },
  IT: { skyTop: '#78b6d8', skyBottom: '#f1e4c8', hillsFar: '#b0be85', hillsNear: '#779a5a', accent: '#cb6542' },
  AT: { skyTop: '#7aa5cf', skyBottom: '#e5eef8', hillsFar: '#c6d4dd', hillsNear: '#709d83', accent: '#cd5f47' },
  FI: { skyTop: '#699dcc', skyBottom: '#e2f0f7', hillsFar: '#a7c5d4', hillsNear: '#679e91', accent: '#e0ad5d' },
  LU: { skyTop: '#87b0d0', skyBottom: '#e4eef5', hillsFar: '#a4bb91', hillsNear: '#65966e', accent: '#dd7c39' },
  CZ: { skyTop: '#92b4dc', skyBottom: '#e8eef6', hillsFar: '#a0bf9a', hillsNear: '#6b995d', accent: '#d66b5b' },
  EE: { skyTop: '#7da9cc', skyBottom: '#dfeef7', hillsFar: '#9cbd9d', hillsNear: '#6a9c85', accent: '#d9b56b' },
  LV: { skyTop: '#82aac6', skyBottom: '#e7f1f4', hillsFar: '#adbf99', hillsNear: '#719b7e', accent: '#b85f53' },
  LT: { skyTop: '#7faed5', skyBottom: '#e6f3ec', hillsFar: '#c9cf8c', hillsNear: '#90ac5c', accent: '#d5a34a' },
  SE: { skyTop: '#6aa6dc', skyBottom: '#e0eefa', hillsFar: '#9fbf8c', hillsNear: '#5d8f55', accent: '#fecc02' },
  PL: { skyTop: '#6db0e8', skyBottom: '#eef6fc', hillsFar: '#b8d48f', hillsNear: '#7cb257', accent: '#dc143c' },
};
