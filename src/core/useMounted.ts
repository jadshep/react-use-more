import React from 'react';

import { useMember } from './useMember';

/**
 * Returns a function to observe the current mounted status of the component
 */
export function useMounted(): () => boolean {
    const mountedRef = React.useRef<boolean>(true);

    React.useEffect(() => function () {
        mountedRef.current = false;
    }, []);

    return useMember(function () {
        return () => mountedRef.current;
    });
}
