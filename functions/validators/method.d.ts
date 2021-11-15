import type { methodType } from '../type'

/**
 * Validate the request method
 *
 * @param api_method - method allowed ["POST", "GET"] or "POST"
 * @param req_method - request method "POST"
 */
export type handlerMethod =(api_method: methodType, req_method: string) => Promise<string>
