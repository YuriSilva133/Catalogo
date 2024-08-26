import mysql from 'mysql2/promise'

let con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    //conversão do tipo
    typeCast: function (field, next){
        //verifica se é um campo booleano
        if (field.type === 'TINY' && field.length === 1) {
            //retorna true
            return (field.string() === '1')
        }
        //converte a string "9.20" para numero
        else if( field.type.includes('DECIMAL')){
            return Number(field.string())
        }
        else{
            return next()
        }
    }
})

console.log('conexão com BD estabelecida');

export default con;