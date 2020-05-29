<template>
  <div>
    <div class="card-header">{{livro.titulo}}</div>
    <form>
      <div class="form-group">
        <label for="id">Id</label>
        <input type="text" class="form-control" id="id" disabled :value="livro.livroID" />
      </div>
      <div class="form-group">
        <label for="titulo">Título</label>
        <input type="text" class="form-control" id="idTitulo" v-model="livro.titulo" />
      </div>
      <div class="form-group">
        <label for="dataPublicacao">Data da Publicação</label>
        <input
          type="date"
          class="form-control"
          id="dataPublicacao"
          v-model="livro.dataPublicacao"
        />
      </div>
      <div class="form-group">
        <label for="preco">Preço</label>
        <input type="number" step="0.01" 
          class="form-control" id="preco" v-model="livro.preco" />
      </div>

      <div class="form-group" v-if="livro.autores">
        <label for="autores">Autores</label>
        <select multiple class="form-control" 
          id="autores" v-model="livro.autores">
          <option
            v-for="autor in autores"
            :key="autor.autorID"
            :value="autor.autorID"
          >{{autor.nome}}</option>
        </select>
      </div>
      <div class="form-group" v-if="livro.editora">
        <label for="editora">Editora</label>
        <select class="form-control" 
          :name="livro.editora" 
          id="editora" 
          v-model="livro.editora.editoraID">
          <option
            v-for="editora in editoras"
            :key="editora.editoraID"
            :value="editora.editoraID"
          >{{editora.nome}}</option>
        </select>
      </div>
      <footer class="card-footer">
        <button class="btn btn-secondary botoes" @click="cancelarEdicao()">
          <i class="fas fa-undo"></i>
          <span> Cancelar</span>
        </button>
        <button class="btn btn-primary botoes" @click="atualizarLivro()">
          <i class="fas fa-save"></i>
          <span> Salvar</span>
        </button>
        <button class="btn btn-primary btn-danger botoes" @click="removerLivro()">
          <i class="fas fa-trash"></i>
          <span> Remover</span>
        </button>
      </footer>
    </form>
  </div>
</template>

<script>
import { dadosLivros } from "../shared/livroService";
import { dadosAutores } from "../shared/autorService";
import { dadosEditoras } from "../shared/editoraService";
// Cria um objeto autor para ser usado no momento de atualizar/salvar um livro
var Autor = function(autorID) {
  this.autorID = autorID;
};
export default {
  name: "EditarLivroForm",
  props: {
    id: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      livro: {},
      autores: [],
      editoras: [],
      mensagemSucesso: ''
    };
  },
  async created () {
    this.livro = await dadosLivros.getLivro(this.id);
    // transforma o array de autores em um array de IDs dos autores
    var autoresIDs = this.livro.autores.map(function (autor) {
        return autor.autorID;
    })
    this.livro.autores = autoresIDs; 
    this.autores = await dadosAutores.getAutores();
    this.editoras = await dadosEditoras.getEditoras();
  },
  methods: {
    async atualizarLivro() {
      if (this.livro) {
        // transforma o array de ids em um array de objetos, cada um com o autorID
        const autoresLivro = [];
        this.livro.autores.forEach(autor => {
          autoresLivro.push(new Autor(autor));
        });
        this.livro.autores = autoresLivro;
        await dadosLivros.atualizarLivro(this.livro);
        this.mensagemSucesso = `${this.livro.titulo} Atualizado`; 
        alert(this.mensagemSucesso);        
      }  
      this.$emit("terminei");
    },
    cancelarEdicao() {
      this.$emit("terminei")
    },
    async removerLivro() {
      if (confirm(`Deseja remover ${this.livro.titulo}?`)) {
        const resposta = await dadosLivros.removerLivro(this.livro);
        console.log(resposta);
        this.livro = undefined;
        this.mensagemSucesso = `${this.livro.titulo} Removido`;
      }
      this.$emit("terminei");
    },
  },
};
</script>
