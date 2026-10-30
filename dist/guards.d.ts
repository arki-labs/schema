/** Telling schemas apart at runtime, and giving one a JSON Schema. */
import type { SchemaWithJson, StandardSchemaV1 } from './types.js';
/**
 * True when `value` is a Standard Schema v1: it has `~standard` with
 * `version` 1, a string `vendor` and a `validate` function. Functions count,
 * because ArkType types are callable. Uninspectable protocols return false.
 */
export declare function isStandardSchema(value: unknown): value is StandardSchemaV1;
/** True when the schema can also describe itself as JSON Schema (`~standard.jsonSchema`). */
export declare function hasJsonSchema<Input, Output>(schema: StandardSchemaV1<Input, Output>): schema is SchemaWithJson<Input, Output>;
/**
 * A new schema that validates like `schema` and describes itself with the
 * given JSON Schema (`output` defaults to `input`). Use it for a validator
 * that cannot produce JSON Schema on its own. It answers only the
 * `draft-2020-12` target; any other throws `ARKI_SCHEMA_E003`.
 *
 * The result is a new object: the original's own methods (such as zod's
 * `.parse`) are not on it.
 *
 * @example
 * const Name = withJsonSchema(v.string(), { type: 'string' });
 */
export declare function withJsonSchema<Input, Output>(schema: StandardSchemaV1<Input, Output>, input: Record<string, unknown>, output?: Record<string, unknown>): SchemaWithJson<Input, Output>;
//# sourceMappingURL=guards.d.ts.map