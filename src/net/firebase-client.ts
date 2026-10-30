// Osobny chunk: Vite nie ładuje Firebase w trybie demonstracyjnym bez .env.
import * as app from 'firebase/app';
import * as auth from 'firebase/auth';
import * as functions from 'firebase/functions';
import * as firestore from 'firebase/firestore/lite';

export const sdk = { app, auth, functions, firestore };
