<template>
    <FloatingPanel
        :left="430" :top="520"
        title="LoadingCircle"
        :width="0"
        background-color="black"
        animate-in-class="animate__animated"
    >
        <LoadingCircle/>
    </FloatingPanel>
</template>

<script>
import FloatingPanel from "@/components/FloatingPanel";
import LoadingCircle from "@/components/LoadingCircle";
export default {
    name: "CardLoadingCircle",
    components: {LoadingCircle, FloatingPanel},

    data(){
        return {}
    },
}
</script>

<style scoped lang="scss">
@import "../assets/scss/plugin";
</style>
