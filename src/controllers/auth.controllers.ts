import { NextFunction, Request, RequestHandler, Response } from 'express'
import { createUser, verifyUser } from '../services/auth.services'
import { HttpExitCode } from '../type/http/enums'

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const responseCreate = await createUser(req.body)
    res.status(HttpExitCode.CREATED).send(responseCreate)
  } catch (error) {
    next(error)
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const resUser = await verifyUser(req.body)
    res.status(HttpExitCode.OK).send(resUser)
  } catch (error) {
    next(error)
  }
}
