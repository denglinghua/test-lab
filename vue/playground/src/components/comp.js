import { ref, onMounted, onUnmounted } from 'vue'

export function useComp() {
    console.log('composable setup first line  ')
    onMounted(() => { console.log('composable mounted') })
    onUnmounted(() => { console.log('composable unmounted') })
    console.log('composable setup last line  ')
    return {}
}