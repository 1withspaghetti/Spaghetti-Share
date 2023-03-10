<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { fileTypes, type FileData } from '@/types';
import MediaResult from '@/components/MediaResult.vue';

var filtersOpen = ref(false);

var search = ref("")
var searchFilters = ref({
    fileType: "",
    fileSize: {
        min: undefined,
        max: undefined
    },
    dateUploaded: {
        min: "",
        max: ""
    }
});

var files = ref<FileData[]>([
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
    <div class="w-full h-full py-3 overflow-y-auto">
        <div class="w-full flex flex-col items-center px-3 sm:px-5">
            <div class="flex w-full max-w-4xl my-2">
                <router-link to="/dashboard/upload" class="hidden sm:block px-4 py-1 text-lg mx-2 mr-3 font-semibold text-center transition-colors text-white bg-green-500 hover:bg-green-400 dark:hover:bg-green-600 rounded cursor-pointer">
                    Upload
                </router-link>
                <input type="text" placeholder="Search" v-model="search" class="w-full px-3 py-1 text-xl input-text shadow bg-slate-100 dark:bg-slate-700">
                <div class="flex items-center mx-2 text-slate-800 dark:text-slate-400 text-xl font-semibold cursor-pointer" @click="filtersOpen = !filtersOpen">
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 96 960 960" width="28"><path d="M427 936V711h60v83h353v60H487v82h-60Zm-307-82v-60h247v60H120Zm187-166v-82H120v-60h187v-84h60v226h-60Zm120-82v-60h413v60H427Zm166-165V216h60v82h187v60H653v83h-60Zm-473-83v-60h413v60H120Z"/></svg>
                    <span class="ml-1">Filters</span>
                </div>
            </div>
            <div class="overflow-hidden w-full max-w-4xl transition-[height]" :class="filtersOpen ? 'h-auto lg:h-12' : 'h-0'">
                <div class="flex flex-wrap justify-center gap-2 px-3 py-2 items-center rounded shadow font-semibold bg-slate-100 dark:bg-slate-700">
                    <div>
                        <label for="file_type">File Type: </label>
                        <select names="file_type" id="file_type" v-model="searchFilters.fileType" class="input-text px-1 pb-1 ml-2">
                            <option value="">All</option>
                            <option v-for="ext in Object.keys(fileTypes)" :value="ext">.{{ ext }}</option>
                        </select>
                    </div>
                    <div>
                        <label for="file_size_min">File Size (MB):</label>
                        <input type="text" placeholder="Min" min="0" max="1024" name="file_size_min" id="file_size_min" v-model="searchFilters.fileSize.min" class="input-text w-12 px-1 ml-2">
                        <input type="text" placeholder="Max" min="0" max="1024" name="file_size_max" id="file_size_max" v-model="searchFilters.fileSize.max" class="input-text w-12 px-1 ml-2">
                    </div>
                    <div>
                        <label for="file_uploaded_min">From:</label>
                        <input type="date" name="file_uploaded_min" id="file_uploaded_min" v-model="searchFilters.dateUploaded.min" class="input-text w-32 px-1 ml-2">
                    </div>
                    <div>
                        <label for="file_uploaded_min">To:</label>
                        <input type="date" name="file_uploaded_max" id="file_uploaded_max" v-model="searchFilters.dateUploaded.max" class="input-text w-32 px-1 ml-2">
                    </div>
                </div>
            </div>
            <router-link to="/dashboard/upload" class="sm:hidden px-8 py-1 text-lg mx-2 mt-2 font-semibold text-center transition-colors text-white bg-green-500 hover:bg-green-400 dark:hover:bg-green-600 rounded cursor-pointer">
                Upload
            </router-link>
        </div>
        <div class="w-full flex justify-center">
            <div class="p-8 max-w-7xl flex flex-wrap gap-5 justify-center">
                <div v-for="(fileData, index) in files" :key="fileData.id" class="text-center" :data-id="fileData.id">
                    <MediaResult :file="fileData" max-w="16rem" max-h="12rem" />
                </div>
            </div>
        </div>
    </div>
</template>