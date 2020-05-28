<template>
  <div class="row">
    <div class="card col-md-8">
      <div v-if="!livroSelecionado">
        <div class="card-header">LISTA DE LIVROS</div>
        <ul class="list-group list-group-flush">
          <li
            v-for="livro in livros"
            :key="livro.id"
            class="list-group-item list-group-item-action"
            :class="{ 'active': livroSelecionado === livro }"
          >
            <a @click="selecionarLivro(livro)">
              <span>{{ livro.titulo }}</span>
            </a>
          </li>
        </ul>
        <div class="notification" v-show="mensagem">{{ mensagem }}</div>
      </div>
      <!-- Detalhamento e edição de um livro -->
      <EditarLivroForm
        v-if="livroSelecionado"
        :id="livroSelecionado.livroID"
        @terminei="carregarLivros"
      />
    </div>
  </div>
</template>

<script>
import { dadosLivros } from "../shared/livroService";
import EditarLivroForm from "@/components/editar-livro-form";

export default {
  name: "ListaLivrosPai",
  data() {
    return {
      livroSelecionado: undefined,
      livros: [],
      mensagem: "",
    };
  },
  components: { EditarLivroForm },
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
    selecionarLivro(livro) {
      this.livroSelecionado = livro;
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