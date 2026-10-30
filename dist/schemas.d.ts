/** Zero-dependency schemas for the two object shapes every codebase checks by hand. */
import type { StandardSchemaV1 } from './types.js';
/**
 * Accepts a non-null object that is not an array: safe to read string keys from.
 * Class instances and dates count. The value is returned as it is. Use it as `is(value, recordSchema)`.
 */
export declare const recordSchema: StandardSchemaV1<Record<string, unknown>>;
/**
 * Accepts an object whose prototype is `Object.prototype` or `null`: object literals and
 * `Object.create(null)`, not class instances, dates or arrays. The value is returned as it is.
 */
export declare const plainObjectSchema: StandardSchemaV1<Record<string, unknown>>;
//# sourceMappingURL=schemas.d.ts.map