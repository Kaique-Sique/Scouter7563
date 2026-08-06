/**
 * TBA Status Endpoint
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

import { _get } from "./tba_service";
import { TBAStatus } from "@/types/tba";

/** GET `/status` — current TBA API health, season, and app version info. */
export const getTBAStatus = () => _get<TBAStatus>("/status");
