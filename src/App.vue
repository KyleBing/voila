<template>
    <RouterView />
</template>
<script lang="ts" setup>
import {useProjectStore} from "./store/useProjectStore.ts";
const projectStore = useProjectStore()
import {onBeforeMount, onMounted, ref} from "vue";

onBeforeMount(() => {
   
})


onMounted(()=> {
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

