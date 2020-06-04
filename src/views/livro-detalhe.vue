<template>
  <div>
    <div class="card-header">{{livro.titulo}}</div>
    <form v-on:submit.prevent>
      <div class="form-group">
        <label for="id">Id: {{livro.livroID}}</label>
      </div>
      <div class="form-group">
        <label for="titulo">Título: {{livro.titulo}}</label>
      </div>
      <div class="form-group">
        <label for="dataPublicacao">Data da Publicação : {{livro.dataPublicacao | formatDate}}</label>
      </div>
      <div class="form-group">
        <label for="preco">Preço : {{livro.preco}}</label>
      </div>
      <div class="form-group">
        <label for="autores">Autor(es):</label>
        <ul class="list-group list-group-flush">
          <li
            v-for="autor in livro.autores"
            :key="autor.autorID"
            class="list-group-item"
          >
              <span>{{ autor.nome }}</span>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label for="editora">Editora: {{livro.editora.nome}}</label>
      </div>
      <footer class="card-footer">
        <button class="btn btn-secondary botoes" @click="cancelarEdicao()">
          <i class="fas fa-undo"></i>
          <span>Cancelar</span>
        </button>
        <button class="btn btn-primary botoes" @click="editarLivro()">
          <i class="fas fa-save"></i>
          <span>Editar</span>
        </button>
         <button class="btn btn-secondary botoes" @click="removerLivro()">
          <i class="fas fa-trash"></i>
          <span>Remover</span>
        </button>
      </footer>
    </form>
  </div>
</template>

<script>
import { dadosLivros } from "../shared/livroService";
export default {
  name: "LivroDetalhe",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      livro: {},
      tituloPagina: '',
      mensagemSucesso: '',
      mensagemErro: '',
    };
  },
  async created () {
      this.livro.editora = ''
      await this.obterLivro(this.id);
      this.tituloPagina = this.livro.titulo;
  },
  methods: {
    async obterLivro(id) {
      try {
        this.livro = await dadosLivros.getLivro(id);
        } catch (error) {
          this.mensagemErro = error.message;
          alert(this.mensagemErro);
          this.$router.push('/listaLivros');
      }
    },
    editarLivro() {
      this.$router.push({ name: 'editaLivro', params: { id: this.livro.livroID}});
    },
    cancelarEdicao() {
      this.$router.push({path: '/listaLivros'})
    },
    async removerLivro() {
      if (confirm(`Deseja remover ${this.livro.titulo}?`)) {
        const resposta = await dadosLivros.removerLivro(this.livro);
        console.log(resposta);
        this.mensagemSucesso = `${this.livro.titulo} Removido`;
      }
      this.$router.push({path: '/listaLivros'})
      
    },
  },
};
</script>
<style scoped>
.botoes {
  width: 120px;
  margin-right: 20px;
}
</style>
