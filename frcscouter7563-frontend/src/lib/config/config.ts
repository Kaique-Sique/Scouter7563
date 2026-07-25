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

export const dbConfig = {
    NAME: env("DB_NAME"),
    USER: env("DB_USER"),
    PASSWORD: env("DB_PASSWORD"),
    HOST: env("DB_HOST"),
    PORT: env("DB_PORT")
};

export const tbaConfig = {
    KEY: env("TBA_KEY"),
    BASE_URL: env("TBA_BASE_URL")
};