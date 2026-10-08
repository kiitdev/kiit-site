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

Every outcome gets a `Status` in one of eight fixed groups, with open codes underneath. Services, jobs,
validation and APIs then classify success and failure the same way, and a status maps to HTTP, gRPC or an
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) problem when it crosses a boundary. This is how a code is constructed: a name, a title, an origin that says who owns it, and an optional scope inside that origin.

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

### Availability

| # | Target | Role | Status | Notes |
|---:|---|---|---|---|
| 1 | Kotlin | Original | <StatusBadge status="Live" /> | Canonical model, in production use for years. |
| 2 | Swift | Multiplatform | <StatusBadge status="Beta" /> | XCFramework through SKIE. |
| 3 | TypeScript | Native port | <StatusBadge status="Beta" /> | Same model, written in TypeScript. |

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

A to-do list service, one step at a time. Each step builds on the last.

### Return a status

Return a `Status` instead of throwing for an outcome you expect. A custom code and two built-in codes, then a check on the result:

<Example id="overview-usage" />

<Example id="overview-checks" />

<Spacer />

### Return a problem

When the caller is an HTTP client, send an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) problem instead of a bare code. Convert the status, and pass
the errors to fill `detail` and `errors`. The problem also carries `code`, the exact status:

<Example id="rfc9457-minimal" />

<Spacer />

### Validate

Report every problem at once instead of stopping at the first. `collect` combines the checks, and the combined
`Checked` is what you pass to the converter above:

<Example id="usage-checked" />

See [Checked](#checked) for the type, and the [Guide](#return-a-problem-as-json) to write the problem as JSON.

<BackToTop />

## Explanation

### Terms

| # | Term | Definition | |
|---:|---|---|---|
| 1 | Taxonomy | The overall `Status → Group → Code` classification system. | <MoreLink href="#taxonomy" /> |
| 2 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L51">Status</ConceptTermLink> | Sealed interface for an operation's outcome: `Passed` or `Failed`. | <MoreLink href="#taxonomy" /> |
| 3 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L100">Group</ConceptTermLink> | Second tier: a fixed subtype of `Passed`/`Failed` (e.g. `Restricted`). | <MoreLink href="#taxonomy" /> |
| 4 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L22">Code</ConceptTermLink> | Third tier: an open `Status` instance within a group (e.g. `DENIED`). | <MoreLink href="#taxonomy" /> |
| 5 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Err.kt#L34">Err</ConceptTermLink> | Error representation for use with `Result`/`Outcome`-style types. | <MoreLink href="#err" /> |
| 6 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Checked.kt#L22">Checked</ConceptTermLink> | Non-monadic validation result reporting every problem, not just the first. | <MoreLink href="#checked" /> |
| 7 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/StatusException.kt#L46">StatusException</ConceptTermLink> | Sealed exception hierarchy carrying a `Checked`, for exception-only boundaries. | <MoreLink href="#exceptions" /> |
| 8 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/formats/Problem.kt#L31">Problem</ConceptTermLink> | kiit's name for an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) problem details object: `type`, `title`, `status`, plus optional `detail`, `instance` and `errors`. | <MoreLink href="#rfc-9457" /> |
| 9 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/formats/CodeDetail.kt#L32">CodeDetail</ConceptTermLink> | kiit's own lighter shape for the same job: `code`, `success` and `title`, with no public URL needed. `code` holds the origin, scope, group and name. | <MoreLink href="#rfc-9457" /> |
<Spacer />

### Features

| # | Feature | Description |
|---:|---|---|
| 1 | **[Status classification](#taxonomy)** | The core `Passed`/`Failed` split, with a fixed `Group` and an open `Code` beneath it. |
| 2 | **[Problem details](#rfc-9457)** | Convert a status to an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) `Problem`, or to kiit's lighter `CodeDetail`, with a type URL, an exact `code` and a list of errors. |
| 3 | **[Extensibility](#define-custom-codes)** | Add domain codes within the same fixed groups, without forking the taxonomy. |
| 4 | **[Protocol mappings](#protocols)** | Map statuses to HTTP, gRPC, or any custom protocol with `CodeLookup` and `CompositeLookup`. |
| 5 | **[Validation](#checked)** | `Checked`, `Err` and `collect` report every problem found at once. |
| 6 | **[Typed exceptions](#exceptions)** | `StatusException` and `Failed.toException()` for boundaries that only understand exceptions. |
| 7 | **Result integration** | [kiit-result](https://github.com/kiitdev/kiit-result) builds a `Result<T, E>` type on this taxonomy. |

<Spacer />

### Taxonomy

A `Status` is the outcome of any operation, at any layer: a service call, a job step, an API request, a CLI command.
It says what *kind* of success or failure happened, in one shape everywhere, and nothing about this one occurrence.
Those details belong to an [`Err`](#err). The tiers are `Status`, then `Group`, then `Code`: the two `Status` branches,
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
Built-in codes and your own sit side by side, in the same groups:

<Diagram src="/img/kiit-codes/kiit-codes-custom.png" alt="Kiit Codes custom codes" />

Every Status carries the same six fields, built-in or custom:

| Field | Why it exists |
|---|---|
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L97">success</ConceptTermLink> | `true` for `Passed`, `false` for `Failed`. A quick check that doesn't need the group. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L56">name</ConceptTermLink> | A stable, `SCREAMING_SNAKE_CASE` key that logs, metrics and clients can match on. Never built from runtime data. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L100">group</ConceptTermLink> | The kind of outcome (`Succeeded`, `Invalid`, ...). Lets generic code handle any Status, including custom ones, without knowing its name. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L70">origin</ConceptTermLink> | Who owns the code: `kiit.dev` for built-ins, your domain or a name of your own for custom codes. Keeps custom codes apart from the built-in ones and other teams', and becomes the host of an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) `type`. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L84">scope</ConceptTermLink> | An optional label inside an origin, such as a department or product area (`payments.cards`). Empty when unset. Never parsed. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L91">title</ConceptTermLink> | A constant, human-readable title for the code, not a description of one occurrence. It fills `title` in a `Problem` and a `CodeDetail`. Per-occurrence detail lives in an `Err`. |
:::warning[Choose a specific origin]
1. **Domain**: A domain you own is unique through DNS, so your codes can't collide with anyone else's.
2. **Plain id**: A plain id such as `myapp1` can collide with another team's, and kiit-codes can't detect it. Pick a specific name.
3. **Also a host**: A domain origin becomes the host of the [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) `type`, for example `https://samples.kiit.dev/docs/codes/...`. A plain id is not a host, so its `type` is the relative `/docs/codes/...`. Register a base URL to get an absolute one.
:::

<Spacer />

### Err

Error details for one occurrence, used by validation, exceptions and result types. It is the building block of `Checked`'s error list.

:::tip[Status or Err?]
1. **Status**: The kind of outcome, constant: `Invalid.INVALID_VALUE`.
2. **Err**: The details of this occurrence: which field, what value, what message.
3. **Together**: `Checked` carries both, so a status and its errors travel together.
:::

The variants and builders are in [Err types](#err-types).

<Spacer />

### Checked

A validation result that reports every problem at once instead of stopping at the first. It is built only through
`Checked.success(status)` or `Checked.failure(status, errors)`.

| # | Trait | Details |
|---:|---|---|
| 1 | Invariant | `status` and `errors` never disagree: a passing `Checked` has an empty `errors` list, a failing one has at least one entry. |
| 2 | `isValid` | `true` when `errors` is empty. |
| 3 | `collect(...)` | Combines several `Checked` into one. If any failed, the result is `Invalid.INVALID_VALUE` with every error pooled. |

<Spacer />

### Exceptions

For boundaries that only understand exceptions. `StatusException` carries a `Checked`, with one subclass per failed group.

| Exception | Matches |
|---|---|
| `RestrictedException` | `Failed.Restricted` |
| `InvalidException` | `Failed.Invalid` |
| `RejectedException` | `Failed.Rejected` |
| `UnservedException` | `Failed.Unserved` |

`Failed.toException(errors)` turns a bare `Failed` status into the matching subclass. See [Cross an exception boundary](#cross-an-exception-boundary).

<Spacer />

### Protocols

Maps a `Status` to an external protocol's code: HTTP and gRPC out of the box, or your own protocol through `CodeLookup`.

| Type | Purpose |
|---|---|
| `CodesToHttp` | Maps `Status` to HTTP status codes. |
| `CodesToGrpc` | Maps `Status` to gRPC status codes. |
| `CodeLookup` | Interface for a mapping to any other protocol. |
| `CompositeLookup` | Combines a base `CodeLookup` with per-code overrides. |

:::info[One way only]
1. **No reverse conversion**: There is no way to get a `Status` back from an HTTP or gRPC code, because many statuses share one code.
2. **Carry the status instead**: To send a status across a boundary, use the `code` of a `CodeDetail` or of a `Problem`. Both hold the exact origin, scope and status code.
:::

<Diagram src="/img/kiit-codes/kiit-codes-protocols.png" alt="Kiit Codes protocol mappings" />

<Spacer />

### RFC 9457

How a status and its errors become a response body: an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) `Problem` for an HTTP API, or kiit's lighter `CodeDetail`.
`Problem` is kiit's name for the problem details object, and `CodeDetail` is for calls between your own services. They use the same field names:

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
1. **type**: Only `Problem` has it. RFC 9457 makes `type` the primary identifier of a problem and a pointer to its documentation.
2. **status**: Optional on `CodeDetail`. An HTTP status only makes sense over HTTP, and kiit-codes is a status taxonomy that works anywhere.
3. **success**: Only on `CodeDetail`, so a reader can tell success from failure without reading the `Passed` or `Failed` prefix of `code`.
:::

`type` and `code` name the same status in different ways:

| | `Problem.type` | `code` |
|---|---|---|
| Identity | yes, RFC 9457's primary identifier | yes, exact |
| Docs | yes, when it resolves | no |
| Self-contained | no, needs a host or a base | yes |
| Case | lowercase with dashes | as written |

`code` is the origin, the scope and then the status code, so one field says which status it is. Built-in statuses use the scope `codes`.
A custom status with no scope leaves an empty value, so `code` always has five `:`-separated values. A client reads `code` instead of
parsing `type`, which is lowercase and may not carry the origin. When `code` is missing, as with a server that isn't kiit, the last three
segments of a kiit `type` are `status/group/name`. They give passed or failed and the group, but not the exact name, scope or origin.
That is a kiit convention, not something RFC 9457 expects of a client.

:::info[The type URL]
1. **Shape**: `{base}/{scope}/{status}/{group}/{name}`, lowercase with dashes. `status` is `passed` or `failed`, and each `.` in a scope starts a new segment, so `payments.cards` becomes `payments/cards`.
2. **Domain origin**: `https://stripe.com/docs/codes/payments/cards/failed/rejected/duplicate-charge`.
3. **Plain id**: `/docs/codes/failed/rejected/out-of-stock`, a relative path, since `myapp1` is not a host. RFC 9457 prefers absolute URIs, and a relative `type` resolves against the host of the response, so register a base URL to get an absolute one.
4. **Registered base URL**: Always absolute. kiit-codes only builds the part after it.
5. **Resolvable**: RFC 9457 encourages a `type` that opens documentation but does not require it. kiit-codes never checks DNS, so a domain origin can still return a 404.
6. **Stable and unique**: `type` is the identity, so pick the base once and keep it. Two statuses must not produce the same `type`, which can happen when names or scopes differ only by case, `_` against `-`, or `a.b` against `a/b`.
:::

Every error in an `Err` goes into `errors`. An `Err.ErrorList` is expanded, including lists inside lists, and a single `Err.on("email", "Missing")`
is one entry that keeps its field. `detail` is the error's message, or the first error message that isn't blank when that is blank. Each
entry in `errors` is an `ErrorItem` with only a field and a message. The cause and the value that failed validation are left out on purpose,
since echoing them back is a disclosure risk.

:::tip[Which one?]
1. **Problem**: An HTTP API that other parties call.
2. **CodeDetail**: Calls between your own services, and jobs.
3. **Neither**: When the status alone is enough.
4. **Success codes**: The taxonomy covers `Passed` and `Failed`, which is why the path is `/docs/codes` and not `/docs/problems`. RFC 9457 describes problems, so use a `Problem` for a `Failed` status and a `CodeDetail` to report a `Passed` one.
:::

<Spacer />

### Limitations

What kiit-codes doesn't do, and why.

| # | Limitation | Details |
|---:|---|---|
| 1 | AI framing is unproven | Stable names and explicit classification are expected to reduce ambiguity for AI tooling, but that is a hypothesis, not a benchmarked result. |
| 2 | No retry logic or severity levels | Retryability cuts across groups rather than aligning with them. `Unserved` alone has both retryable and non-retryable codes. A dedicated `Retry` category was considered and rejected for the same reason. |
| 3 | No numeric status code field | An earlier version had one, and it invited the wrong inference: a number that looked like an HTTP code but meant something else. Real protocol numbers are available through `CodesToHttp` and `CodesToGrpc`, never implied by the taxonomy. |
| 4 | No ninth group | Every gRPC code and the most common HTTP codes map onto the existing eight, tested directly against both. |
| 5 | Single maintainer | The project is Apache 2.0 licensed with the source available, but has no second maintainer or organizational backing yet. |

<BackToTop />

## Guide

### Return a problem as JSON

Return an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) problem and write it as JSON. It carries `code`, the exact status, next to the `type` URL:

<Example id="rfc9457-problem" />

<Spacer />

### Set your own type URL

The default `type` is the lowercase docs URL described in [RFC 9457](#rfc-9457). For your own URLs there is no new API. Pick
the way that fits how much of the URL you control: a base URL registered once, or a type builder, a base URL with an empty suffix, or a copy of the `Problem` with any `type`.

<Example id="rfc9457-registered" />

<Example id="rfc9457-custom-type" />

:::info[code does not change]
`code` is built from the status, not from `type`, so it is the same however `type` was built. A client that reads `code` is not affected.
:::

<Spacer />

### Return a CodeDetail

Return a `CodeDetail` for a call between your own services, and write it as JSON. `code` is the origin, the scope, then
the status code, so the receiver gets the whole identity in one field:

<Example id="codedetail-json" />

<Spacer />

### Define custom codes

Add a code to any of the eight groups with a name, a title, an origin and an optional scope. It stays that group's kind of outcome everywhere,
and keeps its own identity:

<Example id="taxonomy-custom" />

<Spacer />

### Map to HTTP and gRPC

<Example id="conversion-http" />

<Example id="conversion-grpc" />

<Spacer />

### Cross an exception boundary

<Example id="usage-exception" />

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
| **Is the "built for AI" angle just marketing?** | The design is justified on ordinary engineering grounds first: consistency, exhaustive matching, explicit semantics. AI tooling benefits from the same properties, but the library stands on its own without it. |

<BackToTop />
