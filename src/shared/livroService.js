import * as axios from 'axios';

import { format } from "date-fns";
import moment from 'moment';
const inputDateFormat = "yyyy-MM-dd";

const getLivros = async function () {
    const resposta = await axios.get('http://localhost:8081/apilivros/livros/todos');
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

export const dadosLivros = {
    getLivros
}