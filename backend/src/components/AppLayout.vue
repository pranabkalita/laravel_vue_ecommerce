<template>
    <div class="flex min-h-full flex">
        <!-- Sidebar -->
        <Sidebar />

        <div class="flex-1">
            <!-- Header -->
            <header class="h-8 shadow bg-white">
                header
            </header>

            <!-- Content -->
            <main>
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'

const { title } = defineProps({
    title: String
})
</script>
