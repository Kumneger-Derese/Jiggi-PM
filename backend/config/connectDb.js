import sequelize from './sequelize.js'

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database Connected!')

    // await sequelize.sync({ alter: true })
    // console.log('Database Synced!')
  } catch (error) {
    console.error('Unable to connect to DB:', error)
  }
}

export default connectDB
