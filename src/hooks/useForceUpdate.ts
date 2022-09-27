import React from 'react';

function forceUpdateReducer(value: boolean): boolean {
    return !value;
}

/**
 * Provides a function that forces the component to re-render
 *
 * The returned function has an identical identity between renders
 */
export function useForceUpdate(): () => void {
    const [, dispatch] = React.useReducer(forceUpdateReducer, false);
    return dispatch;
}
