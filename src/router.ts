import { createRouter, createWebHistory, type RouteLocation } from 'vue-router'

import DashboardView from './views/home/DashboardView.vue';
import HomeView from '@/views/HomeView.vue';
import UploadView from './views/home/UploadView.vue';
import EditView from './views/home/EditView.vue';

import DefaultView from '@/views/DefaultView.vue';
import LoginView from '@/views/default/LoginView.vue';
import RegisterView from './views/default/RegisterView.vue';
import axios from 'axios';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: DefaultView,
            children: [
                {
                    path: '',
                    redirect: (to: RouteLocation): string => {
                        return isLoggedIn ? '/dashboard' : '/login?auto=true';
                    },
                },
                {
                    path: 'login',
                    component: LoginView
                },
                {
                    path: 'register',
                    component: RegisterView
                }
            ]
        },
        {
            path: '/dashboard',
            component: HomeView,
            beforeEnter(to, from, next) {
                if (!isLoggedIn) next('/login?auto=true');
                else next();
            },
            children: [
                {
                    path: '',
                    component: DashboardView,
                    name: 'dashboard'
                },
                {
                    path: 'upload',
                    component: UploadView
                },
                {
                    path: 'edit/:id',
                    component: EditView
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            meta: { redirect: true },
            redirect: (to: RouteLocation): string => {
                return isLoggedIn ? '/dashboard' : '/login?auto=true';
            }
        }
    ]
});
export default router

var hasLoaded = false;
var isLoggedIn = false;

setInterval(()=>{
    if (document.cookie.includes("session-token"))
        axios.get('/api/v1/auth/refresh').then(()=>{
            console.log("Session token refreshed")
        });
}, 300000) // 5 minutes

router.beforeEach((to, from, next)=>{
    if (hasLoaded) next();
    else {
        axios.get('/api/v1/auth/refresh').then(()=>{
            isLoggedIn = true;
            hasLoaded = true;
            if (to.meta.redirect) next("/dashboard");
            else next();
        }).catch((err)=>{
            isLoggedIn = false;
            hasLoaded = true;
            if (to.meta.redirect) next("/login");
            else next();
        })
    }
})
  
export function setLoggedIn(val: boolean) {
    isLoggedIn = !!val;
}