import type { StandardSchemaV1 } from './types.js';
/** How a failed `assert` or `ensure` describes itself. */
export type AssertOptions = {
    /** Replaces the default headline. A function is called only on failure. */
    readonly message?: string | (() => string);
    /** Names the value in the message, such as `"PORT"`. */
    readonly at?: string;
};
/**
 * True when `value` matches the schema. It is a guard, so a rejected value is `false`, never a throw.
 * An async schema throws `ARKI_SCHEMA_E005` instead of answering `false`, because `false` would
 * silently mean "invalid" for data that may be fine.
 *
 * @example
 * if (is(input, Port)) listen(input);
 */
export declare function is<Schema extends StandardSchemaV1>(value: unknown, schema: Schema): value is StandardSchemaV1.InferInput<Schema>;
/**
 * Throw `AssertError` unless `value` matches the schema, and narrow the variable to the schema's
 * input type. It never transforms: use {@link ensure} for the output. A rejection is a bug in the
 * caller (`ARKI_SCHEMA_E004`); use `parse` where bad data is expected.
 *
 * @example
 * assert(config, ConfigSchema, { at: 'config' });
 */
export declare function assert<Schema extends StandardSchemaV1>(value: unknown, schema: Schema, options?: AssertOptions): asserts value is StandardSchemaV1.InferInput<Schema>;
/**
 * The schema's output, or `AssertError`: a throwing `parse`.
 *
 * @example
 * const port = ensure(process.env.PORT, z.coerce.number(), { at: 'PORT' });
 */
export declare function ensure<Schema extends StandardSchemaV1>(value: unknown, schema: Schema, options?: AssertOptions): StandardSchemaV1.InferOutput<Schema>;
//# sourceMappingURL=assert.d.ts.map