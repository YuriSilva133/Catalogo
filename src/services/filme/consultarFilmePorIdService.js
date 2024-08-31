import { consultarFilmePorId } from "../../repository/filmeRepository.js";

export default async function ConsultarFilmePorIdService(id) {
    //retorna um vetor de objetos
    let registros = await consultarFilmePorId(id)
    let filme = registros[0]
    return filme;
}