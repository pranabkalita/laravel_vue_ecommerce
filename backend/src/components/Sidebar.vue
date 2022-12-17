<template>
    <div class="w-[200px] transition-all bg-indigo-700 text-gray-300 p-4 py-2">
        <router-link class="flex items-center p-2 rounded transition-colors hover:bg-black/30 font-light"
            :to="{ name: 'app.dashboard' }">
            <span class="mr-2">
                <HomeIcon class="w-4" />
            </span>
            <span class="text-sm font-light">Dashboard</span>
        </router-link>

        <router-link class="flex items-center p-2 rounded transition-colors hover:bg-black/30 font-light"
            :to="{ name: 'app.products' }">
            <span class="mr-2">
                <ViewColumnsIcon class="w-4" />
            </span>
            <span class="text-sm font-light">Products</span>
        </router-link>

        <router-link class="flex items-center p-2 rounded transition-colors hover:bg-black/30 font-light"
            :to="{ name: 'app.dashboard' }">
            <span class="mr-2">
                <UsersIcon class="w-4" />
            </span>
            <span class="text-sm font-light">Users</span>
        </router-link>

        <router-link class="flex items-center p-2 rounded transition-colors hover:bg-black/30 font-light"
            :to="{ name: 'app.dashboard' }">
            <span class="mr-2">
                <ChartBarIcon class="w-4" />
            </span>
            <span class="text-sm font-light">Reports</span>
        </router-link>
    </div>
</template>

<script setup>
import { HomeIcon, UsersIcon, ChartBarIcon } from '@heroicons/vue/24/outline';
import { ViewColumnsIcon } from '@heroicons/vue/20/solid';
</script>
