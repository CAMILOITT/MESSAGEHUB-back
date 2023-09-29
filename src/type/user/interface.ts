import mongoose from 'mongoose'

export interface AuthUser {
  nick: string
  password: string
}

export interface UserModel extends AuthUser {
  description: string
  img_avatar: string
  list_contact: {
    _id: mongoose.Types.ObjectId
    nick: string
    img_avatar?: string
    description: string
  }[]
}

export interface SearchUser {
  nick: string
  user_nick?: string
  limit: number
  skip: number
}

export interface RequestAddContact {
  id: string
  id_contact: string
}

export interface InfoContactAdding {
  _id: string
  nick: string
  id_contact: string
}
