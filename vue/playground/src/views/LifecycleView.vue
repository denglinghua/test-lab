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

msg.value = 'Hello World 2'

onMounted(() => {
    console.log('parent mounted')
})

onUnmounted(() => {
    console.log('parent unmounted')
})

console.log('parent setup last line')

/*
parent setup first line
LifecycleView.vue:20 parent setup last line
Lifecycle.vue:8 child setup first line
Lifecycle.vue:17 child setup last line
Lifecycle.vue:11 child mounted
LifecycleView.vue:13 parent mounted
Lifecycle.vue:15 child unmounted
LifecycleView.vue:17 parent unmounted
*/
// code within the script setup block is executed in created hook
// parent created BEFORE child
// parent mounted AFTER child
// parent unmounted AFTER child
// reactive object change during parent created hook will not trigger child watch
// because child watch is created AFTER parent created hook
</script>