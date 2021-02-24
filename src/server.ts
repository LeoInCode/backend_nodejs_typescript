import * as dotenv from "dotenv";
dotenv.config({ path: '.env' });
import './infraestracture/redis/blocklistAccessToken'
import './infraestracture/redis/allowlistRefreshToken'

import conection from './infraestracture/database/conection'
import Tables from './infraestracture/database/tables'
import app from './app'

app.listen(3000,async () => {
  console.log("Aplicação rodando na porta 3000")

  conection.connect(async error => 
    error ? console.log("Erro ao conectar-se ao banco")
    : Tables.prototype.init(conection)        
    )
})