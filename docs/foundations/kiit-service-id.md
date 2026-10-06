---
sidebar_position: 3
title: kiit-service-id
slug: /kiit-service-id
hide_title: true
---

import BackToTop from '@site/src/components/BackToTop';
import Spacer from '@site/src/components/Spacer';
import PageTitle from '@site/src/components/PageTitle';
import Example from '@site/src/components/Example';
import Related from '@site/src/components/Related';
import Diagram from '@site/src/components/Diagram';
import ConceptTermLink from '@site/src/components/ConceptTermLink';
import MoreLink from '@site/src/components/MoreLink';


<PageTitle title="kiit-service-id" logo="/img/modules/kiit-codes-logo.png" />

{/* tagline: from module.json */}
<p className="kiit-tagline">Shared identity vocabulary for a service: who it is, what kind of thing it is, and a caller-safe way to expose it.</p>

A typed service identity with ownership, kind, environment, version and instance, a private and an external
form, and attribute names that line up with OpenTelemetry's service attributes. Kotlin Multiplatform, with a
native TypeScript port.

:::info[Think of a name for a service]
1. **Structured**: A name like `acme:accounts.signup:api` instead of a free string each subsystem makes up.
2. **Safe to expose**: `externalId` carries no version, environment or instance.
3. **Tiny**: Zero dependencies, so any subsystem can use it.
:::


<Diagram src="/img/kiit-codes/kiit-codes-overview.png" alt="Placeholder diagram" />

## Overview

### Goals

Calls and services are hard to identify. This is most true of HTTP requests and of internal service to service
calls. There is also no shared convention for naming a service. OpenTelemetry improved this with service
attributes for telemetry, and kiit-service-id takes the idea a step further by putting those attributes in a
static type and an interface.

The goals are:

1. A contract for a service id, with attributes that describe the service.
2. Attributes for ownership, service type, environment, version and more.
3. Compatibility with OpenTelemetry service attributes, for telemetry integration.
4. Security through two forms of the id: an external one (`externalId`) and a private one (`privateId`).
5. A tiny, zero dependency library for Kotlin Multiplatform, with a native TypeScript port.

<Spacer />

### Features

| # | Feature | Description |
|---:|---|---|
| 1 | **[Identity contract](#contract-and-implementation)** | `IServiceId` is the plain data contract, and `ServiceId` is the concrete type you build. |
| 2 | **[Identity chain](#identity-chain)** | `path`, `name`, `fullName`, `install` and `privateId`, each adding one field to the one before. |
| 3 | **[External form](#security)** | `externalId` is safe to send outside your trust boundary. |
| 4 | **[Descriptive attributes](#terms)** | Ownership (`origin`, `team`), `Kind`, environment, version, `criticality`, `about`, `tags` and `uri`. |
| 5 | **[OpenTelemetry compatible](#opentelemetry)** | The fields line up with OpenTelemetry service attributes. |
| 6 | **[Parsing](#parsing)** | Rebuild an identity from a `caller-id` header value. |
| 7 | **[Zero dependencies](#install)** | Kotlin Multiplatform, plus a native TypeScript port. |

<Spacer />

### Inspiration

| # | Source | What was drawn from it |
|---:|---|---|
| 1 | OpenTelemetry service attributes | The attribute names, the `criticality` values, and the idea of a per instance id and a version. |
| 2 | kiit-codes | The `origin` and `scope` convention, shared with `Status.origin` and `Status.scope`. |

<Spacer />

### Activity

Used in production for years, as the original kiit version. This repository is that component extracted into its own module.

<Spacer />

### Resources

{/* from module.json: repository, Maven and npm coordinates, issues, CI, changelog */}

**Prefer to see it work first?** Jump to the [Tutorial](#tutorial).
**Prefer the reasoning first?** Keep reading.

<BackToTop />

## Setup

### Install

{/* from module.json: Maven and npm install blocks and the artifacts table */}

<Spacer />

### Imports

What to import to use the library.

<Example module="kiit-service-id" section="setup" topic="imports" />

<Spacer />

### Source

{/* from module.json: git repo, source folder, sample app, package name, unit tests, license */}

<Spacer />

### Example

{/* from module.json: link to the sample app */}

Build an identity and read three forms of it:

<Example module="kiit-service-id" section="setup" topic="example" />

<BackToTop />

## Explanation

### Terms

| # | Name | Type | Example | Notes |
|---:|---|---|---|---|
| 1 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L35">origin</ConceptTermLink> | String | acme | Who owns the identity. A domain like label, the same convention as Status.origin in kiit-codes. Not validated. |
| 2 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L44">scope</ConceptTermLink> | String | accounts.signup | Where in origin it lives. Dots express hierarchy. It can't contain a colon. |
| 3 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L47">kind</ConceptTermLink> | Kind | Kind.API | The kind of runnable thing this is. See [Kind values](#kind-values). |
| 4 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L50">env</ConceptTermLink> | String | qat | The environment, as whatever label you already use. |
| 5 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L59">version</ConceptTermLink> | String | 1.4.2 | The version running here. Defaults to latest. |
| 6 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L68">instance</ConceptTermLink> | String | 4a3b300b | One running instance, to tell copies of the same version apart. Random by default. |
| 7 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L56">about</ConceptTermLink> | String | Sends the welcome email | A short description of what the service does. Empty means unset. |
| 8 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L74">tags</ConceptTermLink> | List&lt;Tag&gt; | Tag.Keyed("region", "us-east-1") | Labels on the identity: a bare value or a key and value. |
| 9 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L80">uri</ConceptTermLink> | String? | worker-7.acme.internal | A reference to the instance itself, such as a hostname. Unique per environment. |
| 10 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L86">criticality</ConceptTermLink> | Criticality | Criticality.High | How much it matters if the service fails or is unavailable. |
| 11 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L94">team</ConceptTermLink> | String | payments-platform | The team that owns the service, such as a Slack team or a distribution list. Distinct from origin, the owning organization. |
| 12 | <ConceptTermLink href="https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt#L101">provenance</ConceptTermLink> | Provenance | Provenance.Declared | How the identity came to exist: Declared when built with of, Parsed when rebuilt from a string. |

**Descriptive attributes.** `about`, `tags`, `uri`, `criticality`, `team` and `provenance` are descriptive. They are
never part of an identifier, and the library has no health or ownership logic that acts on them.

**Kind.** `Kind` is a closed set of things that are runnable and deployable and that issue or serve requests. A new
kind is added only when it changes how a caller is attributed or handled. `Gateway` marks the edge where `privateId`
stops and `externalId` starts. `Function` marks short lived instances that run per request. The ones left out are
covered by an existing kind, or are not a caller at all:

1. A scheduler or cron job is `Job`.
2. A queue or stream consumer is `Worker`.
3. A mobile or desktop app is `App`, and a browser frontend is `Web`.
4. A plugin or extension runs inside another process and has no identity of its own.
5. A database, cache or queue is called but never calls, so it is not at the edge of a request.

**Environment.** `env` is a plain string, so the library does not enforce how you name environments.

**Tags.** A `Tag` is either a bare value or a key and value. `Tag.parse` splits on the first `=`. The delimiter is `=`
and not `:` so it doesn't clash with the `:` that builds the chain. Tags are stored as given and not normalized.
`Tag` lives in this module, and kiit-requests still has its own until it migrates.

<Related
  title="Source and references"
  items={[
    {
      label: 'Kind',
      note: 'The closed set and the kinds left out',
      links: [
        {text: 'Kind.kt', href: 'https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/Kind.kt', kind: 'source'},
        {text: 'Kind values', href: '#kind-values', kind: 'reference'},
        {text: 'Choose a kind', href: '#choose-a-kind', kind: 'guide'},
      ],
    },
    {
      label: 'Tag',
      note: 'Basic and Keyed tags',
      links: [
        {text: 'Tag.kt', href: 'https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/Tag.kt', kind: 'source'},
        {text: 'Tag forms', href: '#tag-forms', kind: 'reference'},
      ],
    },
  ]}
/>

<Spacer />

### Identity chain

Each accessor adds one field to the one before it:

1. `path` is who: `origin` and `scope`.
2. `name` adds the `kind`.
3. `fullName` adds the `env`.
4. `install` adds the `version`.
5. `privateId` adds the `instance`.

Each level answers a different question: this component, in one environment, at one version, as one running
instance. The cost is six fixed segments, so `:` is reserved. See the values in [Accessors](#accessors).

<Related
  title="Source and references"
  items={[
    {
      label: 'ServiceId',
      note: 'The chain, equality, of and parse',
      links: [
        {text: 'ServiceId.kt', href: 'https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt', kind: 'source'},
        {text: 'Accessors', href: '#accessors', kind: 'reference'},
      ],
    },
  ]}
/>

<Spacer />

### Security

`externalId` is an alias for `path`. It carries only `origin` and `scope`, with no operational detail, so it is
the form to expose. `privateId` carries the exact version, environment and instance, and belongs inside your
trust boundary. Outside it, those details are reconnaissance material, the same kind of risk as leaving a `Server`
or `X-Powered-By` header exposed. See OWASP's guidance on
[fingerprinting a web application framework](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/08-Fingerprint_Web_Application_Framework).

<Example module="kiit-service-id" section="explanation" topic="security" />

The cost is that callers have to choose. Nothing stops code from sending `privateId` outside, so keeping it
internal is a convention and not a check.

:::warning[Keep privateId inside]
1. **Internal only**: Use `privateId` for trusted service to service traffic.
2. **Outside**: Send `externalId` when a call leaves your infrastructure.
3. **Not for decisions**: Don't let a parsed `privateId` decide authorization for a request that could have come from outside.
:::

<Spacer />

### Construction

`ServiceId.of` and its shortcuts are the way to build an identity. The constructor is `internal`.

**Normalization.** `of` lowercases `origin`, `scope`, `env` and `version`, and strips every character except letters,
digits, `-`, `_`, `.` and spaces, turning spaces into `_`. `instance` is validated and not normalized. Folding its
case could make two different instances collide, so `of` only checks that it has no `:`.

**Immutability.** `with()` and `newInstance()` return a new value, so an identity can be shared without being
changed. The cost is that `copy()` is `internal` too, so code inside the module can still make an un-normalized
copy. The library accepts that gap rather than give up `data class`.

**Equality.** Two identities are equal when their `privateId` is equal. `about`, `tags`, `uri`, `criticality`, `team`
and `provenance` don't count. The reason is that a server treats two requests as the same caller when the
`caller-id` header value matches, and nothing else travels on the wire. `equals`, `hashCode` and `toString` are
overridden together to match.

<Example module="kiit-service-id" section="explanation" topic="construction" />

<Related
  title="Source and references"
  items={[
    {
      label: 'ServiceId',
      note: 'of, with, newInstance and equals',
      links: [
        {text: 'ServiceId.kt', href: 'https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt', kind: 'source'},
      ],
    },
  ]}
/>

<Spacer />

### Contract and implementation

`IServiceId` is a bare data contract. The derived accessors (`path`, `name`, `fullName`, `install`,
`privateId` and `externalId`) live only on `ServiceId`. Implementing `IServiceId` for a custom shape shouldn't
promise accessors that shape never defined. The cost is that a custom implementation gets none of them.

<Spacer />

### Parsing

`ServiceId.parse` rebuilds an identity from a `privateId` string, such as a `caller-id` header value. It is
strict and matches `of` and `with`, which also reject bad input:

1. It needs exactly six segments, a known kind and no blank segment.
2. It lowercases `origin`, `scope`, `kind`, `env` and `version`, so a parsed identity holds the same field values as one built with `of`.
3. It rejects, and does not rewrite, a segment with characters `of` would strip, so untrusted header text is never silently changed into something else.
4. It leaves `instance` as given, the same as `of`.

Only the six chain fields come back. The descriptive fields get their defaults, and `provenance` is `Parsed`.

<Example module="kiit-service-id" section="explanation" topic="parsing" />

<Related
  title="Source and references"
  items={[
    {
      label: 'ServiceId.parse',
      note: 'Strict parsing of a privateId',
      links: [
        {text: 'ServiceId.kt', href: 'https://github.com/kiitdev/kiit-service-id/blob/main/kiit-service-id/src/commonMain/kotlin/kiit/serviceid/ServiceId.kt', kind: 'source'},
        {text: 'Handle a bad id', href: '#handle-a-bad-id', kind: 'guide'},
      ],
    },
  ]}
/>

<Spacer />

### OpenTelemetry

OpenTelemetry's resource describes the producer of telemetry. It is set once per process and attached to every
signal. A `ServiceId` is a value that travels in requests, is parsed and compared, and keys caches and jobs.
`criticality` is borrowed from OpenTelemetry's `service.criticality`.

It is not built on the resource model, for three reasons:

1. **Different identity**: OpenTelemetry treats `deployment.environment.name` and `service.version` as not part of a service's identity. `ServiceId` equality is `privateId`, which includes both, because a server sees that string in a `caller-id` header and two builds are different callers.
2. **Different shape**: A resource is an open attribute map. `ServiceId` has fixed fields, derived string forms and a strict `parse`, and it adds `kind`, `externalId` and `provenance`, which resources don't have.
3. **No dependency**: The module has none, and a resource model would add one to every subsystem that uses it.

The service fields do map onto resource attributes. A one way conversion belongs in a separate telemetry
adapter and not in this module. The open choice is `origin` against `service.namespace`: `origin` is the owning
organization, and OpenTelemetry's namespace is a grouping inside it. See the table in
[OpenTelemetry mapping](#opentelemetry-mapping).

<Spacer />

### Limitations

1. The trust boundary is a convention, not a check.
2. Tags are stored as given, not normalized.
3. `Kind` is a closed set.

<BackToTop />

## Tutorial

### Create

This walks through creating an identity, sending it between two services, and reading it on the other side.

:::tip[Start here]
1. **Start here**: Build an identity with a shortcut such as `ServiceId.api`.
2. **Add as needed**: Reach for `ServiceId.of` when you need a kind or an option the shortcuts don't cover.
:::

Create an identity and print each form of it:

<Example module="kiit-service-id" section="tutorial" topic="create" />

<Spacer />

### Copy

An identity never changes. `with` returns a new one, here with two tags:

<Example module="kiit-service-id" section="tutorial" topic="copy" />

<Spacer />

### Send

Send the private id to another internal service in a `caller-id` header:

<Example module="kiit-service-id" section="tutorial" topic="send" />

<Spacer />

### Receive

On the receiving side, parse the header back into an identity and read its fields:

<Example module="kiit-service-id" section="tutorial" topic="receive" />

<Spacer />

### Send outside

When a call leaves your infrastructure, send the external id instead:

<Example module="kiit-service-id" section="tutorial" topic="send-outside" />

<BackToTop />

## Guide

### Choose a kind

Only `app`, `api`, `cli`, `job` and `test` have shortcuts. For any other kind, such as a frontend (`Web`), a
gateway or an AI agent, build the identity with `ServiceId.of`. See [Terms](#terms) for how to choose between
kinds.

<Example module="kiit-service-id" section="guide" topic="choose-a-kind" />

<Spacer />

### Strip at the gateway

At the edge, replace the internal id with the external one before a call leaves your infrastructure:

<Example module="kiit-service-id" section="guide" topic="strip-at-the-gateway" />

<Spacer />

### Attach tags

A tag is either a bare value or a key and value. `Tag.parse` reads either form:

<Example module="kiit-service-id" section="guide" topic="attach-tags" />

<Spacer />

### Set ownership and criticality

Describe the service with `team`, `criticality`, `about` and `uri`. None of them is part of an identifier:

<Example module="kiit-service-id" section="guide" topic="set-ownership-and-criticality" />

<Spacer />

### Handle a bad id

`parse` throws `IllegalArgumentException`, and `Error` in TypeScript, with the reason. Catch it where you read
the header:

<Example module="kiit-service-id" section="guide" topic="handle-a-bad-id" />

<Spacer />

### Use it from TypeScript

The TypeScript port has the same model, with a few differences in shape:

1. `ServiceId.of` takes one options object and not named arguments.
2. `Kind` is an object with a matching union type, and `Tag` carries a `variant` field to narrow on, since TypeScript has no sealed classes.
3. Equality is the `equals` method, and compares `privateId` as in Kotlin.

Every example above has a TypeScript tab.

<BackToTop />

## Reference

Lookup tables. The ideas behind them are in [Explanation](#explanation).

### Accessors

Values for `ServiceId.api("acme", "accounts.signup", "qat")` at version `1.4.2`:

| Accessor | Adds | Example |
|---|---|---|
| `path` | `origin`, `scope` | `acme:accounts.signup` |
| `name` | `kind` | `acme:accounts.signup:api` |
| `fullName` | `env` | `acme:accounts.signup:api:qat` |
| `install` | `version` | `acme:accounts.signup:api:qat:1.4.2` |
| `privateId` | `instance` | `acme:accounts.signup:api:qat:1.4.2:4a3b300b-d0ac-4776-8a9c-31aa75e412b3` |
| `externalId` | alias for `path` | `acme:accounts.signup` |

Every segment except `instance` is lowercased.

<Spacer />

### Kind values

| Kind | For |
|---|---|
| `App` | A runnable application. Also mobile and desktop apps. |
| `CLI` | A command line tool. |
| `Web` | A browser frontend. |
| `API` | An HTTP service. |
| `Bot` | A bot that is not an AI agent. |
| `Job` | Scheduled or one off work. |
| `Worker` | A queue or stream consumer, or a worker in a pool. |
| `Service` | A deployable service that doesn't fit another kind. |
| `Gateway` | An edge or routing service in front of others: an API gateway or reverse proxy. |
| `Function` | A serverless function: short lived and triggered per event or request. |
| `Agent` | An AI agent: software that acts on its own judgment. |
| `Test` | A test identity. |

<Spacer />

### Criticality values

| Value | Meaning |
|---|---|
| `Unspecified` | No criticality declared. The default. |
| `Low` | Low impact if it fails. |
| `Medium` | Medium impact if it fails. |
| `High` | High impact if it fails. |
| `Critical` | Critical impact if it fails. |

<Spacer />

### Tag forms

| Form | Built with | `raw` |
|---|---|---|
| `Tag.Basic` | `Tag.Basic("retry")` | `retry` |
| `Tag.Keyed` | `Tag.Keyed("region", "us-east-1")` | `region=us-east-1` |
| Either, from a string | `Tag.parse("region=us-east-1")` | Splits on the first `=` |

<Spacer />

### Fields and defaults

The options of `ServiceId.of`:

| Field | Default | Normalized |
|---|---|---|
| `origin` | required | yes |
| `scope` | required | yes |
| `kind` | required | no |
| `env` | `dev` | yes |
| `about` | empty | no |
| `version` | `latest` | yes |
| `instance` | random UUID | no, validated |
| `tags` | none | no |
| `uri` | none | no |
| `criticality` | `Unspecified` | no |
| `team` | empty | no |
| `provenance` | `Declared`, not an option | no |

<Spacer />

### OpenTelemetry mapping

How each field lines up with an OpenTelemetry attribute. The `origin` and `scope` rows are approximate.

| `ServiceId` | OpenTelemetry | Fit |
|---|---|---|
| `scope` | `service.name` | Approximate. `scope` is a dotted hierarchy. |
| `origin` | `service.namespace` | Approximate. `origin` is the owning organization. |
| `instance` | `service.instance.id` | Same idea. |
| `version` | `service.version` | Same. |
| `env` | `deployment.environment.name` | Same value. OpenTelemetry keeps it out of a service's identity. |
| `criticality` | `service.criticality` | Same idea. OpenTelemetry writes the values in lowercase. |
| `team` | none | `ServiceId` only. Kiit specific: the team that owns the service, such as a Slack team or a distribution list. |
| `kind`, `about`, `tags`, `uri`, `provenance` | none | `ServiceId` only. |

Source: [OpenTelemetry service attributes](https://opentelemetry.io/docs/specs/semconv/resource/service/).

<BackToTop />

## FAQ

Common questions about the design, alternatives, adoption and maturity.

### Why

| Question | Answer |
|---|---|
| **Why not a string constant per subsystem?** | A string has no shared shape and no parse, and it is easy to leak. This module exists to replace it with one identity that every subsystem can use. |
| **When is this not needed?** | For outgoing requests to public or external services that are not owned or managed by your team and company. For these, do NOT use `privateId`, you can use `externalId` but this is also optional. |

<Spacer />

### Alternatives

| Question | Answer |
|---|---|
| **How is this different from OpenTelemetry resource attributes?** | A resource describes the producer of telemetry. A `ServiceId` travels in requests and is parsed and compared. Identity, shape and dependencies also differ. See [OpenTelemetry](#opentelemetry). |
| **Can I send these to OpenTelemetry?** | The service fields map onto resource attributes. The conversion belongs in a separate telemetry adapter, not in this module. See [OpenTelemetry mapping](#opentelemetry-mapping). |

<Spacer />

### API

| Question | Answer |
|---|---|
| **Why is `privateId` unsafe to expose, and what do I send instead?** | It carries the exact version, environment and instance. Send `externalId`, which carries only `origin` and `scope`. See [External and private ids](#security). |
| **Why is equality only on `privateId`?** | It is the value a server sees in a `caller-id` header. See [Construction](#construction). |
| **Can I implement `IServiceId` myself?** | Yes, but you get none of the accessors, which live only on `ServiceId`. See [Contract and implementation](#contract-and-implementation). |
| **Why is `env` a string and not an enum?** | So the library doesn't enforce how you name environments. |
| **Why is `Kind` a closed set, and which kinds were left out?** | See [Terms](#terms). |

<Spacer />

### Adoption

| Question | Answer |
|---|---|
| **Can I adopt it in one subsystem first?** | Yes, start with just adding it for requests to your own internal services as a header. |

<Spacer />

### AI

| Question | Answer |
|---|---|
| **How does this help AI tooling?** | A structured `origin:scope:kind` id lets a tool tie the `caller-id` on a request to a git repo and a service when debugging it. `Kind.Agent` marks an AI agent as the caller. |

<Spacer />

### Maturity

{/* from module.json: status */}

| Question | Answer |
|---|---|
| **Is it used in production?** | Yes, for years, as the original kiit component this was extracted from. |

<BackToTop />
