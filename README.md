# react-use-more
A collection of additional React hooks for common use cases beyond what is included in the React core. These hooks are meant to be basic building blocks for React projects, covering functionality that is useful but not necessarily included in the core library.

## Installation
```bash
npm install react-use-more
```
## Hooks

### `useForceUpdate`
Provides a function that forces the component it was created in to re-render when called. This is only intended as a last resort and should be avoided in favor of restructuring your component state.

### `useInstantRef`
This hook tracks the value most recently passed in, making it instantly available as a ref. It has the most up-to-date value when accessed through a stale callback.

### `useMember`
This hook retains the same value for the entire lifetime of a component. It's initialized by calling the factory function provided to it on first render, and the factory function is never called again. This hook is intended to act like members in class components.

### `useMemberRef`
This hook functions identically to useMember, but returns a ref. This allows the value to be fully replaced any time after initialization.

### `useMounted`
This hook returns a function that can be called anywhere and anytime to determine if the component is currently mounted. This is useful when working with asynchronous code or when needing to know the mounted state of the component outside of the render cycle. The function returned by useMounted will always have the same identity, so it can be safely passed as a dependency to other hooks or functions without causing unnecessary re-renders.

### `useOnUnmount`
This hook allows you to register a cleanup function that will be called when a component unmounts. It ensures that the function passed to it is the most recent one, as opposed to just returning a cleanup function from useEffect with an empty dependency list (`useEffect(() => cleanup, [])`), which would call the function passed to it on mount, which could be out-of-date.

## Legacy Hooks
### `useComplexState`
This hook manages a state object that can be partially updated. It's similar to setState in class components, but in the form of useState for functional components. This allows for updating only a part of the state object rather than the entire object at once.

### ~~`useComplexSetter`~~ (DEPRECATED)
This hook returns a function that updates a single field of a complex state through a single parameter. It works with useComplexState or any other custom state hook that provides a setState function with the same interface.

### ~~`useComplexSetterTransformative`~~ (DEPRECATED)
This hook functions identically to useComplexSetter, but allows for transforming the value before it's set. This can be useful for extracting updated values from input fields or other computations.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
