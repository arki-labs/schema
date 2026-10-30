/** Reading the issues a schema reports, the same way for every validator. */
import type { StandardSchemaV1 } from './types.js';
/**
 * The path of an issue as plain keys: `{ key }` segments (Valibot writes
 * these) are unwrapped. Empty when the issue is about the whole value.
 */
export declare function pathOf(issue: StandardSchemaV1.Issue): readonly PropertyKey[];
/** One line for people: `"a.0.b: message; message"`. A root issue has no path prefix. */
export declare function formatIssues(issues: readonly StandardSchemaV1.Issue[]): string;
//# sourceMappingURL=issues.d.ts.map