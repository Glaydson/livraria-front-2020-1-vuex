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
        // l.preco = new Intl.NumberFormat
        //     ('pt-BR', { style: 'currency', currency: 'BRL' }).format(l.preco);
        return l;
    });
    return livros;
}

const getLivro = async function (id) {
    const resposta = await axios.get(`${APIBASE}/${id}`);
    moment.locale('pt-BR');
    const livro = resposta.data.map(l => {
        // Inicializa a data corretamente usando moment
        const data = moment(l.dataPublicacao, "DD-MM-YYYY");
        // Formata a data para exibição no campo, usando date-fns
        l.dataPublicacao = format(new Date(data), inputDateFormat);
        l.preco = Number(l.preco).toFixed(2);
        // l.preco = new Intl.NumberFormat
        //     ('pt-BR', { style: 'currency', currency: 'BRL' }).format(l.preco);
        return l;
    });
    return livro;
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
    } catch (error) {
        console.log(error)
    }
}

const removerLivro = async function(livro) {
    const uri = `${APIBASE}/delete/${livro.livroID}`;
    const resposta = await axios.delete(uri, JSON.stringify(livro), {
        headers: {
            'Content-type': 'application/json'
        }
    });
    console.log(resposta);
}

export const dadosLivros = {
    getLivros, getLivro, atualizarLivro, removerLivro
}