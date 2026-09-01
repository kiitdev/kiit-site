---
sidebar_position: 2
title: kiit-result
slug: /kiit-result
hide_title: true
---

import PageTitle from '@site/src/components/PageTitle';
import Spacer from '@site/src/components/Spacer';
import BackToTop from '@site/src/components/BackToTop';
import MoreLink from '@site/src/components/MoreLink';
import ConceptTermLink from '@site/src/components/ConceptTermLink';

<PageTitle title="kiit-result" logo="/img/modules/kiit-result-logo.png" />

<p className="kiit-tagline">A Kotlin Result&lt;T, E&gt; type where Success holds a value and Failure holds an error, each also carrying a status from kiit-codes' taxonomy.</p>

Optionally attach an Action to trace which operation produced a result across nested or chained calls.

{/* TODO: Header Diagram — export assets/kiit-result.drawio (kiit-result repo) to
     kiit-site/static/img/kiit-result/kiit-result-overview.png once finalized. */}

## Overview

### Goals

Returning `null` for "not found" loses the reason, and throwing for expected, recoverable failures (validation, a conflict, an unauthorized caller) is expensive and easy to over- or under-catch. kiit-result is a `Result<T, E>` that composes the usual monadic operations with kiit-codes' closed status taxonomy instead of a bespoke or numeric status of its own — `Success` carries a `Passed` status, `Failure` carries a `Failed` status, and builders map each common case to its matching category (`restricted()` gives `Restricted.DENIED`, `invalid()` gives `Invalid.INVALID_VALUE`) without hand-rolling a status object at every call site.

Modeling an operation this way means answering four separable questions, not one: did it work (`Success<T>` or `Failure<E>`), what kind of outcome was it (`status: Status`), what went wrong specifically (the `Failure` branch's `error: E`), and what was being done and under what circumstances (an optional `action: Action?`).

<Spacer />

### Inspiration

| Source | What it contributes |
|---|---|
| Scala | `Either`/`Try` — precedent for a flexible-error-type Result distinct from a bare `Option` |
| Rust | `Result<T, E>`'s two-branch monadic shape, and most of the operator vocabulary (`map`, `and_then`, `unwrap`) |
| kotlin-result | Kotlin-idiomatic naming for that same operator set (`getOr`, `recover`, `combine`, `partition`) |
| kiit-codes | The closed status taxonomy fused onto both branches — kiit-result's actual differentiator from every Result type above |

<Spacer />

### Activity

kiit-result has been extracted from the Kiit toolkit and polished as a standalone module. This `Result<T, E>` pattern, paired with a status taxonomy, has been running in production for over 4 years across mobile and server Kotlin applications. Current work is focused on the Kotlin Multiplatform release, documentation, examples, and ecosystem integration — see [GitHub Issues](https://github.com/kiitdev/kiit-result/issues) for what's in flight.

<Spacer />

### Resources

| # | Resource | Link |
|---:|---|---|
| 1 | Repository | [github.com/kiitdev/kiit-result](https://github.com/kiitdev/kiit-result) |
| 2 | Maven Central | [dev.kiit:kiit-result](https://central.sonatype.com/artifact/dev.kiit/kiit-result) |
| 3 | npm | Not yet published (JS/TS is a partial, non-CI-gated pass — see [Limitations](#limitations)) |
| 4 | Related module | [kiit-codes](https://github.com/kiitdev/kiit-codes) — the status taxonomy this library builds on |
| 5 | Samples | `samples/sample-kotlin`, `sample-java`, `sample-swift`, `sample-ts` in the repo |

<BackToTop />

## Setup

### Install

```kotlin
dependencies {
    implementation("dev.kiit:kiit-result:1.0.1")
}
```

`kiit-result` depends on `dev.kiit:kiit-codes` transitively — no separate dependency needed.

<Spacer />

### Source

| # | What | Links |
|---:|---|---|
| 1 | Source | [kiit-result/src/commonMain](https://github.com/kiitdev/kiit-result/tree/main/kiit-result/src/commonMain/kotlin/kiit/result) |
| 2 | Package | `kiit.result` |
| 3 | Samples | [samples/](https://github.com/kiitdev/kiit-result/tree/main/samples) |
| 4 | Tests | [kiit-result/src/commonTest](https://github.com/kiitdev/kiit-result/tree/main/kiit-result/src/commonTest) |

<Spacer />

### Example

```kotlin
import kiit.codes.Invalid
import kiit.codes.Rejected
import kiit.result.Outcome
import kiit.result.OutcomeBuilder

class UserService : OutcomeBuilder {
    private val users = mutableMapOf<String, User>()

    fun create(id: String, email: String): Outcome<User> {
        if (email.isBlank()) return invalid(Invalid.BAD_REQUEST)
        if (users.containsKey(id)) return rejected(Rejected.CONFLICT)
        val user = User(id, email)
        users[id] = user
        return success(user)
    }
}
```

```kotlin
import kiit.result.flatMap

userService.create("alice", "alice@example.com")
    .map { it.email }
    .onSuccess { println("registered: $it") }
    .onFailure { err -> println("could not register: ${err.message}") }
```

See [`samples/sample-kotlin`](https://github.com/kiitdev/kiit-result/tree/main/samples/sample-kotlin) for a runnable end-to-end example, or [`samples/sample-java`](https://github.com/kiitdev/kiit-result/tree/main/samples/sample-java) for the same library from plain Java.

<BackToTop />

## Concepts

### Terms

| Term | What it is | |
|---|---|---|
| **`Result<T, E>`** | Sealed type, either `Success<T>` or `Failure<E>` | <MoreLink label="More" href="#structure" /> |
| **`Success<T>`** | Holds a `value: T` and a `status: Passed` | <MoreLink label="More" href="#structure" /> |
| **`Failure<E>`** | Holds an `error: E` and a `status: Failed` | <MoreLink label="More" href="#structure" /> |
| **`Action`** | Optional context for the operation that produced/wrapped a `Result` | <MoreLink label="More" href="#action" /> |
| **Aliases** | `Option<T>`/`Try<T>`/`Outcome<T>`/`Validated<T>` — type aliases fixing `E` for common cases | <MoreLink label="More" href="#aliases" /> |
| **Operators** | `map`/`flatMap`/`fold`/`recover`/... — the composition surface | <MoreLink label="More" href="#operators" /> |
| **Builders** | Status-aware factory methods for `Success`/`Failure` | <MoreLink label="More" href="#builders" /> |
| **Conversions** | `toOutcome()`/`toTry()` — crossing between error-type shapes | <MoreLink label="More" href="#conversions" /> |

{/* TODO: Concepts diagram — export the Result<T,E> branching / Status taxonomy / Aliases
    panel from assets/kiit-result.drawio (kiit-result repo) to
    kiit-site/static/img/kiit-result/kiit-result-concepts.png once finalized. */}

<Spacer />

### Structure

```
Result<T, E> = Success<T> | Failure<E>

Success<T>.status : Passed    (from kiit-codes)
Failure<E>.status : Failed    (from kiit-codes)
Result<T, E>.action : Action? (optional, both branches)
```

<ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Result.kt#L38">Result</ConceptTermLink> is a sealed type with exactly two subtypes:

1. <ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Result.kt#L429">Success</ConceptTermLink> — holds a `value: T`, defaults its `status` to `Succeeded.SUCCESS`.
2. <ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Result.kt#L461">Failure</ConceptTermLink> — holds an `error: E`, defaults its `status` to `Unserved.UNEXPECTED`.

`result.message` is a convenience accessor equal to `result.status.message` on either branch.

<Spacer />

### Action

<ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Action.kt#L22">Action</ConceptTermLink> names the operation that produced or wrapped a `Result`. It carries:

1. `action: String` — the operation name, required.
2. `xid: String?` — an optional correlation id for tracing.
3. `data: Map<String, String>` — optional free-form attributes.
4. `previous: Action?` — an optional link to the action this one was chained from.

Attach it via `result.withAction(action, chain = true)`; chaining links to whatever action is already present by default, which is what makes it useful for pinpointing which layer failed inside a nested call chain. Once attached, `action` survives `map`/`mapError`/`toOutcome()`/`toTry()`, the same as `status` does.

<Spacer />

### Aliases

| Alias | Definition | Role |
|---|---|---|
| <ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Aliases.kt#L17">Option</ConceptTermLink> | `Result<T, Unit>` | The historical `Option`/`Maybe` role (Rust/Scala/Arrow), reimagined so absence carries a `status` explaining why, not just a bare `None`. `Options.some(value)`/`Options.none()` are the entry points. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Aliases.kt#L24">Try</ConceptTermLink> | `Result<T, Throwable>` | Exception as the error type — the shape used when crossing an exception-only boundary. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Aliases.kt#L31">Outcome</ConceptTermLink> | `Result<T, Err>` | kiit-codes' `Err` as the error type — the most commonly used alias. |
| <ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Aliases.kt#L38">Validated</ConceptTermLink> | `Result<T, Err.ErrorList>` | For validation, collecting multiple errors instead of stopping at the first. |

<Spacer />

### Operators

Composition operators mirror what you'd expect from `Result`/`Either` in other languages, with kiit-codes' status/`Action` threaded through every one that returns a new `Result`:

| Operator | Purpose |
|---|---|
| `map`, `mapError` | Transform the success value or error, leaving the other branch untouched |
| `flatMap`/`then`, `orElse` | Chain another `Result`-returning step on the success or failure branch |
| `fold`, `transform` | Collapse both branches to one value (`fold`), or to a new `Result` from either branch (`transform`) |
| `exists`, `existsError` | Predicate check against the success value or the error, without unwrapping |
| `getOrNull`, `getErrorOrNull` | Nullable accessors for the value or the error |
| `getOrElse`, `getOr` | Value or a computed (`getOrElse`) / literal (`getOr`) fallback |
| `getOrThrow`, `getErrorOrThrow` | Value/error or throw, with an optional custom message |
| `getOrRethrow` | Value, or rethrow the original error unchanged (only when `E : Throwable`) |
| `onSuccess`, `onFailure` | Side-effect on one branch, `Result` unchanged either way |
| `recover` | Unconditionally turn a `Failure` into a `Success` |
| `flatten` | Flatten a nested `Result<Result<T, E>, E>` |
| `or`, `and` | Combine with a second `Result`, independent of any transform |
| `withStatus`, `withAction` | Attach a status or operation context after construction |

A `List<Result<T, E>>` adds its own operators: `combine()` sequences the list into one `Result<List<T>, E>`, short-circuiting on the first `Failure`; `partition()` splits it into successes and errors; `allSuccess`/`allFailure`/`anySuccess`/`anyFailure` check the batch without building a new `Result`.

<Spacer />

### Builders

`Builder<E>` provides status-aware factory methods so `Success`/`Failure` are rarely built directly. It's composed from two smaller interfaces, one per branch, so each stays scoped to its own category constants (the same reason kiit-codes keeps `Succeeded`/`Restricted`/etc. constants on their own companions rather than one shared object):

- **`PassedBuilder<E>`** — `success`/`pending`/`excluded`/`information`, each with 3 overloads: no-arg, `(value, message: String? = null)`, and `(value, status)`.
- **`FailedBuilder<E>`** — `restricted`/`invalid`/`rejected`/`unserved`, each with 5 overloads: no-arg, `(message)`, `(ex, status?)`, `(err, status?)`, `(status)`.

`Builder`/`PassedBuilder`/`FailedBuilder` live in `kiit.result.builders` — extensible machinery to implement (directly, or via `Outcomes`/`Options`/`Tries`), not something most callers import directly. `Outcomes`/`Options`/`Tries`/`Validations` stay in `kiit.result` alongside `Result`/`Success`/`Failure`, since those are the ready-made, everyday API.

| Builder | Status group | Default Code |
|---|---|---|
| `success(value)` | `Passed.Succeeded` | `Succeeded.SUCCESS` |
| `pending(value)` | `Passed.Pending` | `Pending.ACCEPTED` |
| `excluded(value)` | `Passed.Excluded` | `Excluded.OMITTED` |
| `information(value)` | `Passed.Information` | `Information.NOTICE` |
| `restricted(...)` | `Failed.Restricted` | `Restricted.DENIED` |
| `invalid(...)` | `Failed.Invalid` | `Invalid.INVALID_VALUE` |
| `rejected(...)` | `Failed.Rejected` | `Rejected.RULE_VIOLATION` |
| `unserved(...)` | `Failed.Unserved` | `Unserved.UNEXPECTED` |

`excluded()` builds a **`Success`**, not a `Failure` — an intentionally excluded item (deduplicated, disqualified, filtered out) is a kiit-codes `Passed.Excluded` status, not a failure. There's no separate `conflict()` — it's `rejected(status = Rejected.CONFLICT)`, since a conflict is just a specific `Rejected` outcome, not its own category.

`Options` also adds `some(value)`/`none(...)` on top of the generic builders above — a discoverable `Some`/`None`-style pair for `Option<T>` specifically. `none()` defaults to `Rejected.NOT_EXISTS`, distinct from the generic `Unserved.UNEXPECTED` fallback:

```kotlin
import kiit.result.Options

val a = Options.some(42)                     // Option<Int> — present
val b = Options.none<Int>()                  // Option<Int> — absent, Rejected.NOT_EXISTS
val c = Options.none<Int>(Rejected.CONFLICT) // Option<Int> — absent, custom status
```

`Outcomes`/`Options`/`Tries` are the three ready-made `Builder` implementations, one per common error type. `Validations` is a fourth, purpose-built for collecting multiple errors at once instead of catching an exception:

```kotlin
import kiit.result.Outcomes
import kiit.result.Options
import kiit.result.Tries
import kiit.result.Validations

val a = Outcomes.attempt { riskyCall() }        // Outcome<T>    — catches Throwable, wraps as Err
val b = Options.of { riskyCall() }              // Option<T>     — catches Throwable, discards detail
val c = Tries.attempt { riskyCall() }           // Try<T>        — catches Throwable, re-derives status
                                                 //                 from a thrown kiit-codes StatusException
val d = Validations.of(form, errorsFound)       // Validated<T>  — Success if errorsFound is empty,
                                                 //                 otherwise a single Failure carrying all of them
```

<Spacer />

### Conversions

- **`toOutcome()`**: converts any `Result<T, E>` to `Outcome<T>` (`Result<T, Err>`), building an `Err` from whatever the failure held (`String`, `Exception`, or an existing `Err`).
- **`toTry()`**: converts any `Result<T, E>` to `Try<T>` (`Result<T, Throwable>`). An `Err`-typed failure becomes a kiit-codes `StatusException` via `Failed.toException(errors)`, so the exception still carries the original status and error detail.
- **`Tries.of { ... }`**: the reverse direction. If the block throws a `StatusException` (`RestrictedException`/`InvalidException`/`RejectedException`/`UnservedException`), the resulting `Try` is built with the matching `restricted`/`invalid`/`rejected`/`unserved` status instead of a generic failure.

<BackToTop />

## Design

### Philosophy

Most Result types treat success as inert — just a value. Here `Success.status: Passed` distinguishes "succeeded," "succeeded but pending," and "succeeded but excluded," instead of flattening them all to `true`. `E` stays fully generic rather than locked to kiit-codes' `Err`, so `Try<T>`, `Option<T>`, `Outcome<T>`, and `Validated<T>` can all share one `Result<T, E>` instead of needing separate types — the tradeoff is that nothing ties `Failure.status` to `Failure.error` at compile time, deliberately accepted rather than fixed. The ergonomic path (`restricted(err)`, and every other builder) already pairs them correctly by default; bypassing the builders and setting an unrelated `status` explicitly is the one way they can disagree.

There are two ways to build a value — a plain constructor and `Builder<E>` — because they serve different situations: the constructor is for no-ceremony construction with no `Builder` in scope, `Builder<E>` is the status-aware convenience path when implementing `Outcomes`/`Options`/`Tries` or a custom class.

<Spacer />

### Comparisons

kiit-result's operators aren't novel in themselves — nearly every one has a direct precedent in Rust's `Result`, kotlin-result, or both. The actual differentiator is the status taxonomy fused onto both branches, not the operator surface:

| kiit-result | kotlin-result | Swift | Rust |
|---|---|---|---|
| `map` | `map` | `map` | `map` |
| `mapError` | `mapError` | `mapError` | `map_err` |
| `flatMap`/`then` | `flatMap`/`andThen` | `flatMap` | `and_then` |
| `orElse` | `orElse` | `flatMapError` | `or_else` |
| `or` | `or` | — | `or` |
| `and` | `and` | — | `and` |
| `fold` | `fold` | — (use `switch`) | `map_or_else` |
| `transform` | `flatMapEither` | — | — |
| `exists` | — | — | `is_ok_and` |
| `existsError` | — | — | `is_err_and` |
| `onSuccess`/`onFailure` | `onOk`/`onErr` | — | `inspect`/`inspect_err` |
| `getOrNull`/`getErrorOrNull` | `get`/`getError` | — | `ok()`/`err()` |
| `getOrElse` | `getOrElse` | — | `unwrap_or_else` |
| `getOr` | `getOr` | — | `unwrap_or` |
| `getOrThrow()` | `unwrap()` | `get() throws` | `unwrap()` |
| `getOrThrow(message)` | `expect(message)` | — | `expect(msg)` |
| `getErrorOrThrow()` | `unwrapError()` | — | `unwrap_err()` |
| `getErrorOrThrow(message)` | `expectError(message)` | — | `expect_err(msg)` |
| `getOrRethrow` | `getOrThrow()` (`E : Throwable`) | — | — (no exceptions) |
| `recover` | `recover` | — | — |
| `flatten` | `flatten` | — | `flatten` (since 1.89.0) |
| `combine` | `combine` | — | via `collect::<Result<Vec<T>, E>>()` |
| `partition` | `partition` | — | — |
| `allSuccess`/`allFailure` | `allOk`/`allErr` | — | — |
| `anySuccess`/`anyFailure` | `anyOk`/`anyErr` | — | — |
| `Outcomes`/`Tries.attempt` | `runCatching` | `init(catching:)` | — |
| `withStatus`/`withAction` | — | — | — |

Swift's standard library `Result` is deliberately minimal — `map`/`mapError`/`flatMap`/`flatMapError`, a throwing `get()`, and `init(catching:)`, with no native `fold`, `onSuccess`/`onFailure`, or `getOrElse`; callers reach for `switch` or write their own extensions for those. That's also the biggest gap between the two ecosystems: a large share of Kotlin engineers come from mobile, where this smaller Swift surface (rather than Rust's fuller one) is the more familiar reference point.

<Spacer />

### Features

| # | Feature | Description |
|---:|---|---|
| 1 | Status on both branches | Every `Success`/`Failure` carries a status, not just failure — see [Structure](#structure) |
| 2 | Flexible error type | `E` can be `String`, `Throwable`, `Err`, or a domain type — see [Aliases](#aliases) |
| 3 | Operation tracing | Optional `Action` traces the operation across nested calls — see [Action](#action) |
| 4 | Status-aware builders | `restricted`/`invalid`/... prepopulate the matching status — see [Builders](#builders) |
| 5 | Exception-boundary conversions | `toTry()`/`Tries.of` cross into and out of exceptions — see [Conversions](#conversions) |
| 6 | List-combining operators | `combine`/`partition`/... work on a batch of `Result`s — see [Operators](#operators) |

<Spacer />

### Limitations

| # | Limitation | Details |
|---:|---|---|
| 1 | Single maintainer | Apache 2.0, source available, no second maintainer or organizational backing yet |
| 2 | JS/TS is partial | `@JsExport`ed but not CI-gated or published to npm — TypeScript can't compiler-enforce exhaustiveness the way Kotlin/Java/Swift can |
| 3 | Swift distribution unbuilt | Not yet distributed via SPM/XCFramework — see [Swift Interop](#swift-interop) |
| 4 | AI-angle claims unproven | Better accuracy/searchability from a closed vocabulary is the claimed benefit, not something measured |

<Spacer />

### Exclusions

| # | Excluded | Reasoning |
|---:|---|---|
| 1 | Coroutine module | kiit-result's deferred `Raise<E>`/`bind()` roadmap item is a different approach to multi-step composition, not a coroutine port |
| 2 | `zip`/`tryMap`-style iterable mirrors | Large in volume, buildable from `combine` if actually needed — not worth the surface area yet |
| 3 | Numeric status code | Dropped, mirroring kiit-codes' own removal — invites the wrong inference (looks like an HTTP code, isn't); get a protocol code on demand via `CodesToHttp`/`CodesToGrpc` |
| 4 | `operate`, `contains`, `toSuccess`/`toFailure` | Removed after review — each was fully redundant with an existing operator (`flatMap`, `exists`, and the `Success`/`Failure` constructors respectively), with no real usage and no precedent in Rust or kotlin-result |

<BackToTop />

## Tutorial

A single `UserService` grows through each step below — no prior Concepts or Design knowledge required.

### Create

```kotlin
data class User(val id: String, val email: String)

class UserService : OutcomeBuilder {
    private val users = mutableMapOf<String, User>()

    fun create(id: String, email: String): Outcome<User> {
        if (email.isBlank()) return invalid(Invalid.BAD_REQUEST)
        if (users.containsKey(id)) return rejected(Rejected.CONFLICT)
        val user = User(id, email)
        users[id] = user
        return success(user)
    }
}
```

`create` returns an `Outcome<User>` (`Result<User, Err>`) instead of throwing for either expected failure. `invalid`/`rejected`/`success` are `FailedBuilder`/`PassedBuilder` methods, inherited via `OutcomeBuilder` — each pre-fills the right kiit-codes status.

<Spacer />

### Fetch and compose

```kotlin
fun fetch(id: String): Outcome<User> = users[id]?.let { success(it) } ?: invalid(Invalid.NOT_FOUND)
```

```kotlin
userService.create("alice", "alice@example.com")
    .map { it.email }
    .onSuccess { println("registered: $it") }
    .onFailure { err -> println("could not register: ${err.message}") }
```

`map` only touches the `Success` branch; `onSuccess`/`onFailure` run a side effect and return the `Result` unchanged, so the chain reads top-to-bottom regardless of which branch it's actually on.

<Spacer />

### Authorize

```kotlin
fun authorize(id: String, requesterId: String): Outcome<User> =
    fetch(id).flatMap { user ->
        if (user.id != requesterId) restricted(Restricted.UNAUTHORIZED) else success(user)
    }
```

`flatMap` chains a second `Result`-returning step onto the first — `fetch`'s `Failure` (a missing user) short-circuits past `authorize`'s own check entirely, so the `Restricted.UNAUTHORIZED` branch is only ever reached once a user was actually found.

<Spacer />

### Cross an exception boundary

```kotlin
// Wraps a Failure<Err> into a Failure<StatusException> from kiit-codes
val asTry = userService.fetch("missing").toTry()
asTry.onFailure { ex -> println("caught: ${ex.message}") }
```

`toTry()` is the escape hatch for a caller that only understands exceptions — see [Conversions](#conversions) for the full mapping, and [Design > Philosophy](#philosophy) for why `E` stays generic instead of locking every `Result` to one error shape.

<BackToTop />

## Guide

### Usage

1. **Service layers** — return `Outcome<T>` instead of throwing for expected failures.
2. **Pipelines** — `map`/`flatMap` chains compose without manual null/exception checks at each step.
3. **Validation** — `Validated<T>` (`Result<T, Err.ErrorList>`) collects multiple errors via `Validations`.
4. **Exception boundaries** — `toTry()`/`Tries.of` interop with `StatusException` when a caller only understands exceptions.
5. **HTTP/gRPC responses** — `result.status` converts via kiit-codes' `CodesToHttp`/`CodesToGrpc`.

**Good fit if:**
1. Explicit, monadic return values instead of throw/catch for expected failures are wanted.
2. kiit-codes' status taxonomy is already in use (or wanted), with a `Result` type layered on top instead of a bespoke one.
3. Several fallible steps (`map`/`flatMap`) need composing without nested `try`/`catch`.

**Probably not necessary if:**
1. Exceptions already communicate everything needed, and the monadic-return-value style isn't wanted.
2. Only status classification is needed, not a `Result` wrapper — see kiit-codes on its own.

<Spacer />

### Swift Interop

Not yet distributed via SPM/XCFramework — the framework is `.framework`-only today, built locally. Companion-less members like `Outcomes`/`Options`/`Tries` get clean `.shared` access out of the box, and this module uses [SKIE](https://skie.touchlab.co/) for real, compiler-enforced Swift exhaustiveness over `Success`/`Failure` — a genuinely flat switch, simpler than kiit-codes' nested `Status` case, since `Result<T, E>` is only one sealed level deep:

```swift
import KiitResult

let result = Success(value: KotlinInt(value: 42))

func describe<T, E>(_ r: Result<T, E>) -> String {
    switch onEnum(of: r) {
    case .success(let s): return "ok: \(String(describing: s.value))"
    case .failure(let f): return "err: \(String(describing: f.error))"
    }
}
```

Generic type params require `AnyObject` (box `Int`/`String` as `KotlinInt`/`NSString`), and Kotlin's `Nothing` doesn't widen to a concrete error type in Swift — see [`samples/sample-swift`](https://github.com/kiitdev/kiit-result/tree/main/samples/sample-swift) for the full, verified-working subset and exactly what does and doesn't work, including a confirmed-broken case: `flatMap` can't be used from Swift to construct new results.

<BackToTop />

## FAQ

### Why

| Question | Answer |
|---|---|
| **Why not just use Arrow's `Either`/`Validated` or kotlin-result?** | Those give a monad with zero built-in taxonomy — the meaning is supplied by each team itself. kiit-result is the same kind of monad fused to kiit-codes' taxonomy, for consistency across a codebase without every team inventing its own status vocabulary. A different bet, not a "better generic Result." |
| **Why does `Success` carry a status too, not just `Failure`?** | Most Result types treat success as inert — just a value. Here `Success.status: Passed` distinguishes "succeeded," "succeeded but pending," and "succeeded but excluded" instead of flattening them all to `true`. |
| **Why is `E` still fully generic instead of locked to kiit-codes' `Err`?** | So `Try<T>`, `Option<T>`, `Outcome<T>`, and `Validated<T>` can all share one `Result<T, E>` rather than needing separate types. The cost is nothing ties `Failure.status` to `Failure.error` at compile time — deliberately accepted, not fixed. |
| **Doesn't decoupling `status` from `error` risk them disagreeing?** | Yes, narrowly — only if the builders are bypassed or `status` is explicitly overridden against an unrelated `error`. The ergonomic path (`restricted(err)`, etc.) already pairs them correctly by default. |
| **Why two ways to build a value (constructor vs. `Builder<E>`) instead of one?** | They serve different situations: the constructor is for no-ceremony construction with no `Builder` in scope; `Builder<E>` is the status-aware convenience path when implementing `Outcomes`/`Options`/`Tries` or a custom class. |

<Spacer />

### Alternatives

| Question | Answer |
|---|---|
| **How is this different from Kotlin's own `kotlin.Result`?** | stdlib `Result` has one type param and always uses `Throwable` as the error; it isn't a sealed hierarchy meant for pattern matching. kiit-result is a real two-branch sealed type with a flexible error type and a status on both branches. |
| **Isn't `Option<T> = Result<T, Unit>` a strange use of the name "Option"?** | A deliberate lineage, not a misuse — the same historical role as Rust/Scala/Arrow's `Option`, reimagined so absence carries a `status` explaining why instead of a bare `None`. `Options.some(value)`/`Options.none()` make that explicit. |
| **Is this tied to HTTP or web APIs?** | No — it's a universal classification usable at any layer (service call, job step, CLI command), validated against HTTP and gRPC as an external sanity check, not derived from either. |

<Spacer />

### API

| Question | Answer |
|---|---|
| **Why is there no `conflict()` builder?** | It was just `rejected()` with `Rejected.CONFLICT` as the default status, not its own category. Use `rejected(status = Rejected.CONFLICT)`. |
| **Why did `denied`/`ignored` become `restricted`/`excluded`?** | To match kiit-codes' actual group names (`Restricted`, `Excluded`) instead of carrying forward older, inconsistent naming. |
| **Why does `excluded()` build a `Success`, not a `Failure`?** | `Excluded` is a `Passed` group in kiit-codes — an intentionally skipped/deduplicated/disqualified item isn't a failure. |
| **Why is `Builder<E>` split into `PassedBuilder`/`FailedBuilder`?** | Keeps each interface's surface scoped to one branch — the same reason kiit-codes keeps each group's constants on its own companion rather than one shared object. |
| **Do I have to pick a specific `Status` every time I use a builder?** | No — the group builders all apply a sensible default when none is supplied. An explicit status is only needed when the default doesn't fit (`restricted(status = Restricted.LOCKED)`) — routine use never requires touching `Status` directly. |
| **Whatever happened to the numeric status code?** | Dropped, mirroring kiit-codes' own removal — an earlier version had one and it invited the wrong inference (looks like an HTTP code, isn't). Get a protocol code on demand via `CodesToHttp`/`CodesToGrpc`. |

<Spacer />

### Adoption

| Question | Answer |
|---|---|
| **Can I use my own error type and ignore kiit-codes?** | Only partially — `E` is generic (use `Throwable`, `String`, a domain type), but `Success.status`/`Failure.status` are hard-typed to kiit-codes' `Passed`/`Failed`. There's no way to use `Result<T, E>` without a kiit-codes status on every branch. |
| **What if my team already has its own status conventions?** | Not an overnight replacement — existing statuses can map into the taxonomy incrementally. |
| **Does this actually work on JS and iOS today?** | kiit-result's production history is JVM/Android — JS and iOS/Swift are new targets with no production history yet, not just "unexercised" versions of something proven. JS/TS is a deliberately partial pass (`@JsExport`ed, not CI-gated or published to npm, since TypeScript can't compiler-enforce exhaustiveness). iOS uses SKIE for real, compiler-enforced Swift exhaustiveness — a materially better story than JS, including plain Kotlin `object`s (`Outcomes`/`Options`/`Tries`) getting clean `.shared` access with no extra work. |

<Spacer />

### AI

| Question | Answer |
|---|---|
| **Is the "built for AI" angle just marketing?** | Same answer kiit-codes gives, extended to the `Result` layer: the design choices are justified on ordinary engineering grounds first — exhaustive branching, a small fixed vocabulary, fewer decisions per call site. AI tooling benefits from the same properties any consistent codebase does, but the library stands on its own without that framing. |
| **What's the actual theory?** | A closed `Success`/`Failure` split with a fixed, named-category vocabulary gives an AI generating or reading code a small, predictable set of shapes to reach for, instead of guessing at ad hoc exception types or boolean flags — and Kotlin's compiler-enforced exhaustive `when` means a branch can't be silently missed, by a human or a model. Better accuracy, searchability, and standardization are the claimed benefits, not proven, and intentionally modest about that. |

<Spacer />

### Maturity

| Question | Answer |
|---|---|
| **Is this production-ready at 1.0.1?** | The version reflects the standalone repo's age, not the design's — this `Result<T, E>` pattern, paired with a status taxonomy, has been running in production for years across mobile and server applications inside the original Kiit toolkit. What's actually new: extraction into an independent repo, an updated and polished taxonomy in kiit-codes, and `kiit-codes`/`kiit-result` now being fully decoupled from each other. The multiplatform export work is the one piece still genuinely in progress. |
| **What about single-maintainer risk?** | Real, worth being upfront about — Apache 2.0, source available, no second maintainer or organizational backing yet. |

<BackToTop />
