export interface ResponseVerifyErrors {
  message: string,
  errors: any[]
}

/**
 * validate errors and send message
 *
 * @param errors
 */
export type verify_errors = (
  errors: object, request: boolean
) => Promise<ResponseVerifyErrors>