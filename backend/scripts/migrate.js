import { Umzug, SequelizeStorage } from 'umzug'
import sequelize from '../config/sequelize.js'

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console
})

// Apply migrations. By default, runs all pending migrations.
await umzug.up()

console.log('All migrations executed successfully!')
process.exit()
