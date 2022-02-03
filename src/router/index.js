import Vue from 'vue'
import VueRouter from 'vue-router'

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

export default router
