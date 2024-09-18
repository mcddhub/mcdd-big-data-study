
感谢您为我们贡献代码！在提交 pull request 之前，请阅读并遵循以下指南。

## 新模块贡献

如果您贡献了一个新模块，请确保完成以下操作：
1. 将模块名称添加到以下文件中：
    - `./.github/ISSUE_TEMPLATE/bug_report.yaml`
    - `./.github/ISSUE_TEMPLATE/enhancement.yaml`
    - `./.github/ISSUE_TEMPLATE/feature.yaml`
    - `./.github/dependabot.yml`
    - `./.github/labeler.yml`
2. 确保您的模块在 `./docs/` 目录下有相应的文档。

## 依赖升级

- 请不要提交仅包含依赖版本更新的 pull request。每周我们有专门的流程来处理依赖更新。
- 如果升级涉及更多更改（例如弃用的 API），欢迎提交 pull request，描述相关改动和影响。

## 提交前的准备工作

在提交更改之前，请确保执行以下步骤：
1. 运行以下命令检查代码风格并修复问题：
   ```bash
   ./gradlew checkstyleMain checkstyleTest spotlessApply
   ```
2. 修复所有代码风格问题。

## 描述您的更改

请提供关于所做更改的简要描述及其背景：
- 如果是修复问题，请描述问题的表现以及您如何解决它。
- 如果是功能增强，请描述新功能以及它为何有用。
- 如果相关，请引用关联的 issue 编号（使用 `#` 引用）。

## 提交前检查清单

- [ ] 我已阅读并遵循了贡献指南。
- [ ] 我已在本地运行了所有测试并确保通过。
- [ ] 我的更改包含了必要的文档更新。
- [ ] 我已遵循代码风格检查并修复了所有问题。
- [ ] 我已检查并更新了相关 issue 和 PR 模板。
