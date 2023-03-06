<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="w-full h-[52px] flex sticky top-0 bg-slate-100 dark:bg-slate-900 shadow-lg">
        <div class="flex w-full ml-3 sm:justify-center items-center">
            <h1 class="text-2xl font-semibold">Spaghetti Share</h1>
            <img class="inline-block h-9 ml-2" src="/imgs/duck.png">
        </div>
        <div class="flex w-max items-center whitespace-nowrap" style="justify-self: flex-end;">
            <ThemeSwitch />
            <RouterLink class="block font-semibold text-red-500 px-3 py-2" to="/login">Log out</RouterLink>
        </div>
    </div>
    <div class="w-full h-[calc(100vh-52px)] overflow-hidden relative">
        <RouterView />
    </div>
</template>