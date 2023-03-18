<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import router, { setLoggedIn } from '@/router';
import axios, { AxiosError } from 'axios';
import { RouterView } from 'vue-router'

function logout() {
    axios.get('/api/v1/auth/logout').then((res)=>{
        setLoggedIn(false);
        router.push('/login');
    }).catch((err: AxiosError)=>{
        if (err.response?.status == 401) router.push('/login');
    })
}
</script>

<template>
    <div class="w-full h-[52px] flex sticky top-0 bg-slate-100 dark:bg-slate-900 shadow-lg">
        <div class="flex w-full ml-3 sm:justify-center items-center">
            <h1 class="text-2xl font-semibold">Spaghetti Share</h1>
            <img class="inline-block h-9 ml-2" src="/imgs/duck.png">
        </div>
        <div class="flex w-max items-center whitespace-nowrap" style="justify-self: flex-end;">
            <ThemeSwitch />
            <div class="block font-semibold cursor-pointer text-red-500 px-3 py-2" @click="logout">Log out</div>
        </div>
    </div>
    <div class="w-full relative">
        <router-view v-slot="{ Component }">
            <keep-alive include="DashboardView">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>