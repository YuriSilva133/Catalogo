import salvarFilmeService from "../services/filme/salvarFilmeService.js";
import { Router } from "express";

const endpoints = Router()

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
export default endpoints;