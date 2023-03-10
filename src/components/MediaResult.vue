<script setup lang="ts">
import { fileTypes, type FileData } from '@/types';
import { ref } from 'vue';
import MediaDisplay from '@/components/MediaDisplay.vue'

const props = defineProps<{
    file: FileData,
    maxW?: string,
    maxH?: string,
}>();

var fullscreen = ref(false);

</script>

<template>
    <div class="relative overflow-hidden" :class="{'group': !fullscreen}">
        
        <MediaDisplay :file="file" :maxW="maxW" :maxH="maxH" @click="fullscreen = true;"/>

        <div class="absolute top-0 right-0 flex transition-transform -translate-y-full group-hover:translate-y-0">
            <div class="button bg-green-500 hover:bg-green-600">
                <svg class="w-7 h-7" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/></svg>
            </div>
            <div class="button bg-gray-400 hover:bg-gray-500">
                <svg class="w-7 h-7" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
            </div>
        </div>

        <div v-if="fullscreen" class="fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col justify-center items-center bg-black bg-opacity-70" @click="fullscreen = false">
            <img v-if="fileTypes[file.type].startsWith('image')" :src="file.src" class="w-auto h-auto" style="max-width: 100vw; max-height: 100vh;">
            <div class="flex mt-2">
                <div class="button px-2 bg-green-500 hover:bg-green-600">
                    <svg class="w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/></svg>
                    <span>Download</span>
                </div>
                <div class="button px-2 bg-gray-400 hover:bg-gray-500">
                    <svg class="w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
                    <span>Copy Link</span>
                </div>
            </div>
        </div>
    </div>
    <div class="font-semibold cursor-pointer hover:text-slate-800 hover:dark:text-slate-300" @click="fullscreen = true">{{ file.name }}</div>
    <div class="text-sm text-slate-700 dark:text-slate-400 -mt-1">{{ file.type.toUpperCase() }} - {{ file.date }}</div>
</template>

<style scoped>
.button {
    @apply m-1 flex items-center rounded shadow transition-colors text-white font-semibold cursor-pointer;
}
</style>