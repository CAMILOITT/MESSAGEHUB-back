import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/token'
import { HandleError } from '../utils/error.handler'
import { HttpErrorUserCode } from '../type/http/enums'

export function hasUserSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers

    const hasToken = verifyToken(authorization as string)

    if (!hasToken)
      throw new HandleError(
        HttpErrorUserCode.UNAUTHORIZED,
        'User not logged in',
      )

    next()
  } catch (error) {
    next(error)
  }
}
