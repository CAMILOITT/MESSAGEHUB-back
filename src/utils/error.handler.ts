import { NextFunction, Request, Response } from 'express'
import { HttpErrorServerCode } from '../type/http/enums'
import { HandleErrorStatusCode } from '../type/http/type'

export function errorHandler(
  err: HandleError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { status, message } = err
  return res.status(status).send({error:message})
}

export class HandleError extends Error {
  readonly status: HandleErrorStatusCode
  constructor(
    statusCode: HandleErrorStatusCode = HttpErrorServerCode.INTERNAL_SERVER_ERROR,
    message: string = 'error of server',
  ) {
    super(message)
    this.status = statusCode
  }
}
