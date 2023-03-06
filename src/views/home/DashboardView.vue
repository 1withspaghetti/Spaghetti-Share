<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

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
            <div class="overflow-hidden w-full max-w-4xl" :class="filtersOpen ? 'h-auto' : 'h-0'">
                <div class="flex flex-wrap justify-center gap-2 px-3 py-2 items-center rounded shadow font-semibold bg-slate-100 dark:bg-slate-700">
                    <div>
                        <label for="file_type">File Type: </label>
                        <select names="file_type" id="file_type" v-model="searchFilters.fileType" class="input-text px-1 pb-1 ml-2">
                            <option value="">All</option>
                            <option value="png">.png</option>
                            <option value="jpg">.jpg</option>
                            <option value="webp">.webp</option>
                            <option value="gif">.gif</option>
                            <option value="mp4">.mp4</option>
                            <option value="mov">.mov</option>
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
        <RouterView />
    </div>
</template>