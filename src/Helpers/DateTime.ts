//TIME Helpers

/**
 * Return a now date object directly
 * Create a new instance of Date every time.
 */
export const now = ():Number => {
    return new Date().getTime();
}