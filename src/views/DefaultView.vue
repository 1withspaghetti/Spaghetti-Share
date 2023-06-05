<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

const username = ref<string|undefined>(undefined);

axios.get('/api/v1/auth/self').then(res => {
    if (router.currentRoute.value.query.auto == 'true') router.push('/dashboard');
    username.value = res.data.user.username;
});

</script>

<template>
    <div class="fixed p-5 top-0 right-0">
        <ThemeSwitch />
    </div>
    <div class="w-full flex flex-col justify-center items-center" style="height: 100vh;">
        <div class="flex justify-center items-center">
            <div class="text-center">
                <h1 class="text-3xl font-semibold">Spaghetti Share</h1>
                <h4 class="text-lg font-semibold text-slate-600 dark:text-slate-400">Image/Video Saving</h4>
            </div>
            <img class="inline-block ml-3 h-[6rem]" src="/imgs/duck_full.gif">
        </div>
        <div v-if="username" class="m-2 px-8 py-2 bg-slate-300 dark:bg-slate-700 rounded-lg shadow-lg text-center">
            <div class="">You are already logged in as <b v-text="username" class="not-italic"></b></div>
            <RouterLink to="/dashboard" class="cursor-pointer text-blue-400">Go to dashboard ➜</RouterLink>
        </div>
        <RouterView />
    </div>
</template>