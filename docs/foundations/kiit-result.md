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

<p className="kiit-tagline">A Kotlin Result&lt;T, E&gt; type with a kiit-codes status on every branch, not just failure.</p>

Every `Success` and `Failure` carries a status from kiit-codes' closed taxonomy, unlike Rust's `Result`, Swift's `Result`, or other Kotlin `Result` types, where success is just a bare value. `Outcome<T>` is the ready-made alias for everyday use, paired with `Try<T>`, `Option<T>`, and `Validated<T>` for exceptions, absence, and validation.

![Kiit Result overview](/img/kiit-result/kiit-result-overview.png)

## Overview

### Goals

kiit-result's `Result<T, E>` exists so a caller knows the kind of success or failure, not just whether one happened. A `status` rides on both branches, not just `Failure`, closing a gap that `null` and thrown exceptions both leave unfilled: neither can say why something failed, or that it succeeded but was excluded, say, because of a duplicate.

`Outcome<T>`, `Try<T>`, `Option<T>`, and `Validated<T>` are simply aliases on this one type, ensuring a consistent approach. Each just sets the error shape for its respective use case.

A set of builder functions pick the right status for you: call `restricted()` for an unauthorized caller, `invalid()` for bad input, and so on, so the status matches the error without having to build one by hand. An optional `Action` can ride along too, recording which operation produced a result so a failure several layers deep is easy to trace back to its source. The same small, fixed vocabulary on every branch also makes code easier for a model to read or generate correctly, one predictable shape instead of a bespoke one per library. See [Philosophy](#philosophy) for the full rationale.

<Spacer />

### Inspiration

| Source | What it contributes |
|---|---|
| [Scala](https://www.scala-lang.org/api/current/scala/util/Either.html) | `Either`/`Try`, precedent for a flexible-error-type Result distinct from a bare `Option` |
| [Rust](https://doc.rust-lang.org/std/result/enum.Result.html) | `Result<T, E>`'s two-branch monadic shape, and most of the operator vocabulary (`map`, `and_then`, `unwrap`) |
| [kotlin-result](https://github.com/michaelbull/kotlin-result) | Kotlin-idiomatic naming for that same operator set (`getOr`, `recover`, `combine`, `partition`) |
| [kiit-codes](https://www.kiit.dev/docs/kiit-codes) | The closed status taxonomy fused onto both branches, kiit-result's actual differentiator from every Result type above |

<Spacer />

### Activity

kiit-result has been extracted from the Kiit toolkit and polished as a standalone module. This `Result<T, E>` pattern, paired with a status taxonomy, has been running in production for over 4 years across mobile and server Kotlin applications. Current work is focused on the Kotlin Multiplatform release, documentation, examples, and ecosystem integration. See [GitHub Issues](https://github.com/kiitdev/kiit-result/issues) for what's in flight.

<Spacer />

### Resources

| # | Resource | Link |
|---:|---|---|
| 1 | Repository | [github.com/kiitdev/kiit-result](https://github.com/kiitdev/kiit-result) |
| 2 | Maven Central | [dev.kiit:kiit-result](https://central.sonatype.com/artifact/dev.kiit/kiit-result) |
| 3 | npm | Not yet published. JS/TS is a partial pass not covered by CI, see [Limitations](#limitations) |
| 4 | Related module | [kiit-codes](https://github.com/kiitdev/kiit-codes), the status taxonomy this library builds on |
| 5 | Samples | `samples/sample-kotlin`, `sample-java`, `sample-swift`, `sample-ts` in the repo |

<BackToTop />

## Setup

### Install

```kotlin
dependencies {
    implementation("dev.kiit:kiit-result:1.0.1")
}
```

`kiit-result` depends on `dev.kiit:kiit-codes` transitively. No separate dependency is needed.

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
import kiit.codes.Err
import kiit.codes.Rejected
import kiit.codes.Restricted
import kiit.result.Outcome
import kiit.result.Outcomes

class UserService {
    private val users = mutableMapOf<String, User>()

    // Alias Outcome<User> = Result<User, Err>
    // Err is an error type from kiit-codes.
    fun create(id: String, email: String): Outcome<User> = when {
        // Restricted: a reserved id, not allowed
        id == "admin" -> Outcomes.restricted(Restricted.DENIED)
        // Invalid: bad input
        email.isBlank() -> Outcomes.invalid(Err.on("email", email, "email is required"))
        // Rejected: already exists
        users.containsKey(id) -> Outcomes.rejected(Rejected.CONFLICT)
        // Succeeded: created
        else -> {
            val user = User(id, email)
            users[id] = user
            Outcomes.success(user)
        }
    }
}
```

```kotlin
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
| **Aliases** | `Option<T>`/`Try<T>`/`Outcome<T>`/`Validated<T>`, type aliases fixing `E` for common cases | <MoreLink label="More" href="#aliases" /> |
| **Operators** | `map`/`flatMap`/`fold`/`recover`/..., the composition surface | <MoreLink label="More" href="#operators" /> |
| **Builders** | Status-aware factory methods for `Success`/`Failure` | <MoreLink label="More" href="#builders" /> |
| **Conversions** | `toOutcome()`/`toTry()`, crossing between error-type shapes | <MoreLink label="More" href="#conversions" /> |
| **Status** | kiit-codes' `Passed`/`Failed` taxonomy, attached to every `Result` | <MoreLink label="More" href="#status" /> |

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

1. <ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Result.kt#L429">Success</ConceptTermLink>: holds a `value: T`, defaults its `status` to `Succeeded.SUCCESS`.
2. <ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Result.kt#L461">Failure</ConceptTermLink>: holds an `error: E`, defaults its `status` to `Unserved.UNEXPECTED`.

`Success<T>` doesn't always mean "complete," see [Status](#status) for the full set of `Passed` kinds. `result.message` is a convenience accessor equal to `result.status.message` on either branch.

![Kiit Result structure](/img/kiit-result/kiit-result-structure.png)

<Spacer />

### Status

Every `Result` carries a `status`, not just `Failure`. `Success<T>.status` is a `Passed`, `Failure<E>.status` is a `Failed`, each with four further subtypes:

| | Subtypes |
|---|---|
| **`Passed`** | `Succeeded`, `Pending`, `Excluded`, `Information` |
| **`Failed`** | `Restricted`, `Invalid`, `Rejected`, `Unserved` |

A `Success` isn't always "fully done": it can be `Pending` (queued) or `Excluded` (intentionally skipped) and still be a `Success`, not a lesser kind of failure. `Success<T>` means the outcome is a `Passed` status, not "the operation completed."

This hierarchy belongs to kiit-codes, not kiit-result. See the [kiit-codes docs](https://www.kiit.dev/docs/kiit-codes#taxonomy) for the full set of groups and codes. <MoreLink label="Using it" href="#using-status" />

![Kiit Result status taxonomy](/img/kiit-result/kiit-result-status.png)

<Spacer />

### Action

<ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Action.kt#L22">Action</ConceptTermLink> names the operation that produced or wrapped a `Result`. It carries:

1. `action: String`: the operation name, required.
2. `xid: String?`: an optional correlation id for tracing.
3. `data: Map<String, String>`: optional free-form attributes.
4. `previous: Action?`: an optional link to the action this one was chained from.

Attach it via `result.withAction(action, chain = true)`. Chaining links to whatever action is already present by default, which is what makes it useful for pinpointing which layer failed inside a nested call chain. Once attached, `action` survives `map`/`mapError`/`toOutcome()`/`toTry()`, the same as `status` does.

![Kiit Result action](/img/kiit-result/kiit-result-action.png)

<Spacer />

### Aliases

`Option<T>`, `Try<T>`, `Outcome<T>`, and `Validated<T>` are practical specializations of one `Result<T, E>`, each just fixing `E` to a common error shape, not four separate types.

![Kiit Result aliases](/img/kiit-result/kiit-result-aliases.png)

1. **<ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Aliases.kt#L31">Outcome</ConceptTermLink>**: kiit-codes' `Err` as the error type, the most commonly used alias.
2. **<ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Aliases.kt#L38">Validated</ConceptTermLink>**: For validation, collecting multiple errors instead of stopping at the first.
3. **<ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Aliases.kt#L24">Try</ConceptTermLink>**: Exception as the error type, the shape used when crossing an exception-only boundary.
4. **<ConceptTermLink href="https://github.com/kiitdev/kiit-result/blob/main/kiit-result/src/commonMain/kotlin/kiit/result/Aliases.kt#L17">Option</ConceptTermLink>**: The historical `Option`/`Maybe` role (Rust/Scala/Arrow), reimagined so absence carries a `status` explaining why, not just a bare `None`. `Options.some(value)`/`Options.none()` are the entry points.

:::info[Validated&lt;T&gt;]
1. **Intention**: `Validated<T>` collects every error instead of stopping at the first, for validating a whole request at once.
2. **Just an alias**: Just a type alias on `Result<T, E>`, not a separate applicative type.
3. **Adaptation**: Category-theory's `Validated` is typically its own accumulating-applicative abstraction, distinct from `Either`. Here it's a practical specialization of the same monadic `Result`, not that abstraction.
:::

:::info[Option&lt;T&gt;]
1. **Intention**: `Option<T>` expresses presence of a value, not just success/failure.
2. **Presence**: `Success<T>` means the value is present, a **success in presence**.
3. **Absence**: `Failure<Unit>` means the value is absent, a **failure in presence**.
4. **Adaptation**: A deliberate adaptation of `Option`/`Maybe`, not literal category-theory semantics.
5. **Practicality**: Familiar names, practical semantics, these aliases don't attempt to replicate category-theory abstractions.
:::

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

- **`PassedBuilder<E>`**: `success`/`pending`/`excluded`/`information`, each with 3 overloads: no-arg, `(value, message: String? = null)`, and `(value, status)`.
- **`FailedBuilder<E>`**: `restricted`/`invalid`/`rejected`/`unserved`, each with 5 overloads: no-arg, `(message)`, `(ex, status?)`, `(err, status?)`, `(status)`.

`Builder`/`PassedBuilder`/`FailedBuilder` live in `kiit.result.builders`. Extensible machinery to implement (directly, or via `Outcomes`/`Options`/`Tries`), not something most callers import directly. `Outcomes`/`Options`/`Tries`/`Validations` stay in `kiit.result` alongside `Result`/`Success`/`Failure`, since those are the ready-made, everyday API.

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

`excluded()` builds a **`Success`**, not a `Failure`. An intentionally excluded item (deduplicated, disqualified, filtered out) is a kiit-codes `Passed.Excluded` status, not a failure. There's no separate `conflict()`, it's `rejected(status = Rejected.CONFLICT)`, since a conflict is just a specific `Rejected` outcome, not its own category.

`Options` also adds `some(value)`/`none(...)` on top of the generic builders above, a discoverable `Some`/`None`-style pair for `Option<T>` specifically. `none()` defaults to `Rejected.NOT_EXISTS`, distinct from the generic `Unserved.UNEXPECTED` fallback:

```kotlin
import kiit.codes.Rejected
import kiit.result.Options

// Option<Int> — present
val a = Options.some(42)
// Option<Int> — absent, Rejected.NOT_EXISTS
val b = Options.none<Int>()
// Option<Int> — absent, custom status
val c = Options.none<Int>(Rejected.CONFLICT)
```

`Outcomes`/`Options`/`Tries` are the three ready-made `Builder` implementations, one per common error type. `Validations` is a fourth, purpose-built for collecting multiple errors at once instead of catching an exception:

```kotlin
import kiit.result.Outcomes
import kiit.result.Options
import kiit.result.Tries
import kiit.result.Validations

// Outcome<T>: catches Throwable, wraps as Err
val a = Outcomes.attempt { riskyCall() }
// Option<T>: catches Throwable, discards detail
val b = Options.of { riskyCall() }
// Try<T>: catches Throwable, re-derives status from a thrown kiit-codes StatusException
val c = Tries.attempt { riskyCall() }
// Validated<T>: Success if errorsFound is empty, otherwise a single Failure carrying all of them
val d = Validations.of(form, errorsFound)
```

<Spacer />

### Conversions

- **`toOutcome()`**: converts any `Result<T, E>` to `Outcome<T>` (`Result<T, Err>`), building an `Err` from whatever the failure held (`String`, `Exception`, or an existing `Err`).
- **`toTry()`**: converts any `Result<T, E>` to `Try<T>` (`Result<T, Throwable>`). An `Err`-typed failure becomes a kiit-codes `StatusException` via `Failed.toException(errors)`, so the exception still carries the original status and error detail.
- **`Tries.of { ... }`**: the reverse direction. If the block throws a `StatusException` (`RestrictedException`/`InvalidException`/`RejectedException`/`UnservedException`), the resulting `Try` is built with the matching `restricted`/`invalid`/`rejected`/`unserved` status instead of a generic failure.

<BackToTop />

## Design

### Philosophy

kiit-result's design comes down to six ideas:

| # | Idea | Description |
|---:|---|---|
| 1 | **Status** | Most Result types treat success as inert, just a value. Here, `Success.status: Passed` distinguishes "succeeded," "succeeded but pending," and "succeeded but excluded," instead of flattening every success down to a bare `true` (see [Status](#status) for the full set of kinds on each side). This is the one idea without a direct precedent in Rust, Swift, or kotlin-result, and the reason kiit-result exists as its own type rather than reusing one of those. |
| 2 | **Aliases** | `E` stays fully generic rather than locked to kiit-codes' `Err`, so `Outcome<T>`, `Try<T>`, `Option<T>`, and `Validated<T>` can all share one `Result<T, E>` instead of needing four separate types. Each alias just fixes `E` to the error shape a given situation calls for, with a matching builder already wired up. |
| 3 | **Builders** | Builders like `restricted(err)`, `invalid(err)`, and `rejected(err)` pick a sensible default `status` for you, so the common case needs no separate classification step. `status` and `error` are independent facts about the same `Failure`, not a pair that has to agree, see [Relationship](#relationship). |
| 4 | **Action** | An optional `Action` records which operation produced or wrapped a `Result`, and chaining links a new one to whatever was already there. It's the one idea that isn't about `status` at all, useful for tracing which layer failed inside a nested call chain without reaching for a separate tracing library. |
| 5 | **AI Benefits** | The same closed `status` vocabulary shows up on both branches, so a model reading or generating code against kiit-result has one exhaustive pattern to match against, on `Success` and `Failure` alike, rather than a bespoke shape per library. |
| 6 | **Scope** | kiit-result aims for a reasonable learning curve on everyday application code, not a category-theory-complete FP toolkit. `Option`/`Try`/`Outcome`/`Validated` are practical specializations of one `Result<T, E>`, familiar names with pragmatic semantics. Full category-theory abstractions (applicatives, monad transformers) are a different, valid goal, just not this library's. |

There are also two ways to build a value, a plain constructor and `Builder<E>`, because they serve different situations: the constructor is for no-ceremony construction with no `Builder` in scope, `Builder<E>` is the status-aware convenience path when implementing `Outcomes`/`Options`/`Tries` or a custom class.

<Spacer />

### Relationship

`error: E` and `status: Status` are both attributes of the same `Failure`, not two views of one fact that need to agree. Each answers a different question about the same occurrence:

1. **`status`**: what kind of outcome this is (see [Status](#status) for the full set on each branch), for branching, protocol mapping (`CodesToHttp`/`CodesToGrpc`), and log severity.
2. **`error`**: what happened, in whatever detail the situation calls for, a message, a field, a wrapped exception, or a domain-specific type.

The clearest comparison is an HTTP response: a `500` can carry "database timeout" or "null pointer in payment processing," and nobody considers it a defect that HTTP doesn't validate the body against the code. The status answers how a caller should behave; the body answers what a human needs to debug it. `status` and `error` play the same two roles here.

Deriving `status` from `error`'s content would also remove a real degree of freedom: the same `Err` can legitimately be `Restricted` in one call site and `Rejected` in another, depending on what the calling code is actually deciding, not a fact recoverable from the error text alone.

The one exception is [`Tries.of`](#conversions), which *does* derive `status` from `error`, specifically when the thrown `Throwable` is itself a kiit-codes `StatusException`. That particular error type already carries its own category by construction, so there's a real fact to derive. Otherwise, classification is a deliberate, independent choice, not something `error`'s content could determine on its own.

<Spacer />

### Errors

`Err` is kiit-codes' own error representation, not kiit-result's, the default `E` for `Outcome<T>` (`Result<T, Err>`). It's a closed hierarchy with three shapes:

1. **`ErrorInfo`**: a message with an optional cause, the general-purpose default.
2. **`ErrorField`**: a message tied to a specific `field`/`value`, for validation-style errors.
3. **`ErrorList`**: wraps multiple `Err`s into one, what `Validated<T>` collects into.

Every `Err` carries a `message: String`, a `cause: Throwable?`, and a `ref: Any?` for attaching arbitrary context.

| Builder | Produces |
|---|---|
| `Err.of(message)` | `ErrorInfo` from a plain message |
| `Err.on(field, value, message)` | `ErrorField` with a value |
| `Err.on(field, message)` | `ErrorField` without a value, for a sensitive field like a password |
| `Err.ex(throwable)` | `ErrorInfo` wrapping a caught exception |

See the [kiit-codes docs](https://www.kiit.dev/docs/kiit-codes#err) for the full API, including `Err.build`/`Err.obj`/`Err.list`. `Err` and `status` are independent facts about the same `Failure`, not a pair that has to agree, see [Relationship](#relationship).

<Spacer />

### Comparisons

kiit-result's operators aren't novel in themselves. Nearly every one has a direct precedent in Rust's `Result`, kotlin-result, or both. The actual differentiator is the status taxonomy fused onto both branches, not the operator surface:

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

Swift's standard library `Result` is deliberately minimal: `map`/`mapError`/`flatMap`/`flatMapError`, a throwing `get()`, and `init(catching:)`, with no native `fold`, `onSuccess`/`onFailure`, or `getOrElse`. Callers reach for `switch` or write their own extensions for those instead. A large share of Kotlin engineers come from mobile though, where this smaller Swift surface, not Rust's fuller one, is the more familiar reference point.

<Spacer />

### Features

| # | Feature | Description |
|---:|---|---|
| 1 | Status on both branches | Every `Success`/`Failure` carries a status, not just failure. See [Structure](#structure) |
| 2 | Flexible error type | `E` can be `String`, `Throwable`, `Err`, or a domain type. See [Aliases](#aliases) |
| 3 | Operation tracing | Optional `Action` traces the operation across nested calls. See [Action](#action) |
| 4 | Status-aware builders | `restricted`/`invalid`/... prepopulate the matching status. See [Builders](#builders) |
| 5 | Exception-boundary conversions | `toTry()`/`Tries.of` cross into and out of exceptions. See [Conversions](#conversions) |
| 6 | List-combining operators | `combine`/`partition`/... work on a batch of `Result`s. See [Operators](#operators) |

<Spacer />

### Limitations

| # | Limitation | Details |
|---:|---|---|
| 1 | Swift distribution unbuilt | Not yet distributed via SPM/XCFramework. See [Swift Interop](#swift-interop) |
| 2 | AI-angle claims unproven | Better accuracy/searchability from a closed vocabulary is the claimed benefit, not something measured |
| 3 | JS/TS is partial | `@JsExport`ed but not covered by CI or published to npm. TypeScript can't compiler-enforce exhaustiveness the way Kotlin/Java/Swift can |

<Spacer />

### Exclusions

| # | Excluded | Reasoning |
|---:|---|---|
| 1 | Coroutine module | Cancellation-safety and concurrent composition are a different problem from sequential, status-aware composition. kiit-result's deferred `Raise<E>`/`bind()` roadmap item addresses the latter |
| 2 | `zip`/`tryMap`-style iterable mirrors | Large in volume, buildable from `combine` if actually needed. Not worth the surface area yet |
| 3 | Numeric status code | Dropped, mirroring kiit-codes' own removal. Invites the wrong inference (looks like an HTTP code, isn't); get a protocol code on demand via `CodesToHttp`/`CodesToGrpc` |

<BackToTop />

## Tutorial

A single `UserService` grows through each step below, no prior Concepts or Design knowledge required.

### Create

```kotlin
import kiit.codes.Err
import kiit.codes.Rejected
import kiit.result.Outcome
import kiit.result.Outcomes

data class User(val id: String, val email: String)

class UserService {
    private val users = mutableMapOf<String, User>()

    fun create(id: String, email: String): Outcome<User> = when {
        email.isBlank() -> Outcomes.invalid(Err.on("email", email, "email is required"))
        users.containsKey(id) -> Outcomes.rejected(Rejected.CONFLICT)
        else -> {
            val user = User(id, email)
            users[id] = user
            Outcomes.success(user)
        }
    }
}
```

`create` returns an `Outcome<User>` (`Result<User, Err>`) instead of throwing for either expected failure. `invalid`/`rejected`/`success` are `Outcomes` builder methods (`FailedBuilder`/`PassedBuilder` under the hood). Each pre-fills the right kiit-codes status, and `invalid` here carries a real `Err` instead of a bare status.

<Spacer />

### Fetch and compose

```kotlin
import kiit.codes.Invalid
import kiit.result.Outcome
import kiit.result.Outcomes

fun fetch(id: String): Outcome<User> = users[id]?.let { Outcomes.success(it) } ?: Outcomes.invalid(Invalid.NOT_FOUND)
```

```kotlin
userService.create("alice", "alice@example.com")
    .map { it.email }
    .onSuccess { println("registered: $it") }
    .onFailure { err -> println("could not register: ${err.message}") }
```

`map` only touches the `Success` branch. `onSuccess`/`onFailure` run a side effect and return the `Result` unchanged, so the chain reads top-to-bottom regardless of which branch it's actually on.

<Spacer />

### Authorize

```kotlin
import kiit.codes.Restricted
import kiit.result.Outcome
import kiit.result.Outcomes
import kiit.result.flatMap

fun authorize(id: String, requesterId: String): Outcome<User> =
    fetch(id).flatMap { user ->
        if (user.id != requesterId) Outcomes.restricted(Restricted.UNAUTHORIZED) else Outcomes.success(user)
    }
```

`flatMap` chains a second `Result`-returning step onto the first. `fetch`'s `Failure` (a missing user) short-circuits past `authorize`'s own check entirely, so the `Restricted.UNAUTHORIZED` branch is only reached once a user was actually found.

<Spacer />

### Cross an exception boundary

```kotlin
// Wraps a Failure<Err> into a Failure<StatusException> from kiit-codes
val asTry = userService.fetch("missing").toTry()
asTry.onFailure { ex -> println("caught: ${ex.message}") }
```

`toTry()` is the escape hatch for a caller that only understands exceptions. See [Conversions](#conversions) for the full mapping, and [Philosophy](#philosophy) for why `E` stays generic instead of locking every `Result` to one error shape.

<BackToTop />

## Guide

### Usage

1. **Service layers**: return `Outcome<T>` instead of throwing for expected failures.
2. **Pipelines**: `map`/`flatMap` chains compose without manual null/exception checks at each step.
3. **Validation**: `Validated<T>` (`Result<T, Err.ErrorList>`) collects multiple errors via `Validations`.
4. **Exception boundaries**: `toTry()`/`Tries.of` interop with `StatusException` when a caller only understands exceptions.
5. **HTTP/gRPC responses**: `result.status` converts via kiit-codes' `CodesToHttp`/`CodesToGrpc`.

**Good fit if:**
1. Explicit, monadic return values instead of throw/catch for expected failures are wanted.
2. kiit-codes' status taxonomy is already in use (or wanted), with a `Result` type layered on top instead of a bespoke one.
3. Several fallible steps (`map`/`flatMap`) need composing without nested `try`/`catch`.

**Probably not necessary if:**
1. Exceptions already communicate everything needed, and the monadic-return-value style isn't wanted.
2. Only status classification is needed, not a `Result` wrapper. See kiit-codes on its own.

<Spacer />

### Branching

`Result` is sealed with exactly two subtypes, so a `when` over it is exhaustive without a `default`/`else` branch, on Kotlin, and on Java 21's pattern-matching `switch` too.

```kotlin
import kiit.result.Failure
import kiit.result.Outcome
import kiit.result.Success

val result: Outcome<User> = userService.create("alice", "alice@example.com")

when (result) {
    is Success -> println("created ${result.value.id}")
    is Failure -> println("failed: ${result.error.message}")
}
```

<Spacer />

### Using Status

`result.status` is itself a closed hierarchy: `Passed` or `Failed` at the top, each with four further subtypes. Nesting a `when` inside a `when` gets exhaustiveness at both levels. Capture `result.status` into a local `val` first, so the compiler can smart-cast it reliably inside the nested `when` too. See [Concepts > Status](#status) for the full set of subtypes.

```kotlin
import kiit.codes.Excluded
import kiit.codes.Failed
import kiit.codes.Information
import kiit.codes.Invalid
import kiit.codes.Passed
import kiit.codes.Pending
import kiit.codes.Rejected
import kiit.codes.Restricted
import kiit.codes.Succeeded
import kiit.codes.Unserved

when (val status = result.status) {
    is Passed -> when (status) {
        is Succeeded -> println("succeeded: ${status.name}")
        is Pending -> println("pending: ${status.name}")
        is Excluded -> println("excluded: ${status.name}")
        is Information -> println("info: ${status.name}")
    }
    is Failed -> when (status) {
        is Restricted -> println("restricted: ${status.name}")
        is Invalid -> println("invalid: ${status.name}")
        is Rejected -> println("rejected: ${status.name}")
        is Unserved -> println("unserved: ${status.name}")
    }
}
```

<Spacer />

### Using Action

Attach an `Action` when a result is produced, then read it back for logging or tracing. Chaining links a new `Action` to whatever one was already there, so a caller several layers up can see the whole path an operation took. `map`/`mapError` carry an existing `Action` forward automatically; `flatMap` doesn't, since the new `Result` comes from caller-supplied code, so reattach it explicitly there if it needs to carry through.

```kotlin
import kiit.result.Action
import kiit.result.Outcome

fun createUser(id: String, email: String): Outcome<User> =
    userService.create(id, email)
        .withAction(Action(action = "createUser", xid = "req-42", data = mapOf("email" to email)))

val result = createUser("u1", "alice@example.com")
// "createUser"
result.action?.action
// "req-42"
result.action?.xid
// {"email": "alice@example.com"}
result.action?.data

// chaining: a new Action's `previous` links back to whatever Action was already there
val outer = result.withAction(Action(action = "processOrder"))
// "processOrder", the current operation
outer.action?.action
// "createUser", the operation this one wrapped
outer.action?.previous?.action
```

<Spacer />

### Ops: Core

The everyday operators for composing and inspecting a `Result` without leaving its own shape: `map` transforms the success value, `flatMap` chains another `Result`-returning step, `exists` checks the value without unwrapping it, and `onSuccess`/`onFailure` run a side effect on whichever branch matches.

```kotlin
import kiit.result.Outcome
import kiit.result.Outcomes
import kiit.result.Success
import kiit.result.flatMap

val ok: Outcome<Int> = Outcomes.success(42)
val bad: Outcome<Int> = Outcomes.unserved("boom")

// Success("42 dollars")
ok.map { "$it dollars" }
// unchanged Failure, map skips it
bad.map { "$it dollars" }

// Success(43)
ok.flatMap { Success(it + 1) }
// unchanged Failure, flatMap short-circuits
bad.flatMap { Success(it + 1) }

// true
ok.exists { it > 0 }
// false, a Failure never satisfies exists
bad.exists { it > 0 }

// runs the block, returns ok unchanged
ok.onSuccess { println("got $it") }
// skipped, returns bad unchanged
bad.onFailure { err -> println("failed: ${err.message}") }
```

<Spacer />

### Ops: Getters

Every accessor for pulling a value or error out of a `Result` lives in this family, nullable, defaulted, or throwing, depending on how the failure case should be handled. `getOrNull`/`getErrorOrNull` hand back `null`; `getOr`/`getOrElse` hand back a fallback (literal or computed from the error); `getOrThrow`/`getErrorOrThrow`/`getOrRethrow` throw instead, differing only in what gets thrown.

```kotlin
import kiit.result.Failure
import kiit.result.Outcome
import kiit.result.Outcomes
import kiit.result.Success
import kiit.result.Try
import kiit.result.getOr
import kiit.result.getOrElse
import kiit.result.getOrRethrow

val ok: Outcome<Int> = Outcomes.success(42)
val bad: Outcome<Int> = Outcomes.unserved("boom")

// 42
ok.getOrNull()
// null
bad.getOrNull()

// "boom"
bad.getErrorOrNull()?.message
// null
ok.getErrorOrNull()

// 42
ok.getOr(-1)
// -1
bad.getOr(-1)

// 42
ok.getOrElse { -1 }
// fallback computed from the error
bad.getOrElse { err -> err.message.length }

// 42
ok.getOrThrow()
// throws, built from status + error
bad.getOrThrow()

// the Err, since this is a Failure
bad.getErrorOrThrow()
// throws, since this is a Success
ok.getErrorOrThrow()

val ok2: Try<Int> = Success(42)
val bad2: Try<Int> = Failure(IllegalStateException("boom"))
// 42
ok2.getOrRethrow()
// rethrows the original IllegalStateException, unchanged
bad2.getOrRethrow()
```

<Spacer />

### Ops: Lists

Operators on `List<Result<T, E>>` for working with a batch of results at once: checking whether they all/any succeeded, sequencing them into one `Result`, or splitting them into separate success/error lists.

```kotlin
import kiit.result.Outcomes
import kiit.result.allFailure
import kiit.result.allSuccess
import kiit.result.anyFailure
import kiit.result.anySuccess
import kiit.result.combine
import kiit.result.partition

val results = listOf(Outcomes.success(1), Outcomes.success(2), Outcomes.success(3))
val mixed = listOf(Outcomes.success(1), Outcomes.unserved<Int>("boom"), Outcomes.success(3))

// true, every item succeeded
results.allSuccess()
// false, one Failure present
mixed.allSuccess()

// false
results.allFailure()
// false, not all failed either
mixed.allFailure()

// true
results.anySuccess()
// true, at least one succeeded
mixed.anySuccess()

// false
results.anyFailure()
// true
mixed.anyFailure()

// Success([1, 2, 3])
results.combine()
// Failure("boom"), short-circuits on the first Failure
mixed.combine()

// (listOf(1, 2, 3), emptyList())
results.partition()
// (listOf(1, 3), listOf(Err("boom")))
mixed.partition()
```

<Spacer />

### Ops: Transforms

Operators that reshape a `Result` into something else entirely: `fold` collapses both branches into one plain value, `recover` unconditionally turns a `Failure` into a `Success`, and `flatten` collapses a nested `Result`.

```kotlin
import kiit.codes.Err
import kiit.result.Outcome
import kiit.result.Outcomes
import kiit.result.Result
import kiit.result.Success
import kiit.result.flatten
import kiit.result.recover

val ok: Outcome<Int> = Outcomes.success(42)
val bad: Outcome<Int> = Outcomes.unserved("boom")

// "value: 42"
ok.fold({ "value: $it" }, { "error: ${it.message}" })
// "error: boom"
bad.fold({ "value: $it" }, { "error: ${it.message}" })

// unchanged Success, recover only touches Failure
ok.recover { -1 }
// Success(-1), Failure turned into Success
bad.recover { -1 }

val nested: Result<Result<Int, Err>, Err> = Success(Success(42))
// Success(42), one level unwrapped
nested.flatten()
```

<Spacer />

### Ops: Misc

The rest of the operator surface: branch-specific transforms and combinators (`mapError`, `existsError`, `orElse`, `or`, `and`), attaching a status or `Action` after construction (`withStatus`/`withAction`), and `transform` for mapping either branch into a brand-new `Result`.

```kotlin
import kiit.codes.Err
import kiit.codes.Restricted
import kiit.codes.Succeeded
import kiit.result.Action
import kiit.result.Outcome
import kiit.result.Outcomes
import kiit.result.Success
import kiit.result.and
import kiit.result.or
import kiit.result.orElse

val ok: Outcome<Int> = Outcomes.success(42)
val bad: Outcome<Int> = Outcomes.unserved("boom")

// unchanged Success, mapError only touches Failure
ok.mapError { Err.of("wrapped: ${it.message}") }
// Failure with a wrapped Err
bad.mapError { Err.of("wrapped: ${it.message}") }

// false, a Success never satisfies existsError
ok.existsError { it.message == "boom" }
// true
bad.existsError { it.message == "boom" }

// unchanged Success, orElse only touches Failure
ok.orElse { Success(-1) }
// Success(-1), recovered via a new Result
bad.orElse { Success(-1) }

// Success(42), or keeps the first Success
ok.or(Success(-1))
// Success(-1), or falls through to the fallback
bad.or(Success(-1))

// Success(-1), and swaps in the second Result when the first succeeds
ok.and(Success(-1))
// unchanged Failure, and short-circuits
bad.and(Success(-1))

// Success(42) with a new status
ok.withStatus(Succeeded.CREATED, Restricted.DENIED)
// Failure("boom") with a new status
bad.withStatus(Succeeded.CREATED, Restricted.DENIED)

// Success(42) tagged with an Action
ok.withAction(Action("chargeCard"))

// Success("value: 42")
ok.transform({ Success("value: $it") }, { Success("error: ${it.message}") })
// Success("error: boom")
bad.transform({ Success("value: $it") }, { Success("error: ${it.message}") })
```

<Spacer />

### Builders

`Outcomes` (and `Options`/`Tries`/`Validations`, one per alias) implement `PassedBuilder<E>`/`FailedBuilder<E>`, so every group below is called the same way regardless of which alias it's building. See [Concepts > Builders](#builders) for the full overload list and the default status each one applies.

**Passed group** (`success`/`pending`/`excluded`/`information`), building a `Success`:

```kotlin
import kiit.codes.Succeeded
import kiit.result.Outcomes

// Success(42), default status Succeeded.SUCCESS
Outcomes.success(42)
// Success(42), custom message
Outcomes.success(42, "cache warm")
// Success(42), explicit status
Outcomes.success(42, Succeeded.CREATED)

// Success(0), a queued/not-yet-complete success
Outcomes.pending(0)
// Success(42), intentionally skipped, not a failure
Outcomes.excluded(42, "already processed")
// Success(Unit), an FYI-only outcome
Outcomes.information(Unit, "cache miss, refetched")
```

**Failed group** (`restricted`/`invalid`/`rejected`/`unserved`), building a `Failure`:

```kotlin
import kiit.codes.Err
import kiit.codes.Rejected
import kiit.codes.Restricted
import kiit.result.Outcomes

// Failure, default status Restricted.DENIED
Outcomes.restricted("not an admin")
// Failure, explicit status
Outcomes.restricted(Restricted.LOCKED)
// Failure, wrapping an existing Err
Outcomes.invalid(Err.on("email", "bad@", "must contain a domain"))
// Failure, wrapping a thrown exception
Outcomes.rejected(IllegalStateException("duplicate id"), Rejected.CONFLICT)
// Failure, default status Unserved.UNEXPECTED
Outcomes.unserved("downstream timed out")
```

An explicit status override (`Restricted.LOCKED`, `Rejected.CONFLICT`) is a classification decision, not something checked against the error's content, `status` and `error` are independent facts about the same `Failure`. See [Relationship](#relationship) for why.

`Options.some`/`Options.none` are the `Option<T>`-specific pair on top of the same groups:

```kotlin
import kiit.result.Options

// Option<Int>, present
Options.some(42)
// Option<Int>, absent, Rejected.NOT_EXISTS
Options.none<Int>()
```

<Spacer />

### Alias: Outcome&lt;T&gt;

`Outcome<T> = Result<T, Err>` pairs a value with kiit-codes' `Err` on failure, the most commonly used alias. `Outcomes` is the ready-made `Builder` implementation for it. See the [kiit-codes docs](https://www.kiit.dev/docs/kiit-codes#err) for `Err`'s full shape (`ErrorInfo`/`ErrorField`/`ErrorList`).

:::success[Outcome&lt;T&gt;]
1. **Intention**: `Outcome<T>` pairs a value with kiit-codes' `Err` on failure, the most commonly used alias.
2. **Less boilerplate**: Fixing the error type to `Err` means callers don't have to define a custom error type for `Result`.
3. **Ready-made builder**: `Outcomes` implements `Builder<Err>`, so convenient builders come for free.
:::

```kotlin
import kiit.codes.Err
import kiit.result.Outcome
import kiit.result.Outcomes

fun parseAge(input: String): Outcome<Int> {
    val age = input.toIntOrNull()
    return when {
        age == null -> Outcomes.invalid(Err.on("age", input, "must be a number"))
        age < 0 -> Outcomes.invalid(Err.on("age", input, "must not be negative"))
        else -> Outcomes.success(age)
    }
}

val ok: Outcome<Int> = parseAge("42")
val bad: Outcome<Int> = parseAge("nope")

// 42
ok.getOrNull()
// must be a number
bad.getErrorOrNull()?.message
```

<Spacer />

### Alias: Try&lt;T&gt;

`Try<T> = Result<T, Throwable>` uses an exception as the error type, for crossing an exception-only boundary. `Tries.attempt` catches a throwing computation and wraps whatever it throws.

:::warning[Try&lt;T&gt;]
1. **Intention**: `Try<T>` uses a `Throwable` as the error type, for compatibility with exception-based code.
2. **Compatibility**: Use this for interoperating with code that only uses exceptions, without a manual `try`/`catch`.
3. **Alternative**: Replaces Kotlin's `kotlin.Result<T>`, while adding `status` and kiit-result's operators.
:::

```kotlin
import kiit.result.Try
import kiit.result.Tries

fun parseAge(input: String): Try<Int> = Tries.attempt { input.toInt() }

val ok: Try<Int> = parseAge("42")
val bad: Try<Int> = parseAge("nope")

// 42
ok.getOrNull()
// NumberFormatException: For input string: "nope"
bad.getErrorOrNull()
```

<Spacer />

### Alias: Option&lt;T&gt;

`Option<T> = Result<T, Unit>` reimagines the historical `Option`/`Maybe` role on `Result`, so absence carries a `status` explaining why instead of a bare `None`. `Options.some`/`Options.none` are the entry points.


:::info[Option&lt;T&gt;]
1. **Intention**: `Option<T>` expresses presence of a value, not just success/failure.
2. **Presence**: `Success<T>` means the value is present, a **success in presence**.
3. **Absence**: `Failure<Unit>` means the value is absent, a **failure in presence**.
4. **Adaptation**: A deliberate adaptation of `Option`/`Maybe`, not literal category-theory semantics.
5. **Practicality**: Familiar names, practical semantics, these aliases don't attempt to replicate category-theory abstractions.
:::

```kotlin
import kiit.result.Option
import kiit.result.Options

fun findUser(id: String): Option<User> =
    users[id]?.let { Options.some(it) } ?: Options.none()

val found: Option<User> = findUser("u1")
val missing: Option<User> = findUser("ghost")

// the User, if found
found.getOrNull()
// Rejected.NOT_EXISTS, the default "absent" status
missing.status
```

<Spacer />

### Alias: Validated&lt;T&gt;

`Validated<T> = Result<T, Err.ErrorList>` collects multiple errors instead of stopping at the first, for validating a whole form or request at once. `Validations.of` builds one from a value plus whatever errors were already found.

:::info[Validated&lt;T&gt;]
1. **Intention**: `Validated<T>` collects every error instead of stopping at the first, for validating a whole request at once.
2. **Just an alias**: Just a type alias on `Result<T, E>`, not a separate applicative type.
3. **Adaptation**: Category-theory's `Validated` is typically its own accumulating-applicative abstraction, distinct from `Either`. Here it's a practical specialization of the same monadic `Result`, not that abstraction.
:::

```kotlin
import kiit.codes.Err
import kiit.result.Validated
import kiit.result.Validations

data class SignupForm(val email: String, val password: String)

fun validateSignup(form: SignupForm): Validated<SignupForm> {
    val errors = mutableListOf<Err>()
    if (form.email.isBlank()) errors.add(Err.on("email", form.email, "Email is required"))
    if (form.password.length < 8) errors.add(Err.on("password", form.password, "Password is too short"))
    return Validations.of(form, errors)
}

val result: Validated<SignupForm> = validateSignup(SignupForm("", "short"))
// 2, both fields failed
result.getErrorOrNull()?.errors?.size
```

<Spacer />

### Swift Interop

Not yet distributed via SPM/XCFramework. The framework is `.framework`-only today, built locally. Companion-less members like `Outcomes`/`Options`/`Tries` get clean `.shared` access out of the box, and this module uses [SKIE](https://skie.touchlab.co/) for real, compiler-enforced Swift exhaustiveness over `Success`/`Failure`, a genuinely flat switch simpler than kiit-codes' nested `Status` case, since `Result<T, E>` is only one sealed level deep:

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

Generic type params require `AnyObject` (box `Int`/`String` as `KotlinInt`/`NSString`), and Kotlin's `Nothing` doesn't widen to a concrete error type in Swift. See [`samples/sample-swift`](https://github.com/kiitdev/kiit-result/tree/main/samples/sample-swift) for the full, verified-working subset and exactly what does and doesn't work, including a confirmed-broken case: `flatMap` can't be used from Swift to construct new results.

<BackToTop />

## FAQ

### Why

| Question | Answer |
|---|---|
| **Why not just use Arrow's `Either`/`Validated` or kotlin-result?** | Those give a monad with zero built-in taxonomy. The meaning is supplied by each team itself. kiit-result is the same kind of monad fused to kiit-codes' taxonomy, for consistency across a codebase without every team inventing its own status vocabulary. A different bet, not a "better generic Result." |
| **Why does `Success` carry a status too, not just `Failure`?** | Most Result types treat success as inert, just a value. Here `Success.status: Passed` distinguishes "succeeded," "succeeded but pending," and "succeeded but excluded" instead of flattening them all to `true`. |
| **Why is `E` still fully generic instead of locked to kiit-codes' `Err`?** | So `Try<T>`, `Option<T>`, `Outcome<T>`, and `Validated<T>` can all share one `Result<T, E>` rather than needing separate types. |
| **Doesn't `status` need to match `error`, semantically?** | No, they answer different questions about the same `Failure`: `status` is what kind of outcome this is, `error` is what happened. Neither is derived from the other, the same way an HTTP response's status code isn't derived from its body text. See [Relationship](#relationship) for the full reasoning. |
| **Why two ways to build a value (constructor vs. `Builder<E>`) instead of one?** | They serve different situations: the constructor is for no-ceremony construction with no `Builder` in scope; `Builder<E>` is the status-aware convenience path when implementing `Outcomes`/`Options`/`Tries` or a custom class. |

<Spacer />

### Alternatives

| Question | Answer |
|---|---|
| **How is this different from Kotlin's own `kotlin.Result`?** | stdlib `Result` has one type param and always uses `Throwable` as the error; it isn't a sealed hierarchy meant for pattern matching. kiit-result is a real two-branch sealed type with a flexible error type and a status on both branches. |
| **Isn't `Option<T> = Result<T, Unit>` a strange use of the name "Option"?** | A deliberate lineage, not a misuse. The same historical role as Rust/Scala/Arrow's `Option`, reimagined so absence carries a `status` explaining why instead of a bare `None`. `Options.some(value)`/`Options.none()` make that explicit. |

<Spacer />

### API

| Question | Answer |
|---|---|
| **Why is there no `conflict()` builder?** | It was just `rejected()` with `Rejected.CONFLICT` as the default status, not its own category. Use `rejected(status = Rejected.CONFLICT)`. |
| **Why does `excluded()` build a `Success`, not a `Failure`?** | `Excluded` is a `Passed` group in kiit-codes. An intentionally skipped, deduplicated, or disqualified item isn't a failure. |
| **Why is `Builder<E>` split into `PassedBuilder`/`FailedBuilder`?** | Keeps each interface's surface scoped to one branch, the same reason kiit-codes keeps each group's constants on its own companion rather than one shared object. |
| **Do I have to pick a specific `Status` every time I use a builder?** | No. The group builders all apply a sensible default when none is supplied. An explicit status is only needed when the default doesn't fit (`restricted(status = Restricted.LOCKED)`). Routine use never requires touching `Status` directly. |

<Spacer />

### Adoption

| Question | Answer |
|---|---|
| **Can I use my own error type and ignore kiit-codes?** | Only partially. `E` is generic (use `Throwable`, `String`, a domain type), but `Success.status`/`Failure.status` are hard-typed to kiit-codes' `Passed`/`Failed`. There's no way to use `Result<T, E>` without a kiit-codes status on every branch. |
| **Does this actually work on JS and iOS today?** | kiit-result's production history is JVM/Android. JS and iOS/Swift are new targets with no production history yet, not just "unexercised" versions of something proven. JS/TS is a deliberately partial pass (`@JsExport`ed, not covered by CI or published to npm, since TypeScript can't compiler-enforce exhaustiveness). iOS uses SKIE for real, compiler-enforced Swift exhaustiveness, a materially better story than JS, including plain Kotlin `object`s (`Outcomes`/`Options`/`Tries`) getting clean `.shared` access with no extra work. |

<Spacer />

### AI

| Question | Answer |
|---|---|
| **Is the "built for AI" angle just marketing?** | Same answer kiit-codes gives, extended to the `Result` layer. The design choices are justified on ordinary engineering grounds first: exhaustive branching, a small fixed vocabulary, fewer decisions per call site. AI tooling benefits from the same properties any consistent codebase does, but the library stands on its own without that framing. |
| **What's the actual theory, specific to kiit-result rather than any Result type?** | Exhaustive `Success`/`Failure` matching is common to any closed Result type, Rust and kotlin-result already give a model that. What's specific here is the shared `status` vocabulary on *both* branches, not just `Failure`: a model reading or generating code has one small, named set of categories to reach for either way, instead of ad hoc exception types on one side and nothing on the other. That said, this only covers the mechanical part, that a branch or a status subtype can't be silently missed. *Which* category actually fits a given error is still a judgment call nothing in the type system, or a model, can verify. See [Relationship](#relationship) for why that's by design, not a gap this could close. |

<Spacer />

### Maturity

| Question | Answer |
|---|---|
| **Is this production-ready at 1.0.1?** | The version reflects the standalone repo's age, not the design's. This `Result<T, E>` pattern, paired with a status taxonomy, has been running in production for years across mobile and server applications inside the original Kiit toolkit. What's actually new: extraction into an independent repo, an updated and polished taxonomy in kiit-codes, and `kiit-codes`/`kiit-result` now being fully decoupled from each other. The multiplatform export work is the one piece still genuinely in progress. |
| **What about single-maintainer risk?** | Real, worth being upfront about: Apache 2.0, source available, no second maintainer or organizational backing yet. |

<BackToTop />
