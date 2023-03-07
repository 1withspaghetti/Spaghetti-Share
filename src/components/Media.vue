<script setup lang="ts">
import { fileTypes, type FileData } from '@/types';
import { ref } from 'vue';

defineProps<{
    file: FileData,
    maxW?: string,
    maxH?: string,
}>()

var videoLoaded = ref(false);

</script>

<template>
    <img v-if="fileTypes[file.type].startsWith('image')" :src="file.src" loading="lazy" class="media" :style="{maxWidth: maxW, maxHeight: maxH}">
    
    <div v-if="(fileTypes[file.type].startsWith('video') && !videoLoaded)" class="relative" @click="videoLoaded = true">
        <img :src="/*file.src.replace(/\.[a-zA-Z0-9]+$/, '.jpg')*/'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'" loading="lazy" class="media" :style="{maxWidth: maxW, maxHeight: maxH}">
        <div class="absolute flex justify-center items-center top-0 left-0 bottom-0 right-0">
            <div class="p-2 bg-black bg-opacity-50 rounded-[50%] hover:bg-opacity-60 cursor-pointer">
                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M320 853V293l440 280-440 280Z"/></svg>
            </div>
        </div>
    </div>
    <video v-if="(fileTypes[file.type].startsWith('video') && videoLoaded)" controls class="media" :style="{maxWidth: maxW, maxHeight: maxH}" autoplay>
        <source :src="file.src" :type="fileTypes[file.type]">
    </video>
</template>

<style scoped>
.media {
    @apply bg-slate-200 dark:bg-slate-700 shadow-md rounded-lg;
}
</style>