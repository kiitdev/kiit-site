---
title: "Updates"
date: 2019-03-17T13:02:30-04:00
section_header: Updates
---


# Status
{{% sk-name %}} is <strong>production ready as of January 2024</strong> and being made generally available. Many components are marked as <strong>stable</strong> and few are still in <strong>beta</strong> and/or only meant for <strong>internal</strong> use.
There is also a <strong>Homebrew installer</strong> for Mac OS for using the {{% sk-name %}} <strong>CLI</strong> tool to create new projects.
{{% sk-link-cli %}}
{{% break %}}


# Releases
You can check the current releases at <a href="https://github.com/slatekit/kiit/releases">Releases</a>
{{% break %}}

# Current
Summary and status of all components available in {{% sk-name %}}. 
{{% sk-modules %}}
{{% break %}}


# Upcoming
Upcoming developments and features
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Item</strong></td>
        <td><strong>Type</strong></td>
        <td><strong>Desc</strong></td>
    </tr>
    <tr>
        <td><strong>1</strong></td>
        <td><strong>Infrastructure</strong></td>
        <td>Additional Infrastructure abstractions and AWS integrations ( Documents, Streams ) </td>
    </tr>
    <tr>
        <td><strong>2</strong></td>
        <td><strong>Linting</strong></td>
        <td>Automated linting via ktlint</td>
    </tr>
    <tr>
        <td><strong>3</strong></td>
        <td><strong>CI/CD</strong></td>
        <td>Automated builds and artifact publishing</td>
    </tr>
    <tr>
        <td><strong>4</strong></td>
        <td><strong>Docker</strong></td>
        <td>Docker integration in gradle builds/projet templates </td>
    </tr>
    <tr>
        <td><strong>5</strong></td>
        <td><strong>Generators</strong></td>
        <td>Improved code and API doc generators</td>
    </tr>
    <tr>
        <td><strong>6</strong></td>
        <td><strong>Gradle</strong></td>
        <td>Update the build system to Kotlin DSL and support for multi-platform.</td>
    </tr>
    <tr>
        <td><strong>7</strong></td>
        <td><strong>Multi-Platform</strong></td>
        <td>Project improvements to support Kotlin Multi-Platform <strong>iOS</strong> and <strong>Javascript</strong></td>
    </tr>
</table>
{{% break %}}

<script>
    var archComponent = {
        name: "Updates",
        page: "start/updates",
        icon: "assets/media/img/white/speaker.png",
        menu: {
            mode: "normal",
            useTemplate:false,
            sections: [
                {
                    name: "Updates",
                    items: [
                        { name:"Status"      , anchor: "#status"    },
                        { name:"Releases"    , anchor: "#releases"  },
                        { name:"Current"     , anchor: "#current"   },
                        { name:"Upcoming"    , anchor: "#upcoming"  }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>

