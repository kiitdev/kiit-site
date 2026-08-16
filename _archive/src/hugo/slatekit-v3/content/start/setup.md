---
title: Setup
date: 2019-03-17T13:02:30-04:00
section_header: Setup
---

# Overview
Slate Kit can be setup fairly easily. Most of the dependencies are on Java / Gradle. Also refer to <strong><a class="url-ch" href="http://www.kotlinlang.org">Kotlin</a></strong> for more info. 

{{% break %}}


# Required
<p>Installation of Java, Kotlin, Gradle and Slate Kit is fairly easy. We recommend the following installation steps and centralized location for simplicity.
</p>
<table class="table table-bordered table-striped">
    <tr class="">
        <td><strong>Tech</strong></td>
        <td><strong>Version</strong></td>
        <td><strong>Instructions</strong></td>
    </tr>
    <tr>
        <td><a class="url-ch" href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html">Java</a></td>
        <td>1.8</td>
        <td><div>
                <ul>
                    <li>Install java 1.8.0 to example: <strong>
                    /usr/bin/java or C:\tools\Java\jdk1.8.0</strong></li>
                    <li>Add home env variable: <strong>JAVA_HOME=C:\tools\Java\jdk1.8.0 ( Windows )</strong></li>
                </ul>
            </div>
        </td>
    </tr>
    <tr>
        <td><a class="url-ch" href="https://kotlinlang.org/">Kotlin</a></td>
        <td>>= 1.3.21</td>
        <td>
            <div>
                <ul>
                    <li>Install Kotlin via the gradel plugin</li>
                    <li>Add <strong>"org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.21"</strong> to your build script</li>
                </ul>
            </div>
        </td>
    </tr>
    <tr>
        <td><a class="url-ch" href="https://gradle.org/install">Gradle</a></td>
        <td>>= 3.5</td>
        <td>
            <div>
                <ul>
                    <li>Install Gradle e.g. <strong>/usr/local/bin/gradle or c:\tools\gradle ( Windows )</strong></li>
                    <li>Add <strong>/usr/local/bin/gradle or C:\tools\gradle\bin ( Windows)</strong> to your system PATH variable.</li>
                    <li>You can also use the gradle-wrapper.jar if you are familiar with gradle</li>
                </ul>
            </div>
        </td>
    </tr>
</table>

{{% break %}}


# Suggested
<p>The software below is recommended but not required. 
Slate Kit supports MySql with support for PostGres and Sql Server coming later. Having the MySql Java Connector will 
help with the sample apps and is also needed for the ORM ( entities ).
</p>
<table class="table table-bordered table-striped">
    <tr class="">
        <td><strong>Tech</strong></td>
        <td><strong>Version</strong></td>
        <td><strong>About</strong></td>
    </tr>
    <tr>
        <td><a class="url-ch" href="https://www.jetbrains.com/idea/download/">IntelliJ</a></td>
        <td>Refer to JetBrains</td>
        <td>IDE</td>
    </tr>
</table>

{{% break %}}


# Slate Kit CLI
<p>There is a Slate Kit CLI ( command line interface ) application for Mac ( integrated with HomeBrew ) that serves as a project creator.
    <br/>See {{% sk-link href="start/generators" text="Generators" %}} for more info
</p>
{{% break %}}


<script>
    var archComponent = {
        name: "Setup",
        page: "start/setup",
        icon: "assets/media/img/white/gears.png",
        menu: {
            mode: "normal",
            useTemplate:false,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"Overview"       , anchor: "#overview" },
                        { name:"Required"       , anchor: "#required"  },
                        { name:"Suggested"      , anchor: "#suggested"  },
                        { name:"Slate Kit CLI"  , anchor: "#slate kit cli"  }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>



