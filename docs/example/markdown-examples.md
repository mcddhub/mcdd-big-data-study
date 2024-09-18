# Markdown 拓展

本页展示了 VitePress 提供的一些内置标记扩展

## 标题锚点

输入

```md
点击跳转到 [自定义容器](#自定义容器) 查看相关用法
```

输出

点击跳转到 [自定义容器](#自定义容器) 查看相关用法

## 链接

### 外部链接

外部链接带有 `target="_blank" rel="noreferrer"`

输入

```md
- [github](https://github.com/caobaoqi1029)
- [gitee](https://gitee.com/caobaoqi)
- [bilibili](https://space.bilibili.com/1045499440?spm_id_from=333.1007.0.0)
```

输出

- [github](https://github.com/caobaoqi1029)
- [gitee](https://gitee.com/caobaoqi)
- [bilibili](https://space.bilibili.com/1045499440?spm_id_from=333.1007.0.0)

### 内部链接

内部链接将转换为单页导航的路由链接。此外，子目录中包含的每个 `index.md` 都会自动转换为 `index.html`，并带有相应的 URL `/`

> [!IMPORTANT]
> 后缀有一个 `/` 才可以省略 `index.md` 或者也可以直接显式指出具体文件
> - `[example](./index.md)`
> - `[example](./)`

- [example](./index.md)

## Github 风格表格

输入

```md
| Tables        |      Are      |  Cool |
|---------------|:-------------:|------:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

输出

| Tables        |      Are      |  Cool |
|---------------|:-------------:|------:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## 表情支持

- [所有支持的 emoji 列表](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)

输入

```md
:tada: :100:
```

输出

:tada: :100:

## 自定义容器

输入

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

输出

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Github 风格警报

输入

```md
> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```

输出

> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。

## 语法高亮

### 代码块颜色差异

输入

```md
    ```java
    public static vod main(String[] args) {

        System.out.println("Hello World!"); // [!code --]
        System.out.println("Hello World!"); // [!code ++]

        System.out.println("This is a warning"); // [!code warning]
        System.out.println("This is a error"); // [!code error]
    }
    ```
```

输出

```java
public static vod main(String[] args) {

    System.out.println("Hello World!"); // [!code --]
    System.out.println("Hello World!"); // [!code ++]

    System.out.println("This is a warning"); // [!code warning]
    System.out.println("This is a error"); // [!code error]
}
```

### 代码块分组

输入

```md
::: code-group

    ```js [config.js]
    /**
     * @type {import('vitepress').UserConfig}
     */
    const config = {
            // ...
        }

    export default config
    ```

    ```ts [config.ts]
    import type {UserConfig} from 'vitepress'

    const config: UserConfig = {
        // ...
    }

    export default config
    ```

:::
```

输出

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
        // ...
    }

export default config
```

```ts [config.ts]
import type {UserConfig} from 'vitepress'

const config: UserConfig = {
    // ...
}

export default config
```

:::

## 包含文件

### 导入代码片段

> [!IMPORTANT]
> @ 的值对应于源代码根目录，默认情况下是 VitePress 项目根目录，除非配置了 srcDir

输入

```md
<<< @/public/HelloWorld.js{highlightLines}
```

输出

<<< @/public/HelloWorld.js{highlightLines}

### 包含 markdown 文件

输入

```md
<!--@include: ./index.md-->
```


输出

```md
<!--@include: ./index.md-->
```

## 数学公式支持

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**Maxwell's equations:**

| equation                                                                                                                                                                  | description                                                                            |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |

## 目录表

输入 `[[toc]]`

输出
[[toc]]

## More

- [full list of markdown extensions](https://vitepress.dev/guide/markdown).
