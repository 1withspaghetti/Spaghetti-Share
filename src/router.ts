import { createRouter, createWebHistory, type RouteLocation } from 'vue-router'
import DashboardView from './views/home/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import UploadView from './views/home/UploadView.vue';
import EditView from './views/home/EditView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: (to: RouteLocation): string => {
                // TODO check if authenticated
                return '/dashboard';
            }
        },
        {
            path: '/dashboard',
            component: HomeView,
            children: [
                {
                    path: '',
                    component: DashboardView
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
            path: '/login',
            component: LoginView
        }
    ]
})
  
export default router