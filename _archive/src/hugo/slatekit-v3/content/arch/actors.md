---
title: "Actors"
date: 2019-11-17T23:55:42-05:00
section_header: Actors
---

# Overview
The {{% sk-name %}} Actors component is a micro actor library with support for **pausable** actors 
to provide the ability to gracefully **start, stop, pause, resume** actors.
{{% break %}}
{{% break %}}

# Diagram
A high-level diagram of the concepts in this component
{{% break %}}
<img src="assets/app/media/arch/mod-actors.png" class="rounded mx-auto d-block img-fluid" />
{{% break %}}

# Goals
Docs coming soon

{{% break %}}


# Status
This component is currently stable
Docs coming soon

{{% section-end mod="arch/actors" %}}

# Install
{{< highlight groovy >}}

    repositories {
        // other repositories
        maven { url  "http://dl.bintray.com/codehelixinc/slatekit" }
    }

    dependencies {
        // other dependencies ...

        compile 'com.slatekit:slatekit-actors:1.16.0'
    }

{{< /highlight >}}
{{% section-end mod="arch/actors" %}}

# Sources {#sources}
{{% sk-module 
    name="Actors"
    package="slatekit.actors"
    jar="slatekit.actors.jar"
    git="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-actors"
    gitModule="slatekit-actors"
    url="arch/actors"
    bintray="slatekit-actors"
    uses=""
    license=""
    exampleUrl=""
    exampleFileName="Example_Actors.kt"
%}}

{{% section-end mod="arch/jobs" %}}

# Example {#example}
{{< highlight kotlin >}}
     
    // sample coming soon

{{< /highlight >}}

{{% section-end mod="arch/actors" %}}


# Concepts
Docs coming soon

{{% section-end mod="arch/actors" %}}

# Guide

Docs coming soon

{{% section-end mod="arch/actors" %}}

<script>
    var archComponent = {
        name: "Actors",
        page: "arch/actors",
        icon: "assets/media/img/white/gears.png",
        menu: {
            mode: "normal",
            useTemplate:true,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"Setup" , anchor: "#setup" },
                        { name:"Register" , anchor: "#register" },
                        { name:"Usage" , anchor: "#usage" },
                        { name:"Cycle" , anchor: "#cycle" },
                        { name:"Types" , anchor: "#types" },
                        { name:"Events" , anchor: "#events"  },
                        { name:"Workers" , anchor: "#workers"  },
                        { name:"Stats" , anchor: "#stats"  },
                        { name:"Load" , anchor: "#load"  }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>

