import 'dotenv/config'

export const ENV_SALT_ROUND = Number(process.env.SALT_ROUND)
export const ENV_PORT = Number(process.env.PORT)
export const ENV_SECRET = <string>process.env.SECRET
export const ENV_DB_URI = <string>process.env.DB_URI
