import { createRouter, createWebHistory, type RouteLocation } from 'vue-router'

import DashboardView from './views/home/DashboardView.vue';
import HomeView from '@/views/HomeView.vue';
import UploadView from './views/home/UploadView.vue';
import EditView from './views/home/EditView.vue';

import DefaultView from '@/views/DefaultView.vue';
import LoginView from '@/views/default/LoginView.vue';
import RegisterView from './views/default/RegisterView.vue';

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
                        // TODO check if authenticated
                        return '/dashboard';
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
        }
    ]
})
  
export default router