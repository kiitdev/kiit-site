---
title: "App"
date: 2019-03-17T14:30:51-04:00
section_header: App
---
<br/>

# Overview {#overview}
The Slate App is a base application and template to build console, batch, cli and server applications.
It has pre-built support for common features such as **command line args, environment selection, configs per environment, logging, life-cycle events, help text, diagnostics** and much more.
This is accomplished by integrating some of the components and utilities available in the 
{{% sk-link href="utils.html" text="Common" %}} project. 
You can create a app quickly using the {{% sk-name %}} command line executable with the following inputs.
Also refer to the {{% sk-link-example file="Example_App.kt" name="Example_App.kt" %}}.
{{% break %}}

{{< highlight bash >}}
    
    kiit new app -name="SampleApp" -package="mycompany.apps"
    
{{< /highlight >}}
{{% sk-link-cli %}}
{{% break %}}

# Diagram
A high-level diagram of the concepts in this component
{{% break %}}
<img src="assets/app/media/arch/mod-app.png" class="rounded mx-auto d-block img-fluid" />
{{% break %}}

# Goals {#goals}
We often have to create a new application which requires typically much boiler-plate code.
These include environments, config files, argument parsing, logging setup, and application life-cycle events.
This component quickly gets a new application set up with all these features ready.
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Goal</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>1. Template</strong></td>
        <td>Provide template for any application 
        ( Console, Batch, CLI, Server )</td>
    </tr>
    <tr>
        <td><strong>2. Features</strong> </td>
        <td>Provide pre-built support commandline args, 
        config, logging, and more.</td>                     
    </tr>
    <tr>
        <td><strong>3. Standardized</strong></td>
        <td>Provide standardized setup, functionality and diagnostics</td>
        </td>                       
    </tr>
</table> 

{{% break %}}   


# Status {#status}
This component is currently stable and there is a project generator for it.
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Feature</strong></td>
        <td><strong>Status</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>Docker</strong></td>
        <td>Future</td>
        <td>Support for generating Docker images</td>
    </tr>
</table>
{{% section-end mod="arch/app" %}}

# Install {#install}
{{% sk-install name="kiit-app" %}}

{{% section-end mod="arch/app" %}}

# Sources {#sources}
{{% sk-module 
    name="App"
    package="slatekit.app"
    jar="slatekit.app.jar"
    git="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-app/src/main/kotlin/slatekit/app"
    gitModule="slatekit-app"
    url="arch/app"
    bintray="slatekit-app"
    uses="slatekit.results, slatekit.common"
    exampleUrl="Example_App.kt"
    exampleFileName="Example_App.kt"
%}}
{{% section-end mod="arch/app" %}}

# Example {#example}
You can generate a sample app using the slatekit executable. 
Also refer to the {{% sk-link-example file="Example_App.kt" name="Example_App.kt" %}}
{{< highlight bash >}}
    
    :> slatekit new app -name="MyApp1" -packageName="company1.myapp1"
    
{{< /highlight >}}
{{% section-end mod="arch/app" %}}


# Concepts {#concepts}
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Concept</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>1. Life-cycle</strong></td>
        <td>The app component is a base class, with support for life-cycle events ( init, exec, done )</td>
    </tr>
    <tr>
        <td><strong>2. Envs</strong></td>
        <td>Environment selection ( local, dev, qa, stg, prod, etc ) is available with integration with respective config files.</td>
    </tr>
    <tr>
        <td><strong>3. Overrides</strong></td>
        <td>Support for overriding <strong>some</strong> settings on the command line with what is set up in the configuration file(s)</td>
    </tr>
    <tr>
        <td><strong>4. Context</strong></td>
        <td>Container for services and items such as selected environment ( local, dev, etc ), config, logger, encryptor.</td>
    </tr>
    <tr>
        <td><strong>5. Help</strong></td>
        <td>Support for app information, version, and command line args, is made available through config files and/or code</td>
    </tr>
</table>
{{% section-end mod="arch/app" %}}


# Guide {#guide}
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Name</strong></td>
        <td><strong>Description</strong></td>
        <td><strong>More</strong></td>
    </tr>
    <tr>
        <td><strong>Args</strong></td>
        <td>Command line arguments ( -env=dev )</td>
        <td><a href="arch/app/#Args" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Envs</strong></td>
        <td>Environment selection ( dev | qat | stg | pro )</td>
        <td><a href="arch/app#Envs" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Logs</strong></td>
        <td>Logging and error handling ( console / file logger )</td>
        <td><a href="arch/app#Logs" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Conf</strong></td>
        <td>Config settings ( env.conf, env.local.conf, env.qat.conf )</td>
        <td><a href="arch/app#Conf" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Context</strong></td>
        <td>Application context ( for env, logs, configs, etc )</td>
        <td><a href="arch/app#Context" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Cycle</strong></td>
        <td>Life-Cycle events ( init, exec, done )</td>
        <td><a href="arch/app#Cycle" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Help</strong></td>
        <td>Help support for command line args ( help | version )</td>
        <td><a href="arch/app#Help" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Info</strong></td>
        <td>Startup info and diagnostics</td>
        <td><a href="arch/app#info" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>>
    <tr>
        <td><strong>Security</strong></td>
        <td>Setting up a secure application </td>
        <td><a href="arch/app#security" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
</table>
<br/>

## Args {#args}
Command line arguments are parsed and supplied to your app. You can specify what the arguments are supported by specifying the schema.
This leverages the {{% sk-link-util page="args" name="Args" %}} component.
{{< highlight kotlin >}}
  // Example of supplying arguments.
  myapp -env=dev -log.level=info -region=ny
    
  // setup the command line arguments.
  // NOTE:
  // 1. These values can can be setup in the env.conf file
  // 2. If supplied on command line, they override the values in .conf file
  // 3. If any of these are required and not supplied, then an error is display and program exists
  // 4. Help text can be easily built from this schema.
  val schema = ArgsSchema()
        .text("","env", "the environment to run in", false, "dev", "dev", "dev1|qa1|stg1|pro")
        .text("","region", "the region linked to app", false, "us", "us", "us|europe|india|*")
        .text("","log.level", "the log level for logging", false, "info", "info", "debug|info|warn|error")
    
{{< /highlight >}}
{{% feature-end mod="arch/app" %}}

## Envs {#envs}
Default environments and configs per environment are setup for applications and associated together.
Refer to example app and or a generated application for more info.
This leverages the {{% sk-link-util page="env" name="Envs" %}} and {{% sk-link-util page="config" name="Config" %}} components
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Env</strong></td>
        <td><strong>Name</strong></td>
        <td><strong>Mode</strong></td>
        <td><strong>Conf</strong></td>
    </tr>
    <tr>
        <td>Shared conf for all envs</td>
        <td>-</td>
        <td>-</td>
        <td>resources/env.conf </td>
    </tr>
    <tr>
        <td><strong>Development ( local )</strong></td>
        <td>loc</td>
        <td>Dev</td>
        <td>resources/env.local.conf</td>
    </tr>
    <tr>
        <td><strong>Development ( Shared )</strong></td>
        <td>dev</td>
        <td>Dev</td>
        <td>resources/env.dev.conf</td>
    </tr>
    <tr>
        <td><strong>Quality Assurance</strong></td>
        <td>qat</td>
        <td>Qat</td>
        <td>resources/env.qat.conf</td>
    </tr>
    <tr>
        <td><strong>Staging</strong></td>
        <td>stg</td>
        <td>Uat</td>
        <td>resources/env.uat.conf</td>
    </tr>
    <tr>
        <td><strong>Production</strong></td>
        <td>pro</td>
        <td>Pro</td>
        <td>resources/env.pro.conf</td>
    </tr>
</table>
{{% feature-end mod="arch/app" %}}

## Logs {#logs}
Logback logging is setup for the application in <strong>/resources/logback.xml</strong>
This leverages the {{% sk-link-util page="logger" name="Logs" %}} component.
{{< highlight xml >}}

<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    ...
    <logger name="app" level="info" additivity="false">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="FILE" />
        <appender-ref ref="LOGGLY-ASYNC" />
    </logger>
    <root level="debug">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="FILE" />
    </root>
    ...
</configuration>

{{< /highlight >}}
{{% feature-end mod="arch/app" %}}


## Conf {#conf}
Configuration settings are supported via normal Java Properties files stored in the <strong>resources</strong> folder.
Configuration settings existing based on the names of the environments setup ( see above ). 
This leverages the {{% sk-link-util page="config" name="Config" %}} component.

#### env.conf
This is the common config file inherited by all other configs. 
You can specify the environment to load by setting <strong>env = name</strong>
{{< highlight yaml >}}
# environment selection
# this can be overriden on the commandline via -env=qa
env = loc
{{< /highlight >}}

#### env.qat.conf
You have config files per environment. You can override settings in the environment specific config.
{{< highlight yaml >}}
# environment selection
# this can be overriden on the commandline via -env=qa
env = loc
{{< /highlight >}}
{{% feature-end mod="arch/app" %}}

## Help {#help}
The application supports typing  <strong>-version</strong>,  <strong>-about</strong> and <strong>-help</strong> after your apps executable/jar.
This will display info about the app and usage of command line args.
This leverages the {{% sk-link-util page="args" name="Args" %}} component.
{{< highlight bash >}}

myapp -help

 ==============================================
 ABOUT
 area     :  Department 1
 name     :  Sample App
 desc     :  Sample console application to show the base application features
 url      :  http://sampleapp.slatekit.com
 contact  :  kishore@company1.co
 version  :  1.0.0
 tags     :  slate,shell,cli
 examples :  sampleapp -env=dev -log.level=debug -region='ny' -enc=false
 ==============================================

 ARGS
 -env     :  the environment to run in
             ! required  [String]  e.g. dev
 -log     :  the log level for logging
             ? optional  [String]  e.g. info
 -enc     :  whether encryption is on
             ? optional  [String]  e.g. false
 -region  :  the region linked to app
             ? optional  [String]  e.g. us
    
{{< /highlight >}}
{{% feature-end mod="arch/app" %}}

## Context {#context}
The is an application context that stores all relevant info about the application such as the command line args,
config, logs, encryptor, info about the app and more. You have access to this with in your app. 
This can be either built up automatically by the application or you can supply it explicitly.
This leverages the {{% sk-link-arch page="context" name="Context" %}} component. Here is an example of an explictly built context.
{{< highlight kotlin >}}
    // Build explicitly
    val ctx1 = AppEntContext(
            arg = Args.default(),
            env = Env("dev", EnvMode.Dev, "ny", "dev environment"),
            cfg = Config(),
            logs = LogsDefault,
            ent = Entities({ con -> Db(con) }),
            sys = Sys.build(),
            build = Build.empty,
            start = StartInfo.none,
            app = About(
                area = "department1",
                name = "sample-app-1",
                desc = "Sample application 1",
                company = "Company 1",
                region = "New York",
                url = "http://company1.com/dep1/sampleapp-1",
                contact = "dept1@company1.com",
                version = "1.0.1",
                tags = "sample app slatekit",
                examples = ""
            )
    )
       
{{< /highlight >}}
{{% feature-end mod="arch/app" %}}

## Cycle {#cycle}
The application support 3 life-cycle events, <strong>init, exec, and done</strong>. 
You can use these template methods to insert your pre execution, execution, and post execution logic.
{{< highlight kotlin >}}
    
    import slatekit.app.App
    import slatekit.results.Success
    import slatekit.results.Try
    import slatekit.common.CommonContext

    class SlateKit(ctx: CommonContext) : App<CommonContext>(ctx) {

        override suspend fun init(): Try<Boolean> {
            println("starting")
            return super.init()
        }

        override suspend fun exec(): Try<Any> {
            println("executing")
            return Success(true)
        }

        override suspend fun end(): Try<Boolean> {
            println("complete")
            return super.end()
        }
    }
    
{{< /highlight >}}
{{% feature-end mod="arch/app" %}}

## Info {#info}
The component can print diagnostic info during the start and end of your application life-cycle.
This leverages the all the existing {{% sk-link-util page="args" name="Args" %}}, {{% sk-link-util page="env" name="Env" %}}, {{% sk-link-util page="config" name="Config" %}}
components list earlier.
{{< highlight bash >}}

 Info  : app executing now
 Info  : app completed
 Info  : app shutting down
 Info  : ===============================================================
 Info  : SUMMARY :
 Info  : ===============================================================
 Info  : area              = Samples
 Info  : name              = App1
 Info  : desc              = Sample to show the base application
 Info  : version           = 1.0.0
 Info  : tags              = sample
 Info  : contact           = kishore@abc.co
 Info  : url               =
 Info  : args              = -region=usa
 Info  : env               = dev
 Info  : config            = env.conf
 Info  : log               = local:dev
 Info  : started           = 2017-07-11T11:54:13.132-04:00[America/New_York]
 Info  : ended             = 2017-07-11T11:54:18.408-04:00[America/New_York]
 Info  : duration          = PT5.276S
 Info  : status            = ended
 Info  : host.name         = KRPC1
 Info  : host.ip           =
 Info  : host.origin       = mac
 Info  : host.version      = 10.0
 Info  : lang.name         = kotlin
 Info  : lang.version      = 1.8.0_91
 Info  : lang.vendor       = Oracle Corporation
 Info  : lang.java         = local
 Info  : App1              =  extra summary data1
 Info  : App1              =  extra summary data2
 Info  : ===============================================================

    
{{< /highlight >}}
{{% feature-end mod="arch/app" %}}

## Security {#security}
Sensitive configuration settings can be secured by encrypting the settings, or loading them from environment variables. Check the {{% sk-link-util page="config" name="Config" %}} component for more info.

{{% feature-end mod="arch/app" %}}

<script>
    var archComponent = {
        name: "App",
        page: "arch/app",
        icon: "assets/media/img/white/desktop.png",
        menu: {
            mode: "normal",
            useTemplate:true,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"Args" , anchor: "#about" },
                        { name:"Envs" , anchor: "#envs"  },
                        { name:"Confs", anchor: "#confs" },
                        { name:"Logs" , anchor: "#logs"  },
                        { name:"Info" , anchor: "#info"  },
                        { name:"Security" , anchor: "#security"  }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>



