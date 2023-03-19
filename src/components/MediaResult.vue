<script setup lang="ts">
import { fileTypes, type FileData } from '@/types';
import { ref } from 'vue';
import MediaDisplay from '@/components/MediaDisplay.vue'
import { downloadImage, copyLink, copyImage } from '@/copy'

const props = defineProps<{
    file: FileData,
    maxW?: string,
    maxH?: string,
}>();

defineEmits<{
  (e: 'notify', success: boolean, msg: string): void
}>()

var fullscreen = ref(false);

</script>

<template>
    <div class="relative overflow-hidden" :class="{'group': !fullscreen}">
        
        <MediaDisplay :file="file" :maxW="maxW" :maxH="maxH" @click="(e)=>{fullscreen = true;if(e) e.pause();}"/>

        <div class="absolute top-0 right-0 flex transition-transform -translate-y-full group-hover:translate-y-0">
            <div class="button bg-green-500 hover:bg-green-600" @click="downloadImage(file)">
                <svg class="w-7 h-7" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/></svg>
            </div>
            <div v-if="fileTypes[file.type].startsWith('image')" class="button bg-gray-400 hover:bg-gray-500" @click="copyImage(file, (success)=>{$emit('notify', success, success ? 'Image copied to clipboard' : 'Could not copy image to clipboard')});">
                <svg class="w-7 h-7 p-1" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z"/></svg>
            </div>
            <div class="button bg-gray-400 hover:bg-gray-500" @click="copyLink(file, (success)=>{$emit('notify', success, success ? 'Link copied to clipboard' : 'Could not copy link to clipboard')});">
                <svg class="w-7 h-7" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
            </div>
        </div>

        <div v-if="fullscreen" class="fixed top-0 right-0 bottom-0 left-0 z-40 flex flex-col justify-center items-center bg-black bg-opacity-70 overflow-y-auto" @click.self="fullscreen = false">
            <MediaDisplay :file="file" maxW="100vw" maxH="calc(100vh - 7.5rem)"/>
            <div class="flex mt-2">
                <div class="button px-2 bg-green-500 hover:bg-green-600" @click="downloadImage(file)">
                    <svg class="w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/></svg>
                    <span>Download</span>
                </div>
                <div v-if="fileTypes[file.type].startsWith('image')" class="m-1 flex items-center rounded shadow transition-colors text-white font-semibold cursor-pointer px-2 bg-gray-400 hover:bg-gray-500" @click="copyImage(file, (success)=>{$emit('notify', success, success ? 'image copied to clipboard' : 'Could not copy image to clipboard')});">
                    <svg class="w-8 h-8 p-1" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z"/></svg>
                    <span>Copy Image</span>
                </div>
                <div class="button px-2 bg-gray-400 hover:bg-gray-500" @click="copyLink(file, (success)=>{$emit('notify', success, success ? 'Link copied to clipboard' : 'Could not copy link')});">
                    <svg class="w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
                    <span>Copy Link</span>
                </div>
            </div>
            <div class="flex mt-2">
                <router-link class="button px-2 bg-gray-400 hover:bg-gray-500" :to="'/dashboard/edit/'+file.id">
                    <svg class="w-6 h-6 my-1" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 96 960 960"><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
                    <span>Rename / Edit</span>
                </router-link>
            </div>
        </div>
    </div>
    <router-link class="font-semibold cursor-pointer hover:text-slate-800 hover:dark:text-slate-300 text-ellipsis whitespace-nowrap overflow-hidden" :style="{maxWidth: maxW}" :to="'/dashboard/edit/'+file.id">{{ file.name }}</router-link>
    <div class="text-sm text-slate-700 dark:text-slate-400 -mt-1">{{ file.type.toUpperCase() }} - {{ new Date(file.time).toLocaleDateString() }}</div>
</template>

<style scoped>
.button {
    @apply m-1 flex items-center rounded shadow transition-colors text-white font-semibold cursor-pointer;
}
</style>