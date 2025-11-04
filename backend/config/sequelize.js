import 'dotenv/config'
import { Sequelize } from 'sequelize'

const dbUrl = process.env.DATABASE_URL

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false
  // dialectOptions: { ssl: { require: true } }
})

export default sequelize
