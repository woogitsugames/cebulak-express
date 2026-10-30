// Firebase odkrywa nazwy punktów wejścia przez statyczne eksporty CommonJS.
// Jedyna implementacja to esbuildowane src/index.ts oraz wspólne src/core.
if (process.env.FUNCTIONS_CONTROL_API === 'true') {
  console.log('FIREBASE_BRIDGE_LOADED', __filename, 'cwd:', process.cwd(), 'args:', process.argv.slice(2));
}
const functions = require('./lib/index.js');

exports.startRun = functions.startRun;
exports.submitRun = functions.submitRun;
exports.cleanupExpiredRuns = functions.cleanupExpiredRuns;
exports.collectEvents = functions.collectEvents;
