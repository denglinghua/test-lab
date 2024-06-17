<template>
    <div>
        <VModel v-model="msg"/>
        <p>In parent node, v-model is: {{ msg }}</p>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import VModel from '../components/VModel.vue'

const msg = ref({text: 'Hello Vue 3!', length: 0})
watch(() => msg.value, (val) => {
    console.log('msg changed@parent', val)
})
</script>