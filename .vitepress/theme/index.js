import DefaultTheme from 'vitepress/theme'
import Download from '../../components/Download.vue'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Download', Download)
    }
}