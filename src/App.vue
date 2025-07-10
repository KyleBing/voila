<template>
    <RouterView />
</template>
<script lang="ts" setup>
import {useProjectStore} from "./useProjectStore.ts";
const projectStore = useProjectStore()
import {onBeforeMount, onMounted} from "vue";


onBeforeMount(() => {
    (document.querySelector('.preloading') as HTMLDivElement).style.display = 'none'
})


onMounted(() => {
    projectStore.insets = {
        height: innerHeight,
        width: innerWidth
    }
    window.addEventListener('resize', () => {
        projectStore.insets = {
            height: innerHeight,
            width: innerWidth
        }
    })
})


</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>

