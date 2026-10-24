import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import SlideFigure from './components/SlideFigure.vue'
import GiscusComments from './components/GiscusComments.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(GiscusComments)
    })
  },
  enhanceApp({ app }) {
    app.component('SlideFigure', SlideFigure)
  }
}
