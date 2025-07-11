<template>
    <div class="launch-btn">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "../assets/scss/plugin";
.launch-btn{
    min-width: 250px;
    @include border-radius(5px);
    padding: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    font-size: 30px;
    background-color: $blue;
    text-align: center;
    color: white;
    cursor: pointer;
    //border: 2px solid transparentize($blue, 0.7);
    //@include box-shadow(5px 5px transparentize($blue, 0.5));
    &:hover{
        background: linear-gradient(to top, $red, $orange);
        //background-color: red;
        color: white;
        animation: shadow-ripple 1s infinite;
        //@include box-shadow(5px 5px transparentize($orange, 0.5));
    }
}
@keyframes shadow-ripple {
    to{
        text-shadow: 0 0 0 transparentize(black, 0.5);
        outline: 0 solid transparentize(white, 0.4);
    }
    from{
        text-shadow: 10px 10px 10px transparentize(black, 1);
        outline: 30px solid transparentize(white, 1);
    }

}

</style>
