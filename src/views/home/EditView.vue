<script setup lang="ts">
import MediaDisplay from '@/components/MediaDisplay.vue';
import Notification from '@/components/Notification.vue';
import { type FileData, fileTypes } from '@/types';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute, onBeforeRouteUpdate, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import { copyImage, copyLink, downloadImage } from '@/copy';

onMounted(()=>{
    var route = useRoute();
    loadData(route.params.id, ()=>{});
});
onBeforeRouteUpdate(async (to, from, next)=>{
    loadData(to.params.id, next);
});

var file = ref<FileData|undefined>();
var tags = ref<string[]>([]);

var error = ref("");

function loadData(id: string|string[], next: ()=>any) {
    axios.get("/api/v1/media/data?id="+id).then((res)=>{
        file.value = res.data.media;
        tags.value = (res.data.media.tags as string).split(' ').filter(tag=>!!tag);
        error.value = "";
        next();
    }).catch((err)=>{
        file.value = undefined;
        tags.value = [];
        error.value = err.response?.data.reason || (err.response?.status + " " + err.response?.statusText);
        next();
    });
}

let debounceTimer: number|undefined = undefined;
function saveData() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(()=>{
        axios.post('/api/v1/media/edit', {id: file.value?.id, name: file.value?.name, tags: tags.value}).then((res)=>{
            console.log("Data updated");
            error.value = "";
        }).catch((err)=>{
            error.value = err.response?.data.reason || (err.response?.status + " " + err.response?.statusText);
        })
    }, 500)
}

var tagInput = ref("");
function addTag() {
    var val = tagInput.value.toLowerCase().replace(/[^a-z\-]+/g, "");
    if (val && !tags.value.includes(val)) {
        tags.value.push(val);
        tags.value.sort();
        saveData();
    }
    tagInput.value = "";
}
function removeTag(tag: string) {
    if (tags.value.includes(tag)) tags.value.splice(tags.value.indexOf(tag) ,1);
    saveData();
}


function doDownloadImage() {
    if (!file.value) return;
    downloadImage(file.value);
}
function doCopyLink() {
    if (!file.value) return;
    copyLink(file.value, (success)=>{
        notification.value = {success, msg: success ? 'Link copied to clipboard' : 'Could not copy link to clipboard', time: Date.now()}
    });
}
function doCopyImage() {
    if (!file.value) return;
    copyImage(file.value, (success)=>{
        notification.value = {success, msg: success ? 'Image copied to clipboard' : 'Could not copy image to clipboard', time: Date.now()}
    });
}

var notification = ref({success: false, msg: "", time: 0});

</script>

<template>
    <div class="w-full flex flex-col items-center px-3 py-5 gap-8">
        <div class="w-full max-w-2xl">
            <router-link to="/dashboard" class="px-3 py-1 text-lg font-semibold text-center bg-white dark:bg-slate-600 rounded shadow cursor-pointer">
                Back to Dashboard
            </router-link>
        </div>
        <div class="w-full flex flex-col items-center max-w-2xl p-5 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg">
            <div v-if="file">
                <input type="text" id="file-name" name="file-name" placeholder="File Name" title="File Name - Click to edit" autocomplete="off" v-model="file.name" @input="saveData"
                    class="w-full min-w-[256px] mb-1 px-2 pb-1 text-2xl font-semibold bg-transparent transition-colors duration-100 rounded focus:bg-slate-200 hover:bg-slate-200 focus:dark:bg-slate-600 hover:dark:bg-slate-600 focus:shadow focus:outline-none active:outline-none">
                
                <MediaDisplay :file="file" max-w="32rem" max-h="32rem" />
                                
                <div class="my-1 font-semibold text-slate-800 dark:text-slate-400">ID: {{ file.id }} - Type: {{ file.type.toUpperCase() }}</div>
            </div>
            <div v-if="file" class="flex flex-col items-center">
                <div class="flex flex-wrap gap-2">
                    <div v-for="tag in tags" :key="tag" title="Click to delete" @click="removeTag(tag)"
                        class="px-2 rounded shadow bg-slate-300 dark:bg-slate-600 hover:text-red-700 hover:dark:text-red-400 transition-colors duration-100 cursor-pointer">{{ tag }}</div>
                </div>
                <form class="flex my-3 gap-2" @submit.prevent="addTag">
                    <input type="text" class="w-44 px-2 input-text" placeholder="Add Tag" v-model="tagInput" maxlength="25">
                    <input type="submit" value="+" class="font-bold bg-white dark:bg-slate-600 px-2 rounded shadow cursor-pointer">
                </form>
            </div>
            <div v-if="file" class="flex mt-2">
                <div class="m-1 flex items-center rounded shadow transition-colors text-white font-semibold cursor-pointer px-2 bg-green-500 hover:bg-green-600" @click="doDownloadImage">
                    <svg class="w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/></svg>
                    <span>Download</span>
                </div>
                <div v-if="fileTypes[file.type].startsWith('image')" class="m-1 flex items-center rounded shadow transition-colors text-white font-semibold cursor-pointer px-2 bg-gray-400 hover:bg-gray-500" @click="doCopyImage">
                    <svg class="w-8 h-8 p-1" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z"/></svg>
                    <span>Copy Image</span>
                </div>
                <div class="m-1 flex items-center rounded shadow transition-colors text-white font-semibold cursor-pointer px-2 bg-gray-400 hover:bg-gray-500" @click="doCopyLink">
                    <svg class="w-8 h-8" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
                    <span>Copy Link</span>
                </div>
            </div>
            <div v-if="error" class="text-xl font-semibold text-red-500">Error: {{ error }}</div>
        </div>
    </div>
    <Notification v-bind="notification" />
</template>

<style>

</style>