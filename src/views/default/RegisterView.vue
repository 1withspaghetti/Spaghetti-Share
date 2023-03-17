<script setup lang="ts">
import router, { setLoggedIn } from '@/router';
import axios, { AxiosError } from 'axios';
import { ref } from 'vue';

var email = ref("");
var username = ref("");
var password = ref("");

var error = ref("");

async function login(e: Event) {
    console.log("Authenticating...");

    axios.post("/api/v1/auth/register", {'email': email.value, 'username': username.value, 'password': password.value})
    .then((res)=>{
        setLoggedIn(true);
        router.push("/dashboard");
    }).catch((err: AxiosError<any, any>)=>{
        error.value = err.response?.data.reason || (err.response?.status + " " + err.response?.statusText);
    });
}
</script>

<template>
    <form @submit.prevent="login" class="w-full max-w-lg py-6 px-8 m-4 bg-slate-300 dark:bg-slate-700 rounded-lg shadow-lg text-center">
        <h2 class="text-xl font-bold">Create an account</h2>
        <span class="text-slate-600 dark:text-slate-400">Already have an account? <RouterLink to="/login" class="cursor-pointer text-blue-400">Login.</RouterLink></span>
        <div class="flex flex-col items-center gap-2 mt-3">
            <input type="email" placeholder="Email" autocomplete="email" autofocus v-model="email" class="login-input">
            <input type="text" placeholder="Username" autocomplete="username" v-model="username" class="login-input">
            <input type="password" placeholder="Password" autocomplete="new-password" v-model="password" class="login-input">
            <button type="submit" class="px-2 py-1 rounded shadow bg-blue-500 text-white font-semibold">Continue</button>
        </div>
        <div v-if="error" class="text-lg font-semibold text-red-500 mt-3">Error: {{ error }}</div>
    </form>
</template>