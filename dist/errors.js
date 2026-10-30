/** JSON Schema converter errors. Validation failures are returned by `parse`. */
/** Stable error codes of `@arki/schema`. */
export const SCHEMA_ERROR_CODES = {
    /**
     * A `withJsonSchema` converter was asked for a target other than draft-2020-12.
     *
     * @fix Ask for the `draft-2020-12` target.
     * @verify bun run test -- src/vendors.test.ts
     */
    unsupportedTarget: 'ARKI_SCHEMA_E003',
    /**
     * `assert` or `ensure` got a value the schema rejects. The value is a bug in the caller, so it throws instead of returning a failure.
     *
     * @fix Read `issues` on the error, then fix the code that produced the value. Use `parse` where bad data is expected.
     * @verify bun run test -- src/assert.test.ts
     */
    assertFailed: 'ARKI_SCHEMA_E004',
    /**
     * `is`, `assert` or `ensure` got a schema that validates asynchronously. They are synchronous and cannot wait for it.
     *
     * @fix Use `parseAsync`, or a schema that validates synchronously.
     * @verify bun run test -- src/assert.test.ts
     */
    asyncAssert: 'ARKI_SCHEMA_E005',
};
/** A JSON Schema converter was asked for an unsupported target. */
export class SchemaRunError extends Error {
    code;
    /** What to do about it, in one sentence. */
    remediation;
    constructor(code, message, remediation, options) {
        super(`${code}: ${message}`, options);
        this.name = 'SchemaRunError';
        this.code = code;
        this.remediation = remediation;
    }
}
/**
 * A value failed `assert` or `ensure`, or a schema could not run synchronously.
 * The message lists the issues with their paths. It never contains the value,
 * because asserted values are often secrets: `issues` holds redacted messages and plain-key paths.
 */
export class AssertError extends Error {
    code;
    /** The schema's issues, with the value redacted out of each message. Empty for `asyncAssert`. */
    issues;
    /** What to do about it, in one sentence. */
    remediation;
    constructor(code, message, remediation, issues, options) {
        super(`${code}: ${message}`, options);
        this.name = 'AssertError';
        this.code = code;
        this.remediation = remediation;
        this.issues = issues;
    }
}
//# sourceMappingURL=errors.js.map