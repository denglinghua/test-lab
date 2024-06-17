<template>
    <div>
        <input type="text" v-model="allChecked" />
        <input type="button" value="all" @click="changeAll" />
        <br>
        <input type="button" v-for="i in [0, 1, 2]" :value="'change' + i" @click="checkItems[i] = !checkItems[i]" />
        <br>
        <span>{{ checkItems }}</span>
    </div>
    <div></div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'

const text = ref('all')
//const allChecked = ref('all')
const checkItems = ref([true, true, true])

function changeAll() {
    console.log('changeAll event')
    allChecked.value = text.value
}
/*
watch(allChecked, (value) => {
    console.log('all checked changed: ', value)
    if (value === 'all') {
        checkItems.value.forEach((item, index) => {
            checkItems.value[index] = true
        })
    } else {
        checkItems.value.forEach((item, index) => {
            checkItems.value[index] = false
        })
    }
    console.log('all checked items: ', checkItems.value)
})
*/
// use computed property to replace two watcher which are mutually affected
// why dose it work?
// just because gettter and setter of computed are not mutually affected
const allChecked = computed({
    get() {
        if (checkItems.value.every(item => item)) {
            return 'all'
        } else if (checkItems.value.every(item => !item)) {
            return 'none'
        } else {
            return 'partial'
        }
    },
    set(value) {
        if (value === 'all') {
            checkItems.value.forEach((item, index) => {
                checkItems.value[index] = true
            })
        } else {
            checkItems.value.forEach((item, index) => {
                checkItems.value[index] = false
            })
        }
    }
})

watch(checkItems, (value) => {
    console.log('checkItems changed: ', value)
}, { deep: true })
</script>