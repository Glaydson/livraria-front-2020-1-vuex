import Vue from 'vue'
import VueRouter from 'vue-router'
import ListaLivrosPai from '@/views/lista-livros-pai'
import EditarLivroForm from '@/views/editar-livro-form'
import LivroDetalhe from '@/views/livro-detalhe'
import PaginaNaoEncontrada from '@/views/pagina-nao-encontrada'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/listaLivros',
  },
  {
    path: '/listaLivros',
    name: 'listaLivros',
    component: ListaLivrosPai
  },
  {
    path: '/detalhaLivro/:id',
    name: 'detalhaLivro',
    component: LivroDetalhe,
    props: r => ({ id: parseInt(r.params.id)}),
  },
  {
    path: '/editaLivro/:id',
    name: 'editaLivro',
    component: EditarLivroForm,
    props: r => ({ id: parseInt(r.params.id)}),
  },
  {
    path: '/novoLivro',
    name: 'novoLivro',
    redirect: 'editaLivro/0',
    component: EditarLivroForm,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    component: PaginaNaoEncontrada,
  }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
