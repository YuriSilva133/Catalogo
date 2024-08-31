import con from './connection.js'

//INSERT
export async function salvarFilme(filme) {
    let comando = `
    INSERT INTO tb_filme(nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
        VALUES(?, ?, ?, ?, ?);
    `
    let resposta = await con.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    //sempre na posição 0
    let info = resposta[0];

    let idFilme = info.insertId;
    return idFilme;
}

//SELECT
export async function consultarFilmes(nome) {
    let comando = `
        SELECT  id_filme,
                nm_filme,
                vl_avaliacao,
                dt_lancamento,
                bt_disponivel
            FROM tb_filme
            WHERE nm_filme LIKE ?
    `
    let resposta = await con.query(comando, ['%' + nome + '%']);
    let registros = resposta[0];

    return registros;
}

//SELECT
export async function consultarFilmePorId(id) {
    let comando = `
        SELECT  id_filme            id,
                nm_filme            nome,
                ds_sinopse          sinopse,
                vl_avaliacao        avaliacao,
                dt_lancamento       lancamento,
                bt_disponivel       disponivel,
                img_filme           img
        FROM tb_filme
        WHERE id_filme = ?
    `
    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];

    return registros;
}

//SELECT
export async function consultarFilmePorNome(nome) {
    let comando = `
        SELECT  id_filme            id,
                nm_filme            nome,
                vl_avaliacao        avaliacao,
                dt_lancamento       lancamento,
                bt_disponivel       disponivel
        FROM tb_filme
        WHERE nm_filme = ?
    `
    let resposta = await con.query(comando, [nome]);
    let registros = resposta[0];

    return registros;
}

//UPDATE
export async function alterarFilme(filme, id) {
    let comando = `
        UPDATE tb_filme
        SET nm_filme = ?,
            ds_sinopse = ?,
            vl_avaliacao = ?,
            dt_lancamento = ?,
            bt_disponivel = ?
        WHERE id_filme = ?;
    `
    let resposta = await con.query(comando, [
        filme.nome,
        filme.sinopse,
        filme.avaliacao,
        filme.lancamento, 
        filme.disponivel, 
        id]);

    let info = resposta[0]
    let linhasAfetadas = info.affectedRows;
    
    return linhasAfetadas;
}

//DELETE
export async function deletarFilme(id){
    let comando = `
        DELETE FROM tb_filme WHERE id_filme = ?
    `
    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    let linhasAfetadas = info.affectedRows;
    return linhasAfetadas;
}

//UPDATE
export async function alterarCapaFilme(id, caminho) {
    let comando = `
        UPDATE tb_filme
        SET img_filme = ?
        WHERE id_filme = ?;
    `

    let resposta = await con.query(comando, [caminho, id])

    let info = resposta[0]
    
    let linhasAfetadas = info.affectedRows;

    return linhasAfetadas;
}