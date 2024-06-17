<template>
    id : {{ data.id }}
    /name: {{ data.name }}
    <br>
</template>
<script setup>
import { defineProps, onMounted, onUnmounted } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})

onMounted(() => {
    console.log('child  '+ props.data.id + ' mounted')
})

onUnmounted(() => {
    console.log('child  '+ props.data.id + ' unmounted')
})
</script>