import { NextFunction, Request, Response } from 'express'
import {
  createMessage,
  getListMessage,
} from '../services/userMessages.services'

export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const responseMessage = await createMessage(req.body)
    res.status(200).json(responseMessage)
  } catch (error) {
    next(error)
  }
}

export async function getMessages(req: Request, res: Response,  next: NextFunction
) {
  try {
    const responseMessage = await getListMessage(req.body)

    res.status(200).json(responseMessage)
  } catch (error) {
    next(error)
  }
}
