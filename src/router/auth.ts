import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/auth.controllers'

const sessionUser = Router()

sessionUser.post('/register', registerUser)
sessionUser.post('/login', loginUser)

export default sessionUser
