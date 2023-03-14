<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue';
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
        <RouterView />
    </div>
</template>