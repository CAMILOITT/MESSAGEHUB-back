import mongoose from 'mongoose'
import { UserModel } from '../type/user/interface'

const userSchema = new mongoose.Schema<UserModel>(
  {
    nick: {
      type: String,
      required: true,
      unique: true,
      min: 1,
      max: 15,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    description: {
      type: String,
      required: false,
      max: 150,
      default: '',
    },
    img_avatar: {
      type: String,
      required: false,
      default: '',
    },
    list_contact: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
        nick: { type: mongoose.Schema.Types.String, ref: 'user' },
        img_avatar: { type: mongoose.Schema.Types.String, ref: 'user' },
        description: { type: mongoose.Schema.Types.String, ref: 'user' },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

// userSchema.virtual('userModel', {
//   ref: 'userSchema',
//   localField: 'list_contact',
//   foreignField: '_id',
//   justOne: true,
// })

const userModel = mongoose.model('user', userSchema)
export default userModel
