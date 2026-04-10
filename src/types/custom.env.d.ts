declare module 'custom-env' {
export function env(envName?: string): void;
export default { env: env };
}