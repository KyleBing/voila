<template>
    <FloatingPanel
        :left="430" :top="200"
        title="LoadingCircle"
        :width="350"
        background-color="black"
        animate-in-class="animate__fadeInUp"
    >
        <LoadingCircle/>
        <div class="btn-container">
            <LaunchButton class="mb-2" @click="$router.push({name: 'MapLoca'})">MAP_LOCA</LaunchButton>
            <LaunchButton class="mb-2" @click="$router.push({name: 'Console'})">CONSOLE</LaunchButton>
        </div>
    </FloatingPanel>
</template>

<script setup lang="ts">
import FloatingPanel from "@/components/FloatingPanel.vue"
import LoadingCircle from "@/components/LoadingCircle.vue"
import LaunchButton from "@/components/LaunnchButton.vue"
// No props or data needed
</script>

<style scoped lang="scss">
@import "../assets/scss/plugin";
.btn-container{
    flex-direction: column;
    padding: 20px 30px;
    display: flex;
    justify-content: center;
}
</style>
