<template>
    <SlotComp>
        I am a slot content
    </SlotComp>
    <Error />
</template>
<script setup>
import Error from '@/components/Error.vue';
import SlotComp from '@/components/SlotComp.vue';
import { ref, watch } from 'vue'

const show = ref(true)
const msg = ref({text: 'Hello Vue 3!', length: 0})
console.log('Parent setup');
</script>