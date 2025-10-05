import { Umzug, SequelizeStorage } from 'umzug'
import sequelize from '../config/sequelize.js'

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console
})

// Revert migrations. By default, the last executed migration is reverted.
await umzug.down()

console.log('Rolled back the last migration!')
process.exit(1)
