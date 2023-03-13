<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { fileTypes } from '@/types';
import axios, { AxiosError } from 'axios';
import router from '@/router';

const MAX_FILE_SIZE = 8000000; // 8 mb
const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

var fileInput = ref<HTMLInputElement | null>(null);
var urlInput = ref<HTMLInputElement | null>(null);

var error = ref("");

const url = ref(null);
function onFileChange(e: any) {
    if (e.target?.files[0].size > MAX_FILE_SIZE) {
        error.value = "File too large! Must be less then 8mb";
        e.target.value = null;
    } else {
        startUpload();
    }
}
function onUrlChange(e: any) {
    if (e.target?.value && !URL_REGEX.test(e.target?.value)) {
        error.value = "Invalid URL"
    } else {
        error.value = ""
    }
}

var uploading = ref(false);
var uploadPercent = ref(42);

function startUpload() {
    error.value = ""
    if (fileInput.value?.files) {
        uploading.value = true;
        uploadPercent.value = 0;

        var file = new FormData();
        file.append("media", fileInput.value.files[0])
        axios.post('/api/v1/media/upload', file, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            onUploadProgress: (e)=>{
                uploadPercent.value = (e.progress || 0) * 100;
            }
        }).then((res)=>{
            router.push('/dashboard/edit/'+res.data.id);
        }).catch((err: AxiosError<any, any>)=>{
            error.value = err.response?.data.reason || err.message;
        })

    } else if (urlInput.value?.value) {
        uploading.value = true;
        uploadPercent.value = 0;

        // TODO: Send url to server

    } else {
        error.value = "You must provide a file or url to upload";
    }
}

</script>

<template>
    <div class="w-full flex flex-col items-center px-3 py-5 gap-8">
        <div class="w-full max-w-2xl">
            <router-link to="/dashboard" class="px-3 py-1 text-lg font-semibold text-center bg-white dark:bg-slate-600 rounded shadow cursor-pointer">
                Back to Dashboard
            </router-link>
        </div>
        <div :class="{hidden: uploading}" class="w-full flex flex-col items-center max-w-2xl p-5 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg">
            <div class="text-2xl font-bold mb-5">Upload Media</div>
            <div class="flex flex-col md:flex-row justify-center items-center">
                <div class="flex items-center">
                    <label for="file-upload" class="px-4 py-1 text-lg font-semibold text-center bg-white dark:bg-slate-600 rounded shadow-md cursor-pointer">Select File</label>
                    <input type="file" id="file-upload" name="file-upload" ref="fileInput" :accept="Object.keys(fileTypes).map((v)=>{return '.'+v}).join(',')" class="hidden" v-on:change="onFileChange">
                </div>
                <div class="m-3 text-xl font-bold">OR</div>
                <input type="url" id="url-upload" name="url-upload" ref="urlInput" placeholder="Upload from URL" autocomplete="off" v-model="url" v-on:input="onUrlChange"
                     class="w-64 sm:w-96 px-2 py-1 bg-white dark:bg-slate-600 rounded shadow-md focus:outline-none active:outline-none">
            </div>
            <div v-if="error" class="text-xl font-semibold text-red-500 mt-3">Error: {{ error }}</div>
            <div @click="startUpload" class="mt-5 px-3 py-1 text-lg font-semibold text-center text-white bg-green-500 hover:bg-green-400 dark:hover:bg-green-600 rounded shadow-md cursor-pointer">Continue</div>
        </div>

        <div :class="{hidden: !uploading}" class="w-full text-center max-w-2xl pt-5 overflow-hidden bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg">
            <div class="text-2xl font-bold mb-3">Uploading... {{ uploadPercent.toFixed(0) }}%</div>
            <div v-if="error" class="text-xl font-semibold text-red-500">Error: {{ error }}</div>
            <div class="h-[6px] mt-3 bg-green-500 transition-all duration-75" :style="`width: ${uploadPercent}%;`"></div>
        </div>
    </div>
</template>