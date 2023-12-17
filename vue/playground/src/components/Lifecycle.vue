<template>
    <div>This is a child component</div>
    <div>{{ msg }}</div>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps, watch } from 'vue'

const props = defineProps({
    msg: String
})

watch(() => props.msg, (newVal, oldVal) => {
    console.log('msg changed@child ', oldVal, 'to', newVal)
}, { immediate: true })

console.log('child setup first line')

onMounted(() => {
    console.log('child mounted')
})

onUnmounted(() => {
    console.log('child unmounted')
})
console.log('child setup last line')

</script>