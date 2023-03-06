<script setup lang="ts">

const folders = {
    'All': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'Animals': 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'Nature': 'https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    'Ocean': 'https://images.unsplash.com/photo-1598604036395-4647eb5ce66d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW4lMjBwaG90b2dyYXBoeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'Other': '',
}

</script>

<template>
    <div class="w-full flex justify-center">
        <div class="p-8 max-w-7xl flex flex-wrap gap-5 justify-center">
            <div v-for="(img, name) in folders" :style="img ? `background-image: url(${img})` : ''"
                class="folder-card bg-slate-200 dark:bg-slate-700">
                <div class="w-full h-full flex justify-center items-center bg-opacity-30 dark:bg-opacity-50 bg-black p-2">
                    <span class="text-white text-center font-semibold text-xl">{{ name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.folder-card {
    @apply bg-no-repeat bg-cover bg-center w-52 h-32 rounded-lg shadow overflow-hidden transition-all cursor-pointer;
    background-size: 100%;
}
.folder-card:hover {
    background-size: 110%;
}
</style>