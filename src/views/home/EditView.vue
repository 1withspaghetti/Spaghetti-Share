<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'

var route = useRoute();

var error = ref("");

var fileName = ref("Mountain View");
var tags = ref(["mountain","photography","night","sky","stars"]);
var id = ref("id");
var extension = ref("png")


id.value = (typeof route.params.id === 'string' ? route.params.id : route.params.id[0]);

var tagInput = ref("");
function addTag() {
    if (!tags.value.includes(tagInput.value)) {
        tags.value.push(tagInput.value);
        tags.value.sort();
    }
    tagInput.value = "";
}
function removeTag(tag: string) {
    if (tags.value.includes(tag)) tags.value.splice(tags.value.indexOf(tag) ,1);
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
            <div class="max-w-lg max-h-[64rem] my-3">
                <input type="text" id="file-name" name="file-name" placeholder="File Name" title="File Name - Click to edit" autocomplete="off" v-model="fileName" 
                    class="w-full min-w-[256px] mb-1 px-2 pb-1 text-2xl font-semibold bg-transparent transition-colors duration-100 rounded focus:bg-slate-200 hover:bg-slate-200 focus:dark:bg-slate-600 hover:dark:bg-slate-600 focus:shadow focus:outline-none active:outline-none">
                
                <img class="mx-auto rounded shadow-lg" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60">
                
                <div class="my-1 font-semibold text-slate-800 dark:text-slate-400">ID: {{ id }} - Type: {{ extension.toUpperCase() }}</div>
                <div class="w-full min-w-[256px]">
                    <div class="flex flex-wrap gap-2">
                        <div v-for="tag in tags" :key="tag" title="Click to delete" @click="removeTag(tag)"
                            class="px-2 rounded shadow bg-slate-300 dark:bg-slate-600 hover:text-red-700 hover:dark:text-red-400 transition-colors duration-100 cursor-pointer">{{ tag }}</div>
                    </div>
                    <form class="flex my-3 gap-2" @submit.prevent="addTag">
                        <input type="text" class="w-44 px-2 input-text" placeholder="Add Tag" v-model="tagInput" maxlength="25">
                        <input type="submit" value="+" class="font-bold bg-white dark:bg-slate-600 px-2 rounded shadow cursor-pointer">
                    </form>
                </div>
            </div>
            <div v-if="error" class="text-xl font-semibold text-red-500 mt-3">Error: {{ error }}</div>
        </div>
    </div>
</template>

<style>

</style>