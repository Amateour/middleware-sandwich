export type ErrorValue = {
  message?: string,
  value?: any
}

type ErrorStatus = {
  [index: string]: ErrorValue[]
}

export interface ResponseVerifyErrors {
  message: string,
  errors: ErrorStatus[]
}