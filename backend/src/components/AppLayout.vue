<template>
    <div class="flex min-h-full bg-gray-200">
        <!-- Sidebar -->
        <Sidebar :class="{ '-ml-[200px]': !sidebarOpened }" />

        <div class="flex-1">
            <!-- Header -->
            <TopHeader @toggleSidebar="toggleSidebar" />

            <!-- Content -->
            <main class="p-6">
                <div class="p-4 rounded bg-white">
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import Sidebar from './Sidebar.vue'
import TopHeader from './TopHeader.vue';

const { title } = defineProps({
    title: String
})

const sidebarOpened = ref(true)

function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value
}
</script>
