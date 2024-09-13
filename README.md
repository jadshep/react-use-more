# react-use-more
>This project is still in development and lacks complete testing. For the time being, this readme was generated by stapling together text generated by ChatGPT after discussing the goals of the project and the use and intentions of the various functionality. Everything that made it into the readme was vetted and lightly edited, and will be replaced with more descriptive and specific text upon proper release. This disclaimer was generated by ChatGPT, which means that even this disclaimer about the disclaimer was generated by ChatGPT.

A collection of additional React hooks for common use cases beyond what is included in the React core. These hooks are meant to be basic building blocks for React projects, covering functionality that is useful but not necessarily included in the core library.

The package includes hooks for managing complex state, working with the component lifecycle, and debugging, among others. Each hook has a clear and concise API, and is designed to be easy to use and understand.

## Installation
```bash
npm install react-use-more
```
## Hooks
The following custom hooks are available in this package:

- [useComplexState](#usecomplexstate)
- [useComplexStateConservative](#usecomplexstateconservative)
- [useComplexSetter](#usecomplexsetter)
- [useComplexSetterTransformative](#usecomplexsettertransformative)
- [useForceUpdate](#useforceupdate)
- [useInstantRef](#useinstantref)
- [useMember](#usemember)
- [useMemberRef](#usememberref)
- [useMounted](#usemounted)
- [useOnUnmount](#useonunmount)

### `useComplexState`
This hook manages a state object that can be partially updated. It's similar to setState in class components, but in the form of useState for functional components. This allows for updating only a part of the state object rather than the entire object at once.

### `useComplexStateConservative`
This hook functions identically to useComplexState, but will only update if the call to setState causes a meaningful change to the state. This is checked by shallowly comparing each field passed to setState against the existing state.

### `useComplexSetter`
This hook returns a function that updates a single field of a complex state through a single parameter. It works with useComplexState, useComplexStateConservative, or any other custom state hook that provides a setState function with the same interface.

### `useComplexSetterTransformative`
This hook functions identically to useComplexSetter, but allows for transforming the value before it's set. This can be useful for extracting updated values from input fields or other computations.

### `useForceUpdate`
This hook returns a function that can be called to force a component to re-render. This can be useful in certain situations, but should only be used as a last resort, as it can negatively impact performance and lead to confusing code.

### `useInstantRef`
This hook tracks the value most recently passed in, making it instantly available as a ref. It has the most up-to-date value when accessed through a stale callback. This can be useful for accessing values that may be stale due to the asynchronous nature of React.

### `useMember`
This hook holds the same value for the entire lifetime of a component. Its value is generated by calling the factory function provided to it on first render, and the factory function is never called after the first render. This hook is intended to act like members in class components.

### `useMemberRef`
This hook functions identically to useMember, but returns a ref. This allows the value to be fully replaced any time after initialization.

### `useMounted`
This hook returns a function that can be called anywhere and anytime to determine if the component is currently mounted. This is useful when working with asynchronous code or when needing to know the mounted state of the component outside of the render cycle. The function returned by useMounted will always have the same identity, so it can be safely passed as a dependency to other hooks or functions without causing unnecessary re-renders.

### `useOnUnmount`
This hook allows you to register a cleanup function that will be called when a component unmounts. It ensures that the function passed to it is the most recent one, as opposed to just returning a cleanup function from useEffect with an empty dependency list (`useEffect(() => cleanup, [])`), which would call the function passed to it on mount, which could be out-of-date.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
