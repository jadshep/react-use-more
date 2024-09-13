import React from 'react';


//
// Types
//

export type ComplexStateInitialValue<T extends object> = T | (() => T);
export type ComplexStateUpdater<T extends object> = (updatedValue: Partial<T>) => void;


//
// Utils
//

export function observeValueOrFactory<T>(initialValue: T | (() => T)): T {
    if (typeof initialValue === 'function') {
        return (initialValue as () => T)();
    }

    return initialValue;
}

function complexStateInitializer<T extends object>(initialValue: ComplexStateInitialValue<T>): T {
    return {
        ...observeValueOrFactory(initialValue),
    };
}

function complexStateReducer<T extends object>(prevState: T, updatedFields: Partial<T>): T {
    return {
        ...prevState,
        ...updatedFields,
    };
}


//
// Hooks
//

/**
 * Mimics the `setState` method of a class component, managing a state object that can be
 * partially updated
 *
 * @param factory Function that produces the initial state
 */
export function useComplexState<T extends object>(factory: () => T): [T, ComplexStateUpdater<T>];

/**
 * Mimics the `setState` method of a class component, managing a state object that can be
 * partially updated
 *
 * @param initialValue The initial state
 */
export function useComplexState<T extends object>(initialValue: T): [T, ComplexStateUpdater<T>];

export function useComplexState<T extends object>(initialValue: ComplexStateInitialValue<T>): [T, ComplexStateUpdater<T>] {
    const [state, updateState] = React.useReducer(
        complexStateReducer,
        initialValue,
        complexStateInitializer,
    );

    return [
        state as T,
        updateState,
    ];
}

/**
 * Creates a function that can update a single field of a complex state
 *
 * @param setState Complex state setter
 * @param field Field to update
 */
export function useComplexSetter<T extends object, K extends keyof T>(setState: ComplexStateUpdater<T>, field: K) {
    return React.useCallback(function (value: T[K]) {
        // This should be an easy one for TypeScript, but we really gotta spoon-feed it here
        const update: Partial<T> = {};
        update[field] = value;

        setState(update);
    }, [
        setState,
        field,
    ]);
}

/**
 * Creates a function that can update a single field of a complex state after transforming its input
 * 
 * @param setState Complex state setter
 * @param field Field to update
 * @param transformer Function to transform value
 */
export function useComplexSetterTransformative<T extends object, K extends keyof T, TRANSFORMER_ARGS extends []>(
    setState: ComplexStateUpdater<T>,
    field: K,
    transformer: (...args: TRANSFORMER_ARGS) => T[K],
) {
    return React.useCallback(function (...args: TRANSFORMER_ARGS) {
        // TypeScript, should be easy, feeding spoons, bleh
        const value = transformer(...args);

        const update: Partial<T> = {};
        update[field] = value;

        setState(update);
    }, [
        setState,
        field,
        transformer,
    ]);
}
