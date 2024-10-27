import "reflect-metadata"
import server from './infra/http/server'

server.listen(8080, () => console.log('start server...'))
