import DefaultTheme from 'vitepress/theme'
import SlideFigure from './components/SlideFigure.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SlideFigure', SlideFigure)
  }
}
