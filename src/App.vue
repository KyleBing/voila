<template>
  <router-view/>
</template>

<script>
import {mapMutations} from 'vuex'
    export default {
        mounted() {
            this.SET_INSETS({
                height: innerHeight,
                width: innerWidth
            })
            window.addEventListener('resize', () => {
                this.SET_INSETS({
                    height: innerHeight,
                    width: innerWidth
                })
            })
        },
        methods: {
            ...mapMutations(['SET_INSETS'])
        }
    }
</script>
<style lang="scss">
@import "assets/scss/reset.css";
@import "assets/scss/gutter";
@import "assets/scss/font";
</style>
