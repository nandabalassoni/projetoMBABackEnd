require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

const config = () => {
  switch (env) {
    case 'development':
      return {
        dbpath: `mongodb://${process.env.HOST_NAME}:${process.env.USER_DB_PORT}/${process.env.USER_DB_DATABASE}`,
        jwt_secret: process.env.JWT_KEY,
        jwt_expire: '2d',
        bcrypt_salt: 10,
      }
      break

    case 'production':
      return {
        dbpath: `mongodb+srv://${process.env.USER_DB_USER}:${process.env.USER_DB_PASSWORD}@${process.env.USER_DB_HOST}/${process.env.USER_DB_DATABASE}?retryWrites=true&w=majority`,
        jwt_secret: process.env.JWT_KEY,
        jwt_expire: '2d',
        bcrypt_salt: 10,
      }
      break
  }
}
module.exports = config()
