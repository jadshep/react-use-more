import React from 'react';

import { Utils } from '../utils';


///////////
// Types //
///////////

export type ComplexStateInitialValue<T extends object> = T | (() => T);
export type ComplexStateUpdater<T extends object> = (updatedValue: Partial<T>) => void;


///////////
// Utils //
///////////

function complexStateInitializer<T extends object>(initialValue: ComplexStateInitialValue<T>): T {
    return {
        ...Utils.observeValueOrFactory(initialValue),
    };
}

function complexStateReducer<T extends object>(prevState: T, updatedFields: Partial<T>): T {
    return {
        ...prevState,
        ...updatedFields,
    };
}


///////////
// Hooks //
///////////

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /// @ts-ignore
        setState({ [field]: value });
    }, [field]);
}
