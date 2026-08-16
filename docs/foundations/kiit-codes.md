---
sidebar_position: 1
title: kiit-codes
slug: /kiit-codes
---

import GroupBadge from '@site/src/components/GroupBadge';
import CodeBadge from '@site/src/components/CodeBadge';
import BackToTop from '@site/src/components/BackToTop';
import ConceptTermLink from '@site/src/components/ConceptTermLink';
import MoreLink from '@site/src/components/MoreLink';

# kiit-codes

<p className="kiit-tagline">A Kotlin library for classifying and handling success and failure.</p>

![Kiit Codes overview](/img/kiit-codes/kiit-codes-overview.png)

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

### Inspiration

| # | Source | What was drawn from it |
|---:|---|---|
| 1 | HTTP status codes | Validated against, not derived from — the most common HTTP codes map onto kiit-codes' eight groups without needing a ninth. |
| 2 | gRPC status codes | Same validation as HTTP — every gRPC code maps onto the existing eight groups. |
| 3 | Arrow's `Either`/`Validated`, kotlin-result | Same general shape of container type, but those provide no taxonomy underneath — kiit-codes provides the taxonomy itself, usable with or without a container type. |

### Activity

The core classification model has years of internal production use inside the original Kiit
framework, powering both mobile and server Kotlin applications, prior to being extracted into
this standalone repository. The public package version reflects the standalone repo's youth, not
the underlying design's: the classification itself is settled, while newer additions (JS/TS
export, iOS/Swift export via SKIE) have less track record and are still being exercised.

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

```kotlin
dependencies {
    implementation("dev.kiit:kiit-codes:1.0.1")
}
```

### Source

| # | Item | Link |
|---:|---|---|
| 1 | Git Repo | [github.com/kiitdev/kiit-codes](https://github.com/kiitdev/kiit-codes) |
| 2 | Root folder of sources in repo | [kiit-codes/src/commonMain/kotlin](https://github.com/kiitdev/kiit-codes/tree/main/kiit-codes/src/commonMain/kotlin) |
| 3 | Sample app | [samples/sample-kotlin](https://github.com/kiitdev/kiit-codes/tree/main/samples/sample-kotlin) |
| 4 | Package Name | [kiit.codes](https://github.com/kiitdev/kiit-codes/tree/main/kiit-codes/src/commonMain/kotlin/kiit/codes) |
| 5 | Unit Tests | [kiit-codes/src/commonTest](https://github.com/kiitdev/kiit-codes/tree/main/kiit-codes/src/commonTest) |

Licensed [Apache 2.0](https://github.com/kiitdev/kiit-codes/blob/main/LICENSE).

### Example

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

<BackToTop />

## Concepts

### Terms

| # | Term | Definition | |
|---:|---|---|---|
| 1 | Taxonomy | The overall `Status → Group → Code` classification system. | <MoreLink href="#taxonomy" /> |
| 2 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L45">Status</ConceptTermLink> | Sealed interface for an operation's outcome: `Passed` or `Failed`. | <MoreLink href="#tiers" /> |
| 3 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L76">Group</ConceptTermLink> | Second tier: a fixed subtype of `Passed`/`Failed` (e.g. `Restricted`). | <MoreLink href="#tiers" /> |
| 4 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Codes.kt">Code</ConceptTermLink> | Third tier: an open `Status` instance within a group (e.g. `DENIED`). | <MoreLink href="#tiers" /> |
| 5 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L50">name</ConceptTermLink> | Stable SCREAMING_SNAKE_CASE label, e.g. `"TOKEN_EXPIRED"`, for logs. | |
| 6 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L57">origin</ConceptTermLink> | Where a status came from: `"kiit"` for built-ins, `"custom"` by default. | |
| 7 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L60">id</ConceptTermLink> | `"$origin.$name"`: unique across every `Status`, usable as a map key. | |
| 8 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L67">message</ConceptTermLink> | Human-readable constant description. Never built from runtime data. | |
| 9 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Status.kt#L73">success</ConceptTermLink> | `true` for `Passed`, `false` for `Failed`. | |
| 10 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Err.kt#L32">Err</ConceptTermLink> | Error representation for use with `Result`/`Outcome`-style types. | <MoreLink href="#err" /> |
| 11 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/Checked.kt#L29">Checked</ConceptTermLink> | Non-monadic validation result reporting every problem, not just the first. | <MoreLink href="#checked" /> |
| 12 | <ConceptTermLink href="https://github.com/kiitdev/kiit-codes/blob/main/kiit-codes/src/commonMain/kotlin/kiit/codes/StatusException.kt#L46">StatusException</ConceptTermLink> | Sealed exception hierarchy carrying a `Checked`, for exception-only boundaries. | <MoreLink href="#exceptions" /> |

### Tiers

The `Status → Group → Code` tiers:

| Tier | Name | Fixed/Open |
|---|---|---|
| 1 | `Status` | Fixed — `Passed` or `Failed` |
| 2 | Group | Fixed — one of the eight groups below |
| 3 | Code | Open — built-in or domain-specific |

Every `Status` belongs to exactly one `Group`, and every concrete status value is a
`Code` within that `Group`. `Passed.Succeeded.SUCCESS` is the `SUCCESS` `Code` inside
the `Succeeded` `Group`, under the `Passed` `Status`. `Failed.Restricted.DENIED` is
the `DENIED` `Code` inside the `Restricted` `Group`, under the `Failed` `Status`.

`Succeeded.CREATED` is one built-in `Code`. Its fields, each read on its own line:

```kotlin
val status: Status = Succeeded.CREATED

status.name     // "CREATED"
status.origin   // "kiit"
status.id       // "kiit.CREATED"
status.message  // "A new resource was created."
status.success  // true
status.group    // "Succeeded"
```

### Taxonomy

The full `Status → Group → Code` taxonomy: every built-in `Passed` and `Failed` group,
and every built-in code within each.

![Kiit Codes taxonomy](/img/kiit-codes/kiit-codes-taxonomy.png)

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

### Err

| Variant | Fields | Use |
|---|---|---|
| `Err.ErrorInfo` | `message`, `cause?`, `ref?` | Default implementation: a message with an optional cause. |
| `Err.ErrorField` | `field`, `value`, `message`, `cause?`, `ref?` | An error on a specific field. |
| `Err.ErrorList` | `errors`, `message`, `cause?`, `ref?` | Wraps a list of other errors. |

Builders: `Err.of(message)`, `Err.of(status)`, `Err.on(field, value, message)`,
`Err.on(field, message)` (value omitted for sensitive fields), `Err.ex(throwable)`,
`Err.obj(any)`, `Err.list(strings, message)`, `Err.build(any?)`.

### Checked

`Checked(status: Status, errors: List<Err>)`, constructed only through `Checked.success(status)`
or `Checked.failure(status, errors)`, so `status` and `errors` can never disagree: a passing
`Checked` always has an empty `errors` list, a failing one always has at least one entry.
`isValid: Boolean` reflects `errors.isEmpty()`. Implements `HasErrors`. `collect(vararg checks)` /
`collect(checks: List<Checked>)` combine multiple `Checked` into one, failing with
`Invalid.INVALID_VALUE` and every pooled error if any input failed.

### Exceptions

Sealed, with four subclasses matching the `Failed` groups: `RestrictedException`,
`InvalidException`, `RejectedException`, `UnservedException`. Each carries a `Checked`, exposed
as `status: Status` and `errors: List<Err>`. `Failed.toException(errors)` converts a bare
`Failed` status into the matching subclass. Platform-idiomatic equivalents exist for iOS
(`@ObjCName` in `iosMain`) and JS/TS (`jsMain`).

### Protocols

| Type | Purpose |
|---|---|
| `CodesToHttp` | Maps `Status` to/from HTTP status codes. |
| `CodesToGrpc` | Maps `Status` to/from gRPC status codes. |
| `CodeLookup` | Interface for defining a mapping to any other protocol. |
| `CompositeLookup` | Combines a base `CodeLookup` with per-code extensions/overrides. |

![Kiit Codes protocol mappings](/img/kiit-codes/kiit-codes-protocols.png)

<BackToTop />

## Design

### Philosophy

A closed taxonomy keeps generic handling, exhaustive matching, logging, and protocol mappings
consistent everywhere a status is used. Codes stay open underneath so each domain can extend the
taxonomy freely without forking it. This doesn't replace domain modeling: domain errors explain
*what* happened in one domain, the taxonomy explains *what kind* of outcome it was, consistently,
across every domain in an application. `Status` is a sealed interface rather than an enum
specifically so consumers can add their own codes while still participating in the same
taxonomy — an enum can't be extended this way.

### Features

| Feature | Description |
|---|---|
| [Status classification](#tiers) | The core `Passed`/`Failed` taxonomy. |
| [Extensibility](#usage) | Domain-specific codes within the same fixed groups. |
| [Protocol mappings](#protocols-1) | HTTP, gRPC, and custom protocol lookups. |
| [Validation](#usage) | `Checked`/`Err`/`collect` for reporting every problem found. |
| [Typed exceptions](#usage) | `StatusException` for exception-only boundaries. |
| Result integration | [kiit-result](https://github.com/kiitdev/kiit-result)'s `Result<T, E>` built on this taxonomy. |

### Limitations

| # | Limitation | Details |
|---:|---|---|
| 1 | Single maintainer | Apache 2.0 licensed and source available, but no second maintainer or organizational backing yet. |
| 2 | AI framing is unproven | Stable names and explicit classification are expected to reduce ambiguity for AI tooling, but that's a hypothesis, not a benchmarked result. |
| 3 | JS/TS not CI-gated | Exists but isn't CI-gated or published to npm yet; lacks the compiler-enforced exhaustiveness that Kotlin, Java, and Swift (via SKIE) get. |

### Exclusions

| # | Excluded | Reasoning |
|---:|---|---|
| 1 | Retry logic or severity levels | Retryability cuts across groups rather than aligning with them — `Unserved` alone has both retryable and non-retryable codes. A dedicated `Retry` category was considered and rejected for the same reason. |
| 2 | A numeric status code field | An earlier version had one; it invited the wrong inference (looking like an HTTP code while meaning something else). Real protocol numbers are available on demand via `CodesToHttp`/`CodesToGrpc`, never implied by the taxonomy itself. |
| 3 | A ninth group | Every gRPC code and the most common HTTP codes map onto the existing eight without needing one, tested directly against both. |

<BackToTop />

## Tutorial

This walks through building a tiny service that returns `Status` for expected outcomes, then
crosses a boundary that can only communicate via exceptions.

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

Call it and branch on the result:

```kotlin
val service = UserService()

val created = service.create("alice", "alice@example.com")
println("${created.name} (success=${created.success})") // CREATED (success=true)

val denied = service.authorize("alice", "bob")
println("${denied.name} (success=${denied.success})") // UNAUTHORIZED (success=false)
```

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
`Restricted.UNAUTHORIZED` belongs to the `Restricted` group. See [Concepts](#exceptions)
for the full exception hierarchy, or [Design](#philosophy) for why the taxonomy is shaped this
way.

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

![Kiit Codes custom codes](/img/kiit-codes/kiit-codes-custom.png)

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

![Kiit Codes usage](/img/kiit-codes/kiit-codes-usage.png)

### Protocols

**HTTP**, via `CodesToHttp`:

```kotlin
val http = CodesToHttp()

http.toCode(Succeeded.CREATED)      // 201
http.toCode(Invalid.INVALID_VALUE)  // 400
http.toStatus(404)?.name            // "NOT_FOUND"
```

**gRPC**, via `CodesToGrpc`:

```kotlin
val grpc = CodesToGrpc()

grpc.toCode(Restricted.DENIED)  // 7, PERMISSION_DENIED
grpc.toStatus(6)?.name          // "CONFLICT", ALREADY_EXISTS reversed
```

**Custom protocols**, via `CodeLookup`/`CompositeLookup`:

```kotlin
val lookup = CompositeLookup(
    base = CodesToHttp(),
    extensions = mapOf(PAYMENT_DECLINED to 402),
)

lookup.toCode(PAYMENT_DECLINED) // 402
```

<BackToTop />
