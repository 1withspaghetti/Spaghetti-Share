<script setup lang="ts">
import axios from 'axios';

setInterval(()=>{
    if (document.cookie.includes("session-token"))
        axios.get('/api/v1/auth/refresh').then(()=>{
            console.log("Session token refreshed")
        });
}, 300000) // 5 minutes
</script>

<template>
    <RouterView />
</template>
