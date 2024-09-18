// https://vitepress.dev/guide/custom-theme
import {h,toRefs} from 'vue'
import type {Theme} from 'vitepress'
import {useData, useRoute} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({app, router, siteData}) {
        // ...
    }, setup() {
        const {frontmatter} = toRefs(useData());
        const route = useRoute();

        giscusTalk({
                repo: 'mcddhub/mcdd-big-data-study',
                repoId: 'R_kgDOMwEykQ',
                category: 'Announcements',
                categoryId: 'DIC_kwDOMwEykc4CikfQ',
                mapping: 'pathname',
                inputPosition: 'top',
                lang: 'zh-CN',
                theme: 'preferred_color_scheme',
                // ...
            }, {
                frontmatter, route
            },
            true
        );
    },
} satisfies Theme
