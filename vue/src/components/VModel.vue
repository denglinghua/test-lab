<template>
    <div>
        <input v-model="msg" />
        <br />
        <button @click="$emit('update:modelValue', createEventData(msg))">Update Model</button>
        <p>
            In child node, v-model is: {{ props.modelValue }}
        </p>
    </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue'

const msg = ref('Hello Vue 3!')

// v-model directive will make the parent component listen to the update:modelValue event
// and upate the modelValue passed from parent to the child component with the event payload
// in parent component, like this:
// <VModel id='ctrl' v-model="msg"/>
// addListener(ctrl, 'update:modelValue', (val) => { msg.value = val })
// event name is 'update:modelValue'
// event handler is (val) => { msg.value = val }
// Once msg.value is updated, the child component will be updated automatically
// the sequence is:
// 1. child component emits 'update:modelValue' event with payload
// 2. parent component listens to 'update:modelValue' event and update msg.value
// 3. msg.value is updated, child component is updated automatically
defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    }
})

function createEventData(value) {
    return { text: value, length: value.length }
}

watch(() => props.modelValue, (val) => {
    console.log('msg changed@child', val)
})
</script>