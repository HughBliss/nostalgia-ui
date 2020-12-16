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
      percent: 0
    }
  },
  methods: {
    showPreloader (coefficient) {
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          this.percent++
        }, i * coefficient)
      }
      this.percent = 0
    }
  },
  components: { Preloader },
  created () {
    this.showPreloader(200)
  },
  watch: {
    $route () {
      this.showPreloader(10)
    }
  }
}
</script>
