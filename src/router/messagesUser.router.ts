import { Router } from 'express'
import {
  getMessages,
  sendMessage,
} from '../controllers/messagesUser.controllers'
import { hasUserSession } from '../middleware/hasSession'

const messagesUser = Router()

messagesUser.post('/sendMessage', hasUserSession, sendMessage)
messagesUser.post('/getMessages', hasUserSession, getMessages)

export default messagesUser
