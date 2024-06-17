<template>
    <div>
        <h1>Property v-model</h1>
        <p>
            <label>Name: </label>
            <input v-model="person.name" />
        </p>
        <p>
            <label>Age: </label>
            <input v-model="person.age" />
        </p>
        <p>
            <label>Location: </label>
            <input v-model="person.location" />
        </p>
        <p>
            <label>Person: </label>
        <pre>{{ person }}</pre>
        </p>
        <button @click="person.name = 'Linghua'">Change Name</button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const person = ref({
    name: 'John Doe',
    age: 30,
    location: 'Earth'
})
</script>