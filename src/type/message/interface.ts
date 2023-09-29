import mongoose from 'mongoose'

export interface MessageModel {
  message: string
  id_sender: mongoose.Types.ObjectId | undefined
  id_receiver: mongoose.Types.ObjectId | undefined
}

export interface GetListMessages {
  id_sender: string
  id_receiver: string
  limit: number
  skip: number
}

export interface InfoMessageSend {
  _id: string
  id_receiver: string
  id_sender: string
  message: string
}