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
            <LaunchButton/>
        </div>
    </FloatingPanel>
</template>

<script>
import FloatingPanel from "@/components/FloatingPanel";
import LoadingCircle from "@/components/LoadingCircle";
import LaunchButton from "@/components/LaunnchButton";
export default {
    name: "CardLoadingCircle",
    components: {LaunchButton, LoadingCircle, FloatingPanel},

    data(){
        return {}
    },
}
</script>

<style scoped lang="scss">
@import "../assets/scss/plugin";
.btn-container{
    padding: 20px 30px;
    display: flex;
    justify-content: center;
}
</style>
