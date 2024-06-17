<template>
    <button @click="toggle">Toggle</button>
    <p v-if="show">
        <Lifecycle msg="Hello World" />
    </p>
</template>
<script setup>
import { ref } from 'vue'
import Lifecycle from '@/components/Lifecycle.vue'
console.log('Parent setup')
const show = ref(false)
const toggle = () => {
    show.value = !show.value
}
</script>