// Firebase odkrywa nazwy punktów wejścia przez statyczne eksporty CommonJS.
// Jedyna implementacja to esbuildowane src/index.ts oraz wspólne src/core.
const functions = require('./lib/index.js');

exports.startRun = functions.startRun;
exports.submitRun = functions.submitRun;
exports.cleanupExpiredRuns = functions.cleanupExpiredRuns;
