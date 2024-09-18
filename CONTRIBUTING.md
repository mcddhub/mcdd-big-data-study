
# 🤝 Contributing

Thank you for your interest in contributing to this project! Before submitting your contribution, please review the following guidelines to ensure a smooth process.

## 🔧 Setup

### Frontend Setup (Yarn)

The project's documentation uses [Yarn](https://yarnpkg.com/) for package management. Make sure you have Yarn installed before proceeding.

1. **Fork** the repository and create your branch from `main`.
2. Run `yarn install` in the repository root to install dependencies.
3. Run `yarn run docs:dev` to start the development server.
4. If prompted, click "Install" to install any necessary development scripts.
5. Make your changes and test them locally.

### Backend Setup (Maven)

The project's backend uses [Maven](https://maven.apache.org/) for package management. Ensure Maven is installed before proceeding.

1. **Fork** the repository and create your branch from `main`.
2. Run `mvn compile` in the repository root to compile the project.
3. You’re ready to start making changes!

### Backend Setup (Gradle)

Alternatively, if you are using [Gradle](https://gradle.org/) for the backend setup, follow these steps:

1. **Fork** the repository and create your branch from `main`.
2. Run `./gradlew build` in the repository root to build the project.
3. Run `./gradlew run` to start the backend server locally.
4. You're good to go!

## ✅ Linting and Type Checking

This project uses [ESLint](https://eslint.org/) for linting and [TypeScript](https://www.typescriptlang.org/) for type checking. Ensure your code passes both checks before submitting a pull request.

To run linting and type checking:

```bash
yarn run lint
yarn run test
```

## 📝 Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This ensures clarity and consistency across the project.

**Make sure to mention the related issue number in your commit message or the pull request (PR) description.**

### Example Commit Message:
```
fix: resolve issue with API response (fixes #123)
```

By adhering to these guidelines, you help maintain the project's quality and facilitate collaboration.
