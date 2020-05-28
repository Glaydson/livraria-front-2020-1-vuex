<template>
  <div class="row">
    <div class="card col-md-8">
      <div class="notification" v-show="mensagemSucesso">{{ mensagemSucesso }}</div>
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
        :livro="livroSelecionado"
        :todosAutores="autores"
        :todasEditoras="editoras"
        @cancelar="cancelarEdicao"
        @atualizar="atualizarLivro"
        @remover="removerLivro"
      />
    </div>
  </div>
</template>

<script>
import { dadosLivros } from "../shared/livroService";
import { dadosAutores } from "../shared/autorService";
import { dadosEditoras } from "../shared/editoraService";
import EditarLivroForm from "@/components/editar-livro-form";
//import VueToastr from '@deveodk/vue-toastr'
//import Toastify from 'toastify-js';

// Cria um objeto autor para ser usado no momento de atualizar/salvar um livro
var Autor = function(autorID) {
  this.autorID = autorID;
};
export default {
  name: "ListaLivrosPai",
  data() {
    return {
      livroSelecionado: undefined,
      livros: [],
      autores: [],
      editoras: [],
      mensagem: "",
      mensagemSucesso: '',
    };
  },
  components: { EditarLivroForm },
  async created() {
    await this.carregarLivros();
    await this.carregarAutores();
    await this.carregarEditoras();
  },
  methods: {
    async carregarLivros() {
      this.livros = [];
      this.mensagem = "Obtendo os livros. Por favor aguarde...";
      this.livros = await dadosLivros.getLivros();
      this.mensagem = "";
    },
    async carregarAutores() {
      this.autores = await dadosAutores.getAutores();
    },
    async carregarEditoras() {
      this.editoras = await dadosEditoras.getEditoras();
    },
    async atualizarLivro(livro) {
      if (livro) {
        // transforma o array de ids em um array de objetos, cada um com o autorID
        const autoresLivro = [];
        livro.autores.forEach(autor => {
          autoresLivro.push(new Autor(autor));
        });
        livro.autores = autoresLivro;
        await dadosLivros.atualizarLivro(livro);
        this.mensagemSucesso = `${livro.titulo} Atualizado`; 
        alert(this.mensagemSucesso);        
      }  
      await this.carregarLivros();
      this.livroSelecionado = undefined;
    },
    async removerLivro(livro) {
      if (confirm(`Deseja remover ${livro.titulo}?`)) {
        const resposta = await dadosLivros.removerLivro(livro);
        console.log(resposta);
        this.livroSelecionado = undefined;
        this.mensagemSucesso = `${livro.titulo} Removido`;
      }
      await this.carregarLivros();
    },
    cancelarEdicao() {
      this.livroSelecionado = undefined;
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