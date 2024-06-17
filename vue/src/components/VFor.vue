<template>
    <VForChild v-for="item in items" :data="item" />
</template>
<script setup>
import { defineProps } from 'vue'
import VForChild from './VForChild.vue'
const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})
</script>