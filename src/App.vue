<template>
  <div id="app">
    <Preloader :percent-loaded.sync="percent" v-if="percent<100"></Preloader>
    <router-view/>
  </div>
</template>
<script>
import Preloader from '@/components/Preloader'

export default {
  name: 'Home',
  data () {
    return {
      percent: 100
    }
  },
  // methods: {
  //   showPreloader (coefficient) {
  //     const interval = setInterval(() => {
  //       this.percent++
  //       console.log(interval)
  //       if (this.percent === 100) {
  //         clearInterval(interval)
  //       }
  //     }, coefficient)
  //     this.percent = 0
  //   }
  // },
  components: { Preloader }
  // created () {
  //   this.showPreloader(50)
  // },
  // watch: {
  //   $route () {
  //     this.showPreloader(10)
  //   }
  // }
}
</script>
