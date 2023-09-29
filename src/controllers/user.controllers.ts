import { NextFunction, Request, Response } from 'express'
import {
  addListContacts,
  getContacts,
  newDescription,
  newNick,
  removeContact,
  searchPerfil,
  searchUser,
  uploadImg,
} from '../services/user.services'
import { HttpExitCode } from '../type/http/enums'

export async function getPerfil(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params

    const infoUser =
      await searchPerfil({ id })
    res.status(HttpExitCode.OK).send(infoUser)
  } catch (error) {
    next(error)
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await searchUser(req.body)
    res.status(HttpExitCode.OK).send(response)
  } catch (error) {
    next(error)
  }
}

export async function addContact(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await addListContacts(req.body)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export async function getListContacts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await getContacts(req.body)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export async function deleteContact(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await removeContact(req.body)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export async function getFile(req: Request, res: Response, next: NextFunction) {
  try {
    const { file } = req
    const { _id } = req.body
    const response = await uploadImg({ _id, file })

    res.status(200).sendFile(response)
  } catch (error) {
    next(error)
  }
}

export async function setNick(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await newNick(req.body)
    res.status(200).send(response)
  } catch (error) {
    next(error)
  }
}

export async function setDescription(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await newDescription(req.body)
    res.status(200).send(response)
  } catch (error) {
    next(error)
  }
}
