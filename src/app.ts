import cors from 'cors'
import express from 'express'
import http from 'http'
import cron from 'node-cron'
import path from 'path'
import { Server } from 'socket.io'
import db from './config/mongo'
import messageModel from './model/message.model'
import userModel from './model/user.model'
import sessionUser from './router/auth'
import messagesUser from './router/messagesUser.router'
import user from './router/users.router'
import { InfoMessageSend } from './type/message/interface'
import { InfoContactAdding } from './type/user/interface'
import { deleteFile } from './utils/deleteFiles'
import { errorHandler } from './utils/error.handler'

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))

app.use(sessionUser)
app.use(user)
app.use(messagesUser)

app.use(errorHandler)

db()

const server = http.createServer(app)

export const io = new Server(server)

io.on('connection', socket => {
  socket.on('login', user_id => {
    socket.join(user_id)
  })

  socket.on(
    'sendMessage',
    ({ _id, id_receiver, id_sender, message }: InfoMessageSend) => {
      socket.to(id_receiver).emit('getMessage', {
        _id,
        id_receiver,
        id_sender,
        message,
      })
    },
  )

  socket.on('addContact', ({ _id, nick, id_contact }: InfoContactAdding) => {
    socket.to(id_contact).emit('addContact', { _id, nick })
  })
})

cron.schedule('0 0 * * 7', () => {
  userModel.deleteMany({})
  messageModel.deleteMany({})
  const currentDirectory = process.cwd()
  const parentDirectory = path.join(currentDirectory, 'uploads')

  deleteFile(parentDirectory)
})

export default server
