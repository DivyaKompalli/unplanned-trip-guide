import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../components/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../components/SignUp.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../components/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/planned",
    name: "Planned",
    component: () => import("../components/Planned.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/trip-generator",
    name: "TripGenerator",
    component: () => import("../components/TripGenerator.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else if ((to.path === "/" || to.path === "/signup") && currentUser) {
    next("/home");
  } else {
    next();
  }
});

export default router;
