import { join } from 'path'
import express, { static } from 'express'
const app = express() // create express app

app.use(static(join(__dirname, '../dist')))

// start express server on port 8000
app.listen(8000, () => {
  console.log('server started on port 8000')
})
