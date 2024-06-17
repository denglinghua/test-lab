<template>
  Prop :  {{ msg }}
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  msg: {
    type:String,
    default: 'Hello World'
    }
})
</script>