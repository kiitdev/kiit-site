---
title: "Cli"
date: 2019-11-17T23:55:41-05:00
section_header: Cli
---

# Overview
The Slate Kit CLI is a Command Line Interface application that provides 
pre-built functionality for you to integrate your own commands in an interactie manner. This CLI offers 2 distinct approaches to integration. The first approach allows you to handle the raw text supplied in the CLI yourself and is the most flexible. The second approach provides a more connected, automatic experience by exposing, validating, and executing inputs against Slate Kit Universal APIs. You can create a CLI app quickly using the Slate Kit command line executable with the command below.
{{% break %}}

# Create
{{< highlight bash >}}
    
    slatekit new cli -name="SampleCLI" -package="mycompany.apps"
    
{{< /highlight >}}
{{% sk-link-cli %}}
{{% break %}}

# Goals
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Goal</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>1. Pre-Built CLI</strong></td>
        <td>Support for raw text, parsing, looping, formats, param types</td>
    </tr>
    <tr>
        <td><strong>2. Flexible Use</strong> </td>
        <td>Handle raw requests or leverage existing integration</td>                     
    </tr>
    <tr>
        <td><strong>3. API Support</strong></td>
        <td>Slate Kit APIs are accessible on Web or CLI</td>
    </tr>
</table>
{{% break %}}


# Status
This component is currently stable and there is a project generator for it.
A small future enhancement will add support for question and answer flow.
{{% section-end mod="arch/cli" %}}

# Install
{{% sk-install name="kiit-cli" %}}

{{% section-end mod="arch/cli" %}}

# Sources {#sources}
{{% sk-module 
    name="Cli"
    package="slatekit.cli"
    jar="slatekit.cli.jar"
    git="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-cli"
    gitModule="slatekit-cli"
    url="core/cli"
    bintray="slatekit-cli"
    uses="slatekit.results, slatekit.common"
    exampleUrl=""
    exampleFileName="Example_CLI.kt"
%}}

{{% section-end mod="arch/cli" %}}

# Example {#example}
You can create a custom CLI by extending the Slate Kit CLI component or the CliAPI component which integrates nicely with Slate Kit {{% sk-link-arch page="apis" name="APIs" %}}
{{< highlight kotlin >}}
     
    import kotlinx.coroutines.runBlocking
    import slatekit.results.*
    import slatekit.cli.CLI
    import slatekit.cli.CliRequest
    import slatekit.cli.CliSettings
    import slatekit.cli.CliResponse 

    class AppCLI(settings: CliSettings, serializer:(Any?, ContentType) -> Content) 
        : CLI(settings, Info.none, Folders.default, serializer = serializer) {

        /**
         * Use case 3a : ( OPTIONAL ) do some stuff before running any commands
         */
        override suspend fun init(): Try<Boolean> {
            // You don't need to override this as the base method displays help info
            context.help.showHelp()
            context.writer.highlight("\thook: onShellStart - starting myapp command line interface")
            return Success(true)
        }


        /**
         * Use case 3b : ( OPTIONAL ) do some stuff before ending the shell this is called
         */
        override suspend fun end(status: Status): Try<Boolean> {
            context.writer.highlight("\thook: onShellEnd - ending myapp command line interface")
            return Success(true)
        }


        /**
         * Handle execution of the CLI Request
         */
        override suspend fun executeRequest(request: CliRequest): Try<CliResponse<*>> {

            // Access the arguments
            val title = request.args.getString("title"))
            val date = request.args.getString("date"))
            
            // Do something with the request
            val res = Success("Processed " + request.path)

            // 4. Now return the response
            return res
        }
    }

    // Serialization for output ( using Slate Kit default )
    val serializer = { item:Any?, type: ContentType -> Content.csv(slatekit.meta.Serialization.csv().serialize(item) )}

    // Create with default settings
    val cli = AppCLI(CliSettings(), serializer)

    // Begin the REPL (Read, Eval, Print, Loop )
    runBlocking {
        cli.run()
    }

{{< /highlight >}}
{{% section-end mod="arch/cli" %}}


# Concepts
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Component</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>{{% sk-link-code component="cli" filepath="cli/CLI.kt" name="CLI" %}}</strong></td>
        <td>The main component managing the interaction</td>
    </tr>
    <tr>
        <td><strong>{{% sk-link-code component="cli" filepath="cli/CliRequest.kt" name="CliRequest" %}}</strong> </td>
        <td>Represents the command entered</td>                     
    </tr>
    <tr>
        <td><strong>{{% sk-link-code component="cli" filepath="cli/CliResponse.kt" name="CliResponse" %}}</strong></td>
        <td>Represents the output of the operation</td>
    </tr>
    <tr>
        <td><strong>{{% sk-link-code component="integration" filepath="integration/apis/CliApi.kt" name="CliApi" %}}</strong></td>
        <td>Extends the CLI by integrating it with Slate Kit APIs</td>
    </tr>
    <tr>
        <td><strong>{{% sk-link-code component="cli" filepath="cli/Command.kt" name="Command" %}}</strong></td>
        <td>Reserved commands like **about, version, help, quit, exit**, etc</td>
    </tr>
    <tr>
        <td><strong>{{% sk-link-code component="common" filepath="common/args/Args.kt" name="Input Param" %}}</strong></td>
        <td>Parameter starting with **-** representing data for a command</td>
    </tr>
    <tr>
        <td><strong>{{% sk-link-code component="common" filepath="common/args/Args.kt" name="Meta Param" %}}</strong></td>
        <td>Parameter starting with **@** representing metadata for a command </td>
    </tr>
    <tr>
        <td><strong>{{% sk-link-code component="cli" filepath="cli/SysParam.kt" name="System Param" %}}</strong></td>
        <td>Parameter starting with **$** representing an instruction for the CLI</td>
    </tr>
    <tr>
        <td><strong>9. Reference</strong></td>
        <td>Reference to command originating from a file</td>
    </tr>
</table>
{{% section-end mod="arch/cli" %}}

# Guide
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Name</strong></td>
        <td><strong>Description</strong></td>
        <td><strong>More</strong></td>
    </tr>
    <tr>
        <td><strong>1. Inputs</strong></td>
        <td>Handling text and inputs</td>
        <td><a href="arch/cli/#inputs" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>2. Reserved</strong> </td>
        <td>List of reserved commands</td> 
        <td><a href="arch/cli/#reserved" class="more"><span class="btn btn-primary">more</span></a></td>                    
    </tr>
    <tr>
        <td><strong>3. Args</strong></td>
        <td>How to convert raw text into parsed parameters</td>
        <td><a href="arch/cli/#args" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>4. Requests</strong></td>
        <td>Working with parsed commands as CLI Requests</td>
        <td><a href="arch/cli/#requests" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>5. Execute</strong></td>
        <td>How to execute a request</td>
        <td><a href="arch/cli/#execute" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>6. Responses</strong></td>
        <td>Working with parsed commands as CLI Requests</td>
        <td><a href="arch/cli/#responses" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>7. Startup</strong></td>
        <td>Load a command at start up</td>
        <td><a href="arch/cli/#startup" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>8. API</strong></td>
        <td>How to access APIs on the command line</td>
        <td><a href="arch/cli/#apis" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>9. From file</strong></td>
        <td>Load a command from a file</td>
        <td><a href="arch/cli/#from-file" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>10. Scripts</strong></td>
        <td>Run a series of commands in batch mode</td>
        <td><a href="arch/cli/#scripts" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
</table>
{{% section-end mod="arch/cli" %}}


## Inputs {#inputs}
You can customize the CLI so that you can handle a) raw text / lines, b)have the text parsed into arguments, or c) have the text be  converted and called as an API request. All these are valid depending on your configuration.
{{< highlight bash >}}
     
    # Handle any text yourself
    :> some free form text

    # Use a arguments style structure
    :> -email="user1@abc.com" -betaUser=true -promoCode=referral

    # Leverage use of Slate Kit Universal APIs by specifying the 3 part route
    :> manage.movies.createSample -title="Dark Knight" -date="2013-07-18"


{{< /highlight >}}
{{% feature-end mod="arch/cli" %}}

## Reserved {#reserved}
There are several built-in reserved commands. See {{% sk-link-code component="cli" filepath="cli/Reserved.kt" name="Reserved.kt" %}} for more info
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Text</strong></td>
        <td><strong>Aliases</strong></td>
        <td><strong>Purpose</strong></td>
    </tr>
    <tr>
        <td><strong>exit</strong></td>
        <td>quit</td>
        <td>Exits the CLI </td>
    </tr>
    <tr>
        <td><strong>version</strong></td>
        <td>n/a</td>
        <td>Gets the current version of the CLI</td>
    </tr>
    <tr>
        <td><strong>about</strong></td>
        <td>help, info</td>
        <td>Gets help text about the CLI and how to use commands</td>
    </tr>
</table>
{{% feature-end mod="arch/cli" %}}

## Args {#args}
The raw text / line is parsed into command line args using the {{% sk-link-util page="args" name="Args" %}}
{{< highlight bash >}}
    
    # Leverage use of Slate Kit Universal APIs by specifying the 3 part route
    :> manage.movies.createSample -title="Dark Knight" -date="2013-07-18"
    
    args.getString("title")
    args.getLocalDate("date")

{{< /highlight >}}
{{% feature-end mod="arch/cli" %}}

## Requests {#requests}
The raw text line, after being parsed into command line arguments is converted into a CliRequest object which you can then use to execute your commands.
{{< highlight kotlin >}}

    /**
     * Handle execution of the CLI Request
     */
    override suspend fun executeRequest(request: CliRequest): Try<CliResponse<*>> {

        // 1. Here is where you can put in your code to handle the command.
        println("running command")

        // 2. You have access to all the command fields and arguments.
        // NOTES: 
        // - The command is parsed into [slatekit.common.args.Args] 
        // - The Args component is put inside [slatekit.cli.CliRequest] 
        // This gets you the raw text/line
        println("line   : " + request.args.line)
        
        // This returns the list of action names before arguments. e.g. ["manage", "movies", "createSample"]
        println("parts  : " + request.parts)
        println("path   : " + request.fullName)

        // This is useful if leveraging the 3 part routing system for Slate Kit APIs
        println("area   : " + request.area)
        println("api    : " + request.name)
        println("action : " + request.action)
        
        // Access the arguments
        println("arg #  : " + request.args.size())
        println("arg 1  : " + request.args.getString("title"))

        // ...
    }

{{< /highlight >}}
{{% feature-end mod="arch/cli" %}}

## Execute {#execute}
To execute the command, you can override the executeRequest method
{{< highlight kotlin >}}

    /**
     * Handle execution of the CLI Request
     */
    override suspend fun executeRequest(request: CliRequest): Try<CliResponse<*>> {
        
        // Access the arguments
        val title = request.args.getString("title"))
        val date  = request.args.getLocalDate("date"))

        // Process... 

        // Return
        return Success(
                CliResponse(
                        request = request,
                        success = true,
                        code = Codes.SUCCESS.code,
                        meta = mapOf(),
                        value = "Sample Response",
                        msg = "Processed",
                        err = null,
                        tag = "tag-123"
                ))
    }

{{< /highlight >}}
{{% feature-end mod="arch/cli" %}}

## Responses {#responses}
You must return a CliResponse upon execution. This leverages the Slate Kit {{% sk-link-arch page="results" name="Result" %}}
{{< highlight kotlin >}}
     
    return Success(
                CliResponse(
                        request = request,
                        success = true,
                        code = Codes.SUCCESS.code,
                        meta = mapOf(),
                        value = "Sample Response",
                        msg = "Processed",
                        err = null,
                        tag = "tag-123"
                ))

{{< /highlight >}}
{{% feature-end mod="arch/cli" %}}

## Startup {#startup}
You can have commands run during the start up of the CLI. This is accomplished by supplying a list of String text commands to the CLI during construction in the **commands** parameter.
{{< highlight kotlin >}}

    open class CLI(
        val settings: CliSettings,
        val info: Info,
        val folders: Folders?,
        val callback: ((CLI, CliRequest) -> CliResponse<*>)? = null,
        commands: List<String?>? = listOf(),
        ioReader: ((Unit) -> String?)? = null,
        ioWriter: ((CliOutput) -> Unit)? = null,
        val serializer:(Any?, ContentType) -> Content
    )

{{< /highlight >}}
{{% feature-end mod="arch/cli" %}}

## API {#apis}
The most important and powerful feature of the CLI is integration with Slate Kit {{% sk-link-arch page="apis" name="APIs" %}}. Refer to <a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit/src/main/kotlin/slatekit/samples/cli/CLI.kt" >Sample</a> for more info.
{{< highlight kotlin >}}

    // 1. The API keys( DocApi, SetupApi are authenticated using an sample API key )
    val keys = listOf(ApiKey( name ="cli", key = "abc", roles = "dev,qa,ops,admin"))

    // 2. Authentication
    val auth = Authenticator(keys)

    // 3. Load all the Slate Kit Universal APIs
    val apis = listOf(
            slatekit.apis.core.Api(
                klass = SampleApi::class, 
                singleton = SampleApi(ctx)
            )
    )

    // 4. Makes the APIs accessible on the CLI runner
    val cli = CliApi(
            ctx = ctx,
            auth = auth,
            settings = CliSettings(enableLogging = true, enableOutput = true),
            apiItems = apis,
            metaTransform = {
                listOf("api-key" to keys.first().key)
            },
            serializer = {item, type -> Content.csv(slatekit.meta.Serialization.csv().serialize(item))}
    )

    // 5. Run interactive mode
    return cli.run()

{{< /highlight >}}
{{% feature-end mod="arch/cli" %}}

## From file {#from-file}
{{% sk-coming-soon text="Functionality is available but docs are not yet ready." %}}

{{% feature-end mod="arch/cli" %}}

## Scripts {#scripts}
{{% sk-coming-soon text="Functionality is available but docs are not yet ready." %}}

{{% feature-end mod="arch/cli" %}}

{{% section-end mod="arch/cli" %}}

<script>
    var archComponent = {
        name: "CLI",
        page: "arch/cli",
        icon: "assets/media/img/white/terminal.png",
        menu: {
            mode: "normal",
            useTemplate:true,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"Inputs" , anchor: "#inputs" },
                        { name:"Reserved" , anchor: "#reserved"  },
                        { name:"Args", anchor: "#args" },
                        { name:"Requests" , anchor: "#requests"  },
                        { name:"Execute" , anchor: "#execute"  },
                        { name:"Responses" , anchor: "#responses"  },
                        { name:"Startup" , anchor: "#startup"  },
                        { name:"APIs" , anchor: "#apis"  }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>

