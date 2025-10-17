# FlexiQuiz Contributing Guide

Thank you for considering contributing to FlexiQuiz! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites

- Node.js v16+ and npm
- MongoDB (local or Atlas)
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/flexiquiz.git
   cd flexiquiz
   ```

3. Set up the backend:
   ```bash
   cd mern-flexiquiz/server
   npm install
   cp .env.example .env  # Create and configure .env file
   npm run dev
   ```

4. Set up the frontend:
   ```bash
   cd ../../frontend/QuizApp
   npm install
   cp .env.example .env  # Create and configure .env file
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention

- `feature/your-feature-name` - For new features
- `fix/issue-description` - For bug fixes
- `docs/documentation-update` - For documentation updates
- `refactor/component-name` - For code refactoring

### Commit Message Guidelines

We follow conventional commits format:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code formatting, missing semi-colons, etc (no code change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Build process, dependencies, etc.

Example:
```
feat: implement password reset functionality
```

### Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update documentation if needed
3. Add tests for new features
4. Make sure all tests pass
5. Submit a pull request to the `develop` branch

### Code Review Checklist

- Code follows the project's style guide
- Changes are well-documented
- Tests cover the new functionality
- No unnecessary dependencies added
- No sensitive information is committed

## Project Standards

### Code Style

We follow the style guidelines outlined in our [Code Style Guide](./code-style-guide.md).

For JavaScript/React:
- Use ESLint for code linting
- Follow modern React practices (functional components, hooks)
- Write JSDoc comments for functions and components

### Testing

- Write tests for new features and bug fixes
- Maintain or improve test coverage
- Test both success and failure cases

### Documentation

Update documentation when you make changes:

- Component documentation
- API endpoint documentation
- Environment configuration
- User guides (if applicable)

## Working with Issues

### Finding Issues to Work On

- Look for issues labeled `good first issue` or `help wanted`
- Check the project roadmap for planned features
- Discuss potential features in the project discussions

### Creating a New Issue

When creating a new issue:

1. Use a clear, descriptive title
2. Provide detailed steps to reproduce bugs
3. Include screenshots or recordings if applicable
4. Add relevant labels
5. For feature requests, explain the motivation and benefits

## Release Process

1. Changes are merged into the `develop` branch
2. When ready for release, `develop` is merged into `main`
3. A new tag is created with semantic versioning
4. CI/CD pipeline deploys to production

## Communication Channels

- GitHub Issues: For bugs, feature requests, and formal discussions
- Project Discussions: For questions and open-ended conversations
- Pull Requests: For code reviews and implementation discussions

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior include:
- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Enforcement

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

## Acknowledgments

Thank you to all contributors who have helped make FlexiQuiz better!