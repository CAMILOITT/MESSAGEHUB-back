import messageModel from '../model/message.model'
import { HttpErrorUserCode } from '../type/http/enums'
import { GetListMessages, MessageModel } from '../type/message/interface'
import { HandleError } from '../utils/error.handler'

export async function createMessage({
  message,
  id_sender,
  id_receiver,
}: MessageModel) {
  if (!message || !id_sender || !id_receiver)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )

  const newMessage = await messageModel.create({
    message,
    id_sender,
    id_receiver,
  })

  return newMessage
}

export async function getListMessage({
  id_sender,
  id_receiver,
  limit = 5,
  skip = 0,
}: GetListMessages) {
  if (!id_sender || !id_receiver)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )

  const listMessages = await messageModel.find(
    {
      $or: [
        { $and: [{ id_sender }, { id_receiver }] },
        { $and: [{ id_receiver: id_sender }, { id_sender: id_receiver }] },
      ],
    },
    ['id_sender', 'id_receiver', 'message', 'createdAt'],
    { sort: { createdAt: -1 }, limit, skip },
  )

  if (!listMessages)
    return {
      message: 'nuevos mensajes',
    }

  return listMessages
}
