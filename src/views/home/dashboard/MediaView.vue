<script setup lang="ts">
import { ref } from 'vue';
import { fileTypes } from '@/types';

var files = ref([
    {
        id: 1,
        name: "Mountain Stars",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        type: "png",
        date: "3/6/2023"
    },
    {
        id: 2,
        name: "City Skyline",
        src: "https://images.unsplash.com/photo-1677966039656-a681a0fe59b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        type: "png",
        date: "3/6/2023"
    },
    {
        id: 3,
        name: "House on a hill",
        src: "https://images.unsplash.com/photo-1677932394762-64ff2b2250be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        type: "png",
        date: "3/6/2023"
    },
    {
        id: 4,
        name: "Waterfall",
        src: "https://images.unsplash.com/photo-1678061642713-a678534577e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        type: "png",
        date: "3/6/2023"
    },
    {
        id: 5,
        name: "Griffin Moment",
        src: "https://cdn.discordapp.com/attachments/1041505295169507398/1082365162641694730/2023-03-06_00-19-21.mp4",
        type: "mp4",
        date: "3/5/2023"
    }
]);
</script>

<template>
    <div class="w-full flex justify-center">
        <div class="p-8 max-w-7xl flex flex-wrap gap-5 justify-center">
            <div v-for="(fileData, index) in files" class="text-center" :data-id="fileData.id">
                <div class="relative">
                    <img v-if="fileTypes[fileData.type].startsWith('image')" :src="fileData.src" loading="lazy" class="max-w-[16rem] max-h-[12rem] bg-slate-200 dark:bg-slate-700 shadow-md rounded-lg">
                    <video v-if="fileTypes[fileData.type].startsWith('video')" controls class="max-w-[16rem] max-h-[12rem] bg-slate-200 dark:bg-slate-700 shadow-md rounded-lg">
                        <source :src="fileData.src" :type="fileTypes[fileData.type]">
                    </video>
                </div>
                <div class="font-semibold">{{ fileData.name }}</div>
                <div class="text-sm text-slate-800 dark:text-slate-400 -mt-1">{{ fileData.type }} - {{ fileData.date }}</div>
            </div>
        </div>
    </div>
</template>