import React from 'react';

/**
 * Calls a callback function when the component unmounts
 *
 * A basic usage of `useEffect` could result in an outdated callback being
 * used. This hook uses the most-recently passed callback.
 */
export function useOnUnmount(handler: undefined | null | (() => void)) {
    // Keep the most recent handler in a ref
    const handlerRef = React.useRef<undefined | null | (() => void)>();
    handlerRef.current = handler;

    React.useEffect(() => function () {
        // Call most recent handler on unmount
        handlerRef.current?.();
    }, []);
}
