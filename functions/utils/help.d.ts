/**
 *
 */
export type isValid = (elm?: any) => boolean;

/**
 * 
 */
export type validate = {
    Array: isValid,
    String: isValid,
    Number: isValid,
    Object: isValid,
    Browser: isValid,
    Node: isValid
}