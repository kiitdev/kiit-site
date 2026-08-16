---
title: Generators
date: 2019-03-17T13:02:30-04:00
section_header: Generators
---


# About
Slate Kit comes with a command line tool to serve as a project generator.
This project generator is a pacakged java based application, and works like a minimal version of **nodejs yeoman** or **python cookie-cutter**
There are several types of project generators available by default from Slate Kit. These are the most common type of Applications or services corresponding to the architecture components available from Slate Kit.


{{< highlight bash >}}
    
    slatekit new app -name="Sample1" -packageName="mycompany.apps"
    
{{< /highlight >}}

{{% break %}}


# Status
Currently, the Slate Kit CLI tool is only available for automatic install on Mac OS as it is integrated with <strong>HomeBrew</strong>.
You can however perform an manual install on Windows using the instructions provided.

{{% break %}}


# MacOS
You can easily install the Slate Kit CLI using HomeBrew on Mac OS.

### Install
{{< highlight bash >}}
     
    brew tap slatekit/slatekit

    # Note: install may take a long time ( see notes/issues below )
    brew install slatekit
    
{{< /highlight >}}
<div class="alert alert-danger" role="alert">
    You may experience some issues with the install, consider the following<br/>
    <strong>1:</strong> Ensure System Preferences -> security -> privacy -> full disk access -> iterm2 ( of what ever terminal you use )<br/>
    <strong>2:</strong> <a href="https://discussions.apple.com/thread/251258165">Slow HomeBrew post install on Mac OS Catalina ( based on thread below )</a><br/>
    <strong>3:</strong> <a href="https://discourse.brew.sh/t/brew-install-very-slow-pauses-for-long-period-while-executing-usr-bin-sandbox-exec-in-post-install/7423">The install may be very slow with MacOS Catalina</a>
</div>

### Upgrade
{{< highlight bash >}}
     
    brew upgrade slatekit
    
{{< /highlight >}}

### Un-Install
{{< highlight bash >}}
     
    brew uninstall slatekit
    brew untap slatekit/slatekit
    
{{< /highlight >}}
{{% break %}}

# Windows
Currently, there is no installer available for Windows. However you have 2 options:

## Option 1: Sample Apps
There are several sample applications available in git at {{% sk-link-src component="apps/kotlin/slatekit-samples" filepath="samples" name="Samples" %}}.
You can simply copy one of the samples ( app, cli, api, job, etc ) and adjust/remove code accoringly.

## Option 2: Manual install
You can also perform a manual install for the time being. <br/><br/>
1. Download the latest release zip from https://github.com/slatekit/slatekit-cli/releases <br/>
2. Unzip https://github.com/slatekit/slatekit-cli/archive/v2.2.0.zip to C:/tools/slatekit/2.2.0<br/>
3. Create a bin directory in C:/tools/slatekit/2.2.0/bin and move slatekit and slatekit.bat files into bin  <br/>
4. Add C:/tools/slatekit/2.2.0/bin/ to your system path  <br/>
5. In terminal Run command slatekit new app -name="MyApp1" -packageName="company1.apps" (You may have to refresh your terminal) <br/>
6. This will fail the first time but it will generate the settings  <br/>
10. Go to your user/documents directory and open ~/.slatekit/tools/cli/conf/settings.conf file <br/>
11. Update the generation.source to path of the templates e.g. C:/tools/slatekit/2.2.0/tempaltes <br/>
12. You should now be able to run the command again to generate projects <br/>

{{% break %}}

# Settings
The settings for the generator are automatically created at <strong>~/.slatekit/tools/cli/conf/settings.conf</strong> when you try to create your first project.
The settings are listed below
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Name</strong></td>
        <td><strong>Type</strong></td>
        <td><strong>Desc</strong></td>
        <td><strong>Example</strong></td>
    </tr>
    <tr>
        <td><strong>slatekit.version</strong></td>
        <td>Variable</td>
        <td>Version of Slate Kit stable libraries to use</td>
        <td>2.2.0</td>
    </tr>
    <tr>
        <td><strong>slatekit.version.beta</strong></td>
        <td>Variable</td>
        <td>Version of Slate Kit beta libraries to use</td>
        <td>2.2.0</td>
    </tr>
    <tr>
        <td><strong>kotlin.version</strong></td>
        <td>Variable</td>
        <td>Version of Kotlin to use</td>
        <td>1.3.6</td>
    </tr>
    <tr>
        <td><strong>generation.source</strong></td>
        <td>Variable</td>
        <td>Represents the path to the templates used for project code generation. This is defaulted to the version of Slate Kit installed through HomeBrew</td>
        <td>/usr/local/Cellar/slatekit/1.34.0/templates</td>
    </tr>
</table>
<div class="alert alert-warning" role="alert">
    <strong>Tip:</strong> The tool does <strong>NOT</strong> currently support setting up custom templates, but this is a desired future feature.
</div>
{{% section-end mod="arch/generators" %}}


# APP {#app}
Generates a new Slate Kit stand-alone application with support command line args, environments, configs, logging, help usage and more. Refer to the {{% sk-link-arch page="app" name="App" %}} component and example: {{% sk-link-example file="Example_App.kt" name="Example_App.kt" %}}.

{{< highlight bash >}}
     
    :> slatekit new app -name="MyApp1" -packageName="company1.apps"
    
    # Now build and run via gradle
    :> cd MyApp1
    :> gradle build
    :> gradle run
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}


# API {#api}
Generates a new API project for hosting HTTP/Web APIs. APIs in Slate Kit are considered **Universal** in the sense that you write them once and they are available as both HTTP/Web APIs ( in the form of RPCs ) and also available on the CLI.
Also refer to the {{% sk-link-arch page="apis" name="APIs" %}} component.

{{< highlight bash >}}
      
    slatekit new api -name="MyAPI1" -packageName="company1.apis"
    
    # Now build and run via gradle
    :> cd MyAPI1
    :> gradle build
    :> gradle run
    
{{< /highlight >}}

<div class="alert alert-warning" role="alert">
    <strong>Tip:</strong> A postman script named <strong>slatekit-samples-postman.json</strong> is also created in the root folder of the generated project. You can import this into PostMan and easily test the API actions/endpoints
</div>
{{% section-end mod="arch/generators" %}}


# JOB {#job}
Generates a new background job that can be gracefully started, stopped, paused, resumed. They can also be run in "pages", or process items from queues.
Refer to the {{% sk-link-arch page="jobs" name="Jobs" %}} component and example: {{% sk-link-example file="Example_Jobs.kt" name="Example_Jobs.kt" %}}.

{{< highlight bash >}}
     
    slatekit new job -name="MyJob1" -packageName="company1.jobs"
    
{{< /highlight >}}

For the Job, you can run the different job types by passing **-job.name** to the arguments for gradle/java. E.g. 
{{< highlight bash >}}
    
    cd gen/MyJob1
    gradle build

    # To run the One Time Job sample
    gradle run --args='-sample=onetime'

    # To run the Paged Job sample
    gradle run --args='-sample=paging'

    # To run the Queue Job sample
    gradle run --args='-sample=queued'

    # To run the Worker Sample
    gradle run --args='-sample=worker'
    
{{< /highlight >}}

{{% section-end mod="arch/generators" %}}


# CLI {#cli}
Generates a CLI ( Command Line Interface ) application. The CLI in Slate Kit can host Slate Kit APIs.
Also refer to the {{% sk-link-arch page="cli" name="CLI" %}} component and example: {{% sk-link-example file="Example_CLI.kt" name="Example_CLI.kt" %}}.

{{< highlight bash >}}
      
    slatekit new cli -name="MyCLI1" -packageName="company1.apps"
    
    # Now build and run via gradle
    :> cd MyCLI1
    :> gradle build
    :> gradle distZip
    :> cd build/distributions

    # Unzip the MyCLI1.zip and run
    :> cd MyCLI1/bin
    :> ./MyCLI1
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}

<script>
    var archComponent = {
        name: "Generators",
        page: "start/generators",
        icon: "assets/media/img/white/gears.png",
        menu: {
            mode: "normal",
            useTemplate:false,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"About"    , anchor: "#about" },
                        { name:"Status"       , anchor: "#status"  }
                    ]
                },
                {
                    name: "Setup",
                    items: [
                        { name:"MacOS"       , anchor: "#macos"  },
                        { name:"Windows"        , anchor: "#windows" },
                        { name:"Settings"        , anchor: "#settings"  }
                    ]
                },
                {
                    name: "Generators",
                    items: [
                        { name:"App"      , anchor: "#app"  },
                        { name:"API"      , anchor: "#api"  },
                        { name:"Job"      , anchor: "#job"  },
                        { name:"Env"      , anchor: "#env"  },
                        { name:"CLI"      , anchor: "#cli"  }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>


