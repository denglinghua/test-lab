<template>
    <button @click="changeData">Change Data</button>
    <button @click="items.push({ id: 4, name: 'Jack' })">Add Data</button>
    <button @click="items.pop()">Remove Data</button>
    <button @click="replaceData">Replace Data</button>
    <br>
    <VFor :items="items" />
</template>
<script setup>
import { ref } from 'vue'
import VFor from '../components/VFor.vue'

const items = ref([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Joe' }
])

function changeData() {
    for(const item of items.value) {
        item.id = item.id + 1
        item.name = item.name + new Date().getTime()
    }
}

function replaceData() {
    items.value = [
        { id: 1, name: 'New John' },
        { id: 2, name: 'New Jane' },
        { id: 3, name: 'New Joe' }
    ]
}
// if key is not provided, vue will use index as key
</script>