<script setup lang="ts">
import { type FileData, fileTypes } from '@/types';
import { downloadImage, copyLink, copyImage } from '@/copy'

defineProps<{file: FileData, iconOnly?: boolean}>();
defineEmits<{
  (e: 'notify', success: boolean, msg: string): void
}>();

</script>

<template>
    <div class="flex flex-wrap justify-center">
        <div class="button px-2 bg-green-500 hover:bg-green-600" @click="downloadImage(file)">
            <svg class="icon" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/></svg>
            <span v-if="!iconOnly">Download</span>
        </div>
        <div v-if="fileTypes[file.type].startsWith('image')" class="button px-2 bg-gray-400 hover:bg-gray-500" @click="copyImage(file, (success)=>{$emit('notify', success, success ? 'image copied to clipboard' : 'Could not copy image to clipboard')});">
            <svg class="icon p-1" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z"/></svg>
            <span v-if="!iconOnly">Copy Image</span>
        </div>
        <div class="button px-2 bg-gray-400 hover:bg-gray-500" @click="copyLink(file, (success)=>{$emit('notify', success, success ? 'Link copied to clipboard' : 'Could not copy link')});">
            <svg class="icon" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
            <span v-if="!iconOnly">Copy Link</span>
        </div>
    </div>
</template>

<style scoped>
.icon {
    max-width: 2rem;
    max-height: 2rem;
}
.button {
    @apply m-1 flex items-center rounded shadow transition-colors text-white font-semibold cursor-pointer whitespace-nowrap;
}
</style>