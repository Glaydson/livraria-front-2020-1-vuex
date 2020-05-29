<template>
  <div class="row">
    <div class="card col-md-8">
        <div class="card-header">LISTA DE LIVROS</div>
        <ul class="list-group list-group-flush">
          <li
            v-for="livro in livros"
            :key="livro.livroID"
            class="list-group-item list-group-item-action"
          >
            <router-link :to="{name: 'editaLivro', params:{id: livro.livroID} }">
              <span>{{ livro.titulo }}</span>
            </router-link>
          </li>
        </ul>
        <div class="notification" v-show="mensagem">{{ mensagem }}</div>
    </div>
  </div>
</template>

<script>
import { dadosLivros } from "../shared/livroService";

export default {
  name: "ListaLivrosPai",
  data() {
    return {
      livros: [],
      mensagem: ""
    };
  },
  async created() {
    await this.carregarLivros();
  },
  methods: {
    async carregarLivros() {
      this.livros = [];
      this.mensagem = "Obtendo os livros. Por favor aguarde...";
      this.livros = await dadosLivros.getLivros();
      this.mensagem = "";
    },
  }
};
</script>

<style>
li a {
  cursor: pointer;
}
.card-header {
  text-transform: uppercase;
  font-weight: bold;
}
.notification {
  background-color: blue;
  color: white;
  font-size: 16px;
  line-height: 30px;
}
.botoes {
  width: 120px;
  margin-right: 20px;
}
</style>