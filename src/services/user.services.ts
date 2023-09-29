import userModel from '../model/user.model'
import { HttpErrorUserCode } from '../type/http/enums'
import { RequestAddContact, SearchUser } from '../type/user/interface'
import { HandleError } from '../utils/error.handler'

export async function searchPerfil({ id }: { id: string }) {
  if (!id)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )
  const responseUser = await userModel.findById(id, [
    'nick',
    'description',
    'img_avatar',
    'list_contact',
  ])

  if (!responseUser)
    throw new HandleError(HttpErrorUserCode.NOT_FOUND, 'User not found')

  return responseUser
}

export async function searchUser({
  nick,
  user_nick = '',
  limit = 5,
  skip = 0,
}: SearchUser) {
  if (!nick)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )
  const responseUser = await userModel.find(
    { nick: { $regex: nick, $ne: user_nick, $options: 'i' } },
    ['nick', 'img_avatar'],
    { limit, skip },
  )
  if (!responseUser.length)
    throw new HandleError(HttpErrorUserCode.NOT_FOUND, 'User not found')

  return responseUser
}

export async function addListContacts({ id, id_contact }: RequestAddContact) {
  if (id === id_contact)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'You cannot add yourself as a contact',
    )

  if (!id || !id_contact)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )

  const user = await userModel.findOne(
    {
      _id: id,
      list_contact: { $not: { $elemMatch: { _id: id_contact } } },
    },
    ['nick', 'img_avatar'],
  )

  const contact = await userModel.findOne(
    {
      _id: id_contact,
      list_contact: { $not: { $elemMatch: { _id: id } } },
    },
    ['nick', 'img_avatar'],
  )

  if (!user && !contact)
    throw new HandleError(HttpErrorUserCode.CONFLICT, 'User is already added')

  if (user && !contact) {
    const contact = await userModel.findById(id_contact, ['nick'])

    await userModel.findByIdAndUpdate(user._id, {
      $push: {
        list_contact: contact,
      },
    })

    if (!contact)
      throw new HandleError(HttpErrorUserCode.CONFLICT, 'could not add user')

    const { _id, nick, img_avatar, description } = contact

    return { _id, nick, img_avatar, description, message: 'contact added' }
  }

  if (user)
    await userModel.findByIdAndUpdate(user._id, {
      $push: {
        list_contact: contact,
      },
    })

  if (contact)
    await userModel.findByIdAndUpdate(contact._id, {
      $push: {
        list_contact: { _id: user?._id, nick: user?.nick },
      },
    })

  if (!contact)
    throw new HandleError(HttpErrorUserCode.CONFLICT, 'could not add user')

  const { _id, nick, img_avatar, description } = contact

  return { _id, nick, img_avatar, description, message: 'contact added' }
}

export async function getContacts({ id }: { id: string }) {
  if (!id)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )

  const contacts = await userModel.findById(id, ['list_contact'])

  return contacts
}

export async function removeContact({ id, id_contact }: RequestAddContact) {
  if (!id_contact || !id)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )
  await userModel.findByIdAndUpdate(id, {
    $pull: {
      list_contact: { _id: id_contact },
    },
  })

  const contacts = await userModel.findById(id, ['list_contact'])

  return contacts
}

// arreglar

export async function uploadImg({
  _id,
  file,
}: {
  _id: string
  file?: Express.Multer.File
}) {
  if (!_id || !file)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )

  const { filename, path } = file

  await userModel.findByIdAndUpdate(_id, { img_avatar: filename })

  await userModel.updateMany(
    { list_contact: { $elemMatch: { _id } } },
    { $set: { 'list_contact.$.img_avatar': filename } },
  )

  return path
}

// a;adir update description and nick

export async function newNick({
  _id,
  description,
}: {
  _id: string
  description: string
}) {
  if (!_id || !description)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )

  const user = await userModel.findByIdAndUpdate({ _id }, { nick: description })

  if (user)
    throw new HandleError(HttpErrorUserCode.NOT_FOUND, 'nick already exists')

  await userModel.findByIdAndUpdate({ _id }, { nick: description })

  const res = await userModel.updateMany(
    { list_contact: { $elemMatch: { _id } } },
    { $set: { 'list_contact.$.nick': description } },
    { new: true },
  )

  return { message: 'user updated' }
}

export async function newDescription({
  _id,
  description,
}: {
  _id: string
  description: string
}) {
  if (!_id || !description)
    throw new HandleError(
      HttpErrorUserCode.BAD_REQUEST,
      'All fields are required',
    )

  await userModel.updateOne({ _id }, { description })

  await userModel.updateMany(
    { list_contact: { $elemMatch: { _id } } },
    { $set: { 'list_contact.$.description': description } },
  )

  return { message: 'user updated' }
}
