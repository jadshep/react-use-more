import React from 'react';

function forceUpdateReducer(value: number): number {
    return value + 1;
}

/**
 * Provides a function that forces the component to re-render
 *
 * The returned function has an identical identity between renders
 */
export function useForceUpdate(): () => void {
    return React.useReducer(forceUpdateReducer, 0)[1];
}
