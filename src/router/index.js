import { createRouter, createWebHistory } from 'vue-router'
import paginaincial from '@/components/PaginaInicial.vue'
import cadastroVinhedos from '@/components/cadastroVinhedos.vue'
import cadastroUsuarios from '@/components/cadastroUsuarios.vue'
import dashboard from '@/components/dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: paginaincial},
    {path: '/cadastroVinhedos', component: cadastroVinhedos},
    {path: '/cadastroUsuarios', component: cadastroUsuarios},
    {path: '/dashboard', component: dashboard},
  ]
})

export default router
