export namespace Utils {
    export type ValueOrFactory<T> = T | (() => T);

    /**
     * Checks if a partial update of an object would cause the fields to actually change
     */
    export function haveObjectFieldsMeaningfullyChanged<T extends object>(prevValue: T, updatedFields: Partial<T>): boolean {
        const keys = Object.keys(updatedFields) as (keyof T)[];

        for (const key of keys) {
            if (updatedFields[key] !== prevValue[key]) {
                return true;
            }
        }

        return false;
    }

    /**
     * Takes a value or value factory and returns a value
     *
     * Any function input will be considered to be a factory
     * To have a function as a value, provide a factory that returns the function
     *
     * @param initialValue The final value or a function that produces it
     * @returns The final value
     */
    export function observeValueOrFactory<T>(initialValue: ValueOrFactory<T>): T {
        if (typeof initialValue === 'function') {
            return (initialValue as () => T)();
        }

        return initialValue;
    }
}
