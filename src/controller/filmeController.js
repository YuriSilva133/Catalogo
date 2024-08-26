import salvarFilmeService from "../services/filme/salvarFilmeService.js";
import consultarFilmesService from "../services/filme/consultarFilmesService.js";

import { Router } from "express";
const endpoints = Router()

//inserir filme
endpoints.post('/filme', async (req, resp) => {
    try {
        //Objeto do request
        let filmeObj = req.body;
        let id = await salvarFilmeService(filmeObj)

        //response
        resp.send({
            id: id
        })
    }
    catch (err) {
        //mensagem de erro com hora e tipo
        logErro(err)
        resp.status(400).send(criarErro(err));
    }
})

//Selecionar filme pelo nome
endpoints.get('/filme', async (req, resp) => {
    try {
        //leitura
        let nome = req.query.nome

        //processamento (service)
        let registros = await consultarFilmesService(nome)

        //saida
        resp.send(registros)
    } 
    catch (err) {
        logErro(err)
        resp.status(400).send(criarErro(err))    
    }
})

export default endpoints;