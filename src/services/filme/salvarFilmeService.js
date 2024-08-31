import { salvarFilme, consultarFilmePorNome } from "../../repository/filmeRepository.js"
import { validarNovoFilme, validarFilmeIgual } from "../../validation/filme/filmeValidation.js"

export default async function salvarFilmeService(filmeObj) {
    // Verifica se há valores undefined ou do tipo errado
    validarNovoFilme(filmeObj);

    // Busca filmes com o mesmo nome
    // Validação
    let registros = await consultarFilmePorNome(filmeObj.nome)
    validarFilmeIgual(registros)

    // Salva no banco de dados
    let id = await salvarFilme(filmeObj);

    return id;
}