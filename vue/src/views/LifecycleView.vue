<template>
    <div>This is a parent component</div>
    <Lifecycle :msg="msg" />
    <br>
    <button @click="msg = 'Hello World 3'">Change msg</button>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Lifecycle from '@/components/Lifecycle.vue'

const msg = ref('Hello World')

console.log('parent setup first line')

console.log('parent change child property during setup before')
msg.value = 'Hello World 2'
console.log('parent change child property during setup after')

onMounted(() => {
    console.log('parent mounted')
})

onUnmounted(() => {
    console.log('parent unmounted')
})

console.log('parent setup last line')

/*
parent setup first line
parent change child property during setup before
parent change child property during setup after
parent setup last line

child setup first line
composable setup first line  
composable setup last line
msg changed@child  undefined to Hello World 2, this msg output before immediate true watch, it equals a setup code
child setup last line

composable mounted
child mounted
parent mounted

composable unmounted
child unmounted
parent unmounted
*/
// code within the script setup block is executed in created hook
// parent created BEFORE child
// parent mounted AFTER child
// parent unmounted AFTER child
// the order of created is contrary to the order of mounted/unmounted
// reactive object change during parent created hook will not trigger child watch
// because child watch is created AFTER parent created hook
// composable like a child component, the created hook exceuted during use call.
</script>