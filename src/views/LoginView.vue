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
        <form @submit.prevent="login" class="py-6 px-8 m-4 bg-slate-300 dark:bg-slate-700 rounded-lg shadow-lg text-center">
            <h2 class="text-xl font-bold">Please login to continue</h2>
            <span class="text-slate-600 dark:text-slate-400">If you do not have an account, one will be created for you</span>
            <div class="flex flex-col items-center gap-2 mt-3">
                <input type="text" placeholder="Username" autocomplete="username" autofocus v-model="username" class="max-w-[192px] font-semibold pt-1 px-2 bg-white dark:bg-slate-600 dark:border-slate-800 dark: rounded shadow focus:outline-none active:outline-none border-b-[3px] focus:border-blue-500 transition-colors">
                <input type="password" placeholder="Password" autocomplete="current-password" v-model="password" class="max-w-[192px] font-semibold pt-1 px-2 bg-white dark:bg-slate-600 dark:border-slate-800 rounded shadow focus:outline-none active:outline-none border-b-[3px] focus:border-blue-500 transition-colors">
                <button type="submit" class="px-2 py-1 rounded shadow bg-blue-500 text-white font-semibold">Continue</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import router from '@/router';
import { ref } from 'vue'

var username = ref("");
var password = ref("");

function login(e: Event) {
    console.log("Authenticating...");

    // TODO: Log user in

    router.push("/");
}

</script>