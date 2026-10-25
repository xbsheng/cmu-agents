import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import SlideFigure from './components/SlideFigure.vue'
import GiscusComments from './components/GiscusComments.vue'
import VersionSwitch from './components/VersionSwitch.vue'
import NotFound from './components/NotFound.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(VersionSwitch),
      'doc-after': () => h(GiscusComments),
      'not-found': () => h(NotFound)
    })
  },
  enhanceApp({ app, router }) {
    app.component('SlideFigure', SlideFigure)
    if (!import.meta.env.PROD || typeof window === 'undefined') return
    // 百度统计不会自动上报 pushState 路由，手动补 PV
    let last = location.pathname
    router.onAfterRouteChanged = (href) => {
      const path = new URL(href, location.origin).pathname
      if (path === last) return
      last = path
      ;(window as any)._hmt?.push(['_trackPageview', path])
    }
  }
}
