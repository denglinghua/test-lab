<template>
    <button @click="changeData">Change Data</button>
    <br>
    <button @click="items.push({ id: 4, name: 'Jack' })">Add Data</button>
    <br>
    <button @click="items.pop()">Remove Data</button>
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
        item.name = item.name + new Date().getTime()
    }
}

</script>