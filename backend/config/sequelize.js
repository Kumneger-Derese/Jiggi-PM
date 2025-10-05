import 'dotenv/config'
import config from './config.js'
import { Sequelize } from 'sequelize'

const env = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false // Disable logging for cleaner output
  }
)

export default sequelize
