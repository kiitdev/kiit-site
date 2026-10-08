---
sidebar_position: 1
title: kiit-codes
slug: /kiit-codes
hide_title: true
---

import GroupBadge from '@site/src/components/GroupBadge';
import CodeBadge from '@site/src/components/CodeBadge';
import BackToTop from '@site/src/components/BackToTop';
import ConceptTermLink from '@site/src/components/ConceptTermLink';
import MoreLink from '@site/src/components/MoreLink';
import Spacer from '@site/src/components/Spacer';
import PageTitle from '@site/src/components/PageTitle';
import Icon from '@site/src/components/Icon';
import Example from '@site/src/components/Example';
import StatusBadge from '@site/src/components/StatusBadge';
import CodeCard from '@site/src/components/CodeCard';
import Diagram from '@site/src/components/Diagram';

<PageTitle title="kiit-codes" logo="/img/modules/kiit-codes-logo.png" />

<p className="kiit-tagline">A Kotlin library for classifying and handling success and failure.</p>

A small, dependency-free status and error taxonomy for application outcomes, with
extensible codes, protocol mappings, validation, typed exceptions, and
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) problem details.

<Diagram src="/img/kiit-codes/kiit-codes-overview.png" alt="Kiit Codes overview" />

## Overview

### Goals

General-purpose status codes. Like HTTP status codes, but not tied to HTTP or a specific protocol. A three-tier status taxonomy (Status → Group → Code) for any
layer of your app, with built-in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) Problem Details output.

This is how a code is constructed: a name, a title, an origin that says who owns it, and an optional scope inside that origin.

<CodeCard
  language="kotlin"
  code={{
    kotlin: `val MISSING_DATE = Invalid(
      name = "MISSING_DATE",
      title = "Date not supplied",
      origin = "samples.kiit.dev",
      scope = "tasks",
  )`,
    java: `Failed.Invalid MISSING_DATE = new Failed.Invalid(
      "MISSING_DATE",
      "Date not supplied",
      "samples.kiit.dev",
      "tasks");`,
    typescript: `const MISSING_DATE: Invalid = Invalid(
    "MISSING_DATE",
    "Date not supplied",
    "samples.kiit.dev",
    "tasks",
  );`,
    swift: `let MISSING_DATE = Failed.Invalid(
      name: "MISSING_DATE",
      title: "Date not supplied",
      origin: "samples.kiit.dev",
      scope: "tasks"
  )`,
  }}
/>

:::info[Inspiration]
1. **HTTP and gRPC**: The eight groups were validated against their status codes, not derived from them.
2. **RFC 9457**: The problem details format shaped how a status becomes a response body.
:::

<Spacer />

### Languages

| # | Target | Role | Status | Notes |
|---:|---|---|---|---|
| 1 | Kotlin | Original | <StatusBadge status="Live" /> | Canonical model, in production use for years. |
| 2 | TypeScript | Native port | <StatusBadge status="Beta" /> | Same model, written in TypeScript. |
| 3 | Swift | Multiplatform | <StatusBadge status="POC" /> | XCFramework through SKIE. |

<Spacer />

### License

Refer to the [LICENSE](https://github.com/kiitdev/kiit-codes/blob/main/LICENSE) file in the repository.

<BackToTop />

## Setup

### Install

<Example id="setup-install" />

| # | Language | Artifact | Registry |
|---:|---|---|---|
| 1 | Kotlin, Java | [dev.kiit:kiit-codes](https://central.sonatype.com/artifact/dev.kiit/kiit-codes) | Maven Central |
| 2 | TypeScript | [@kiitdev/codes](https://www.npmjs.com/package/@kiitdev/codes) | npm |
| 3 | Swift | KiitCodes | Swift Package Manager, link to come |

<Spacer />

### Imports

<Example id="setup-imports" />

<Spacer />

### Sources

| # | Link | Details |
|---:|---|---|
| 1 | Repository | [github.com/kiitdev/kiit-codes](https://github.com/kiitdev/kiit-codes) |
| 2 | Kotlin source | [kiit-codes/src/commonMain/kotlin](https://github.com/kiitdev/kiit-codes/tree/main/kiit-codes/src/commonMain/kotlin) |
| 3 | TypeScript port | [ports/kiit-codes-ts](https://github.com/kiitdev/kiit-codes/tree/main/ports/kiit-codes-ts) |
| 4 | Sample apps | [samples](https://github.com/kiitdev/kiit-codes/tree/main/samples) |

<BackToTop />

## Tutorial

A to-do list, one quick win at a time. Each step builds on the last.

### Return a status

Return a `Status` instead of throwing for a failure you expect:

<Example id="tutorial-status" />

<Spacer />

### Validate and Match

Return a `Checked` to carry the status and the errors together, then match on whether it passed or failed:

<Example id="tutorial-validate" />

:::note[Match in more depth]
1. **By group**: Branch on `Restricted`, `Invalid`, `Rejected` or `Unserved` inside `Failed`.
2. **By code**: Branch on one specific code, such as `Rejected.CONFLICT`, before the broader branches.
3. **More**: See [Status: Pattern matching](#status-pattern-matching).
:::

See [Errors](#errors) for the types.

<Spacer />

### Build an RFC 9457 problem

Send the failure to an HTTP client as an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) problem, the IETF standard for API errors that clients and tools already understand.
The errors fill `detail` and `errors`, and the problem also carries `code`, the exact status. For calls between your own services, the same failure as kiit's
self-contained `CodeDetail` takes one more line:

<Example id="tutorial-problem" />

The problem as JSON:

```json title="RFC 9457 problem"
{
  "type": "https://www.kiit.dev/docs/kiit-codes?code=Failed:Invalid:INVALID_VALUE#taxonomy",
  "title": "The request had an invalid value.",
  "detail": "Validation failed",
  "code": "kiit.dev:codes:Failed:Invalid:INVALID_VALUE",
  "status": 400,
  "errors": [
    {
      "field": "title",
      "message": "must not be blank"
    }
  ]
}
```

The `CodeDetail` as JSON:

```json title="CodeDetail (self-contained)"
{
  "code": "kiit.dev:codes:Failed:Invalid:INVALID_VALUE",
  "title": "The request had an invalid value.",
  "detail": "Validation failed",
  "success": false,
  "errors": [
    {
      "field": "title",
      "message": "must not be blank"
    }
  ]
}
```

See the [Guide](#response-json) to write both as JSON.

<BackToTop />

## Explanation

### Taxonomy

A `Status` is the outcome of any operation, at any layer: a service call, a job step, an API request, a CLI command.
It says what *kind* of success or failure happened, in one shape everywhere, and nothing about this one occurrence.
Those details belong to an [`Err`](#errors). The tiers are `Status`, then `Group`, then `Code`: the two `Status` branches,
the eight groups, and the codes within them.

<Diagram src="/img/kiit-codes/kiit-codes-taxonomy.png" alt="Kiit Codes taxonomy" />

| Tier | Parent | Fixed/Open | Children | Description |
|---|---|---|---|---|
| 1 | <span style={{fontFamily: 'var(--ifm-font-family-monospace)', fontWeight: 800, color: 'var(--ifm-color-primary)'}}>Status</span> | <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.3rem'}}><Icon name="lock" size={16} /> Fixed</span> | <GroupBadge group="Passed" /> | |
| | | | <GroupBadge group="Failed" /> | |
| 2 | <span style={{fontFamily: 'var(--ifm-font-family-monospace)', fontWeight: 800, color: 'var(--ifm-color-primary)'}}>Group</span> | <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.3rem'}}><Icon name="lock" size={16} /> Fixed</span> | <GroupBadge group="Succeeded" /> | The operation completed successfully. |
| | | | <GroupBadge group="Pending" /> | The operation was accepted but has not yet fully resolved. |
| | | | <GroupBadge group="Excluded" /> | The item was intentionally excluded from the operation. |
| | | | <GroupBadge group="Information" /> | The response provides information; no operation was performed. |
| | | | <GroupBadge group="Restricted" /> | The caller is not allowed. |
| | | | <GroupBadge group="Invalid" /> | The request itself is wrong. |
| | | | <GroupBadge group="Rejected" /> | The caller was allowed, but the business refuses it. |
| | | | <GroupBadge group="Unserved" /> | The system can't serve it right now, though nothing was wrong with the request. |
| 3 | <span style={{fontFamily: 'var(--ifm-font-family-monospace)', fontWeight: 800, color: 'var(--ifm-color-primary)'}}>Code</span> | <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.3rem'}}><Icon name="lock-open" size={16} /> Open + Defaults</span> | | Ships with common built-in codes (e.g. `SUCCESS`, `DENIED`); extensible with custom, domain-specific codes within the same group. |

Each group has a default code for when nothing more specific applies. `Invalid.DEFAULT` is `INVALID_VALUE`, and `isDefault` is true for a group's default and for no other code. The full list is in [Codes](#codes).

<Diagram src="/img/kiit-codes/kiit-codes-custom.png" alt="Kiit Codes custom codes" />

Every Status carries the same six fields, built-in or custom:

| Field | Why it exists |
|---|---|
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L97">success</ConceptTermLink> | `true` for `Passed`, `false` for `Failed`. A quick check that doesn't need the group. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L100">group</ConceptTermLink> | The kind of outcome (`Succeeded`, `Invalid`, ...). Lets generic code handle any Status, including custom ones, without knowing its name. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L56">name</ConceptTermLink> | A stable, `SCREAMING_SNAKE_CASE` key that logs, metrics and clients can match on. Never built from runtime data. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L91">title</ConceptTermLink> | A constant, human-readable title for the code, not a description of one occurrence. It fills `title` in a `Problem` and a `CodeDetail`. Per-occurrence detail lives in an `Err`. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L70">origin</ConceptTermLink> | Who owns the code: `kiit.dev` for built-ins, your domain or a name of your own for custom codes. Keeps custom codes apart from the built-in ones and other teams', and becomes the host of an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) `type`. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L84">scope</ConceptTermLink> | An optional label inside an origin, such as a department or product area (`payments.cards`). Empty when unset. Never parsed. |

:::warning[Choose a specific origin]
1. **Domain**: A domain you own is unique through DNS, so your codes can't collide with anyone else's.
2. **Plain id**: A plain id such as `myapp1` can collide with another team's, and kiit-codes can't detect it. Pick a specific name.
3. **Also a host**: A domain origin becomes the host of the [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) `type`, for example `https://samples.kiit.dev/docs/codes/...`. A plain id is not a host, so its `type` is the relative `/docs/codes/...`. Register a base URL to get an absolute one.
:::

<Spacer />

### Errors

A `Status` is the kind of outcome. The details of one occurrence travel separately, in three types:

| Type | What it is |
|---|---|
| `Err` | The details of one occurrence: which field, what value, what message. The variants and builders are in [Err types](#err-types). |
| `Checked` | A status and its errors together, so they never disagree: a passing `Checked` has no errors, a failing one has at least one. `collect(...)` combines several into one. |
| `StatusException` | For boundaries that only understand exceptions, with one subclass per failed group: `RestrictedException`, `InvalidException`, `RejectedException` and `UnservedException`. `Failed.toException(errors)` picks the right one. |

:::tip[Status or Err?]
1. **Status**: The kind of outcome, constant: `Invalid.INVALID_VALUE`.
2. **Err**: The details of this occurrence: which field, what value, what message.
3. **Together**: `Checked` carries both, so a status and its errors travel together.
:::

See [Validate and Match](#validate-and-match) and [Exceptions](#error-handling-exceptions).

<Spacer />

### Responses

How a status becomes a protocol code. For a response body, see [RFC 9457](#rfc-9457).

<Diagram src="/img/kiit-codes/kiit-codes-protocols.png" alt="Kiit Codes protocol mappings" />

| Type | Purpose |
|---|---|
| `CodesToHttp` | Maps `Status` to HTTP status codes. |
| `CodesToGrpc` | Maps `Status` to gRPC status codes. |
| `CodeLookup` | Interface for a mapping to any other protocol. |
| `CompositeLookup` | Combines a base `CodeLookup` with per-code overrides. |

:::info[One way only]
1. **No reverse conversion**: An HTTP or gRPC code can't give back a `Status`, since many share one code.
2. **Carry the status instead**: Send the `code` of a `CodeDetail` or `Problem`, the exact status.
:::

<Spacer />

### RFC 9457

[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) is the IETF standard for error responses from HTTP APIs, and it replaces RFC 7807.
kiit-codes returns it as a `Problem`, so clients and tools that already understand problem details work with it as they are.
It adds `errors` and `code` as extension members. For calls between your own services, where HTTP and a public URL don't apply,
`CodeDetail` is a lighter, self-contained shape. The same validation failure in both:

```json title="Problem (RFC 9457)"
{
  "type": "https://www.kiit.dev/docs/kiit-codes?code=Failed:Invalid:INVALID_VALUE#taxonomy",
  "title": "The request had an invalid value.",
  "detail": "Validation failed",
  "code": "kiit.dev:codes:Failed:Invalid:INVALID_VALUE",
  "status": 400,
  "errors": [
    {
      "field": "title",
      "message": "must be 1-100 characters"
    },
    {
      "field": "listId",
      "message": "unknown list"
    }
  ]
}
```

```json title="CodeDetail (self-contained)"
{
  "code": "kiit.dev:codes:Failed:Invalid:INVALID_VALUE",
  "title": "The request had an invalid value.",
  "detail": "Validation failed",
  "success": false,
  "errors": [
    {
      "field": "title",
      "message": "must be 1-100 characters"
    },
    {
      "field": "listId",
      "message": "unknown list"
    }
  ]
}
```

They use the same field names:

| Field | Problem | CodeDetail |
|---|---|---|
| `type` | the problem's identity and its docs URL | none |
| `code` | the exact status, an extension member | the exact status |
| `title` | the fixed text of the status | the fixed text of the status |
| `detail` | this occurrence | this occurrence |
| `instance` | this occurrence | this occurrence |
| `errors` | every error, an extension member | every error |
| `status` | the HTTP status, always set | the HTTP status, optional |
| `success` | none | `true` or `false` |

:::info[Three differences on purpose]
1. **type**: Only `Problem` has it. RFC 9457 makes it the problem's identifier and docs link.
2. **status**: Optional on `CodeDetail`, since an HTTP status only makes sense over HTTP.
3. **success**: Only on `CodeDetail`, so a reader sees pass or fail without parsing `code`.
:::

`code` is the origin, the scope and then the status code, so one field says which status it is. Built-in statuses use the scope `codes`.
`type` names the same status as a URL, and the two differ:

| | `Problem.type` | `code` |
|---|---|---|
| Identity | yes, RFC 9457's primary identifier | yes, exact |
| Docs | yes, when it resolves | no |
| Self-contained | no, needs a host or a base | yes |
| Case | lowercase with dashes | as written |

Every error goes into `errors`. Each entry has only a field and a message. The cause and the value that failed validation are left out
on purpose, since echoing them back is a disclosure risk.

:::tip[Which one?]
1. **Problem**: An HTTP API that other parties call.
2. **CodeDetail**: Calls between your own services, and jobs.
3. **Neither**: When the status alone is enough.
4. **Passed statuses**: RFC 9457 describes problems, so use a `Problem` for `Failed` and a `CodeDetail` for `Passed`.
:::

<BackToTop />

## Guide

Recipes for common tasks, grouped like the topics in Explanation.

| # | Recipe | Use it to |
|---:|---|---|
| 1 | [Status: Built-ins](#status-built-ins) | Use a standard outcome, or a group's default |
| 2 | [Status: Custom code](#status-custom-code) | Name an outcome that is specific to your domain |
| 3 | [Status: Pattern matching](#status-pattern-matching) | Turn a status into a response or a decision |
| 4 | [Error Handling: Collect errors](#error-handling-collect-errors) | Report all the problems at once |
| 5 | [Error Handling: Error details](#error-handling-error-details) | Say which field failed and why |
| 6 | [Error Handling: Exceptions](#error-handling-exceptions) | Cross a boundary that only understands exceptions |
| 7 | [Error Handling: Result](#error-handling-result) | Pair a value with a status, with kiit-result |
| 8 | [Response: JSON](#response-json) | Send an error body to a client |
| 9 | [Response: Type URL](#response-type-url) | Know which `type` a status produces |
| 10 | [Response: Custom type URL](#response-custom-type-url) | Change the suffix, the base, or the whole URL |
| 11 | [Response: HTTP and gRPC](#response-http-and-grpc) | Pick the response code at the edge of your service |
| 12 | [Response: Custom protocol](#response-custom-protocol) | Give a custom code its own value, such as 402 |

### Status: Built-ins

Use a built-in code for a standard outcome. When you only know the kind of outcome and not the exact code, use the group's default. Statuses are values, so a test can compare them directly with `assertEquals(Rejected.CONFLICT, tasks.create("groceries"))`.

<Example id="guide-builtins" />

<Spacer />

### Status: Custom code

Use it when a built-in code is too generic for your domain, such as a payment that was declined. A custom code stays in one of the
eight groups, so generic handling still works on it. Pick an origin you own, such as a domain.

<Example id="guide-custom-code" />

<Spacer />

### Status: Pattern matching

Use it to turn a status into a response, a log level or a retry decision. Match a code first, then a group, then the broad
branches, because the first branch that fits wins and a broader branch above a specific one means the specific one never runs.

<Example id="guide-pattern-matching" />

<Spacer />

### Error Handling: Collect errors

Use it for a form or a request with several fields, so the caller sees every problem in one response and not one at a time.

<Example id="guide-collect-errors" />

<Spacer />

### Error Handling: Error details

Use it to say which field failed and why. Leave the value out for a sensitive field, so it is never echoed back.

<Example id="guide-error-details" />

<Spacer />

### Error Handling: Exceptions

Use it when a framework or a callback only understands exceptions. `toException()` picks the subclass for the status group, so
the caller can catch the kind of failure it cares about. In Java it is a checked exception. Kotlin exceptions do not bridge to Swift's `Error`, so there is no Swift tab.

<Example id="guide-exceptions" />

<Spacer />

### Error Handling: Result

Use [kiit-result](/docs/kiit-result) when a function should return a value on success and a failure otherwise. It builds a `Result<T, E>` on
this same taxonomy.

<Spacer />

### Response: JSON

Use a `Problem` for an HTTP API that other parties call, and a `CodeDetail` between your own services. kiit-codes has no JSON dependency.
In Kotlin its classes are not `@Serializable`, so map each one to a small class of your own, and the order you declare the fields is the order in the JSON.
In TypeScript they are plain objects, so `JSON.stringify` works on them and listing the fields sets the order.
Java and Swift have no example here, so use the JSON library you already have.

<Example id="guide-json" />

<Spacer />

### Response: Type URL

Use it to know which `type` your statuses produce, and to make it point at your own docs. `type` is the base URL plus a suffix, and the base is chosen like this:

| You provide | Origin | Base URL |
|---|---|---|
| Nothing | A domain, such as `stripe.com` | `https://stripe.com/docs/codes` |
| Nothing | A plain id, such as `myapp1` | `/docs/codes`, relative |
| A `baseUrls` entry for the origin | Any | Your URL, always absolute |
| `convertWithUrl(baseUrl = …)` | Any | The URL you pass for that call |

:::info[Rules]
1. **Lowercase**: Every segment of the suffix is lowercased.
2. **Dashes**: `_` becomes `-`, so `DUPLICATE_CHARGE` is `duplicate-charge`.
3. **Scope**: Each `.` becomes `/`, so `payments.cards` is `payments/cards`. An empty scope is skipped.
4. **Tail**: Always `{status}/{group}/{name}`, where status is `passed` or `failed`.
5. **Origin**: It is not repeated in the suffix, because the base URL is already specific to it.
6. **Domain**: An origin counts as a domain by its form alone, labels of letters, digits and hyphens. There is no DNS lookup.
7. **Unique**: Pick the base once and keep it. Names or scopes that differ only by case, `_` against `-`, or `a.b` against `a/b` produce the same `type`.
:::

<Example id="guide-type-url" />

<Spacer />

### Response: Custom type URL

Use it when the default suffix or base does not fit, such as docs that live under your own path. There is no new API, so pick the way that fits how much of the URL you control. Kotlin and TypeScript can also copy the `Problem` with any `type`, the Java and Swift examples leave that out.

<Example id="guide-custom-type-url" />

:::info[code does not change]
`code` is built from the status, not from `type`, so it is the same however `type` was built. A client that reads `code` is not affected.
:::

<Spacer />

### Response: HTTP and gRPC

Use it at the edge of your service, where an outcome becomes a response code. There is no reverse conversion, because many statuses share one code.
The TypeScript port has HTTP only for now, with no gRPC mapping.

<Example id="guide-http" />

<Spacer />

### Response: Custom protocol

Use it when a custom code needs its own protocol value, such as HTTP 402 for a declined payment. Your values come first and the base mapping answers for everything else.
Kotlin has `CompositeLookup` for this. The TypeScript port does not yet, so the lookup is written by hand.

<Example id="guide-custom-protocol" />

<BackToTop />

## Reference

Lookup tables. The ideas behind them are in [Explanation](#explanation).

### Codes

The first code of each group is its default. `Group.DEFAULT` is an alias for it, so `Succeeded.DEFAULT` is `Succeeded.SUCCESS`, the same instance.
`isDefault` is true for a group's default code and for no other, and it compares by value, so a copy with any field changed is not the default.

**Passed** (`success == true`)

| Group | Code | Description |
|---|---|---|
| <GroupBadge group="Succeeded" /> | <CodeBadge>SUCCESS</CodeBadge> | The operation completed successfully. |
| | <CodeBadge>CREATED</CodeBadge> | A new resource was created. |
| | <CodeBadge>UPDATED</CodeBadge> | The resource was fully updated. |
| | <CodeBadge>PATCHED</CodeBadge> | The resource was partially updated. |
| | <CodeBadge>FETCHED</CodeBadge> | The resource was retrieved. |
| | <CodeBadge>DELETED</CodeBadge> | The resource was deleted. |
| | <CodeBadge>HANDLED</CodeBadge> | The request was handled; nothing to return. |
| | <CodeBadge>REFERRED</CodeBadge> | The result is at another location. |
| | <CodeBadge>EXITED</CodeBadge> | The application exited cleanly. |
| <GroupBadge group="Pending" /> | <CodeBadge>ACCEPTED</CodeBadge> | The request was accepted. |
| | <CodeBadge>QUEUED</CodeBadge> | The request is waiting to be processed. |
| | <CodeBadge>PROCESSING</CodeBadge> | The request is being processed. |
| | <CodeBadge>CONFIRM</CodeBadge> | The request is awaiting confirmation. |
| | <CodeBadge>REDIRECTED</CodeBadge> | This request is being handled elsewhere. |
| | <CodeBadge>SCHEDULED</CodeBadge> | The operation is scheduled for later. |
| <GroupBadge group="Excluded" /> | <CodeBadge>OMITTED</CodeBadge> | The item was excluded from the result. |
| | <CodeBadge>SKIPPED</CodeBadge> | The item was not processed. |
| | <CodeBadge>DISCARDED</CodeBadge> | The item was processed, then excluded for unrelated reasons. |
| | <CodeBadge>CANCELLED</CodeBadge> | The operation was cancelled by the caller before completion. |
| | <CodeBadge>DEDUPLICATED</CodeBadge> | The duplicate item was not processed. |
| | <CodeBadge>DISQUALIFIED</CodeBadge> | The item was disqualified. |
| <GroupBadge group="Information" /> | <CodeBadge>NOTICE</CodeBadge> | An informational notice. |
| | <CodeBadge>ADVISORY</CodeBadge> | A notice that may need attention. |
| | <CodeBadge>METADATA</CodeBadge> | Information about the application itself was returned. |
| | <CodeBadge>HEALTH</CodeBadge> | The service is healthy and operational. |
| | <CodeBadge>DIAGNOSTICS</CodeBadge> | Diagnostic or operational information was returned. |
| | <CodeBadge>MOVED</CodeBadge> | The resource has permanently moved to a new location. |

**Failed** (`success == false`)

| Group | Code | Description |
|---|---|---|
| <GroupBadge group="Restricted" /> | <CodeBadge>DENIED</CodeBadge> | The request was denied. |
| | <CodeBadge>UNAUTHENTICATED</CodeBadge> | Authentication is required. |
| | <CodeBadge>UNAUTHORIZED</CodeBadge> | The caller lacks permission. |
| | <CodeBadge>FORBIDDEN</CodeBadge> | Access to this resource is forbidden. |
| | <CodeBadge>LOCKED</CodeBadge> | Access is locked; resolve the condition to restore access. |
| | <CodeBadge>SUSPENDED</CodeBadge> | Access has been administratively suspended. |
| <GroupBadge group="Invalid" /> | <CodeBadge>INVALID_VALUE</CodeBadge> | The request had an invalid value. |
| | <CodeBadge>BAD_REQUEST</CodeBadge> | The request was malformed. |
| | <CodeBadge>NOT_FOUND</CodeBadge> | The requested route or endpoint does not exist. |
| | <CodeBadge>OUT_OF_RANGE</CodeBadge> | A value was outside the acceptable range. |
| | <CodeBadge>PAYLOAD_TOO_LARGE</CodeBadge> | The payload is too large. |
| | <CodeBadge>MISSING_FIELD</CodeBadge> | A required field was not provided. |
| <GroupBadge group="Rejected" /> | <CodeBadge>RULE_VIOLATION</CodeBadge> | A business rule rejected the request. |
| | <CodeBadge>CONFLICT</CodeBadge> | The request conflicts with the current state. |
| | <CodeBadge>NOT_EXISTS</CodeBadge> | The referenced item does not exist. |
| | <CodeBadge>PRECONDITION_FAILED</CodeBadge> | A required precondition was not met. |
| | <CodeBadge>EXPIRED</CodeBadge> | The item has expired. |
| | <CodeBadge>GONE</CodeBadge> | The resource was removed and is no longer available. |
| <GroupBadge group="Unserved" /> | <CodeBadge>UNEXPECTED</CodeBadge> | An unexpected, unclassified error occurred. |
| | <CodeBadge>UNSUPPORTED</CodeBadge> | This capability is not currently available. |
| | <CodeBadge>TIMEOUT</CodeBadge> | The operation timed out. |
| | <CodeBadge>RATE_LIMITED</CodeBadge> | Too many requests; try again later. |
| | <CodeBadge>RESOURCE_LIMITED</CodeBadge> | A resource limit has been reached. |
| | <CodeBadge>UNREACHABLE</CodeBadge> | A required dependency could not be reached. |
| | <CodeBadge>UNDER_MAINTENANCE</CodeBadge> | The service is temporarily under maintenance. |
| | <CodeBadge>INTERNAL</CodeBadge> | An internal invariant was violated. |
| | <CodeBadge>DATA_LOSS</CodeBadge> | Unrecoverable data loss or corruption occurred. |
| | <CodeBadge>DEGRADED</CodeBadge> | This dependency is degraded; some calls may be refused. |
| | <CodeBadge>LEGAL_BLOCK</CodeBadge> | Access is blocked for legal reasons. |

<Spacer />

### Err types

The kinds of `Err` and the builders that create them.

| Variant | Fields | Use |
|---|---|---|
| `Err.ErrorInfo` | `message`, `cause?`, `ref?` | Default implementation: a message with an optional cause. |
| `Err.ErrorField` | `field`, `value`, `message`, `cause?`, `ref?` | An error on a specific field. |
| `Err.ErrorList` | `errors`, `message`, `cause?`, `ref?` | Wraps a list of other errors. |

| Builder | Use |
|---|---|
| `Err.of(message)` | Plain message, no field or cause. |
| `Err.of(status)` | Build directly from a `Status`. |
| `Err.on(field, value, message)` | Error on a specific field, including its value. |
| `Err.on(field, message)` | Same, but omits the value — for sensitive fields. |
| `Err.ex(throwable)` | Wrap a caught exception or throwable. |
| `Err.obj(any)` | Wrap an arbitrary object as the cause. |
| `Err.list(strings, message)` | Build an `Err.ErrorList` from a list of plain strings. |
| `Err.build(any?)` | Generic builder that dispatches based on the input's type. |

<Spacer />

### Protocol mappings

Every built-in code mapped to HTTP and gRPC. A code with no mapping of its own takes its group's default,
so most of a group shares one value. There is no reverse conversion, since many codes share one protocol
code.

| Group | Code | HTTP | gRPC |
|---|---|---|---|
| <GroupBadge group="Succeeded" /> | <CodeBadge>SUCCESS</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>CREATED</CodeBadge> | 201 Created | 0 OK |
|  | <CodeBadge>UPDATED</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>PATCHED</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>FETCHED</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>DELETED</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>HANDLED</CodeBadge> | 204 No Content | 0 OK |
|  | <CodeBadge>REFERRED</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>EXITED</CodeBadge> | 200 OK | 0 OK |
| <GroupBadge group="Pending" /> | <CodeBadge>ACCEPTED</CodeBadge> | 202 Accepted | 0 OK |
|  | <CodeBadge>QUEUED</CodeBadge> | 202 Accepted | 0 OK |
|  | <CodeBadge>PROCESSING</CodeBadge> | 202 Accepted | 0 OK |
|  | <CodeBadge>CONFIRM</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>REDIRECTED</CodeBadge> | 307 Temporary Redirect | 0 OK |
|  | <CodeBadge>SCHEDULED</CodeBadge> | 202 Accepted | 0 OK |
| <GroupBadge group="Excluded" /> | <CodeBadge>OMITTED</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>SKIPPED</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>DISCARDED</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>CANCELLED</CodeBadge> | 499 Client Closed Request | 1 CANCELLED |
|  | <CodeBadge>DEDUPLICATED</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>DISQUALIFIED</CodeBadge> | 200 OK | 0 OK |
| <GroupBadge group="Information" /> | <CodeBadge>NOTICE</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>ADVISORY</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>METADATA</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>HEALTH</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>DIAGNOSTICS</CodeBadge> | 200 OK | 0 OK |
|  | <CodeBadge>MOVED</CodeBadge> | 200 OK | 0 OK |
| <GroupBadge group="Restricted" /> | <CodeBadge>DENIED</CodeBadge> | 401 Unauthorized | 7 PERMISSION_DENIED |
|  | <CodeBadge>UNAUTHENTICATED</CodeBadge> | 401 Unauthorized | 16 UNAUTHENTICATED |
|  | <CodeBadge>UNAUTHORIZED</CodeBadge> | 401 Unauthorized | 7 PERMISSION_DENIED |
|  | <CodeBadge>FORBIDDEN</CodeBadge> | 403 Forbidden | 7 PERMISSION_DENIED |
|  | <CodeBadge>LOCKED</CodeBadge> | 423 Locked | 7 PERMISSION_DENIED |
|  | <CodeBadge>SUSPENDED</CodeBadge> | 403 Forbidden | 7 PERMISSION_DENIED |
| <GroupBadge group="Invalid" /> | <CodeBadge>INVALID_VALUE</CodeBadge> | 400 Bad Request | 3 INVALID_ARGUMENT |
|  | <CodeBadge>BAD_REQUEST</CodeBadge> | 400 Bad Request | 3 INVALID_ARGUMENT |
|  | <CodeBadge>NOT_FOUND</CodeBadge> | 404 Not Found | 5 NOT_FOUND |
|  | <CodeBadge>OUT_OF_RANGE</CodeBadge> | 400 Bad Request | 11 OUT_OF_RANGE |
|  | <CodeBadge>PAYLOAD_TOO_LARGE</CodeBadge> | 413 Payload Too Large | 8 RESOURCE_EXHAUSTED |
|  | <CodeBadge>MISSING_FIELD</CodeBadge> | 400 Bad Request | 3 INVALID_ARGUMENT |
| <GroupBadge group="Rejected" /> | <CodeBadge>RULE_VIOLATION</CodeBadge> | 409 Conflict | 9 FAILED_PRECONDITION |
|  | <CodeBadge>CONFLICT</CodeBadge> | 409 Conflict | 6 ALREADY_EXISTS |
|  | <CodeBadge>NOT_EXISTS</CodeBadge> | 404 Not Found | 9 FAILED_PRECONDITION |
|  | <CodeBadge>PRECONDITION_FAILED</CodeBadge> | 409 Conflict | 9 FAILED_PRECONDITION |
|  | <CodeBadge>EXPIRED</CodeBadge> | 410 Gone | 9 FAILED_PRECONDITION |
|  | <CodeBadge>GONE</CodeBadge> | 410 Gone | 9 FAILED_PRECONDITION |
| <GroupBadge group="Unserved" /> | <CodeBadge>UNEXPECTED</CodeBadge> | 500 Internal Server Error | 2 UNKNOWN |
|  | <CodeBadge>UNSUPPORTED</CodeBadge> | 501 Not Implemented | 12 UNIMPLEMENTED |
|  | <CodeBadge>TIMEOUT</CodeBadge> | 504 Gateway Timeout | 4 DEADLINE_EXCEEDED |
|  | <CodeBadge>RATE_LIMITED</CodeBadge> | 429 Too Many Requests | 8 RESOURCE_EXHAUSTED |
|  | <CodeBadge>RESOURCE_LIMITED</CodeBadge> | 429 Too Many Requests | 8 RESOURCE_EXHAUSTED |
|  | <CodeBadge>UNREACHABLE</CodeBadge> | 503 Service Unavailable | 14 UNAVAILABLE |
|  | <CodeBadge>UNDER_MAINTENANCE</CodeBadge> | 503 Service Unavailable | 13 INTERNAL |
|  | <CodeBadge>INTERNAL</CodeBadge> | 503 Service Unavailable | 13 INTERNAL |
|  | <CodeBadge>DATA_LOSS</CodeBadge> | 503 Service Unavailable | 15 DATA_LOSS |
|  | <CodeBadge>DEGRADED</CodeBadge> | 503 Service Unavailable | 13 INTERNAL |
|  | <CodeBadge>LEGAL_BLOCK</CodeBadge> | 451 Unavailable For Legal Reasons | 13 INTERNAL |
|  | <CodeBadge>ABORTED</CodeBadge> | 503 Service Unavailable | 10 ABORTED |

| Mapping | Source |
|---|---|
| HTTP | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L89">CodesToHttp</ConceptTermLink>, its <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L110">overrides</ConceptTermLink> |
| gRPC | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L148">CodesToGrpc</ConceptTermLink>, its <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L169">overrides</ConceptTermLink> |

<BackToTop />

## FAQ

### Why

| Question | Answer |
|---|---|
| **Why not just use exceptions or booleans?** | Exceptions are thrown inconsistently across a codebase, and a boolean can't say why. This gives every outcome a shared shape: closed categories, open codes underneath. |
| **Why a closed taxonomy but open codes?** | Closed categories keep generic handling, exhaustive matching, logging and protocol mappings consistent everywhere. Codes stay open so each domain can extend them. |
| **Does this replace domain modeling?** | No. A domain error explains *what* happened in one domain, and the taxonomy explains *what kind* of outcome it was, across every domain in the app. |
| **Why isn't `Status` just an enum?** | Enums can't be extended by consumers. This lets every application define its own statuses and still use the same taxonomy. |
| **Why exactly eight groups?** | Every gRPC code and the most common HTTP codes map onto these eight without needing a ninth, tested directly against both. |
| **Why isn't retry logic or severity built in?** | Retryability cuts across groups rather than aligning with them. `Unserved` alone has both retryable and non-retryable codes, so a dedicated `Retry` category was considered and rejected. |
| **Why was the numeric status code field removed?** | An earlier version had one, and it invited the wrong inference: a number that looked like an HTTP code but meant something else. Real protocol numbers come from `CodesToHttp` and `CodesToGrpc`, never implied by the taxonomy. |
| **What about single-maintainer risk?** | It is real. The project is Apache 2.0 licensed with the source available, but has no second maintainer or organizational backing yet. |

<Spacer />

### Alternatives

| Question | Answer |
|---|---|
| **How is this different from Arrow's `Either`/`Validated` or `kotlin-result`?** | Those give you a `Result` type with no taxonomy underneath, so you supply the meaning yourself. This provides the taxonomy those types can build on, plus a working exception path. |
| **Why not just use raw HTTP status codes everywhere?** | A background job or CLI command doesn't have an HTTP status. HTTP was the closest precedent and the taxonomy is validated against it, but it isn't scoped to HTTP. |
| **Doesn't this lock me into Kiit's taxonomy?** | The eight groups are closed and cross-checked against HTTP and gRPC. Every code inside them is yours to extend, and you can ignore the built-in ones entirely. |
| **What if my company already has its own status system?** | Map it into the taxonomy step by step, keeping the original names and meanings. Services share the groups, not identical codes. |

<Spacer />

### AI

| Question | Answer |
|---|---|
| **Is the "built for AI" angle proven?** | No. Stable names and explicit classification are expected to reduce ambiguity for AI tooling, but that is a hypothesis, not a benchmarked result. |
| **Is the "built for AI" angle just marketing?** | The design is justified on ordinary engineering grounds first: consistency, exhaustive matching, explicit semantics. AI tooling benefits from the same properties, but the library stands on its own without it. |

<BackToTop />
