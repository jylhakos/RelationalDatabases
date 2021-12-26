// $ npm run migration:down

const { rollbackMigrations } = require('./database')

rollbackMigrations()