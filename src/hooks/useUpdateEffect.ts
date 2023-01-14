import React from 'react';

/**
 * Functionally equivalent to useEffect, but omits the initial invocation. Useful for reacting to changes in a value, but not to the initial value itself.
 *
 * Specifying an empty dependency list will prevent the effect from being triggered.
 */
export function useUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
    const wasCalledRef = React.useRef<boolean>(false);

    React.useEffect(function () {
        if (!wasCalledRef.current) {
            wasCalledRef.current = true;
            return;
        }

        return effect();
    }, deps);
}
