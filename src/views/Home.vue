<template>
  <pre><template v-for="(row, rowIndex) in field"><span
    v-for="(cell, cellIndex) in row"
    :key="`${rowIndex} ${cellIndex}`"
    :class="cell.cls"
    @click="cell.callback"
  >{{ cell.content }}</span>
  </template>
  </pre>
</template>
<script>
class Cell {
  constructor (cls = '', content = ' ', callback = () => {
  }) {
    this.cls = cls
    this.content = content
    this.callback = callback
  }
}

const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const w = Math.round(viewportWidth / 12) - 2
const initialField = Array(30)

for (let i = 0; i < initialField.length; i++) {
  const row = Array(w)
  for (let j = 0; j < row.length; j++) {
    row[j] = new Cell()
  }
  initialField[i] = row
}
export default {
  name: 'Home',
  data () {
    return {
      H: 0,
      W: 0,
      field: [],
      comp: []
    }
  },
  computed: {},
  methods: {
    cleanField (y, x) {
      Object.assign(this.field, initialField)
      // this.field = initialField.slice()
    },
    drawBox (x, y, w, h, cls) {
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          this.field[i + y][j + x] = new Cell(cls)
        }
      }
    },
    addWindow (x, y, w, h, s = true) {
      if (s) {
        this.drawBox(x + 1, y + 1, w, h, 'shadow')
      }
      this.drawBox(x, y, w, h, 'window')
      this.field[y + 1][x + w - 2] = new Cell('close', 'X', () => {
        this.cleanField(y + 1, x + w - 2)
      })
    }
  },
  created () {
    // Object.assign(this.field, initialField)
    this.field = initialField.slice()
    this.addWindow(10, 5, 20, 15)
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
