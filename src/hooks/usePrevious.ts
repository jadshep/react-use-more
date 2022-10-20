import React from 'react';

/**
 * Tracks a value from the previous render
 *
 * Returns the current value on the first render
 *
 * @param currentValue The current value to be returned on the next render
 */
export function usePrevious<T>(currentValue: T): T {
    const currentValueRef = React.useRef<T>(currentValue);

    React.useEffect(function () {
        currentValueRef.current = currentValue;
    });

    return currentValueRef.current;
}

/**
 * Tracks a value from the previous render
 *
 * Takes an initial value that's returned on the first render
 *
 * @param initialValue The value to return on the first render
 * @param currentValue The current value to be returned on the next render
 */
export function usePreviousOrInitial<T>(initialValue: T, currentValue: T): T {
    const currentValueRef = React.useRef<T>(initialValue);

    React.useEffect(function () {
        currentValueRef.current = currentValue;
    });

    return currentValueRef.current;
}
