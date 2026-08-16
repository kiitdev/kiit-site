---
title: Generators
date: 2019-03-17T13:02:30-04:00
section_header: Generators
---


# Overview
Slate Kit comes with a command line executable to serve as a project generator.
This is simply a Kotlin executable jar packaged as a Java Application via gradle that can be executed on the command line with bash/batch scripts. The application takes a template comprised of a instructions, along with files/folders that are copied to a new destinated folder representing the app to create. The files contain placeholder values that replaced the name of the app aamong other things. This is a minimal version of **nodejs yeoman** or **python cookie-cutter**
{{< highlight bash >}}
    
    slatekit new app -name="Sample1" -package="mycompany.apps"
    
{{< /highlight >}}
{{% break %}}

# Goals
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Goal</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>1. Templated</strong></td>
        <td>Template out different project types for fast setup</td>
    </tr>
    <tr>
        <td><strong>2. Consistency</strong> </td>
        <td>Create consistent/standardized applications</td>                     
    </tr>
    <tr>
        <td><strong>3. Extensible</strong></td>
        <td>Extend the default generator with new packages/templates</td>
    </tr>
</table>

{{% break %}}

# Status
This component is currently stable with planned future features<br/>
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Feature</strong></td>
        <td><strong>Status</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>Questions</strong></td>
        <td>Future</td>
        <td>Support for questions/answers</td>
    </tr>
    <tr>
        <td><strong>Scripting</strong></td>
        <td>Future</td>
        <td>Support for scripting via either Kotlin Scripting or Gradle</td>
    </tr>
    <tr>
        <td><strong>Settings</strong></td>
        <td>Future</td>
        <td>Additional settings ( e.g. to set version of Kotlin, Slate Kit, Java)</td>
    </tr>
    <tr>
        <td><strong>Git</strong></td>
        <td>Future</td>
        <td>Downloadable templates from Git or other external sources</td>
    </tr>
</table>
{{% section-end mod="arch/generators" %}}

# Install
You can install the slatekit application/command line tool from {{% sk-link href="slatekit" text="slatekit" %}}
{{< highlight groovy >}}
    // For mac,nix
    slatekit
    
    // For windows
    slatekit.bat 

    slatekit -version
    slatekit -help

{{< /highlight >}}
{{% section-end mod="arch/generators" %}}

# Sources {#sources}
{{% sk-module 
    name="Generator"
    package="slatekit.generator"
    jar="slatekit.generator.jar"
    git="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-generator"
    gitModule="slatekit-generator"
    url="arch/generator"
    bintray="slatekit-generator"
    uses="slatekit.results, slatekit.common"
    exampleUrl=""
    exampleFileName="Example_Generator.kt"
%}}

{{% section-end mod="arch/generators" %}}

# Guide
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Section</strong></td>
        <td><strong>Component</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>1</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#status">Status</a></strong></td>
        <td>Current status of this component</td>
    </tr>
    <tr>
        <td><strong>2</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#install">Install</a></strong></td>
        <td>Installation instructions and references to sources</td>
    </tr>
    <tr>
        <td><strong>3</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#requires">Requires</a></strong></td>
        <td>Lists all the Slate Kit and third-party dependencies</td>
    </tr>
    <tr>
        <td><strong>4</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#app">APP</a></strong></td>
        <td>Generate a new console application</td>
    </tr>
    <tr>
        <td><strong>5</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#api">API</a></strong></td>
        <td>Generate a new HTTP API</td>
    </tr>
    <tr>
        <td><strong>6</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#cli">CLI</a></strong></td>
        <td>Generate a new console CLI (command line interface) application</td>
    </tr>
    <tr>
        <td><strong>7</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#job">JOB</a></strong></td>
        <td>Generate a new backgroun job</td>
    </tr>
    <tr>
        <td><strong>8</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#lib">LIB</a></strong></td>
        <td>Generate a new reusable library</td>
    </tr>
    <tr>
        <td><strong>9</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#orm">ORM</a></strong></td>
        <td>Generate a new Domain Driven Database/Entites/ORM project</td>
    </tr>
    <tr>
        <td><strong>10</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#orm">Custom</a></strong></td>
        <td>Create custom templates</td>
    </tr>
    <tr>
        <td><strong>11</strong></td>
        <td><strong><a class="url-ch" href="arch/generators#orm">Help</a></strong></td>
        <td>More info and help on the generators</td>
    </tr>
</table>

{{% break %}}

## Setup
Download
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Step</strong></td>
        <td><strong>Sample</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>Download</strong></td>
        <td><strong>~/tools/slatekit</strong></td>
        <td>Download tools to your local folder </td>
    </tr>
    <tr>
        <td><strong>Path</strong></td>
        <td><strong>~/tools/slatekit</strong></td>
        <td>Optional: Modify your path and include the directory where slatekit scripts are located.</td>
    </tr>
</table>

{{% break %}}


## Package
Project templates
{{< highlight json >}}
    
    {
        "name": "app",
        "description": "Generates a slatekit.app console application",
        "version": "1.0.0",
        "url": "https://www.slatekit.com",
        "contact": "https://www.slatekit.com",
        "keywords": ["slatekit", "app"],
        "type": "application",
        "actions": [
            { "type": "copy", "doc": "Build", "source": "/build.txt"   , "target": "/build.gradle"                },
            { "type": "copy", "doc": "Build", "source": "/settings.txt", "target": "/settings.gradle"             },
            { "type": "copy", "doc": "Code" , "source": "/src/Run.txt" , "target": "/src/main/kotlin/${app.packagePath}/Run.kt" },
            { "type": "copy", "doc": "Code" , "source": "/src/App.txt" , "target": "/src/main/kotlin/${app.packagePath}/App.kt" }
        ],
        "dependencies": {
        "common": "1.0.0",
        "conf": "1.0.0"
    }
}
     
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}

## Usage {#usage}
You can generate a new project by running slatekit with the appropriate commands. Sample structure is shown below
{{< highlight bash >}}
    # name = name of application / folder name
    # package = the kotlin package name for the app
    slatekit new app -name="Sample1" -package="mycompany.apps"
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}


## APP {#app}
<p>
{{% sk-component-app %}}
You can create a app quickly using the Slate Kit command line executable with the following inputs.
Also refer to the {{% sk-link href="Example_App.html" text="Example_App.kt" %}}.
</p>
{{< highlight bash >}}
    
    slatekit new app -name="Sample1" -package="mycompany.apps"
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}


## API {#api}
<p>
{{% sk-component-app %}}
You can create a app quickly using the Slate Kit command line executable with the following inputs.
Also refer to the {{% sk-link href="Example_App.html" text="Example_App.kt" %}}.
</p>
{{< highlight bash >}}
    
    slatekit new api -name="Sample1" -package="mycompany.apps"
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}


## CLI {#cli}
<p>
{{% sk-component-app %}}
You can create a app quickly using the Slate Kit command line executable with the following inputs.
Also refer to the {{% sk-link href="Example_App.html" text="Example_App.kt" %}}.
</p>
{{< highlight bash >}}
    
    slatekit new cli -name="Sample1" -package="mycompany.apps"
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}


## JOB {#job}
<p>
{{% sk-component-app %}}
You can create a app quickly using the Slate Kit command line executable with the following inputs.
Also refer to the {{% sk-link href="Example_App.html" text="Example_App.kt" %}}.
</p>
{{< highlight bash >}}
    
    slatekit new job -name="Sample1" -package="mycompany.apps"
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}

## LIB {#lib}
<p>
{{% sk-component-app %}}
You can create a app quickly using the Slate Kit command line executable with the following inputs.
Also refer to the {{% sk-link href="Example_App.html" text="Example_App.kt" %}}.
</p>
{{< highlight bash >}}
    
    slatekit new job -name="Sample1" -package="mycompany.apps"
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}

## ORM {#orm}
<p>
{{% sk-component-app %}}
You can create a app quickly using the Slate Kit command line executable with the following inputs.
Also refer to the {{% sk-link href="Example_App.html" text="Example_App.kt" %}}.
</p>
{{< highlight bash >}}
    
    slatekit new orm -name="Sample1" -package="mycompany.apps"
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}

## Custom {#custom}
<p>
The command line generator can be extended with custom templates.
You have to create various configuration files and instructions similar to the existing ones.
Refer to a sample configuration for the <strong>App</strong> for more info
</p>
{{< highlight bash >}}
    
    slatekit new my_service_template -name="Service1" -package="mycompany.services"
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}

## Help
<p>
You can also get help on the command for each project type. Run the following commands
</p>
{{< highlight bash >}}
    
    slatekit new app -help
    slatekit new api -help
    slatekit new cli -help
    slatekit new job -help
    slatekit new lib -help
    slatekit new orm -help
    
{{< /highlight >}}
{{% section-end mod="arch/generators" %}}

<script>
    var archComponent = {
        name: "Generators",
        page: "arch/generators",
        icon: "assets/media/img/white/prototype.png",
        menu: {
            mode: "normal",
            useTemplate:true,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"Setup" , anchor: "#setup" },
                        { name:"Package" , anchor: "#package" },
                        { name:"Variables" , anchor: "#vars" },
                        { name:"Usage" , anchor: "#usage" },
                        { name:"App" , anchor: "#app" },
                        { name:"API" , anchor: "#api"  },
                        { name:"CLI" , anchor: "#cli"  },
                        { name:"Job" , anchor: "#job"  },
                        { name:"Lib" , anchor: "#lib"  },
                        { name:"ORM" , anchor: "#orm"  },
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>



