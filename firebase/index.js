// Firebase Functions odkrywa nazwy punktów wejścia przez statyczne eksporty CJS.
// Jedyną implementacją pozostaje esbuildowane src/index.ts oraz wspólne src/core.
const functions = require('./lib/index.js');

exports.startRun = functions.startRun;
exports.submitRun = functions.submitRun;
exports.cleanupExpiredRuns = functions.cleanupExpiredRuns;
