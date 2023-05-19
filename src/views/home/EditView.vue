<script setup lang="ts">
import MediaDisplay from '@/components/MediaDisplay.vue';
import Notification from '@/components/Notification.vue';
import type { FileData } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import MediaOptions from '@/components/MediaOptions.vue';
import router from '@/router';

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

var modalOpen = ref(false);
function deleteMedia() {
    error.value = "";
    if (!file.value) return;
    axios.post(`/api/v1/media/delete`, {id: file.value.id}).then((res)=>{
        router.push('/dashboard');
    }).catch((err)=>{
        error.value = err.response?.data.reason || (err.response?.status + " " + err.response?.statusText);
    })
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
            <div v-if="file" class="flex flex-col items-center">
                <input type="text" id="file-name" name="file-name" placeholder="File Name" title="File Name - Click to edit" autocomplete="off" v-model="file.name" @input="saveData"
                    class="w-full min-w-[256px] mb-1 px-2 pb-1 text-2xl font-semibold bg-transparent transition-colors duration-100 rounded focus:bg-slate-200 hover:bg-slate-200 focus:dark:bg-slate-600 hover:dark:bg-slate-600 focus:shadow focus:outline-none active:outline-none">
                <div>
                    <MediaDisplay :file="file" max-w="32rem" max-h="32rem" />   
                    <div class="my-1 font-semibold text-slate-800 dark:text-slate-400">ID: {{ file.id }} - Type: {{ file.type.toUpperCase() }}</div>
                </div>
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
            <div v-if="file" class="mt-2">
                <MediaOptions :file="file" @notify="(success: boolean, msg: string)=>{notification = {success, msg, time: Date.now()}}">
                    <div tabindex="0" class="button px-2 bg-red-500 hover:bg-red-600" @click="modalOpen = true">
                        <svg class="w-6 h-6 my-1" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 96 960 960"><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>
                        <span>Delete</span>
                    </div>
                </MediaOptions>
            </div>
            <div v-if="error" class="text-xl font-semibold text-red-500">Error: {{ error }}</div>
        </div>
    </div>
    <div v-if="modalOpen" class="fixed top-0 right-0 bottom-0 left-0 z-40 flex flex-col justify-center items-center bg-black bg-opacity-70 overflow-y-auto" @click.self="modalOpen = false">
        <div class="m-4 p-6 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg text-center">
            <h3 class="text-xl font-bold">Are you sure you want to delete this file?</h3>
            <div class="italic opacity-50">This cannot be undone!</div>
            <div class="flex justify-center mt-4 gap-2">
                <div tabindex="0" class="button px-2 py-1 bg-gray-400 hover:bg-gray-500" @click="modalOpen = false">
                    <span>Go Back</span>
                </div>
                <div tabindex="0" class="button px-2 py-1 bg-red-500 hover:bg-red-600" @click="deleteMedia">
                    <span>Delete</span>
                </div>
            </div>
            <div v-if="error" class="text-xl font-semibold text-red-500">Error: {{ error }}</div>
        </div>
    </div>
    <Notification v-bind="notification" />
</template>

<style scoped>
.button {
    @apply m-1 flex items-center rounded shadow transition-colors text-white font-semibold cursor-pointer whitespace-nowrap;
}
</style>