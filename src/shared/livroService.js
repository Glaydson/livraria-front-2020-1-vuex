import * as axios from 'axios';

import { format } from "date-fns";
import moment from 'moment';
const inputDateFormat = "yyyy-MM-dd";
const APIBASE = 'http://localhost:8081/apilivros/livros';

const getLivros = async function () {
    const resposta = await axios.get(`${APIBASE}/todos`);
    moment.locale('pt-BR');
    const livros = resposta.data.map(l => {
        // Inicializa a data corretamente usando moment
        const data = moment(l.dataPublicacao, "DD-MM-YYYY");
        // Formata a data para exibição no campo, usando date-fns
        l.dataPublicacao = format(new Date(data), inputDateFormat);
        l.preco = Number(l.preco).toFixed(2);
        return l;
    });
    return livros;
}

const getLivro = async function (id) {
    try {
        const resposta = await axios.get(`${APIBASE}/${id}`);
        moment.locale('pt-BR');
        let livro = resposta.data;
        // Inicializa a data corretamente usando moment
        const data = moment(livro.dataPublicacao, "YYYY-MM-DD");
        // Formata a data para exibição no campo, usando date-fns
        livro.dataPublicacao = format(new Date(data), inputDateFormat);
        livro.preco = Number(livro.preco).toFixed(2);
        return livro;
    } catch ( error) {
        if (error.response) {
            let erro = error.response.data.message;
            throw Error(erro)
        }
    }
}

const atualizarLivro = async function (livro) {
    try {
        const uri = `${APIBASE}/atualiza/${livro.livroID}`;
        const resposta = await axios.put(uri, JSON.stringify(livro), {
            headers: {
                'Content-type': 'application/json'
            }
        });
        console.log(resposta);
        return resposta;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const salvarLivro = async function (livro) {
    const uri = `${APIBASE}/novo`;
    const resposta = await axios.post(uri, JSON.stringify(livro), {
        headers: {
            'Content-type': 'application/json'
        }
    });
    console.log(resposta);
    return resposta;
}

const removerLivro = async function (livro) {
    const uri = `${APIBASE}/delete/${livro.livroID}`;
    const resposta = await axios.delete(uri, JSON.stringify(livro), {
        headers: {
            'Content-type': 'application/json'
        }
    });
    console.log(resposta);
    return resposta;
}

export const dadosLivros = {
    getLivros, getLivro, atualizarLivro, salvarLivro, removerLivro
}