---
title: "Results"
date: 2019-11-17T23:55:43-05:00
section_header: Results
---

# Overview
**{{% sk-link-code component="result" filepath="results/Result.kt" name="Result<T,E>" %}}** is a core component of {{% sk-name %}} and is used for **accurately modeling successes and failures** of any operation, using a functional approach to error handling. Result is **NOT a new concept**, as it currently exists in various forms in other languages (see below), however {{% sk-name %}} **Result differs** significantly by allowing for a custom error type,  sub-categories of successes and failures in the form of Statuses, and providing sensible defaults and ways to build errors. With Result, you can safely access the value of an operation based on its success or failure, accurately represent failures from various sources, organize errors into logical groups, and easily convert these errors into compatible errors for HTTP. The Result component removes much of the boiler plate code that you would normally create yourself to handle all these scenarios. This diagram shows the high-level design/structure :

{{% break %}}

# Diagram
A high-level diagram of the concepts in this component
{{% break %}}
<img src="assets/app/media/arch/slatekit-result.png" class="rounded mx-auto d-block img-fluid" />
{{% break %}}

# Goals
The design goals of {{% sk-name %}} differ from other implementations by allowing for a custom error type, sub-categories of successes and failures in the form of Statuses, and providing sensible defaults and ways to build errors. 
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Design</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>1. Safety</strong> </td>
        <td>Safely accessing values via explict checks for success/failure</td>
    </tr>
    <tr>
        <td><strong>2. Accuracy</strong> </td>
        <td>Accurate modeling of success/failures </td>                     
    </tr>
    <tr>
        <td><strong>3. Flexible error</strong> </td>
        <td>Error type on the Failure branch can be anything, Exception, Err, String. </td>                     
    </tr>
    <tr>
        <td><strong>4. Status Codes</strong></td>
        <td>Logical groups of status codes to sub-categories both successs and failures, which can be converted to Http</td>
    </tr>
    <tr>
        <td><strong>5. Sensible defaults</strong></td>
        <td>Default Error types, and builders are provided to reduce custom errors / boiler-plate</td>
    </tr>
</table>
{{% break %}}

# Compare
The main differences between other implementations is that {{% sk-name %}} Result&lt;T,E&gt; offers features #3, #4, and #5 above in Goals and so the differences the the following:
<p>
1. <strong>Custom Error</strong>: The Error type <strong>E</strong> can be anything, unlike Kotlin and Swift<br/>
2. <strong>Aliases</strong>: With custom error types, you can have aliases such as <strong>typealias Try&lt;T&gt; = Result&lt;T,Exception&gt;</strong><br/>
3. <strong>Statuses</strong>: Contains an <strong>optional</strong> {{% sk-link-code component="result" filepath="results/Status.kt" name="Status" %}} on both Success and Failure branches to further <strong>sub-categorize</strong> successes and failures.<br/>
4. <strong>Builders</strong>: Several convenience builders to easily construct different categories of errors, and from different sources ( String, Exception, Err).
</p>

<table class="table table-bordered table-striped">
    <tr>
        <td><strong>#</strong></td>
        <td><strong>Language</strong></td>
        <td><strong>Name</strong></td>
        <td><strong>Differences</strong></td>
    </tr>
    <tr>
        <td><strong>1</strong></td>
        <td><strong>Kotlin</td>
        <td><a href="https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/index.html">Result&lt;T&gt;</a></td>
        <td>Result Error type is <strong>Exception</strong></td>
    </tr>
    <tr>
        <td><strong>2</strong></td>
        <td><strong>Swift</td>
        <td><a href="https://developer.apple.com/documentation/swift/result">Result&lt;T&gt;</a></td>
        <td>Swift Error type is <strong>Error</strong></td>
    </tr>
    <tr>
        <td><strong>3</strong></td>
        <td><strong>Rust</td>
        <td><a href="https://doc.rust-lang.org/std/result/">Result&lt;T,E&gt;</a></td>
        <td>{{% sk-name %}} differs with addition of Status, and supplied Aliases, Builders ( see docs here )</td>
    </tr>
    <tr>
        <td><strong>4</strong></td>
        <td><strong>Scala</td>
        <td><a href="https://www.scala-lang.org/api/2.12.4/scala/util/Either.html">Either&lt;L,R&gt;</a></td>
        <td>General purpose use to represent A or B, branches are Left / Right, although typically used for Success/Failure. {{% sk-name %}} differs in semantics by using Success instead of Right, and Failure instead of Left ( similar with Scala Try, but with a customizable error type )</td>
    </tr>
    <tr>
        <td><strong>5</strong></td>
        <td><strong>Go</td>
        <td><a href="https://github.com/grpc/grpc/blob/master/doc/statuscodes.md">GRPC_Codes</a></td>
        <td>Status codes in {{% sk-name %}} are inspired by these</td>
    </tr>
</table>
{{% break %}}


# Status
This component is currently stable, has 0 dependencies and can be used for both **Android and Server**

{{% section-end mod="arch/results" %}}

# Install
{{% sk-install name="kiit-results" %}}

{{% section-end mod="arch/results" %}}

# Sources {#sources}
{{% sk-module 
    name="Results"
    package="kiit.results"
    jar="kiit.results.jar"
    git="https://github.com/slatekit/kiit/tree/master/src/common/result/src/main/kotlin/kiit/results"
    gitModule="kiit-results"
    url="arch/results"
    uses="0 Dependencies"
    bintray="kiit-results"
    exampleUrl="Example_Results.kt"
    exampleFileName="Example_Results.kt"
%}}

{{% section-end mod="arch/results" %}}

# Example {#example}
Short example taken from {{% sk-link-code component="examples" filepath="examples/Example_Results.kt" name="Example_Result.kt" %}},
showing the usage of Result by creating, checking, and pattern matching the values.

{{< highlight kotlin >}}
       
    import slatekit.results.*

    // Create success explicitly
    val start: Outcome<Int> = Success(10)

    // Properties
    println("success:     " + start.success)         // true
    println("status.code: " + start.status.code) // Codes.SUCCESS.code
    println("status.code: " + start.status.msg)  // Codes.SUCCESS.msg

    // Safely operate on values with map/flatMap
    val addResult = start.map { it + 1 }
    val subResult = start.flatMap { Success(it - 1) }

    // Check values
    println("contains:  " + addResult.contains(11))
    println("exists  :  " + addResult.exists { it == 11 })

    // Get values
    println("getOrNull: " + addResult.getOrNull())
    println("getOrElse: " + addResult.getOrElse { 0 })

    // On conditions
    subResult.onSuccess { println("onSuccess: " + it) } // 9
    subResult.onFailure { println("onFailure: " + it) } // N/A

    // Pattern match on branches ( Success / Failure )
    when (addResult) {
        is Success -> println("value: ${addResult.value}") // 11
        is Failure -> println("error: ${addResult.error}") // N/A
    }

    // Pattern match on status: Passed / Failed statuses
    when(start) {
        is Success -> when(start.status) {
            is Passed.Succeeded  -> println("Succeeded: " + start.msg)
            is Passed.Pending    -> println("Pending  : " + start.msg)
        }
        is Failure -> when(start.status) {
            is Failed.Denied     -> println("Denied    : " + start.msg)
            is Failed.Invalid    -> println("Invalid   : " + start.msg)
            is Failed.Ignored    -> println("Ignored   : " + start.msg)
            is Failed.Errored    -> println("Errored   : " + start.msg)
            is Failed.Unexpected -> println("Unexpected: " + start.msg)
        }
    }
        
{{< /highlight >}}
{{% section-end mod="arch/results" %}}

# Concepts
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Name</strong></td>
        <td><strong>Description</strong></td>
        <td><strong>More</strong></td>
    </tr>
    <tr>
        <td><strong>1. Terms</strong></td>
        <td>Terms and concepts in Result</td>
        <td><a href="arch/results/#terms" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>2. Result</strong></td>
        <td>The core component for modeling successes and failures</td>
        <td><a href="arch/results/#result" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>3. Statuses</strong></td>
        <td>Status codes and logical grouping of states</td>
        <td><a href="arch/results/#statuses" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>4. Builders</strong> </td>
        <td>Several easy ways to build success or different category of errors</td> 
        <td><a href="arch/results/#builders" class="more"><span class="btn btn-primary">more</span></a></td>                    
    </tr>
    <tr>
        <td><strong>5. Aliases</strong></td>
        <td>Type aliases to default the error type for simplicity</td>
        <td><a href="arch/results/#aliases" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>6. Errors</strong></td>
        <td>Define your error types or use pre-built ones</td>
        <td><a href="arch/results/#errors" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>7. Conversion</strong></td>
        <td>Convert Successes / Failures to compatible protocol values</td>
        <td><a href="arch/results/#conversion" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
</table>
{{% section-end mod="arch/results" %}}

## Terms {#terms}
These are the main concepts / terms to know for using this component. All of these are explained further below in the details section. You can find links to the source code here.
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Concept</strong></td>
        <td><strong>Usage</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td>{{% sk-link-code component="result" filepath="results/Result.kt" name="Result" %}} </td>
        <td><strong>required</strong></td>
        <td>Main type for modeling successes and failures.</td>
    </tr>
    <tr>
        <td>{{% sk-link-code component="result" filepath="results/Result.kt" name="Success" %}} </td>
        <td><strong>required</strong></td>
        <td>Success branch/sub-class of Result storing the value with optional status code</td>
    </tr>
    <tr>
        <td>{{% sk-link-code component="result" filepath="results/Result.kt" name="Failure" %}} </td>
        <td><strong>required</strong></td>
        <td>Failure branch/sub-class of Result storing the error with optional status code.</td>
    </tr>
    <tr>
        <td>{{% sk-link-code component="result" filepath="results/Err.kt" name="Err" %}}</td>   
        <td>Optional</td>
        <td>Flexible representation of errors. E.g. You can use the **Err** interface, default implementations or **Exceptions**</td>
    </tr>
    <tr>
        <td>{{% sk-link-code component="result" filepath="results/Status.kt" name="Status" %}}</td>
        <td>Optional</td>
        <td>Logical states to sub-group both successes and failures. E.g. **Succeeded, Denied, Invalid, etc**</td>
    </tr>
    <tr>
        <td>{{% sk-link-code component="result" filepath="results/Codes.kt" name="Codes" %}}</td>
        <td>Optional</td>
        <td>Default implementations of general purpose statuses as codes</td>
    </tr>
    <tr>
        <td>{{% sk-link-code component="result" filepath="results/Aliases.kt" name="Aliases" %}}</td>
        <td>Optional</td>
        <td>Type aliases to simplify the Result from 2 type parameters to 1. E.g. **Outcome&lt;T&gt; = Result&lt;T,Err&gt;, Try&lt;T&gt; = Result&lt;T,Exception&gt;**</td>
    </tr>
    <tr>
        <td>{{% sk-link-code component="result" filepath="results/builders/Builder.kt" name="Builders" %}}</td>
        <td>Optional</td>
        <td>Convenient methods to build errors such as **Outcomes.denied**</td>
    </tr>
</table>
{{% section-end mod="arch/results" %}}

## Result {#result}
{{% sk-link-code component="result" filepath="results/Result.kt" name="Result<T,E>" %}} is the main component as a sealed class with only 2 implementations of
**Success&lt;T&gt;** and **Failure&lt;E&gt;**. **Success&lt;T&gt;** stores the successful value of an operation, and **Failure&lt;E&gt;** stores the error of an operation. <br/>
Result has 2 type parameters **T** and **E**. <br/>
**T** is used to represent the type of value ( Int, User, etc ) that the Success branch will store on the successful result of an operation.<br/>
**E** is used to represent the type of error ( String, Exception, etc ) that the Failure branch will store on the failed result of an operation.<br/> 
The branches are also sensiblly defaulted with **Status** codes to make them optional.
{{< highlight kotlin >}}
    
    import slatekit.results.*

    // Result base class
    sealed class Result<out T, out E> {
        // implementation
    }

    // Success branch ( type T to store value of successful operation )
    data class Success<out T>(val value: T, override val status: Passed = Codes.SUCCESS) 
        : Result<T, Nothing>() {
        // implementation
    }

    // Failure branch ( type E to store error of failed operation )
    data class Failure<out E>(val error: E, override val status: Failed = Codes.ERRORED) 
        : Result<Nothing, E>() {
        // implementation
    }
     
{{< /highlight >}}
{{% feature-end mod="arch/results" %}}

## Statuses {#statuses}
One of the distinguishing features of {{% sk-name %}} Result is the introduction of a {{% sk-link-code component="result" filepath="results/Status.kt" name="Status" %}} component on the Result type base class. The status is applicable for both the Success / Failure branch and is made of a Integer code and String message and is used to further sub-categorize and classify successes and failures to figure out **why** something passed or failed.
Default {{% sk-link-code component="result" filepath="results/Codes.kt" name="Codes" %}} are provided for convenience. The Status Codes provide a few main benefits:
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>1. Categorization</strong></td>
        <td>Categorize result into logical groups.</td>
        <td>E.g. Succeeded, Invalid, Denied, etc.</td>
    </tr>
    <tr>
        <td><strong>2. Reduce boiler-plate</strong></td>
        <td>Removes boiler-plate code of creating small custom error types.</td>
        <td>E.g. Outcomes.denied("No access to resource")</td>
    </tr>
    <tr>
        <td><strong>3. Conversion</strong></td>
        <td>Provides a reasonable way to convert the status to HTTP codes</td>
        <td>E.g. Succeeded -> HTTP 200 range</td>
    </tr>
</table>
{{< highlight kotlin >}}

    package slatekit.results

    interface class Status {
        abstract val code: Int
        abstract val msg: String
    }

    sealed class Passed : Status {
        data class Succeeded (override val code: Int, override val msg: String) : Passed()
        data class Pending   (override val code: Int, override val msg: String) : Passed()
    }

    sealed class Failed : Status {
        data class Denied    (override val code: Int, override val msg: String) : Failed()
        data class Ignored   (override val code: Int, override val msg: String) : Failed()
        data class Invalid   (override val code: Int, override val msg: String) : Failed()
        data class Errored   (override val code: Int, override val msg: String) : Failed()
        data class Unexpected(override val code: Int, override val msg: String) : Failed()
    }

{{< /highlight >}}


{{% feature-end mod="arch/results" %}}

## Aliases {#aliases}
The Result type has 2 type parameters (**T for value and E for error**), but often its more convenient to work with known error types and also to avoid having to constantly specify the error type **E**. This is where Kotlins typealias come in handy.
There are a few type {{% sk-link-code component="result" filepath="results/Aliases.kt" name="Aliases" %}} available for making it easier to work with error types and to simplify the Result type from 2 type parameters down to 1. The aliases are supplemented with builder functions to easily create the result types. **Outcome** is used heavily in {{% sk-name %}} as we use functional error-handling and avoid throwing of Exceptions ( generally speaking ).
{{< highlight kotlin >}}
    import slatekit.results.* 
    
    // Aliases simplify Result from 2 type parameters down to 1.
    typealias Try<T>       = Result<T, Exception>
    typealias Notice<T>    = Result<T, String>
    typealias Outcome<T>   = Result<T, Err>
    typealias Validated<T> = Result<T, Err.ErrorList>
    
    // You can now pass around the types more simply
    val result:Try<Int> = Success( "1".toInt() )
    println(result)

{{< /highlight >}}
{{% feature-end mod="arch/results" %}}


## Builders {#builders}
Building up Results / Successes / Failures can become a bit tedious, especially with the combination of logical Status groups and error types ( Strings, Exception, etc ).
The {{% sk-link-code component="result" filepath="results/builders/Builder.kt" name="Builders" %}} interface is available for convenience to simplify the construction of appropriate error types.
There are builders {{% sk-link-code component="result" filepath="results/builders/Tries.kt" name="Tries" %}},
{{% sk-link-code component="result" filepath="results/builders/Notices.kt" name="Notices" %}},
{{% sk-link-code component="result" filepath="results/builders/Outcomes.kt" name="Outcomes" %}} for the corresponding Aliases **Try, Notice, Outcome**.
{{< highlight kotlin >}}
    
    // Builder interface can build Result<T, E> from strings, exception, err
    interface Builder<out E> {
        fun <T> invalid(): Result<T, E> = Failure(errorFromStr(null, Codes.INVALID), Codes.INVALID)
        fun <T> invalid(msg: String): Result<T, E> = Failure(errorFromStr(msg, Codes.INVALID), Codes.INVALID)
        fun <T> invalid(ex: Exception, status: Failed.Invalid? = null): Result<T, E> = Failure(errorFromEx(ex, Codes.INVALID), status ?: Codes.INVALID)
        fun <T> invalid(err: Err, status:Failed.Invalid? = null): Result<T, E> = Failure(errorFromErr(err, Codes.INVALID), status ?: Codes.INVALID)

        // misc code

    }
    // Misc builders ( See links / code )
    interface TryBuilder : Builder<Exception> { /* .. */ }
    object Tries : TryBuilder { /* ... */ }

    interface NoticeBuilder : Builder<String> { /* .. */ }
    object Notice : NoticeBuilder { /* ... */ }

    interface OutcomeBuilder : Builder<Err> { /* .. */ }
    object Outcome : OutcomeBuilder { /* ... */ }

{{< /highlight >}}

With the builders and aliases in place, we can uses the **Tries, Notices or Outcomes** to easily construct accurate results
{{< highlight kotlin >}}

    import slatkeit.results.builders.*

    // Build results ( imagine this is some user registration flow )
    // Try<T> = Result<T, Exception>
    val tried1 = Tries.success( User() )
    val tried2 = Tries.denied<User>("Phone exists")
    val tried3 = Tries.invalid<User>("Email required")

    // Outcome<T> = Result<T, Err>
    val outcome1 = Outcomes.success( User() )
    val outcome2 = Outcomes.denied<User>("Phone exists")
    val outcome3 = Outcomes.invalid<User>("Email required" )

    // Notice<T> = Result<T, String>
    val notice1 = Notices.success( User() )
    val notice2 = Notices.denied<User>("Phone exists")
    val notice3 = Notices.invalid<User>("Email required" )

{{< /highlight >}}
{{% feature-end mod="arch/results" %}}


## Errors {#errors}
The error type **E** on Result and its Failure branch can be anything, unlike other implementations which default **E** to **Exception**. 
While you can use **String, or Exception** as the error type, {{% sk-name %}} offers {{% sk-link-code component="result" filepath="results/Err.kt" name="Err" %}} as a custom error type.
This provides convenient ways to build errors from a string, exception, based on an invalid field or from a list of errors.
This is much more comprehensive than using a simple **String** as an error type and more aligned with functional programming by
avoiding throwing of **Exceptions** where applicable.

{{< highlight kotlin >}}
    
    import slatekit.results.Err
    import slatekit.results.ErrorList

    // Build Err from various sources using convenience methods
    // From simple string
    val err1 = Err.of("Invalid email")

    // From Exception
    val err2 = Err.ex(Exception("Invalid email"))

    // From field name / value
    val err3 = Err.on("email", "abc123@", "Invalid email")

    // From status code
    val err4 = Err.code(Codes.INVALID)

    // From list of error strings
    val err5 = Err.list(listOf(
            "username must be at least 8 chars",
            "username must have 1 UPPERCASE letter"),
            "Username is invalid")

    // From list of Err types
    val err6 = Err.ErrorList(listOf(
            Err.on("email", "abc123 is not a valid email", "Invalid email"),
            Err.on("phone", "123-456-789 is not a valid U.S. phone", "Invalid phone")
    ), "Please correct the errors")

    // Create the Failure branch from the errors
    val result:Result<UUID, Err> = Failure(err6)
     
{{< /highlight >}}

{{% feature-end mod="arch/results" %}}


## Conversions {#conversions}
Results can be gracefully converted to other representations since there are 3 levels of detail:<br/>
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Detail</strong></td>
        <td><strong># Values</strong></td>
        <td><strong>Type(s)</strong></td>
        <td><strong>Conversion</strong></td>
    </tr>
    <tr>
        <td><strong>Top Level</strong></td>
        <td>2 : pass / fail </td>
        <td>**Success / Failure**</td>
        <td>True / False </td>
    </tr>
    <tr>
        <td><strong>Mid Level</strong></td>
        <td>7 : logical categories of Status</td>
        <td>**Status sub-classes**</td>
        <td>Succeeded, Pending, Denied, Ignored, Invalid, Errored, Unexpected etc</td>
    </tr>
    <tr>
        <td><strong>Low Level</strong></td>
        <td>N: Based on # of statuses you use</td>
        <td>**Status.code**</td>
        <td>200001, 400001, 500001, etc</td>
    </tr>
</table>
{{< highlight kotlin >}}
    
    // Suppose this an API endpoint to register a user

    // Simulate registration through a service layer
    val result:Outcome<User> = service.registerUser(user)

    // Convert the result back to HTTP somehow
    // NOTE: This is a simple conversion, see docs below
    when (result.status) {
        is Status.Succeeded  -> Http.Code200
        is Status.Invalid    -> Http.Code400
        is Status.Denied     -> Http.Code401
        is Status.Errored    -> Http.Code400
        else                 -> Http.Code500
    } 

{{< /highlight >}}

{{% feature-end mod="arch/results" %}}

# Guide
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Name</strong></td>
        <td><strong>Description</strong></td>
        <td><strong>More</strong></td>
    </tr>
    <tr>
        <td><strong>1. Create</strong></td>
        <td>Create successes, failures in various ways</td>
        <td><a href="arch/results/#create" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>2. Access</strong></td>
        <td>Get values safely using available operations</td>
        <td><a href="arch/results/#access" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>3. Check</strong></td>
        <td>Check for values or use pattern matching</td>
        <td><a href="arch/results/#check" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>4. Outcome</strong></td>
        <td>A type alias for **Result[T, Err]** where Err is an error interface</td>
        <td><a href="arch/results/#outcome" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>5. Try</strong></td>
        <td>A type alias for **Result[T, Exception]** to work with Exceptions</td>
        <td><a href="arch/results/#try" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>6. Validated</strong></td>
        <td>A type alias for **Result[T, Err.ErrorList]** to collect errors</td>
        <td><a href="arch/results/#validated" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>7. HTTP Support</strong></td>
        <td>Convert Successes / Failures to compatible HTTP codes</td>
        <td><a href="arch/results/#http" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
</table>
{{% section-end mod="arch/results" %}}


## Create {#create}
There various ways to create successes / failures, and these will be similar to Kotlin / Swift Result type usage. 
{{< highlight kotlin >}}
      
    import slatekit.results.*
    
    // Success: Straight-forward
    val result = Success(42)

    // Success referenced as base type Result<Int, Err>
    val result1a: Result<Int, Err> = Success(42)

    // Success created with status codes / messages
    val result1b = Success(42, status = Codes.SUCCESS)
    val result1c = Success(42, msg = "Successfully processed")
    val result1d = Success(42, msg = "Successfully processed", code = 200)

    // Failure
    val result1e = Failure(Err.of("Invalid email"))

    // Failure referenced as base type Result<Int, Err>
    val result1f: Result<Int, Err> = Failure(Err.of("Invalid email"))

    // Failure created with status codes / messages
    val result1g = Failure(Err.of("Invalid email"), Codes.INVALID)
    val result1h = Failure(Err.of("Invalid email"), msg = "Invalid inputs")
    val result1i = Failure(Err.of("Invalid email"), msg = "Invalid inputs", code = Codes.INVALID.code)
     
{{< /highlight >}}
{{% feature-end mod="arch/results" %}}

## Access {#access}
Result offers the typical functional ways to safely get the value
{{< highlight kotlin >}}
      
    import slatekit.results.*

    // Create
    val result:Result<Int, Err> = Success(42)

    // Get value or default to null
    val value1:Int? = result.getOrNull()

    // Get value or default with value provided
    val value2:Int = result.getOrElse { 0 }

    // Map over the value
    val op1 = result.map { it + 1 }

    // Flat Map over the value
    val op2 = result.flatMap { Success(it + 1 ) }

    // Fold to transform both the success / failure into something else ( e.g. string here )
    val value3:String = result.fold({ "Succeeded : $it" }, {err -> "Failed : ${err.msg}" })

    // Get value if success
    result.onSuccess { println("Number = $it") }

    // Get error if failure
    result.onFailure { println("Error is ${it.msg}") }

    // Pattern match
    when(result) {
        is Success -> println(result.value)  // 42
        is Failure -> println(result.error)  // Err
    }

{{< /highlight >}}
{{% feature-end mod="arch/results" %}}

## Check {#check}
There are 3 ways to check / pattern match the result type and its actual branch/values. These range from coarse to fine grained matches depending on the situation. Typically though, as with other implementations you just need to check for Success / Failure. However, you can also check the sub-categories of Successes and Failures.
{{< highlight kotlin >}}
     
    import slatekit.results.*

    val result:Result<Int,Err> = Success(42)
    
    // Check if the value matches the criteria
    result.exists { it == 42 } // true
    
    // Check if the value matches the one provided
    result.contains(2)        // false

    // Pattern match 1: "Top-Level" on Success/Failure (Binary true / false )
    when(result) {
        is Success -> println(result.value)  // 42
        is Failure -> println(result.error)  // Err
    }

    // Pattern match 2: "Mid-level" on Status ( 7 logical groups )
    // NOTE: The status property is available on both the Success/Failure branches
    when(result.status) {
        is Passed.Succeeded  -> println(result.msg) // Success!
        is Passed.Pending    -> println(result.msg) // Success, but in progress
        is Failed.Denied     -> println(result.msg) // Security related 
        is Failed.Invalid    -> println(result.msg) // Bad inputs / data
        is Failed.Ignored    -> println(result.msg) // Ignored for processing
        is Failed.Errored    -> println(result.msg) // Expected errors
        is Failed.Unexpected -> println(result.msg) // Unexpected errors
    }

    // Pattern match 3: "Low-Level" on numeric code
    when(result.status.code) {
        Codes.SUCCESS.code    -> println("OK")
        Codes.QUEUED.code     -> println("Pending")
        Codes.UPDATED.code    -> println("User updated")
        Codes.DENIED.code     -> println("Log in again")
        Codes.DEPRECATED.code -> println("No longer supported")
        Codes.CONFLICT.code   -> println("Email already exists")
        else                  -> println("Other!!")
    }
     
{{< /highlight >}}
{{% feature-end mod="arch/results" %}}

## Outcome {#outcome}
The **Outcome&lt;T&gt;** class is simply a type alias for **Result&lt;T, Err&gt;** and allows you to use Result as **Outcome&lt;T&gt;**. This {{% sk-link-code component="result" filepath="results/builders/Outcomes.kt" name="Outcomes" %}} has builder methods to construct Successes / Failures easily.
{{< highlight kotlin >}}
    import slatekit.results.* 
    import slatekit.results.builders.Outcomes

    // Outcome<Int> = Result<Int, Err>
    val res1 = Outcomes.success(1, "Created User with id 1")
    val res2 = Outcomes.denied<Int>("Not authorized to send alerts")
    val res3 = Outcomes.ignored<Int>("Not a beta tester")
    val res4 = Outcomes.invalid<Int>("Email is invalid")
    val res5 = Outcomes.conflict<Int>("Duplicate email found")
    val res6 = Outcomes.errored<Int>("Phone is invalid")
    val res7 = Outcomes.unexpected<Int>("Unable to send confirmation code")
    
{{< /highlight >}}
{{% feature-end mod="arch/results" %}}

## Try {#try}
The **Try&lt;T&gt;** class is simply a type alias for **Result&lt;T, Exception&gt;** and allows you to use Result as **Try&lt;T&gt;**. This has {{% sk-link-code component="result" filepath="results/builders/Tries.kt" name="Tries" %}} builder methods to construct Successes / Failures with exceptions. This is quite similar to Scala Try. Also, while functional error-handling is prioritized in {{% sk-name %}}, its not a dogmatic / absolute approach and exceptions can be used where appropriate.
{{< highlight kotlin >}}
     
    import slatekit.results.* 
    import slatekit.results.builders.Tries

    // Try<Long> = Result<Long, Exception>
    val converted1:Try<Long> = Tries.of { "1".toLong() }

    // DeniedException will checked and converted to Status.Denied
    val converted2:Try<Long> = Tries.of<Long> {
        throw DeniedException("Token invalid")
    }

{{< /highlight >}}
{{% feature-end mod="arch/results" %}}

## Validated {#validated}
The **Validated&lt;T&gt;** class is simply a type alias for **Result&lt;T, Err.ErrorList&gt;** and allows you to use collect a list of **Err**. 
{{< highlight kotlin >}}
     
    import slatekit.results.* 
    import slatekit.results.builders.Tries
    import slatekit.common.validations.Validations

    // Model to validate
    val user = User(0, "batman_gotham", "batman", "", true, 34)
    
    // Validated<User> = Result<User, Err.ErrorList>
    val validated = Validations.collect<User,String, Err>(user) {
        listOf(
                isNotEmpty(user.firstName),
                isNotEmpty(user.lastName),
                isEmail(user.email)
        )
    }

    // Print first error
    when(validated) {
        is Success -> println("User model is valid") 
        is Failure -> println("User model failed with : " + validated.error.errors.first().msg)
    }

{{< /highlight >}}
{{% feature-end mod="arch/results" %}}

## Http {#http}
{{% sk-link-code component="result" filepath="results/Status.kt" name="Status" %}} not only serve to logically sub-categorize successes/failures but they become a natural and easy way to convert results to platform/protocol specific statuses/errors. There is a default Err to HTTP status code converter available in {{% sk-link-code component="result" filepath="results/Codes.kt" name="Codes" %}}

{{< highlight kotlin >}}
     
    // Simulate a denied exception ( Security related )
    val denied:Outcome<Long> = Outcomes.denied("Access token has expired")
    
    // Convert it to HTTP
    // This returns back the HTTP code + original Status
    val code:Pair<Int, Status> = Codes.toHttp(denied.status)
    println(code.first) // 401
     
{{< /highlight >}}
{{% feature-end mod="arch/results" %}}

{{% section-end mod="arch/results" %}}

<script>
    var archComponent = {
        name: "Result",
        page: "arch/results",
        icon: "assets/media/img/white/target.png",
        menu: {
            mode: "normal",
            useTemplate:true,
            sections: [
                {
                    name: "Concepts",
                    items: [
                        { name:"Terms" , anchor: "#concepts" },
                        { name:"Result" , anchor: "#result"  },
                        { name:"Statuses" , anchor: "#statuses"  },
                        { name:"Aliases" , anchor: "#aliases"  },
                        { name:"Builders" , anchor: "#builders"  },
                        { name:"Errors" , anchor: "#errors"  },
                        { name:"Conversion" , anchor: "#conversion"  }
                    ]
                },
                {
                    name: "Guide",
                    items: [
                        { name:"Create" , anchor: "#creation" },
                        { name:"Access" , anchor: "#values"  },
                        { name:"Check", anchor: "#check" },
                        { name:"Try" , anchor: "#try"  },
                        { name:"Outcome" , anchor: "#outcome"  },
                        { name:"Validated" , anchor: "#validated"  },
                        { name:"Http" , anchor: "#http"  }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>

