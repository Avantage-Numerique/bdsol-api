/**
 * Sanitizer have these 2 mandatory method, but are implemented with static method.
 * This is why this interface isn't used, but please implement with these.
 */
interface Sanitizer {
    sanitize: (raw:string) => string;
    options: () => any;//as for object with any structure for now.
}