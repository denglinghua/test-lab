<template>
    <button @click="toggle">Toggle</button>
    <PropChange :msg="msg" />
</template>
<script setup>
import { ref } from 'vue'
import PropChange from '@/components/PropChange.vue'
const msg = ref('Hello World')
function toggle() {
    msg.value = msg.value + '!'
}
</script>