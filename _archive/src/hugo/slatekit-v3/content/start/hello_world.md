---
title: Hello World
date: 2019-03-17T13:02:30-04:00
section_header: Hello World
---

# Overview
Slate Kit comes with a command line project generation tool which is available below. You can create a new app quickly using the commands below.
{{% sk-link-cli %}}

{{% break %}}


# Install
You can easily install the Slate Kit CLI to create projects, using HomeBrew on Mac OS
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

{{% break %}}


# Hello World
You can create your first app by running the command below which will create a new console application 
with support for command line args, environments, confs, logging, help usage and more. This is just 1 type of project you can create.

{{< highlight bash >}}
    
    :> slatekit new app -name="Sample1" -packageName="mycompany.apps"
    :> cd MyApp1
    :> gradle build
    :> gradle run
    
{{< /highlight >}}

{{% break %}}


# Generators
You can create several different project types using the generator, these include CLIs, APIs, Jobs, and more to come.
{{< highlight bash >}}
    
    slatekit new app -name="MyApp1" -packageName="company1.apps"
    slatekit new api -name="MyAPI1" -packageName="company1.apis"
    slatekit new cli -name="MyCLI1" -packageName="company1.apps"
    slatekit new job -name="MyJob1" -packageName="company1.jobs"
    slatekit new env -name="MyApp2" -packageName="company1.apps"
    
{{< /highlight >}}
<div class="alert alert-warning" role="alert">
    <strong>Tip:</strong> See the <a href="/start/generators">Generators</a> page for more info on using the Slate Kit CLI tool and info on the project types.
</div>
{{% break %}}



