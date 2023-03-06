<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'

var route = useRoute();

var error = ref("");

var fileName = ref("image.png");

function update() {

}

</script>

<template>
    <div class="w-full flex flex-col items-center px-3 py-5 gap-8">
        <div class="w-full max-w-2xl">
            <router-link to="/dashboard" class="px-3 py-1 text-lg font-semibold text-center bg-white dark:bg-slate-600 rounded shadow cursor-pointer">
                Back to Dashboard
            </router-link>
        </div>
        <div class="w-full flex flex-col items-center max-w-2xl p-5 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg">
            <div class="text-2xl font-bold mb-3">Edit Data</div>
            <div class="max-w-lg max-h-[64rem] my-3">
                <img class="mx-auto rounded shadow-lg" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60">
                
                <input type="text" id="file-name" name="file-name" placeholder="File Name" title="File Name" autocomplete="off" v-model="fileName" class="w-full min-w-[128px] px-2 my-1 text-lg input-text">
            </div>
            <!--<div class="flex flex-col justify-center items-center">
                <input type="text" id="file-name" name="file-name" placeholder="File Name" autocomplete="off" v-model="fileName" class="w-64 sm:w-96 px-2 py-1 input-text">
            </div>-->
            <div v-if="error" class="text-xl font-semibold text-red-500 mt-3">Error: {{ error }}</div>
            <div @click="update" class="mt-5 px-5 py-1 text-lg font-semibold text-center text-white bg-green-500 hover:bg-green-400 dark:hover:bg-green-600 rounded shadow-md cursor-pointer">Save</div>
        </div>
    </div>
</template>

<style>

</style>