<template>
    I am an error component
</template>
<script setup>
import { ref } from 'vue'
const show = ref(true)
console.log('Child setup');
const obj = null;
obj.call();
</script>