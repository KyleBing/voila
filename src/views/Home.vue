<template>
  <div class="home">
      <Count/>
  </div>
</template>

<script>

import Count from "@/components/Count";

export default {
  name: 'Home',
  components: {
      Count
  }
}
</script>

<style lang="scss" scoped>
.home{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
