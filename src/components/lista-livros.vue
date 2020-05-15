<template>
  <div class="card" style="width: 30rem;">
    <div class="card-header">LISTA DE LIVROS</div>
    <ul class="list-group list-group-flush">
      <li
        v-for="livro in livros"
        :key="livro.id"
        class="list-group-item list-group-item-action"
        :class="{ 'active': livroSelecionado === livro }"
      >
        <a @click="livroSelecionado = livro">
          <span>{{ livro.titulo }}</span>
        </a>
      </li>
    </ul>
    <div v-if="livroSelecionado">
      <div class="card-header">{{tituloDisponibilidade}}</div>
      <form>
        <div class="form-group">
          <label for="id">Id</label>
          <input type="text" class="form-control" id="id" disabled :value="livroSelecionado.id" />
        </div>
        <div class="form-group">
          <label for="titulo">Título</label>
          <input type="text" class="form-control" id="id" disabled :value="livroSelecionado.titulo" />
        </div>
        <div class="form-group">
          <label for="dataPublicacao">Data da Publicação</label>
          <input
            type="text"
            class="form-control"
            id="dataPublicacao"
            disabled
            :value="livroSelecionado.dataPublicacao"
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="mostrar" v-model="mostrarMais" />
          <label for="mostrar" class="form-check-label">Mostrar Mais Campos</label>
        </div>
        <div class="form-group" v-show="mostrarMais">
          <label for="preco">Preço</label>
          <input
            type="text"
            class="form-control"
            id="preco"
            disabled
            :value="livroSelecionado.preco"
          />
        </div>
        <div class="form-group" v-show="mostrarMais">
          <label for="autores">Autor(es)</label>
          <input
            type="text"
            class="form-control"
            id="autores"
            disabled
            :value="livroSelecionado.autores"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaLivros",
  data() {
    return {
      livroSelecionado: undefined,
      mostrarMais: false,
      livros: [
        {
          id: 19,
          titulo: "Spring Boot in Action",
          dataPublicacao: "2019-10-08",
          preco: 500,
          numeroPaginas: 159,
          autores: ["Autor 3"],
          disponivel: true
        },
        {
          id: 20,
          titulo: "Java Como Programar",
          dataPublicacao: "2000-03-08",
          preco: 50,
          numeroPaginas: 300,
          autores: ["Autor 1", "Autor 2"],
          disponivel: true
        },
        {
          id: 21,
          titulo: "C Como Programar",
          dataPublicacao: "2000-12-08",
          preco: 50,
          numeroPaginas: 300,
          autores: ["Autor 4"],
          disponivel: false
        },
        {
          id: 22,
          titulo: "Vue JS Handbook",
          dataPublicacao: "2020-03-08",
          preco: 500,
          numeroPaginas: 300,
          autores: ["Autor 5", "Autor 6"],
          disponivel: true
        }
      ]
    };
  },
  computed: {
    tituloDisponibilidade() {
      return `${this.livroSelecionado.titulo} - ${
        this.livroSelecionado.disponivel ? "Disponível" : "Indisponível"
      }`;
    }
  }
};
</script>

<style scoped>
li a {
  cursor: pointer;
}
.card-header {
  text-transform: uppercase;
  font-weight: bold;
}
</style>