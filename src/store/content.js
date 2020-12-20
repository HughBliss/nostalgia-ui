const INIT_STATE = 'INIT_STATE'
const DRAW_BOX = 'DRAW_BOX'
const DRAW_CELL = 'DRAW_CELL'
const SET_BOX_COUNT = 'SET_BOX_COUNT'
const CLOSE_BOX = 'CLOSE_BOX'
const SELECT_BOX = 'SELECT_BOX'

class Cell {
  constructor ({
    cls, content, isOnTop, boxId, callback
  }) {
    this.cls = cls || ' '
    this.content = content || ' '
    this.callback = callback
    this.isOnTop = isOnTop
    this.boxId = boxId || 0
  }

  setPosition (pos) {
    this.isOnTop = pos
  }
}

const createField = (width, height) => {
  const initialField = Array(height)

  for (let i = 0; i < initialField.length; i++) {
    const row = Array(width)
    for (let j = 0; j < row.length; j++) {
      row[j] = [new Cell({ isOnTop: true })]
    }
    initialField[i] = row
  }
  return initialField.slice()
}

const
  state = {
    field: [],
    width: 0,
    height: 0,
    boxCount: 1
  }

const mutations = {
  [INIT_STATE]: (state, { width, height }) => {
    state.field = createField(width, height)
    state.width = width
    state.height = height
  },
  [DRAW_BOX]: (state, { posX, posY, width, height, cls, boxId, callback }) => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        state.field[i + posY][j + posX] = [
          ...state.field[i + posY][j + posX]
            .map(l => {
              l.setPosition(false)
              return l
            })
            .filter(l => l.boxId !== boxId),
          new Cell({ cls, boxId, callback, isOnTop: true })
        ]
      }
    }
  },
  [DRAW_CELL]: (state, { posX, posY, cls, callback, content, boxId }) => {
    state.field[posY][posX] = [
      ...state.field[posY][posX]
        .map(l => {
          l.setPosition(false)
          return l
        })
        .filter(l => l.boxId !== boxId),
      new Cell({ cls, content, callback, boxId, isOnTop: true })
    ]
  },
  [SET_BOX_COUNT]: (state, newCount) => {
    state.boxCount = newCount
  },
  [SELECT_BOX]: (state, boxId) => {
    for (let i = 0; i < state.width; i++) {
      for (let j = 0; j < state.height; j++) {
        state.field[j][i] = state.field[j][i]
          .map(layer => {
            if (layer.boxId === boxId) {
              state.field[j][i].forEach(l => {
                l.setPosition(false)
              })
              console.log(state.field[j][i])
              layer.setPosition(true)
            }
            return layer
          })
      }
    }
  },
  [CLOSE_BOX]: (state, boxId) => {
    for (let i = 0; i < state.width; i++) {
      for (let j = 0; j < state.height; j++) {
        state.field[j][i] = state.field[j][i]
          .filter(layer => layer.boxId !== boxId)
        // .map(layer => {
        //   if (layer.boxId === boxId - 1) {
        //     layer.setPosition(true)
        //   }
        // })
      }
    }
    state.boxCount = state.boxCount - 1
  }
}

const actions = {
  initState ({ commit }, { width, height }) {
    commit(INIT_STATE, { width, height })
  },
  addWindow ({ commit, state }, { posX, posY, width, height, hasShadow }) {
    const boxId = state.boxCount
    console.log(boxId)
    if (hasShadow) {
      commit(DRAW_BOX, { posX: posX + 1, posY: posY + 1, width, height, cls: 'shadow', boxId })
    }
    commit(DRAW_BOX, {
      posX,
      posY,
      width,
      height,
      cls: 'window',
      boxId,
      callback () {
        commit(SELECT_BOX, boxId)
      }
    })
    commit(DRAW_CELL, {
      posX: posX + width - 2,
      posY: posY + 1,
      cls: 'close',
      content: 'X',
      callback () {
        commit(CLOSE_BOX, boxId)
      },
      boxId
    })
    commit(SET_BOX_COUNT, state.boxCount + 1)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
