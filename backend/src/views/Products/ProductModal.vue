<template>
    <TransitionRoot appear :show="show" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-50" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">

                            <Spinner v-if="loading"
                                class="absolute left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center" />

                            <header class="py-3 px-4 flex justify-between items-center">
                                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                                    {{ product.id ? `Update product : "${props.product.title}"` : 'Create New Product'
                                    }}
                                </DialogTitle>

                                <button
                                    class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
                                    @click="closeModal">
                                    <XMarkIcon />
                                </button>
                            </header>

                            <form @submit.prevent="onSubmit">
                                <div class="bg-white px-4 pt-5 pb-4">
                                    <CustomInput class="mb-2" label="Product Title" v-model="product.title" />
                                    <CustomInput type="file" class="mb-2" label="Product Image"
                                        @change="file => product.image = file" />
                                    <CustomInput type="textarea" class="mb-2" label="Description"
                                        v-model="product.description" />
                                    <CustomInput type="number" class="mb-2" label="Price"
                                        v-model="product.price" prepend="₹" />
                                </div>

                                <footer class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3">
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        @click="closeModal"
                                        ref="cancelButtonRef">
                                        Cancel
                                    </button>
                                </footer>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, computed, onUpdated } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';
import Spinner from '../../components/core/Spinner.vue';
import CustomInput from '../../components/core/CustomInput.vue';
import store from '../../store';

// PROPS
const props = defineProps({
    modelValue: Boolean,
    product: {
        required: true,
        type: Object
    }
})
// EMITS
const emit = defineEmits(['update:modelValue', 'close'])

// DATA
const loading = ref(false)
const product = ref({
    id: props.product.id,
    title: props.product.title,
    image: props.product.image,
    description: props.product.description,
    price: props.product.price
})

// COMPUTED
const show = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

// HOOKS
onUpdated(() => {
    product.value = {
        id: props.product.id,
        title: props.product.title,
        image: props.product.image,
        description: props.product.description,
        price: props.product.price
    }
})

// FUNCATIONS
function closeModal() {
    show.value = false
    emit('close')
}

async function onSubmit() {
    loading.value = true
    if (product.value.id) {
        const response = await store.dispatch('updateProduct', product.value)

        loading.value = false
        if (response.status === 200) {
            // TODO SHOW NOTIFICATION
            store.dispatch('getProducts')
            closeModal()
        }
    } else {
        const response = await store.dispatch('createProduct', product.value)

        loading.value = false
        if (response.status === 201) {
            // TODO SHOW NOTIFICATION
            store.dispatch('getProducts')
            closeModal()
        }
    }
}
</script>
