import { Router } from 'express'
import {
  addContact,
  deleteContact,
  getFile,
  getListContacts,
  getPerfil,
  getUser,
  setDescription,
  setNick,
} from '../controllers/user.controllers'
import multerMiddleware from '../middleware/file'
import { hasUserSession } from '../middleware/hasSession'

const user = Router()

user.get('/getPerfil/:id', hasUserSession, getPerfil)
user.post('/searchUser', hasUserSession, getUser)
user.post('/addUser', hasUserSession, addContact)
user.post('/getContacts', hasUserSession, getListContacts)
user.put('/deleteContact', hasUserSession, deleteContact)

user.put(
  '/setAvatar',
  hasUserSession,
  multerMiddleware.single('imgAvatar'),
  getFile,
)

user.put('/setNick', hasUserSession, setNick)
user.put('/setDescription', hasUserSession, setDescription)

export default user
