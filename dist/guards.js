import { SCHEMA_ERROR_CODES, SchemaRunError } from './errors.js';
/** The one JSON Schema target `withJsonSchema` answers: the one OpenAPI 3.1 uses. */
const TARGET = 'draft-2020-12';
const ignore = () => {
    // Capability probes have no asynchronous output channel.
};
const observed = new WeakSet();
/** Best-effort native rejection observation, reserved before constructor/species code can reenter. */
function observe(value) {
    if (typeof value === 'object' && value !== null && !observed.has(value)) {
        observed.add(value);
        try {
            void Promise.prototype.then.call(value, ignore, ignore);
        }
        catch {
            // Non-promises and promises that prohibit handler registration cannot be observed this way.
        }
    }
    return value;
}
/**
 * True when `value` is a Standard Schema v1: it has `~standard` with
 * `version` 1, a string `vendor` and a `validate` function. Functions count,
 * because ArkType types are callable. Uninspectable protocols return false.
 */
export function isStandardSchema(value) {
    try {
        observe(value);
        if ((typeof value !== 'object' && typeof value !== 'function') || value === null)
            return false;
        if (!('~standard' in value))
            return false;
        const standard = observe(value['~standard']);
        return (typeof standard === 'object' &&
            standard !== null &&
            'version' in standard &&
            observe(standard.version) === 1 &&
            'vendor' in standard &&
            typeof observe(standard.vendor) === 'string' &&
            'validate' in standard &&
            typeof observe(standard.validate) === 'function');
    }
    catch (error) {
        observe(error);
        return false;
    }
}
/** True when the schema can also describe itself as JSON Schema (`~standard.jsonSchema`). */
export function hasJsonSchema(schema) {
    try {
        observe(schema);
        const standard = observe(schema['~standard']);
        if (typeof standard !== 'object' || standard === null || !('jsonSchema' in standard))
            return false;
        const converter = observe(standard.jsonSchema);
        return (typeof converter === 'object' &&
            converter !== null &&
            'input' in converter &&
            typeof observe(converter.input) === 'function' &&
            'output' in converter &&
            typeof observe(converter.output) === 'function');
    }
    catch (error) {
        observe(error);
        return false;
    }
}
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
export function withJsonSchema(schema, input, output = input) {
    const standard = schema['~standard'];
    return {
        '~standard': {
            version: 1,
            vendor: standard.vendor,
            types: standard.types,
            // Call through the original so getters and `this` still resolve.
            validate: (value, options) => schema['~standard'].validate(value, options),
            jsonSchema: { input: answer(input), output: answer(output) },
        },
    };
}
/** A converter that returns `json` for draft-2020-12 and throws for any other target. */
function answer(json) {
    return options => {
        if (options.target === TARGET)
            return json;
        throw new SchemaRunError(SCHEMA_ERROR_CODES.unsupportedTarget, `withJsonSchema() answers only the "${TARGET}" target, not "${options.target}"`, `Ask for target "${TARGET}", or give the schema a converter that supports this target.`);
    };
}
//# sourceMappingURL=guards.js.map