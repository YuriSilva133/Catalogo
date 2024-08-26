import { salvarFilme } from "../../repository/filmeRepository.js"
import { validarNovoFilme } from "../../validation/filme/filmeValidation.js"

export default async function salvarFilmeService(filmeObj) {
    //Verifica se há valores undefined ou do tipo errado
    validarNovoFilme(filmeObj);
    
    //salva no banco de dados
    let id = await salvarFilme(filmeObj);
    return id;
}