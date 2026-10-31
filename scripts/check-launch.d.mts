// Typy dla tests/check-launch.test.ts (skrypt jest zwykłym ESM dla Node).
export interface CheckResult { ok: boolean; critical: boolean; label: string; detail?: string }
export const REQUIRED_FIREBASE_VARS: string[];
export const OPTIONAL_CLIENT_VARS: Record<string, string>;
export function parseEnv(text: string): Record<string, string>;
export function checkFirebaseEnv(env: Record<string, string | undefined>): CheckResult[];
export function readRulesVersion(source: string): number | null;
export function checkRulesVersion(clientRules: string, functionsIndex: string): CheckResult;
export function checkPrivacyPolicy(text: string | null): CheckResult[];
export function checkManifest(text: string | null, iconExists: (relativePath: string) => boolean): CheckResult[];
export function generatedIcons(pluginSource: string | null): string[];
export function checkAndroidAppId(gradle: string | null, capacitorConfig: string | null): CheckResult;
export function checkShareOrigin(shareConfig: string | null): CheckResult;
export function formatResult(result: CheckResult): string;
export function exitCodeFor(results: CheckResult[]): 0 | 1;
export function loadViteEnv(root: string, processEnv: Record<string, string | undefined>): Record<string, string | undefined>;
export function runChecks(root: string): [string, CheckResult[]][];
