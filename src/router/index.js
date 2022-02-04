import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Conversations",
    component: () => import("../views/Conversations.vue"),
  },
  {
    path: "/conversation/:id",
    name: "Conversation",
    component: () => import("../views/ConversationPreview.vue"),
  },
  {
    path: "/members",
    name: "Members",
    component: () => import("../views/Members.vue"),
  }, {
    path: "/members/:id",
    name: "Members",
    component: () => import("../views/MemberPreview.vue"),
  },
  {
    path: "/signup",
    name: "Create Account",
    component: () => import("../views/CreateAccount.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
]

const router = new VueRouter({
  routes
})

//Control routes in case no connected user
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Create Account' && !store.state.token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router
