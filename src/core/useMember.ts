import React from 'react';

// Symbol that uniquely represents an uninitialized state
// Isn't exported, so it's impossible for outside code to pass its value
const UNINITIALIZED = Symbol();
type UNINITIALIZED = typeof UNINITIALIZED;

/**
 * Holds on to a value for the entire lifetime of a component
 *
 * @param initializer Function that initializes the member (only called on the first render)
 * @returns Member value
 */
export function useMember<T>(initializer: () => T): T {
    const valueRef = React.useRef<T | UNINITIALIZED>(UNINITIALIZED);

    if (valueRef.current === UNINITIALIZED) {
        valueRef.current = initializer();
    }

    return valueRef.current as T;
}

/**
 * Holds on to a value for the entire lifetime of a component
 *
 * @param initializer Function that initializes the member (only called on the first render)
 * @returns Ref containing the member value
 */
export function useMemberRef<T>(initializer: () => T) {
    const valueRef = React.useRef<T | UNINITIALIZED>(UNINITIALIZED);

    if (valueRef.current === UNINITIALIZED) {
        valueRef.current = initializer();
    }

    return valueRef;
}
