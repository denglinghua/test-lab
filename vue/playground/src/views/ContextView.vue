<template>
    <button @click="callUse('onclick')">call use</button>
    <button @click="refValue = refValue + 'a'">change ref to call</button>
    <br>
    <p>refValue: {{ refValue }}</p>
</template>
<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useComp } from '@/components/comp';

callUse('setup')

const refValue = ref('ref value')

watch(refValue, (newValue, oldValue) => {
    callUse('watch')
})

axios.get('http://google.com')
    .then(response => {
        callUse('http ok')
    })
    .catch(error => {
        callUse('http error')
    })

function callUse(hook) {
    let comp = useComp()
    console.log('call use @ ' + hook, comp != undefined)
}

</script>