const INIT_STATE = 'INIT_STATE'
const DRAW_BOX = 'DRAW_BOX'
const DRAW_CELL = 'DRAW_CELL'

class Cell {
  constructor (cls = '', content = ' ', callback = () => {
  }) {
    this.cls = cls
    this.content = content
    this.callback = callback
  }
}

const createField = (width, height) => {
  const initialField = Array(height)

  for (let i = 0; i < initialField.length; i++) {
    const row = Array(width)
    for (let j = 0; j < row.length; j++) {
      row[j] = new Cell()
    }
    initialField[i] = row
  }
  return initialField.slice()
}

// addWindow(x, y, w, h, s = true) {
//   if (s) {
//     this.drawBox(x + 1, y + 1, w, h, 'shadow')
//   }
//   this.drawBox(x, y, w, h, 'window')
//   this.field[y + 1][x + w - 2] = new Cell('close', 'X', () => {
//     this.cleanField(y + 1, x + w - 2)
//   })
// }

const
  state = {
    field: [],
    width: 0,
    height: 0
  }

const mutations = {
  [INIT_STATE]: (state, { width, height }) => {
    state.field = createField(width, height)
    state.width = width
    state.height = height
  },
  [DRAW_BOX]: (state, { posX, posY, width, height, cls }) => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        state.field[i + posY][j + posX] = new Cell(cls)
      }
    }
  },
  [DRAW_CELL]: (state, { posX, posY, cls, callback, content }) => {
    state.field[posY][posX] = new Cell(cls, content, callback)
  }
}

const actions = {
  initState ({ commit }, { width, height }) {
    commit(INIT_STATE, { width, height })
  },
  addWindow ({ commit, state }, { posX, posY, width, height, hasShadow }) {
    if (hasShadow) {
      commit(DRAW_BOX, { posX: posX + 1, posY: posY + 1, width, height, cls: 'shadow' })
    }
    commit(DRAW_BOX, { posX, posY, width, height, cls: 'window' })
    commit(DRAW_CELL, {
      posX: posX + width - 2,
      posY: posY + 1,
      cls: 'close',
      content: 'X',
      callback: () => {
        commit(INIT_STATE, { height: state.height, width: state.width })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
