<script setup lang="ts">
import { fileTypes, type FileData } from '@/types';
import { ref } from 'vue';

const emit = defineEmits(['selected']);

const props = defineProps<{
    file: FileData,
    mobileThumbOnly?: boolean,
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

    if (videoEl.value.ended) videoEl.value.currentTime = 0;

    if (videoEl.value.paused) videoEl.value.play();
    else videoEl.value.pause();

    paused.value = videoEl.value.paused;
}

</script>

<template>
    <img v-if="fileTypes[file.type].startsWith('image')" :src="file.src" loading="lazy" class="media" :style="{maxWidth: maxW, maxHeight: maxH}" @click="emit('selected')">
    
    <div v-if="(fileTypes[file.type].startsWith('video') && !videoLoaded)" class="relative" 
        @click="if (!mobileThumbOnly && !isSmallScreen()) videoLoaded = true; if (isSmallScreen()) $emit('selected');">
        <img :src="/*file.src.replace(/\.[a-zA-Z0-9]+$/, '.jpg')*/'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'" loading="lazy" class="media" :style="{maxWidth: maxW, maxHeight: maxH}">
        <div class="absolute flex justify-center items-center top-0 left-0 bottom-0 right-0">
            <div class="p-2 bg-black bg-opacity-50 rounded-[50%] hover:bg-opacity-60 cursor-pointer">
                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M320 853V293l440 280-440 280Z"/></svg>
            </div>
        </div>
    </div>
    <div v-if="(fileTypes[file.type].startsWith('video') && videoLoaded)" class="relative cursor-pointer group" @click="toggleVideo"  @dblclick="emit('selected')">
        <video autoplay disablepictureinpicture ref="videoEl" class="media" :style="{maxWidth: maxW, maxHeight: maxH}" @ended="paused = true">
            <source :src="file.src" :type="fileTypes[file.type]">
        </video>
        <div class="absolute opacity-0 group-hover:opacity-100 transition-opacity left-0 bottom-0" :style="paused ? 'opacity: 1;' : ''">
            <div class="m-1 bg-black bg-opacity-50 rounded-md hover:bg-opacity-60 cursor-pointer">
                <svg v-if="videoEl?.ended" class="p-1 w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M24 45.5q-4 0-7.525-1.5-3.525-1.5-6.15-4.125Q7.7 37.25 6.2 33.75T4.7 26.2h4.7q0 6.1 4.25 10.325T24 40.75q6.05 0 10.3-4.25 4.25-4.25 4.25-10.3 0-6.1-4.125-10.325T24.2 11.65h-1.15L26.4 15l-2.5 2.5-8.3-8.35 8.3-8.3 2.5 2.5-3.6 3.55h1.15q4.05 0 7.575 1.5 3.525 1.5 6.15 4.125Q40.3 15.15 41.8 18.65t1.5 7.55q0 4-1.5 7.525-1.5 3.525-4.125 6.15Q35.05 42.5 31.55 44T24 45.5Z"/></svg>
                <svg v-if="!paused && !videoEl?.ended" class="w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M28.25 38V10H36v28ZM12 38V10h7.75v28Z"/></svg>
                <svg v-if="paused && !videoEl?.ended" class="w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 96 960 960"><path d="M320 853V293l440 280-440 280Z"/></svg>
            </div>
        </div>
        <!--<div class="absolute hidden group-hover:block top-0 right-0" :class="{'flex': paused}">
            <div class="m-1 bg-black bg-opacity-50 rounded-md hover:bg-opacity-60 cursor-pointer" @click.stop="emit('selected')">
                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 48 48"><path d="M10 38v-9.65h3V35h6.65v3Zm0-18.35V10h9.65v3H13v6.65ZM28.35 38v-3H35v-6.65h3V38ZM35 19.65V13h-6.65v-3H38v9.65Z"/></svg>
            </div>
        </div>-->
    </div>
</template>

<style scoped>
.media {
    @apply bg-slate-200 dark:bg-slate-700 shadow-md rounded-lg;
}
</style>