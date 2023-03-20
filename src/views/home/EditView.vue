<script setup lang="ts">
import MediaDisplay from '@/components/MediaDisplay.vue';
import Notification from '@/components/Notification.vue';
import type { FileData } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, onBeforeRouteUpdate, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import MediaOptions from '@/components/MediaOptions.vue';

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
                <MediaOptions :file="file" @notify="(success, msg)=>{notification = {success, msg, time: Date.now()}}"/>
            </div>
            <div v-if="error" class="text-xl font-semibold text-red-500">Error: {{ error }}</div>
        </div>
    </div>
    <Notification v-bind="notification" />
</template>

<style>

</style>