import jwt from 'jsonwebtoken'
import { ENV_SECRET } from '../const/env'
import { Types } from 'mongoose'

export function createToken(user_nick: string, _id: Types.ObjectId) {
  const token = jwt.sign({ user_nick, _id }, ENV_SECRET, {
    expiresIn: '1 days',
  })
  return token
}

export function verifyToken(token: string) {
  return jwt.verify(token, ENV_SECRET)
}
