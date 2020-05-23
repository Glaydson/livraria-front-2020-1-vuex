import * as axios from 'axios';

import { format } from "date-fns";
import moment from 'moment';
const inputDateFormat = "yyyy-MM-dd";
const APIBASE = 'http://localhost:8081/apilivros/livros';

const getLivros = async function () {
    const resposta = await axios.get(`${APIBASE}/todos`);
    const livros = resposta.data.map(l => {
        moment.locale('pt-BR');
        // Inicializa a data corretamente usando moment
        const data = moment(l.dataPublicacao, "DD-MM-YYYY");
        // Formata a data para exibição no campo, usando date-fns
        l.dataPublicacao = format(new Date(data), inputDateFormat);
        // l.preco = new Intl.NumberFormat
        //     ('pt-BR', { style: 'currency', currency: 'BRL' }).format(l.preco);
        return l;
    });
    return livros;
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

export const dadosLivros = {
    getLivros, atualizarLivro
}