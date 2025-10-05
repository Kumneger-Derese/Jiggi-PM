import fs from 'fs-extra'
import path from 'node:path'
import { format } from 'date-fns'
import { fileURLToPath } from 'node:url'

//Esm setup
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const migrationName = process.argv[2]

if (!migrationName) {
  console.log('❌ No file name provided')
  process.exit(1)
}

// Generate timestamp prefix
const timestamp = format(new Date(), `yyyyMMddhhmmss`)

// Create file name and path
const fileName = `${timestamp}-${migrationName}.js`
const filePath = path.join(__dirname, '../migrations', fileName)

// Migration boilerplate content
const template = `
import {DataTypes} from 'sequelize'

export const up = async ({context: queryInterface}) => {
// TODO: Add migration code here (e.g., createTable, addColumn)
}

export const down = async ({context: queryInterface}) => {
 // TODO: Add reverting code here (e.g., dropTable, removeColumn)
}
`
// Write file
await fs.outputFile(filePath, template)

console.log(`✅ Migration created: migrations/${fileName}`)
process.exit()
