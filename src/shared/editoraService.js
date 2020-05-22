import * as axios from 'axios';

const getEditoras = async function () {
    const resposta = await axios.get('http://localhost:8081/apilivros/editoras/todos');
    const editoras = resposta.data;
    return editoras;
}

export const dadosEditoras = {
    getEditoras
}