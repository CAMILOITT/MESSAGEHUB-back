import bcrypt from 'bcrypt'
import { ENV_SALT_ROUND } from '../const/env'

export function generatePassword(password: string) {
  const saltRounds = ENV_SALT_ROUND

  const salt = bcrypt.genSaltSync(saltRounds)
  const newPassword = bcrypt.hashSync(password, salt)

  return newPassword
}

export function comparePassword(password: string, passwordCompare: string) {
  return bcrypt.compareSync(password, passwordCompare)
}
