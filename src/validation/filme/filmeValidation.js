

//verifica se há parametros undefined ou errados
export function validarNovoFilme(filmeObj) {
    if (!filmeObj.nome) 
        throw new Error("O nome do filme é obrigatório");
    
    else if (!filmeObj.sinopse) 
        throw new Error("A sinopse do filme é obrigatória");

    else if (isNaN(!filmeObj.avaliacao)) 
        throw new Error("A avaliação do filme é obrigatória");

    else if (!filmeObj.lancamento) 
        throw new Error("O lançamento do filme é obrigatório");

    else if (filmeObj.disponivel == undefined) 
        throw new Error("Parametro disponivel do filme é obrigatório");
}

export function validarFilmeUnico(registros) {
    if(registros.length == 0)
        throw new Error('Filme não encontrado');
}

export function validarFilmeIgual(registros) {
    if(registros.length > 0)
        throw new Error('Este filme já foi cadastrado')
}
 