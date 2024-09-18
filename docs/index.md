---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  text: "Mcdd-Big-Data-Study"
  tagline: "A Comprehensive Study Project for Big Data Technologies"
  image:
    src: /android-icon-192x192.png
    alt: Mcdd-Big-Data-Study Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Changelog
      link: /CHANGELOG

features:
  - title: 支持的技术 ✨
    details:
      - Hadoop 3.3.6（JDK 8.0.352-zulu，Maven 3.6.3）
      - Zookeeper 3.9.2
      - Kafka 2.12-3.7.1
  - title: Docker 容器化部署 🐳
    details: 使用 Docker 快速构建并部署大数据技术栈
  - title: Visual Studio Code 集成 🛠
    details: 无缝连接远程容器并在 VS Code 中进行开发
  - title: 简化的工作流 🔄
    details: 提供即用型脚本和 Docker 镜像，轻松管理和部署项目
---

## Project Overview 📊

**Mcdd-Big-Data-Study** 是一个设计用于探索和实验大数据技术的学习项目，涵盖了 **Hadoop**、**Zookeeper**、**Kafka**、**Flink**
和 **Spark**。该项目通过 Docker 简化了设置过程，并提供了通过 **VS Code** 进行集成开发的环境。

### 主要功能

- **完整的 Docker 化环境**：整个大数据技术栈运行在 Docker 容器中，确保跨环境的一致性。
- **VS Code 远程开发**：轻松连接到运行中的 Docker 容器进行开发和调试。
- **预配置的 Hadoop 环境**：简化了初始化、格式化和启动 Hadoop 服务的脚本。
- **灵活的配置**：使用可定制的 Docker 配置，根据需求修改和扩展环境。

## Quick Start 🚀

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mcddhub/mcdd-big-data-study.git --depth=1 && cd mcdd-big-data-study
   ```

2. **Build the Docker Image**:
   ```bash
   docker build -t caobaoqi1029/big-data-study:x.x.x .
   ```

3. **Start the Containers**:
   ```bash
   docker compose up -d
   ```

## 贡献 🤝

我们欢迎贡献！请随时提交 pull request，或查看我们的 [贡献指南](https://github.com/mcddhub/mcdd-big-data-study/blob/main/CONTRIBUTING.md) 以获取更多详细信息。

---


