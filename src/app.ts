import express from 'express'
import bodyParser from 'body-parser'
import usersRoute from './routes/userRoutes'
import postsRoute from './routes/postsRoute'
import newsRoute from './routes/newsRoute'

const app = express()

app.use((req, res, next) => {
  res.set('X-Powered-By', 'PHP/7.1.7')
  next()
})

app.use(bodyParser.json())
app.use((requisicao, resposta, next) => {
  resposta.set({
      'Content-Type': 'application/json'
  })
  next()
})
app.use('/api', usersRoute)
app.use('/api', postsRoute)
app.use('/api', newsRoute)

export default app