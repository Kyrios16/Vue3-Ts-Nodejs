import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        alias: "/tutorials",
        name: "tutorials-list",
        component: () => import("./components/TutorialsList.vue"),
    },
    {
        path: "/tutorials/:id",
        name: "tutorial-detail",
        component: () => import("./components/TutorialDetails.vue"),
    },
    {
        path: "/tutorials/add",
        name: "tutorial-add",
        component: () => import("./components/AddTutorial.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;