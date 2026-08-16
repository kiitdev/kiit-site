---
title: Start
date: 2019-03-17T13:02:30-04:00
section_header: Start
---

# Overview
{{% sk-name %}} is built in 100% Kotlin and depends on Java. The {{% sk-name %}} CLI generates new projects using the Gradle build tool. <br/>
If you are new to Kotlin, refer to <strong><a class="url-ch" href="http://www.kotlinlang.org">Kotlin</a></strong> for more info. 

{{% break %}}


# Required
<p>Installation of Java, Kotlin, Gradle and {{% sk-name %}} is fairly easy. We recommend the following installation steps and centralized location for simplicity.
</p>
<table class="table table-bordered table-striped">
    <tr class="">
        <td><strong>Tech</strong></td>
        <td><strong>Required</strong></td>
        <td><strong>Version</strong></td>
        <td><strong>Instructions</strong></td>
    </tr>
    <tr>
        <td><a class="url-ch" href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html">Java</a></td>
        <td><strong>Required</strong></td>
        <td>>= 8</td>
        <td>https://www.java.com/en/download/help/download_options.html
        </td>
    </tr>
    <tr>
        <td><a class="url-ch" href="https://gradle.org/install">Gradle</a></td>
        <td><strong>Required</strong></td>
        <td>>= 6.7</td>
        <td>https://gradle.org/install/
        </td>
    </tr>
    <tr>
        <td><a class="url-ch" href="https://www.jetbrains.com/idea/">IntelliJ</a></td>
        <td>Recommended</td>
        <td>>= 2020.2</td>
        <td>https://www.jetbrains.com/idea/
        </td>
    </tr>
</table>

{{% break %}}


# CLI
The {{% sk-name %}} **CLI** is a command line tool ( based on **HomeBrew on Mac OS** ) that can be used to create projects
{{< highlight bash >}}
     
    # Note: install may take a while on Mac OS Catalina 
    # See notes/issues below

    brew tap slatekit/kiit
    brew install kiit
    
{{< /highlight >}}
<div class="alert alert-warning" role="alert">
    You may experience some issues with the install, consider the following<br/>
    <strong>1:</strong> Ensure System Preferences -> security -> privacy -> full disk access -> iterm2 ( of what ever terminal you use )<br/>
    <strong>2:</strong> <a href="https://discussions.apple.com/thread/251258165">Slow HomeBrew post install on Mac OS Catalina ( based on thread below )</a><br/>
    <strong>3:</strong> <a href="https://discourse.brew.sh/t/brew-install-very-slow-pauses-for-long-period-while-executing-usr-bin-sandbox-exec-in-post-install/7423">The install may be very slow with MacOS Catalina</a>
</div>
{{% sk-link-cli %}}

{{% break %}}


# Create
You can create your first app by running the command below which will create a new console application 
with support for :


<table class="table table-bordered table-striped">
    <tr>
        <td><strong>args</strong></td>
        <td>command line args ( -env=dev )</td>
    </tr>
    <tr>
        <td><strong>envs</strong></td>
        <td>environments ( local, dev, qat, uat, pro )</td>
    </tr>
    <tr>
        <td><strong>confs</strong></td>
        <td>configuration files ( per environment and inheritable from a base config )</td>
    </tr>
    <tr>
        <td><strong>logs</strong></td>
        <td>logging support ( using logback )</td>
    </tr>
    <tr>
        <td><strong>help</strong></td>
        <td>help usage and more</td>
    </tr>
</table>

 This is just 1 type of project you can create.

{{< highlight bash >}}
    
    # Generate new app ( into current directory )
    :> kiit new app -name="Sample1" -packageName="mycompany.apps"

    #  navigate into the generated app 
    :> cd Sample1

    # Build and run
    :> gradle run
    
{{< /highlight >}}

{{% break %}}


# Generators
You can create several different project types using the generator, these include CLIs, APIs, Jobs, and more to come.
{{< highlight bash >}}
    
    kiit new app -name="SampleApp1" -packageName="company1.apps"
    kiit new api -name="SampleAPI1" -packageName="company1.apis"
    kiit new cli -name="SampleCLI1" -packageName="company1.apps"
    kiit new job -name="SampleJob1" -packageName="company1.jobs"
    kiit new env -name="SampleApp2" -packageName="company1.apps"
    
{{< /highlight >}}
<div class="alert alert-warning" role="alert">
    <strong>Tip:</strong> See the <a href="/start/generators">Generators</a> page for more info on using the {{% sk-name %}} CLI tool and info on the project types.
</div>
{{% break %}}

# Samples
There are also several sample applications available in git at {{% sk-link-src component="apps/kotlin/slatekit-samples" filepath="samples" name="Samples" %}}
<div class="alert alert-info" role="alert">
    The <a href="/start/generators">Generators</a> are based on these Sample projects which are kept up to date with latest releases.
</div>
{{% break %}}


# Apps
There are various runnable application types you can create with {{% sk-name %}}. See the links below for more docs and guides on how to get started with them.
<table class="table table-bordered table-striped">
    <tr>
    <td class="text-center">
        {{% sk-icon name="desktop" %}}
    </td>
    <td><strong><a class="url-ch" href="/arch/app">App</a></strong></td>
    <td><img src="https://img.shields.io/badge/2.8.0-version-blue" /></td>
    <td><span class="badge badge-light">Server</span></td>
    <td><img src="https://img.shields.io/badge/license-Apache-orange.svg?style=flat" /></td>
    <td>Runnable App Template</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/arch/cli"><img src="assets/media/img/white/terminal.png" width="40" alt="" /></a></td>
    <td><strong><a class="url-ch" href="/arch/cli">CLI</a></strong></td>
    <td><img src="https://img.shields.io/badge/2.8.0-version-blue" /></td>
    <td><span class="badge badge-light">Server</span></td>
    <td><img src="https://img.shields.io/badge/license-Apache-orange.svg?style=flat" /></td>
    <td>Command Line Interface</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/arch/apis"><img src="assets/media/img/white/webapi.png" width="40" alt="" /></a></td>
    <td><strong><a class="url-ch" href="/arch/apis">Server</a></strong></td>
    <td><img src="https://img.shields.io/badge/2.8.0-version-blue" /></td>
    <td><span class="badge badge-light">Server</span></td>
    <td><img src="https://img.shields.io/badge/license-Apache-orange.svg?style=flat" /></td>
    <td>Http Server ( using Ktor ) and our Universal APIs</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/arch/apis"><img src="assets/media/img/white/webapi.png" width="40" alt="" /></a></td>
    <td><strong><a class="url-ch" href="/arch/apis">API</a></strong></td>
    <td><img src="https://img.shields.io/badge/2.8.0-version-blue" /></td>
    <td><span class="badge badge-light">Server / Console</span></td>
    <td><img src="https://img.shields.io/badge/license-Apache-orange.svg?style=flat" /></td>
    <td>Universal APIs</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/arch/jobs"><img src="assets/media/img/white/gears.png" width="40" alt="" /></a></td>
    <td><strong><a class="url-ch" href="arch/jobs">Jobs</a></strong></td>
    <td><img src="https://img.shields.io/badge/2.8.0-version-blue" /></td>
    <td><span class="badge badge-light">Android / Server</span></td>
    <td><img src="https://img.shields.io/badge/license-Apache-orange.svg?style=flat" /></td>
    <td>Pausable Background jobs/queues library</td>
  </tr>
</table>
{{% break %}}


<script>
    var archComponent = {
        name: "Start",
        page: "start/start",
        icon: "assets/media/img/white/gears.png",
        menu: {
            mode: "normal",
            useTemplate:false,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"Overview"       , anchor: "#overview"  },
                        { name:"Required"       , anchor: "#required"  },
                        { name:"CLI"            , anchor: "#cli"       },
                        { name:"Create"         , anchor: "#create"    },
                        { name:"Generators"     , anchor: "#generators"},
                        { name:"Samples"        , anchor: "#samples"   },
                        { name:"Apps"           , anchor: "#apps"   }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>



