<template>
  <pre><template v-for="(row, rowIndex) in field"><span
    v-for="(cell, cellIndex) in row"
    :key="`${cell.find(l => l.isOnTop).boxId} ${rowIndex} ${cellIndex}`"
    :class="cell.find(l => l.isOnTop).cls"
    @click="exec(cell.find(l => l.isOnTop).callback)"
  >{{ cell.find(l => l.isOnTop).content }}</span>
  </template>
  </pre>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapState } = createNamespacedHelpers('content')

export default {
  name: 'Home',
  computed: {
    ...mapState({
      field: 'field'
    })
  },
  methods: {
    ...mapActions({
      initState: 'initState',
      addWindow: 'addWindow'
    }),
    exec (f) {
      if (typeof f === 'function') {
        f()
      }
    }
  },
  created () {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const w = Math.round(viewportWidth / 12) - 2
    this.initState({
      width: w,
      height: 30
    })
    this.addWindow({ posY: 9, posX: 20, width: 30, height: 20, hasShadow: true })
    this.addWindow({ posY: 5, posX: 10, width: 30, height: 20, hasShadow: true })
  }
}
</script>
<style lang="scss">
@import "../assets/scss/vars";

pre {
  background-color: black;

}

.window {
  background: $--white;
}

.shadow {
  background: $--dark;
}

.close {
  cursor: pointer;
  background: $--white;
  color: $--black;
}

</style>
