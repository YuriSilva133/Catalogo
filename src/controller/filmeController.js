import { Router } from "express";
const endpoints = Router()

import salvarFilmeService from "../services/filme/salvarFilmeService.js";
import consultarFilmesService from "../services/filme/consultarFilmesService.js";
import ConsultarFilmePorIdService from "../services/filme/consultarFilmePorIdService.js";
import alterarFilmeService from "../services/filme/alterarFilmeService.js";
import deletarFilmeService from "../services/filme/deletarFilmeService.js";
import alterarCapaFilmeService from "../services/filme/alterarCapaFilmeService.js";

import multer from "multer";

//inserir filme
endpoints.post('/filme', async (req, resp) => {
    try {
        //Objeto do request
        let filmeObj = req.body;

        //processamento (service)
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

//selecionar filme por id
endpoints.get('/filme/:id', async (req, resp) => {
    try {
        let id = req.params.id

        let filme = await ConsultarFilmePorIdService(id)

        resp.send(filme)
    }
    catch (err) {
        logErro(err)
        resp.status(400).send(criarErro(err))
    }
})

//Alterar filme
endpoints.put('/filme/:id', async (req, resp) => {
    try {
        // ler entradas
        let filmeObj = req.body
        let id = req.params.id

        // processamento (service)
        await alterarFilmeService(filmeObj, id)

        resp.status(204).send()
    } catch (err) {
        logErro(err)
        resp.status(400).send(criarErro(err))
    }
})

endpoints.delete('/filme/:id', async (req, resp) => {
    try {
        // Entrada
        let id = req.params.id;

        // Processamento
        await deletarFilmeService(id)

        // Saida
        resp.status(204).send()
    } catch (err) {
        logErro(err)
        resp.status(400).send(criarErro(err))
    }
})

let uploadCapa = multer({ dest: './storage/capa' });

endpoints.put('/filme/:id/imagem', uploadCapa.single('imagem'), async (req, resp) => { 
    try {
        // entradas
        let id = req.params.id;
        let caminhoImagem = req.file.path;

        // processamento (service)
        await alterarCapaFilmeService(id, caminhoImagem);

        // saída response
        resp.sendStatus(204);
    }
    catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
})

export default endpoints;