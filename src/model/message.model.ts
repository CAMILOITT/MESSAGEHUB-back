import mongoose from 'mongoose'
import { MessageModel } from '../type/message/interface'

const messageUser = new mongoose.Schema<MessageModel>(
  {
    message: {
      type: String,
      required: true,
      min: 1,
    },
    id_sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      min: 1,
    },
    id_receiver: {
      type: mongoose.Types.ObjectId,
      required: true,
      min: 1,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default mongoose.model('Message', messageUser)

