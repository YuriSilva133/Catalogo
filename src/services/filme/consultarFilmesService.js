
import { consultarFilmes } from "../../repository/filmeRepository.js";

export default async function consultarFilmesService(nome) {
    //verifica se o nome é vazio 
    if (!nome){
        nome = ''
    }

    let registros = await consultarFilmes(nome)
    return registros
}

