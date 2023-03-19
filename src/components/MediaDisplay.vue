<script setup lang="ts">
import { fileTypes, type FileData } from '@/types';
import { ref } from 'vue';

const emit = defineEmits(['click']);

defineProps<{
    file: FileData,
    maxW?: string,
    maxH?: string,
}>();

var videoLoaded = ref(false);
var video = ref();
var videoSize = ref({width: 0, height: 0});
var videoThumb = ref();
</script>

<template>
    <img v-if="fileTypes[file.type].startsWith('image')" :src="'/media/'+file.id+'.'+file.type" loading="lazy" class="media" :style="{maxWidth: maxW, maxHeight: maxH}" @click="emit('click');">
        
    <div v-if="fileTypes[file.type].startsWith('video') && !videoLoaded" class="relative" 
        @click.stop="videoLoaded = true;">
        <img :src="'/media/'+file.id+'.'+file.type+'.jpg'" loading="lazy" class="media" :style="{maxWidth: maxW, maxHeight: maxH}" ref="videoThumb" @load="videoSize = {width: videoThumb.width, height: videoThumb.height}">
        <div class="absolute flex justify-center items-center top-0 left-0 bottom-0 right-0">
            <div class="p-2 bg-black bg-opacity-50 rounded-[50%] hover:bg-opacity-60 cursor-pointer">
                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M320 853V293l440 280-440 280Z"/></svg>
            </div>
        </div>
    </div>
    <div v-if="fileTypes[file.type].startsWith('video') && videoLoaded" @click.prevent="emit('click', video);" :style="{width: videoSize.width+'px', height: videoSize.height+'px'}">
        <video controls autoplay disablepictureinpicture :width="videoSize.width" :height="videoSize.height" class="media" :style="{maxWidth: maxW, maxHeight: maxH}" ref="video">
            <source :src="'/media/'+file.id+'.'+file.type" :type="fileTypes[file.type]">
        </video>
    </div>
</template>

<style scoped>
.media {
    @apply bg-slate-200 dark:bg-slate-700 shadow-md rounded-lg;
}
</style>