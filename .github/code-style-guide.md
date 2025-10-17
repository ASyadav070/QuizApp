# Code Style Guide for FlexiQuiz

This document outlines the coding standards and best practices for the FlexiQuiz project.

## JavaScript/React

### General Principles

- Use modern ES6+ syntax
- Prefer functional components over class components
- Use named exports for better import autocompletion
- Follow the principle of single responsibility

### File Organization

- Group related files by feature or domain
- Keep component files relatively small (<300 lines)
- Place utility functions in appropriate utils files

### Naming Conventions

- **Components**: PascalCase (e.g., `QuestionCard.jsx`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE for truly constant values
- **Files**: 
  - React components: PascalCase (e.g., `Button.jsx`)
  - Utilities and other files: camelCase (e.g., `api.js`)
- **Contexts**: PascalCase followed by "Context" (e.g., `ThemeContext`)

### Components

- Keep components focused on a single responsibility
- Extract reusable UI elements into separate components
- Use custom hooks for reusable logic
- Destructure props for clarity
- Use proper prop validation (consider adding PropTypes)

```jsx
// Good
const Button = ({ variant, onClick, children }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Avoid
const Button = (props) => {
  return (
    <button className={`btn btn-${props.variant}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
```

### Hooks Usage

- Follow React hooks rules (don't use hooks conditionally)
- Place hooks at the top of your component
- Use appropriate dependency arrays for useEffect
- Create custom hooks for reusable stateful logic

```jsx
// Good
const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => setValue(e.target.value);
  return { value, onChange: handleChange };
};

// In component
const emailInput = useFormInput('');
```

### State Management

- Use local state for component-specific state
- Use context for global state (theme, auth)
- Avoid prop drilling by using context or custom hooks
- Keep context providers focused on specific domains

## Styling with Tailwind CSS

- Use Tailwind utility classes directly in JSX
- Group related utilities with Tailwind's group syntax
- Utilize the `@apply` directive for repetitive utility combinations in CSS files
- Use consistent color schemes from the tailwind.config.js

```jsx
// Good
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
  Click me
</button>

// For repetitive patterns, consider custom classes in CSS:
// .btn-primary { @apply px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded; }
```

## Backend (Node.js/Express)

### API Structure

- Use RESTful routing conventions
- Group related endpoints in route files
- Implement controllers for route logic
- Use middleware for cross-cutting concerns

### Error Handling

- Use try/catch blocks in async functions
- Return appropriate HTTP status codes
- Provide meaningful error messages
- Centralize error handling when possible

```js
// Good
try {
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.json(user);
} catch (err) {
  console.error(err.message);
  res.status(500).json({ msg: "Server error" });
}
```

### Authentication

- Use JWT for stateless authentication
- Store tokens securely (localStorage for now, consider httpOnly cookies later)
- Validate tokens on protected routes
- Implement proper error handling for auth failures

## Testing Guidelines

When implementing tests, follow these practices:

- Write tests for critical business logic
- Focus on behavior, not implementation details
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

```js
// Good
test('should show error message when login fails', async () => {
  // Arrange
  render(<Login />);
  mockApiFailure();
  
  // Act
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
  fireEvent.click(screen.getByText('Login'));
  
  // Assert
  expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
});
```

## Git Workflow

- Write clear, descriptive commit messages
- Use feature branches for new development
- Perform code reviews before merging
- Keep commits focused on single logical changes