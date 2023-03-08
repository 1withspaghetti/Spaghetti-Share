<script setup lang="ts">
import { fileTypes, type FileData } from '@/types';
import { ref } from 'vue';

const emit = defineEmits(['selected']);

const props = defineProps<{
    file: FileData,
    thumbOnly?: boolean,
    autoplay?: boolean,
    maxW?: string,
    maxH?: string,
}>()

// Video stuff

var videoEl = ref<HTMLVideoElement|null>(null);
var videoLoaded = ref(!!props.autoplay);
var paused = ref(false);

function isSmallScreen() {
    return window.innerWidth < 768;
}

function toggleVideo() {
    if (videoEl.value==null) return;
    paused.value = !videoEl.value.paused;
    if (videoEl.value.paused) videoEl.value.play();
    else videoEl.value.pause();
}

</script>

<template>
    <img v-if="fileTypes[file.type].startsWith('image')" :src="file.src" loading="lazy" class="media" :style="{maxWidth: maxW, maxHeight: maxH}" @click="emit('selected')">
    
    <div v-if="(fileTypes[file.type].startsWith('video') && !videoLoaded)" class="relative" 
        @click="if (!thumbOnly) videoLoaded = true; if (isSmallScreen()) $emit('selected');">
        <img :src="/*file.src.replace(/\.[a-zA-Z0-9]+$/, '.jpg')*/'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'" loading="lazy" class="media" :style="{maxWidth: maxW, maxHeight: maxH}">
        <div class="absolute flex justify-center items-center top-0 left-0 bottom-0 right-0">
            <div class="p-2 bg-black bg-opacity-50 rounded-[50%] hover:bg-opacity-60 cursor-pointer">
                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M320 853V293l440 280-440 280Z"/></svg>
            </div>
        </div>
    </div>
    <div v-if="(fileTypes[file.type].startsWith('video') && videoLoaded)" class="relative cursor-pointer group" @click="toggleVideo"  @dblclick="emit('selected')">
        <video autoplay ref="videoEl" class="media" :style="{maxWidth: maxW, maxHeight: maxH}">
            <source :src="file.src" :type="fileTypes[file.type]">
        </video>
        <div class="absolute hidden group-hover:flex justify-center items-center top-0 left-0 bottom-0 right-0">
            <div class="p-2 bg-black bg-opacity-50 rounded-[50%] hover:bg-opacity-60 cursor-pointer">
                <svg v-if="paused" class="w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M320 853V293l440 280-440 280Z"/></svg>
                <svg v-if="!paused" class="p-2 w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 28"><path d="m16.25,28V0h7.75v28h-7.75Zm-16.25,0V0h7.75v28H0Z"/></svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
.media {
    @apply bg-slate-200 dark:bg-slate-700 shadow-md rounded-lg;
}
</style>