import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/mcdd-big-data-study/',
    title: "Mcdd-Big-Data-Study",
    description: "Study project for big data (Hadoop, Zookeeper, Kafka, Flink, Spark)",
    markdown: {
        math: true,
        lineNumbers: true
    },
    themeConfig: {
        head: [["link", {rel: "icon", href: "/mcdd-big-data-study/android-icon-192x192.png"}]],
        outline: [1, 4],
        lastUpdated: true,
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '🏠 Home', link: '/'},
            {
                text: '😶‍🌫️ 案例',
                items: [
                    {text: 'Markdown 拓展', link: '/example/markdown-examples'},
                    {text: '🥸 Index ', link: '/example/index.md'},

                ]
            },
            {
                text: "版本信息 😍",
                link: "/CHANGELOG",
            },
        ],

        sidebar: [
            {
                text: '😶‍🌫️ 案例',
                link: '/example/index.md',
                collapsed: false,
                items: [
                    {text: 'Markdown 拓展', link: '/example/markdown-examples'},
                ]
            },
            {
                text: "版本信息 😍️",
                link: "/CHANGELOG",
            },
        ],
        footer: {
            copyright: "Copyright © 2024-present mcddhub",
        },
        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档",
                    },
                    modal: {
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                        },
                    },
                },
            },
        },
        socialLinks: [
            {icon: "github", link: "https://github.com/mcddhub/mcdd-big-data-study"}
        ],
    }
})
