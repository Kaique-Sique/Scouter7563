/**
 * TBA Service
 *
 * Provides helper functions for communicating with
 * The Blue Alliance API -(v3)-.
 *
 * Responsibilities:
 * - Authenticate requests
 * - Send HTTP requests
 * - Parse API responses
 * - Expose reusable methods for TBA endpoints
 */

/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import { tbaConfig } from "@/lib/config/config";

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

/**
 * Performs a GET request to the The Blue Alliance API (v3).
 *
 * This helper centralizes all GET requests made to the TBA API,
 * automatically adding the authentication header and returning
 * the response body already typed.
 *
 * @template T Expected response type.
 * @param endpoint API endpoint path (e.g. `/events/2026` or `/team/frc7563`).
 * @returns A promise containing the parsed JSON response typed as `T`.
 *
 * @throws {Error}
 * Thrown when the request fails or the API returns a non-success
 * HTTP status code.
 */
export async function _get<T>(endpoint: string): Promise<T> {

    const response = await fetch(
        `${tbaConfig.BASE_URL}${endpoint}`,
        {
            headers: {
                "X-TBA-Auth-Key": tbaConfig.KEY,
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `TBA request failed (${response.status})`
        );
    }

    return response.json() as Promise<T>;
}