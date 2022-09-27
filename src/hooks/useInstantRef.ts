import React from 'react';

/**
 * Stores the input from the most recent render in a ref
 */
export function useInstantRef<T>(data: T) {
    const dataRef = React.useRef<T>(data);
    dataRef.current = data;

    return dataRef;
}
