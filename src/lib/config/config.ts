/**
 * CONFIG
 *
 * GET important data direct from .env file
 * | TbaConfig
 * |- BASE_URL
 * |- KEY
 * 
 * | dbConfig
 * |- NAME
 * |- USER
 * |- PASSWORD
 * |- HOST
 * |- PORT
 *
 * NOTE: values are exposed as lazy getters, not plain properties.
 * A plain `const dbConfig = { NAME: env("DB_NAME"), ... }` evaluates
 * every env() call the moment this module is imported — so any route
 * that imports config.ts (even indirectly, even if it only needs
 * tbaConfig) would crash at build/import time if DB_* vars are missing.
 * With getters, `env()` only runs when someone actually reads
 * `dbConfig.NAME`, so unrelated routes don't pay for env vars they
 * never touch.
 */


/**
 * This funcitions GET and tests if .env variable is present returing error if it's missing
 * @description if error -> Error(`Missing environment variable: ${name}`)
 * 
 * @param name .env variable name
 * 
 * @returns variable value 
 */
function env(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const tbaConfig = {
    get KEY(): string { return env("TBA_KEY"); },
    get BASE_URL(): string { return env("TBA_BASE_URL"); },
};