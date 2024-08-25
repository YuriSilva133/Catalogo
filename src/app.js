import './utils/global.js'
import 'dotenv/config.js'

import adicionarRotas from './rotas.js'
import express from 'express'
import cors from 'cors'

const servidor = express()
servidor.use(cors())
servidor.use(express.json())

//Configura os controllers
adicionarRotas(servidor)

const PORTA = process.env.PORTA;
servidor.listen(PORTA, () => console.log(`--> Api subiu na porta ${PORTA}`))