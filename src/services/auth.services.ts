import userModel from '../model/user.model'
import { HttpErrorUserCode } from '../type/http/enums'
import { AuthUser } from '../type/user/interface'
import { HandleError } from '../utils/error.handler'
import { comparePassword, generatePassword } from '../utils/password'
import { createToken } from '../utils/token'

export async function createUser({ nick, password }: AuthUser) {
  if (!nick || !password)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )

  const checkUser = await userModel.findOne({ nick })

  if (checkUser)
    throw new HandleError(HttpErrorUserCode.CONFLICT, 'User already exists')

  const newPassword = generatePassword(password)

  await userModel.create({
    nick,
    password: newPassword,
  })

  return { message: 'user created' }
}

export async function verifyUser({ nick, password }: AuthUser) {
  if (!nick || !password)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )

  const user = await userModel.findOne({ nick })

  if (!user)
    throw new HandleError(HttpErrorUserCode.NOT_FOUND, 'User not found')

  const verifyPassword = comparePassword(password, user.password)

  if (!verifyPassword)
    throw new HandleError(HttpErrorUserCode.UNAUTHORIZED, 'Invalid credentials')

  const { nick: user_nick, _id, list_contact } = user

  const token = createToken(user_nick, _id)

  return { token, data: { nick: user_nick, _id, list_contact } }
}
