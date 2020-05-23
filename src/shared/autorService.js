import * as axios from 'axios';

const getAutores = async function () {
    const resposta = await axios.get('http://localhost:8081/apilivros/autores/todos');
    const autores = resposta.data;
    return autores;
}

export const dadosAutores = {
    getAutores
}