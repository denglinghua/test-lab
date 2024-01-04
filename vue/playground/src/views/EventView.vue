<template>
    <input type="text" v-model="inputValue" />
</template>
<script setup>
import { ref, watch } from 'vue'

const inputValue = ref('')
const inputValue2 = ref('')
let inWatcher1 = false

watch(inputValue, (value) => {
    console.log('before 1')
    // this will trigger inputValue2 watcher
    // however, which is not a normal function call, like a callback function 
    // the watcher will NOT be executed above current function frame
    // the event listener or watcher will be placed in the event loop
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
    inWatcher1 = true
    inputValue2.value = value
    inWatcher1 = false
    console.log('after 1')
})

watch(inputValue2, (value) => {
    console.log('before 2')
    console.log('inWatcher1', inWatcher1)
    console.log('after 2')
})
</script>