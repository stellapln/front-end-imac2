import { app } from 'hyperapp'

import actions from './actions'
import state from './state'
import view from './components/views/Main'

app(
  state,
  actions,
  view,
  document.body
)
