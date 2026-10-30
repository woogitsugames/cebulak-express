'use strict';

// Node sprawdza plik firebase.json przed katalogiem firebase/ przy require('/repo/firebase').
// Ten mostek sprawia, że loader Firebase Functions odkrywa eksporty zamiast konfiguracji CLI.
module.exports = require('./firebase/index.js');
