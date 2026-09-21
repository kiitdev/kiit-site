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
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Example from '@site/src/components/Example';
import CodeCard from '@site/src/components/CodeCard';
import Diagram from '@site/src/components/Diagram';

<PageTitle title="kiit-codes" logo="/img/modules/kiit-codes-logo.png" />

<p className="kiit-tagline">A Kotlin library for classifying and handling success and failure.</p>


A small, dependency-free status and error taxonomy for application outcomes, with
extensible codes, protocol mappings, validation, typed exceptions, and optional
`Result<T, E>` integration.

<Diagram src="/img/kiit-codes/kiit-codes-overview.png" alt="Kiit Codes overview" />

## Overview

### Goals

Applications need to communicate a simple idea consistently: **what happened?** In practice,
success and failure get modeled differently across domains, layers, and protocols, which causes
recurring problems: no shared taxonomy for classifying outcomes, inconsistent handling across
layers, validation/exceptions/statuses/results all using different approaches, similar error
types rebuilt project to project, and generic errors that lose domain-specific meaning.

kiit-codes exists to provide a shared, application-level model for these concerns: a fixed
taxonomy for consistent classification, extensible codes that preserve domain-specific meaning,
and protocol mappings that keep application outcomes independent from how they're transported.
The same model is then reused across statuses, validation, exceptions, and result types.

The taxonomy is closed at the top and open underneath. A fixed set of groups keeps generic
handling, exhaustive matching, logging, and protocol mappings consistent everywhere a status is
used, and codes stay open so each domain can add its own without forking the taxonomy. Codes are
ordinary values rather than enum cases, which is what lets a domain add them. This doesn't replace
domain modeling: a domain error explains *what* happened in one domain, and the taxonomy explains
*what kind* of outcome it was, consistently, across every domain in an application.

<Spacer />

### Features

| # | Feature | Description |
|---:|---|---|
| 1 | **[Status classification](#taxonomy)** | The core `Passed`/`Failed` split, with a fixed `Group` and an open `Code` beneath it for finer-grained classification. |
| 2 | **[Extensibility](#usage)** | Add domain-specific codes within the same fixed groups, without forking the taxonomy or losing shared meaning. |
| 3 | **[Protocol mappings](#protocols-1)** | Map statuses to HTTP, gRPC, or any custom protocol via `CodeLookup`/`CompositeLookup`. |
| 4 | **[Validation](#usage)** | `Checked`, `Err`, and `collect` report every problem found at once, instead of stopping at the first. |
| 5 | **[Typed exceptions](#usage)** | `StatusException` and `Failed.toException()` for boundaries that only understand exceptions. |
| 6 | **Result integration** | The separate [kiit-result](https://github.com/kiitdev/kiit-result) module builds a `Result<T, E>` type on top of this same taxonomy. |

<Spacer />

### Inspiration

| # | Source | What was drawn from it |
|---:|---|---|
| 1 | HTTP status codes | Validated against, not derived from — the most common HTTP codes map onto kiit-codes' eight groups without needing a ninth. |
| 2 | gRPC status codes | Same validation as HTTP — every gRPC code maps onto the existing eight groups. |
| 3 | Scala's `Either`/`Try` | Built on `Either`'s two-branch shape, structured around `Try`'s branches, with the `Status` taxonomy incorporated on top. |

<Spacer />

### Activity

The core classification model has years of internal production use inside the original Kiit
framework, powering both mobile and server Kotlin applications, prior to being extracted into
this standalone repository. The public package version reflects the standalone repo's youth, not
the underlying design's: the classification itself is settled, while newer additions (JS/TS
export, iOS/Swift export via SKIE) have less track record and are still being exercised.

<Spacer />

### Resources

| # | Resource | Details |
|---:|---|---|
| 1 | Repository | [github.com/kiitdev/kiit-codes](https://github.com/kiitdev/kiit-codes) |
| 2 | Maven coordinate | [dev.kiit:kiit-codes](https://central.sonatype.com/artifact/dev.kiit/kiit-codes) |
| 3 | npm coordinate | `@kiit/codes` (JS/TS export, not CI-gated yet) |
| 4 | Related module | [kiit-result](https://github.com/kiitdev/kiit-result) builds a `Result<T, E>` type on top of this same taxonomy (docs page coming next) |
| 5 | API reference | Generated from source KDoc, linked here once published |

**Prefer to see it work first?** Jump to the [Tutorial](#tutorial).
**Prefer the reasoning first?** Keep reading.

<BackToTop />

## Setup

### Install

<Example section="setup" topic="install" />

| # | Language | Artifact |
|---:|---|---|
| 1 | Kotlin, Java | [Maven Central](https://central.sonatype.com/artifact/dev.kiit/kiit-codes) |
| 2 | TypeScript | [npm](https://www.npmjs.com/package/@kiitdev/codes) |

:::info[Swift]
1. **Not linked yet**: The Swift Package Manager artifact will be linked here when it is available.
:::

<Spacer />

### Imports

What to import to use the library.

<Example section="setup" topic="imports" />

<Spacer />

### Source

| # | Item | Link |
|---:|---|---|
| 1 | Git Repo | [github.com/kiitdev/kiit-codes](https://github.com/kiitdev/kiit-codes) |
| 2 | Root folder of sources in repo | [kiit-codes/src/commonMain/kotlin](https://github.com/kiitdev/kiit-codes/tree/main/kiit-codes/src/commonMain/kotlin) |
| 3 | Sample app | [samples/sample-kotlin](https://github.com/kiitdev/kiit-codes/tree/main/samples/sample-kotlin) |
| 4 | Package Name | [kiit.codes](https://github.com/kiitdev/kiit-codes/tree/main/kiit-codes/src/commonMain/kotlin/kiit/codes) |
| 5 | Unit Tests | [kiit-codes/src/commonTest](https://github.com/kiitdev/kiit-codes/tree/main/kiit-codes/src/commonTest) |

Licensed [Apache 2.0](https://github.com/kiitdev/kiit-codes/blob/main/LICENSE).

<Spacer />

### Example

<Tabs groupId="language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
import kiit.codes.*

fun authorize(userId: String, requesterId: String): Status =
    if (userId != requesterId) Restricted.UNAUTHORIZED
    else Succeeded.SUCCESS

when (val status = authorize(userId, requesterId)) {
    is Passed -> log.info("ok: ${status.name}")
    is Failed -> log.warn("failed: ${status.name} — ${status.message}")
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import kiit.codes.Status;
import kiit.codes.Passed;
import kiit.codes.Failed;

static Status authorize(String userId, String requesterId) {
    return !userId.equals(requesterId) ? Failed.Restricted.UNAUTHORIZED : Passed.Succeeded.SUCCESS;
}

Status status = authorize(userId, requesterId);
switch (status) {
    case Passed p -> log.info("ok: " + p.getName());
    case Failed f -> log.warn("failed: " + f.getName() + " — " + f.getMessage());
}
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```ts
import { Succeeded, Restricted } from "@kiitdev/codes";
import type { Status } from "@kiitdev/codes";

function authorize(userId: string, requesterId: string): Status {
  return userId !== requesterId ? Restricted.UNAUTHORIZED : Succeeded.SUCCESS;
}

const status = authorize(userId, requesterId);
if (status.success) {
  log.info(`ok: ${status.name}`);
} else {
  log.warn(`failed: ${status.name} — ${status.message}`);
}
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import KiitCodes

func authorize(_ userId: String, _ requesterId: String) -> Status {
    userId != requesterId ? Failed.Restricted.companion.UNAUTHORIZED : Passed.Succeeded.companion.SUCCESS
}

let status = authorize(userId, requesterId)
switch onEnum(of: status) {
case .passed(let passed):
    print("ok: \(passed.name)")
case .failed(let failed):
    print("failed: \(failed.name) — \(failed.message)")
}
```

</TabItem>
</Tabs>

<BackToTop />

## Explanation

### Terms

| # | Term | Definition | |
|---:|---|---|---|
| 1 | Taxonomy | The overall `Status → Group → Code` classification system. | <MoreLink href="#taxonomy" /> |
| 2 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L45">Status</ConceptTermLink> | Sealed interface for an operation's outcome: `Passed` or `Failed`. | <MoreLink href="#status" /> |
| 3 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L76">Group</ConceptTermLink> | Second tier: a fixed subtype of `Passed`/`Failed` (e.g. `Restricted`). | <MoreLink href="#taxonomy" /> |
| 4 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt">Code</ConceptTermLink> | Third tier: an open `Status` instance within a group (e.g. `DENIED`). | <MoreLink href="#taxonomy" /> |
| 5 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Err.kt#L32">Err</ConceptTermLink> | Error representation for use with `Result`/`Outcome`-style types. | <MoreLink href="#err" /> |
| 6 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Checked.kt#L29">Checked</ConceptTermLink> | Non-monadic validation result reporting every problem, not just the first. | <MoreLink href="#checked" /> |
| 7 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/StatusException.kt#L46">StatusException</ConceptTermLink> | Sealed exception hierarchy carrying a `Checked`, for exception-only boundaries. | <MoreLink href="#exceptions" /> |

<Spacer />

### Status

A `Status` is the outcome of any operation, at any layer: a service call, a background job step, an
API request, a CLI command. It says what *kind* of success or failure happened, in one shape
everywhere, and nothing about the details of this one occurrence. Those belong to an [`Err`](#err).

Built-in codes and your own sit side by side, in the same groups:

<Diagram src="/img/kiit-codes/kiit-codes-custom.png" alt="Kiit Codes custom codes" />

Every Status belongs to exactly one group, and each concrete Status is a code within that group.
`Invalid.INVALID_VALUE` is the `INVALID_VALUE` code in the `Invalid` group, under `Failed`. This is how
that built-in code is defined:

<CodeCard
  title="Code Definition"
  subtitle="How a built-in code is defined"
  color="blue"
  code={{
    kotlin: `val INVALID_VALUE = Invalid(
    name = "INVALID_VALUE",
    message = "The request had an invalid value.",
    origin = StatusConstants.KIIT,
)`,
    java: `Failed.Invalid INVALID_VALUE = new Failed.Invalid(
    "INVALID_VALUE",
    "The request had an invalid value.",
    StatusConstants.KIIT,
    "");`,
    typescript: `const INVALID_VALUE: Invalid = Invalid(
  "INVALID_VALUE",
  "The request had an invalid value.",
  StatusConstants.KIIT,
);`,
  }}
/>

And this is the same Status as it appears in an API response:

<CodeCard
  title="HTTP Response"
  subtitle="The same shape everywhere"
  color="yellow"
  language="json"
  code={`{
    "success": false,
    "name"   : "INVALID_VALUE",
    "group"  : "Invalid",
    "origin" : "kiit.dev",
    "scope"  : "",
    "message": "The request had an invalid value."
}`}
/>

Every Status carries the same six fields, built-in or custom:

| Field | Why it exists |
|---|---|
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L89">success</ConceptTermLink> | `true` for `Passed`, `false` for `Failed`. A quick check that doesn't need the group. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L49">name</ConceptTermLink> | A stable, `SCREAMING_SNAKE_CASE` key that logs, metrics and clients can match on. Never built from runtime data. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L92">group</ConceptTermLink> | The kind of outcome (`Succeeded`, `Invalid`, ...). Lets generic code handle any Status, including custom ones, without knowing its name. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L62">origin</ConceptTermLink> | Who owns the code: `kiit.dev` for built-ins, your domain or a name of your own for custom codes. Keeps custom codes apart from the built-in ones and other teams', and becomes the host of an RFC 9457 `type`. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L76">scope</ConceptTermLink> | An optional label inside an origin, such as a department or product area (`payments.cards`). Empty when unset. Never parsed. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L83">message</ConceptTermLink> | A constant description of the code, not of one occurrence. Per-occurrence detail lives in an `Err`. |

:::warning[Choose a specific origin]
1. **Domain**: A domain you own is unique through DNS, so your codes can't collide with anyone else's.
2. **Plain id**: A plain id such as `myapp1` can collide with another team's, and kiit-codes can't detect it. Pick a specific name.
3. **Also a host**: The origin becomes the host of the RFC 9457 `type`, for example `https://samples.kiit.dev/problems/...`.
:::

:::info[Source and references]
1. **Source**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L44">Status.kt</ConceptTermLink>
2. **Codes**: [Passed](#passed), [Failed](#failed), [Defaults](#defaults)
3. **Sample app**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/tree/main/samples/sample-kotlin">sample-kotlin</ConceptTermLink>, with a first example in [Setup](#example)
:::

<Spacer />

### Taxonomy

The `Status → Group → Code` taxonomy: the two `Status` branches, the eight groups, and the codes
within them.

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

:::info[Source and references]
1. **Passed**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L172">Status.kt</ConceptTermLink>, listed in [Passed](#passed)
2. **Failed**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L485">Status.kt</ConceptTermLink>, listed in [Failed](#failed)
3. **Defaults**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt">Status.kt</ConceptTermLink>, listed in [Defaults](#defaults)
:::

<Spacer />

### Err

Error representation for use with Validation, Exceptions, and Result types. This stores instance level error details and the building block for `Checked`'s error list.

:::tip[Status or Err?]
1. **Status**: The kind of outcome, constant: `Invalid.INVALID_VALUE`.
2. **Err**: The details of this occurrence: which field, what value, what message.
3. **Together**: `Checked` carries both, so a status and its errors travel together.
:::

:::info[Source and references]
1. **Err**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Err.kt#L34">Err.kt</ConceptTermLink>
2. **ErrorInfo**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Err.kt#L40">Err.kt</ConceptTermLink>
3. **ErrorField**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Err.kt#L53">Err.kt</ConceptTermLink>
4. **ErrorList**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Err.kt#L67">Err.kt</ConceptTermLink>
5. **Builders**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Err.kt#L79">Err.kt</ConceptTermLink>
6. **Reference**: the types and builders are listed in [Err types](#err-types)
:::

<Spacer />

### Checked

Non-monadic validation result that reports every problem at once, instead of stopping at the
first. `Checked(status: Status, errors: List<Err>)`, reachable only through
`Checked.success(status)` or `Checked.failure(status, errors)`.

```kotlin
class Checked private constructor(
    val status: Status,
    val errors: List<Err>,
) : HasErrors {
    val isValid: Boolean get() = errors.isEmpty()

    companion object {
        fun success(status: Passed = Succeeded.SUCCESS): Checked
        fun failure(status: Failed, errors: List<Err>): Checked
    }
}
```

| # | Trait | Details |
|---:|---|---|
| 1 | Invariant | `status` and `errors` can never disagree: a passing `Checked` always has an empty `errors` list, a failing one always has at least one entry. |
| 2 | `isValid` | `Boolean`, reflects `errors.isEmpty()`. |
| 3 | Interface | Implements `HasErrors`. |
| 4 | `collect(...)` | `collect(vararg checks)` / `collect(checks: List<Checked>)` combine multiple `Checked` into one, failing with `Invalid.INVALID_VALUE` and every pooled error if any input failed. |

<Spacer />

### Exceptions

Sealed exception hierarchy carrying a `Checked`, for boundaries that only understand
exceptions — one subclass per `Failed` group:

```kotlin
sealed class StatusException(val checked: Checked) : Exception() {
    val status: Status get() = checked.status
    val errors: List<Err> get() = checked.errors

    class RestrictedException(status: Failed.Restricted, errors: List<Err> = emptyList()) : StatusException(...)
    class InvalidException(status: Failed.Invalid, errors: List<Err> = emptyList()) : StatusException(...)
    class RejectedException(status: Failed.Rejected, errors: List<Err> = emptyList()) : StatusException(...)
    class UnservedException(status: Failed.Unserved, errors: List<Err> = emptyList()) : StatusException(...)
}
```

| Exception | Matches |
|---|---|
| `RestrictedException` | `Failed.Restricted` |
| `InvalidException` | `Failed.Invalid` |
| `RejectedException` | `Failed.Rejected` |
| `UnservedException` | `Failed.Unserved` |

| # | Trait | Details |
|---:|---|---|
| 1 | Carries | A `Checked`, exposed as `status: Status` and `errors: List<Err>`. |
| 2 | Conversion | `Failed.toException(errors)` converts a bare `Failed` status into the matching subclass. |
| 3 | Platform equivalents | iOS via `@ObjCName` in `iosMain`; JS/TS via `jsMain`. |

<Spacer />

### Protocols

Maps a `Status` to an external protocol's code: HTTP and gRPC out of the box, or a custom protocol of
your own via `CodeLookup`.

| Type | Purpose |
|---|---|
| `CodesToHttp` | Maps `Status` to HTTP status codes. |
| `CodesToGrpc` | Maps `Status` to gRPC status codes. |
| `CodeLookup` | Interface for defining a mapping to any other protocol. |
| `CompositeLookup` | Combines a base `CodeLookup` with per-code extensions/overrides. |

:::info[One way only]
1. **No reverse conversion**: There is no way to get a `Status` back from an HTTP or gRPC code, because many statuses share one code.
2. **Carry the status instead**: To send a status across a boundary, use the `code` of a `CodeDetail`, or the RFC 9457 `type`.
:::

<Diagram src="/img/kiit-codes/kiit-codes-protocols.png" alt="Kiit Codes protocol mappings" />

:::info[Source and references]
1. **CodesToHttp**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L89">Codes.kt</ConceptTermLink>
2. **CodesToGrpc**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L148">Codes.kt</ConceptTermLink>
3. **CodeLookup**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L72">Codes.kt</ConceptTermLink>
4. **CompositeLookup**: <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L215">Codes.kt</ConceptTermLink>
5. **Reference**: every code's HTTP and gRPC value is in [Protocol mappings](#protocol-mappings)
6. **Guide**: mapping to your own protocol is in [Protocols](#protocols-1)
:::

<Spacer />

### Limitations

What kiit-codes doesn't do, and why.

| # | Limitation | Details |
|---:|---|---|
| 1 | AI framing is unproven | Stable names and explicit classification are expected to reduce ambiguity for AI tooling, but that's a hypothesis, not a benchmarked result. |
| 2 | No retry logic or severity levels | Retryability cuts across groups rather than aligning with them — `Unserved` alone has both retryable and non-retryable codes. A dedicated `Retry` category was considered and rejected for the same reason. |
| 3 | No numeric status code field | An earlier version had one; it invited the wrong inference (looking like an HTTP code while meaning something else). Real protocol numbers are available on demand via `CodesToHttp`/`CodesToGrpc`, never implied by the taxonomy itself. |
| 4 | No ninth group | Every gRPC code and the most common HTTP codes map onto the existing eight without needing one, tested directly against both. |

<BackToTop />

## Tutorial

### Status Codes

This walks through building a tiny service that returns `Status` for expected outcomes, then
crosses a boundary that can only communicate via exceptions.

:::tip[Start simple]
1. **Start here**: Return a `Status` from your functions first.
2. **Add as needed**: Bring in `Checked` for validation and exceptions for boundaries only when you need them.
:::

Define a service that returns a `Status` instead of throwing for expected failures:

```kotlin
import kiit.codes.*

data class User(val id: String, val email: String)

class UserService {
    private val users = mutableMapOf<String, User>()

    fun create(id: String, email: String): Status {
        if (email.isBlank()) return Invalid.BAD_REQUEST
        if (users.containsKey(id)) return Rejected.CONFLICT
        users[id] = User(id, email)
        return Succeeded.CREATED
    }

    fun authorize(id: String, requesterId: String): Status =
        when {
            !users.containsKey(id) -> Rejected.NOT_EXISTS
            id != requesterId -> Restricted.UNAUTHORIZED
            else -> Succeeded.SUCCESS
        }
}
```

<Spacer />

### Callers

Call it and branch on the result:

```kotlin
val service = UserService()

val created = service.create("alice", "alice@example.com")
println("${created.name} (success=${created.success})") // CREATED (success=true)

val denied = service.authorize("alice", "bob")
println("${denied.name} (success=${denied.success})") // UNAUTHORIZED (success=false)
```

<Spacer />

### Validation

Now add a method that reports every problem at once instead of stopping at the first:

```kotlin
fun UserService.validateSignup(id: String, email: String): Checked {
    val errors = mutableListOf<Err>()
    if (id.isBlank()) errors.add(Err.on("id", id, "Id is required"))
    if (!email.contains("@")) errors.add(Err.on("email", email, "Email must contain @"))
    return if (errors.isEmpty()) Checked.success(Succeeded.SUCCESS)
           else Checked.failure(Invalid.INVALID_VALUE, errors)
}

val checked = service.validateSignup("", "not-an-email")
println("valid=${checked.isValid}, errors=${checked.errors.size}")
// valid=false, errors=2
```

`Checked` can only be constructed through `Checked.success(status)`/`Checked.failure(status, errors)`,
so `status` and `errors` can never disagree. See [Explanation](#checked) for the full type, or
[Guide](#usage) for `collect(...)` combining multiple `Checked` results into one.

<Spacer />

### Try/Catch

Now add a method that throws instead, for a caller that only understands exceptions:

```kotlin
fun UserService.requireAuthorized(id: String, requesterId: String) {
    val status = authorize(id, requesterId)
    if (status is Failed) throw status.toException()
}

try {
    service.requireAuthorized("alice", "bob")
} catch (e: StatusException) {
    println("caught: ${e.status.name} — ${e.message}")
    // caught: UNAUTHORIZED — Not authorized to perform this action
}
```

`status.toException()` picked `StatusException.RestrictedException` automatically, since
`Restricted.UNAUTHORIZED` belongs to the `Restricted` group. See [Explanation](#exceptions)
for the full exception hierarchy, or [Goals](#goals) for why the taxonomy is shaped this
way.

<Spacer />

### Result

`kiit-codes` classifies an outcome, but doesn't hand back a value alongside it. For that, pair it
with [kiit-result](/docs/kiit-result) — a separate Kiit library that builds a `Result<T, E>` type
on this same taxonomy:

```kotlin
fun UserService.find(id: String): Result<User, Status> =
    users[id]?.let { Result.success(it) } ?: Result.failure(Rejected.NOT_EXISTS)
```

See the [kiit-result docs](/docs/kiit-result) for the full API.

<BackToTop />

## Guide

### Usage

**Status only**, when the outcome itself is enough:

```kotlin
when (val status = authorize(userId, requesterId)) {
    is Passed -> log.info("ok: ${status.name}")
    is Failed -> log.warn("failed: ${status.name} — ${status.message}")
}
```

**Extensibility** — custom codes stay inside a built-in group:

```kotlin
val PAYMENT_DECLINED = Failed.Rejected(
    name = "PAYMENT_DECLINED",
    message = "Payment declined",
    origin = "payments",
)
```

`PAYMENT_DECLINED` remains a `Rejected` outcome everywhere in the system while retaining its own
domain-specific identity. `origin` keeps custom namespaces distinct from `"kiit"` and from other
teams' codes.


**Validation**, reporting every problem instead of stopping at the first:

```kotlin
fun validateUser(name: String, email: String): Checked {
    val errors = mutableListOf<Err>()
    if (name.isBlank()) errors.add(Err.on("name", name, "Name is required"))
    if (!email.contains("@")) errors.add(Err.on("email", email, "Email must contain @"))
    return if (errors.isEmpty()) Checked.success() else Checked.failure(Invalid.INVALID_VALUE, errors)
}
```

**Exceptions**, converting a `Failed` status at a boundary that needs one:

```kotlin
fun requireAuthorized(id: String, requesterId: String) {
    val status = authorize(id, requesterId)
    if (status is Failed) throw status.toException()
}
```

<CodeCard
  title="Status"
  subtitle="Classify the kind of success or failure"
  color="blue"
  language="json"
  code={`{
    "success": false,
    "name"   : "INVALID_VALUE",
    "group"  : "Invalid",
    "origin" : "kiit.dev",
    "message": "The request had an invalid value."
}`}
/>

<CodeCard
  title="Validate"
  subtitle="Validate and collect errors"
  color="yellow"
  code={`fun validatePhone(phone: String): Checked {
    return if (phone.isNotEmpty()) Checked.success()
    else Checked.failure(
        Invalid.INVALID_VALUE,
        listOf(Err.on("phone", phone, "Too short")))
}`}
/>

<CodeCard
  title="Exceptions"
  subtitle="Throw meaningful exceptions with status codes and detail"
  color="red"
  code={`try {
    throw StatusException.InvalidException(Invalid.INVALID_VALUE)
} catch (e: StatusException.InvalidException) {
    // handle the invalid value
}`}
/>

<CodeCard
  title="Result<T, E>"
  subtitle="Optionally treat errors as values with Result<T, E>"
  color="green"
  footnote="kiit-result: a separate module"
  code={`fun validatePhone(phone: String): Result<String, Err> =
    when {
        phone.isNotEmpty() -> Success(phone)
        else -> Failure(
            Err.on("phone", phone, "Too short"),
            Invalid.INVALID_VALUE
        )
    }`}
/>

<Spacer />

### Protocols

Working code for the types introduced in [Explanation](#protocols): mapping statuses to
HTTP, gRPC, and a custom protocol of your own.

```kotlin
// HTTP, via CodesToHttp
val http = CodesToHttp()
http.toCode(Succeeded.CREATED)      // 201
http.toCode(Invalid.INVALID_VALUE)  // 400
http.toCode(Rejected.CONFLICT)      // 409

// gRPC, via CodesToGrpc
val grpc = CodesToGrpc()
grpc.toCode(Restricted.DENIED)      // 7, PERMISSION_DENIED
grpc.toCode(Rejected.CONFLICT)      // 6, ALREADY_EXISTS

// Custom protocols, via CodeLookup and CompositeLookup
val lookup = CompositeLookup(
    base = CodesToHttp(),
    extensions = mapOf(PAYMENT_DECLINED to 402),
)
lookup.toCode(PAYMENT_DECLINED)     // 402
```

<BackToTop />

## Reference

Lookup tables. The ideas behind them are in [Explanation](#explanation).

### Passed

`Passed.success == true`.

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

<Spacer />

### Failed

`Failed.success == false`.

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
| | <CodeBadge>ABORTED</CodeBadge> | The operation was aborted; retrying may help. |

<Spacer />

### Defaults

Each group has one default code, for when nothing more specific applies. `DEFAULT` on a group is an alias for that
code, so `Succeeded.DEFAULT` is `Succeeded.SUCCESS`: the same instance, not a separate code.

| Group | Alias | Code | Description |
|---|---|---|---|
| <GroupBadge group="Succeeded" /> | `Succeeded.DEFAULT` | <CodeBadge>SUCCESS</CodeBadge> | The operation completed successfully. |
| <GroupBadge group="Pending" /> | `Pending.DEFAULT` | <CodeBadge>ACCEPTED</CodeBadge> | The request was accepted. |
| <GroupBadge group="Excluded" /> | `Excluded.DEFAULT` | <CodeBadge>OMITTED</CodeBadge> | The item was excluded from the result. |
| <GroupBadge group="Information" /> | `Information.DEFAULT` | <CodeBadge>NOTICE</CodeBadge> | An informational notice. |
| <GroupBadge group="Restricted" /> | `Restricted.DEFAULT` | <CodeBadge>DENIED</CodeBadge> | The request was denied. |
| <GroupBadge group="Invalid" /> | `Invalid.DEFAULT` | <CodeBadge>INVALID_VALUE</CodeBadge> | The request had an invalid value. |
| <GroupBadge group="Rejected" /> | `Rejected.DEFAULT` | <CodeBadge>RULE_VIOLATION</CodeBadge> | A business rule rejected the request. |
| <GroupBadge group="Unserved" /> | `Unserved.DEFAULT` | <CodeBadge>UNEXPECTED</CodeBadge> | An unexpected, unclassified error occurred. |

:::note[isDefault compares by value]
1. **Only the default**: `isDefault` is true for a group's default code and for no other.
2. **Every field counts**: A copy with any field changed, such as the message, is not the default.
:::

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
| HTTP | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L89">CodesToHttp</ConceptTermLink>, its <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L110">overrides</ConceptTermLink> |
| gRPC | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L148">CodesToGrpc</ConceptTermLink>, its <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes-kotlin/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt#L169">overrides</ConceptTermLink> |

<BackToTop />

## FAQ

Common questions about the taxonomy, design choices, alternatives, adoption, and project maturity.

### Why

| Question | Answer |
|---|---|
| **Why not just use exceptions or booleans?** | Exceptions are thrown inconsistently across a codebase, and a boolean can't say why. This gives every outcome a shared shape, closed categories, open codes underneath. |
| **Why a closed taxonomy but open codes?** | Closed categories keep generic handling, exhaustive matching, logging, and protocol mappings consistent everywhere. Codes stay open so each domain can extend it freely. |
| **Why classify outcomes if my domain errors already explain what happened?** | Domain errors explain *what* happened in one domain. The taxonomy explains *what kind* of outcome it was, consistently, across every domain in the app. |
| **Does this replace domain modeling?** | No. It classifies outcomes; it doesn't replace aggregates, value objects, or domain events. An infrastructure-level vocabulary, not a competing one. |

<Spacer />

### Alternatives

| Question | Answer |
|---|---|
| **How is this different from Arrow's `Either`/`Validated` or `kotlin-result`?** | Those give you a `Result` type with no taxonomy underneath, you supply the meaning yourself. This provides the taxonomy those types can build on, plus a working exception path. |
| **Why not just use raw HTTP status codes everywhere?** | A background job or CLI command doesn't have an HTTP status. HTTP was the closest precedent, and the taxonomy is validated against it, but it isn't scoped to HTTP. |
| **Doesn't this lock me into Kiit's taxonomy?** | The eight categories are closed and cross-validated against HTTP and gRPC. Every code inside them is yours to extend, and you're free to ignore the built-in ones entirely. |

<Spacer />

### API

| Question | Answer |
|---|---|
| **Why not just use strings for status names?** | Strings don't give you compiler-checked exhaustiveness, discoverability, or protocol mappings. The goal is consistent classification, not just naming. |
| **Why isn't `Status` just an enum?** | Enums can't be extended by consumers. This lets every application define its own statuses while still participating in the same taxonomy. |
| **Why exactly eight categories?** | Every gRPC code and the most common HTTP codes map onto these eight without needing a ninth, tested directly against both. |
| **Why was the numeric status code field removed?** | An earlier version had one, and it invited the wrong inference, a number resembling an HTTP code but meaning something else. Real protocol numbers are available on demand, never implied. |
| **Isn't 50+ codes a steep learning curve?** | Most of the real cost is the eight categories, not the codes. Each category's default is a safe fallback; the rest is opt-in precision you reach for as needed. |
| **Why is `Unserved` so much bigger than the others?** | Independent evidence, not an oversight, both HTTP and gRPC show the same clustering on their own for capacity and infrastructure failures. |
| **Why isn't retry logic or severity built in?** | Retryability cuts across categories rather than aligning with them; `Unserved` alone has both retryable and non-retryable codes. A dedicated `Retry` category was considered and rejected. |
| **Doesn't a generic category lose domain-specific detail?** | No, the category is deliberately coarse while the code stays domain-specific. `PAYMENT_DECLINED` and `ORDER_CONFLICT` can both be `Rejected` and still keep distinct identities. |

<Spacer />

### Adoption

| Question | Answer |
|---|---|
| **What if I classify something incorrectly?** | Nothing catastrophic, a status can be moved to a more appropriate category later. The taxonomy improves consistency, it doesn't enforce absolute correctness upfront. |
| **What if my company already has its own status system?** | You don't have to replace it overnight. Existing statuses can map into the taxonomy incrementally while keeping their original names and meanings. |
| **How does this work across microservices?** | Services don't need identical codes, only the shared categories. Each service keeps its own domain-specific statuses while exposing consistent high-level semantics. |

<Spacer />

### AI

| Question | Answer |
|---|---|
| **Is the "built for AI" angle just marketing?** | The design decisions are justified on ordinary engineering grounds first, consistency, exhaustive matching, explicit semantics. AI benefits from the same properties, but the library stands on its own without them. |
| **What evidence supports the AI-related claims?** | Intentionally modest. Stable names and explicit classification are expected to reduce ambiguity for AI tooling, but that's a hypothesis to validate with real benchmarks, not an assumed result. |

<Spacer />

### Maturity

| Question | Answer |
|---|---|
| **Is this production-ready at 1.0.1?** | The version reflects the public package's youth, not the underlying design's. The core classification has years of internal production use prior to extraction; newer pieces (JS/TS, iOS) have less track record. |
| **What about single-maintainer risk?** | Real risk, worth being upfront about. Apache 2.0 licensed and source available, but there's currently no second maintainer or organizational backing. |

<BackToTop />
