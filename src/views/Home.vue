<template>
  <div class="home">
    <div class="home__wrap">
      <img src="@/assets/img/logo.png" alt="">
      <img src="@/assets/img/stars-bg.png" alt="" class="home__bg">
      <div class="bottom-bar">
        UI Kit
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style scoped lang="scss">
@import "../assets/scss/vars";

.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $--gray;

  &__wrap {
    height: 90vh;
    width: 90vw;
    box-shadow: $--main-shadow;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $--black;
    position: relative;
    overflow: hidden;
  }

  &__bg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
}

</style>
