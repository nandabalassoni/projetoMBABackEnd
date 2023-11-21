require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

const config = () => {
  switch (env) {
    case 'development':
      return {
        dbpath: `mongodb://${process.env.HOST_NAME}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
        jwt_secret: process.env.JWT_KEY,
        jwt_expire: '2d',
        bcrypt_salt: 10,
      }
      break

    case 'production':
      return {
        dbpath: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
        jwt_secret: process.env.JWT_KEY,
        jwt_expire: '2d',
        bcrypt_salt: 10,
      }
      break
  }
}
module.exports = config()
