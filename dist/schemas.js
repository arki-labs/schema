function hasObjectShape(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function hasPlainPrototype(value) {
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
}
/**
 * Accepts a non-null object that is not an array: safe to read string keys from.
 * Class instances and dates count. The value is returned as it is. Use it as `is(value, recordSchema)`.
 */
export const recordSchema = {
    '~standard': {
        version: 1,
        vendor: 'arki',
        validate: value => (hasObjectShape(value) ? { value } : { issues: [{ message: 'Expected an object.' }] }),
    },
};
/**
 * Accepts an object whose prototype is `Object.prototype` or `null`: object literals and
 * `Object.create(null)`, not class instances, dates or arrays. The value is returned as it is.
 */
export const plainObjectSchema = {
    '~standard': {
        version: 1,
        vendor: 'arki',
        validate: value => hasObjectShape(value) && hasPlainPrototype(value)
            ? { value }
            : { issues: [{ message: 'Expected a plain object.' }] },
    },
};
//# sourceMappingURL=schemas.js.map