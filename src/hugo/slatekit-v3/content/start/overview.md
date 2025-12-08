---
title: Overview
date: 2019-03-17T13:02:30-04:00
section_header: Overview
---

# About
  <p>
      {{% sk-name %}} is a <strong><a class="url-ch" href="http://www.kotlinlang.org">Kotlin</a></strong> Tool-Kit, a simple, light-weight framework of modular libraries to build <strong>Apps, APIs, CLIs, Jobs</strong>, and more for <strong>Start-ups, Personal projects, and SMBs</strong> ( small-medium sized businesses ). These libraries can be used for both Server and Android and there are modules for the server that abstract infrastructure ( Queues, Files, SMS, Emails, Alerts ) with integrations for <strong>AWS</strong> ( SQS, S3 ), Twilio ( SMS ), SendGrid ( Email ), Slack ( Alerts ) and more. Kotlin Multi-platform support is planned as a future state.
  </p>
{{% break %}}

# Goals
<p>
  The {{% sk-name %}} framework was originally designed for and extracted from a sizable and sophisticated production Mobile Startup with a Server backend. 
  {{% sk-name %}} is a <strong>Kotlin first</strong> framework architected with the explicit goals and purposes below in mind:
</p>
<table class="table table-bordered table-striped">
    <tr><td><img src="assets/media/img/white/module.png"     width="50" /><td><strong>Light</strong></td><td>Designed with simplicity in mind, <strong>modular components that are light-weight</strong>.</td></tr>
    <tr><td><img src="assets/media/img/ext/kotlin.jpeg"      width="50" /><td><strong>Kotlin</strong></td><td><strong>100% Kotlin</strong>, emphasis on functional, immutable code (pragmatic: without pure FP, no category-theory)</td></tr>
    <tr><td><img src="assets/media/img/white/share.png"      width="50" /><td><strong>Shared</strong></td><td>Full-Stack for <strong>Android and Server</strong>, resonably light-weight and suitable for both.</td></tr>
    <tr><td><img src="assets/media/img/white/nodes.png"      width="50" /><td><strong>Platforms</strong></td><td>Long-term goals of making this support Kotlin <strong>Multi-Platform</strong> ( Javascript, iOS )</td></tr>
    <tr><td><img src="assets/media/img/white/money.png"      width="50" /><td><strong>Costs</strong></td><td><strong>Reducing costs</strong> with rapid development, full-stack / sharable code for both Server and Android.</td></tr>
    <tr><td><img src="assets/media/img/white/print.png"      width="50" /><td><strong>Guides</strong></td><td>Easy to follow <strong>docs, examples, guides</strong>, and blogs and videos coming soon</td></tr>
    <tr><td><img src="assets/media/img/white/cloud_sync.png" width="50" /><td><strong>Portable</strong></td><td>Reasonable <strong>abstractions</strong> of Cloud components for portability between cloud providers ( currently only AWS )</td></tr>
</table>
{{% section-end mod="start/overview" %}}

# Uses
<p>
  {{% sk-name %}} can be used to quickly build well structured and scalable architecture and applications for different target groups.
</p>
<table class="table table-bordered table-striped">
    <tr><td><img src="assets/media/img/white/users.png"     width="50" /></td><td><strong>Personal</strong></td><td>Learn Kotlin, functional programming, for self-improvement or side projects</td></tr>
    <tr><td><img src="assets/media/img/white/prototype.png" width="50" /></td><td><strong>Startups</strong></td><td> Start with a strong base architecture to quickly build high-quality MVPs (Minimum Viable Products) that can scale</td></tr>
    <tr><td><img src="assets/media/img/white/mobile.png"    width="50" /></td><td><strong>Mobile</strong></td><td> Set up the back-end for your mobile apps. Use Kotlin code and libraries for both Server and Android</td></tr>
    <tr><td><img src="assets/media/img/white/studio.png"    width="50" /></td><td><strong>SMB</strong></td><td>For small to medium sized businesses, build backend applications with pre-built application/service templates/components</td></tr>
</table>
{{% section-end mod="start/overview" %}}


# Tech
<p>
  {{% sk-name %}} is built for the <strong>JVM</strong> using <strong>100% Kotlin</strong> so that many modules can be used for both <strong>Server and Android ( and soon Multi-Platofrm)</strong>. There are also thin abstractions over some infrastructure services such as Files, queues, docs. Currently, only AWS implementations are available for the infrastructure abstractions. However, in the future, support for Google and Azure cloud services may be implemented. Other services are used directly.
</p>
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Infrastructure</strong></td>
        <td><strong>-</strong></td>
        <td><strong>Usage</strong></td>
        <td>Provider</td>
    </tr>
    <tr>
        <td><strong>Files</strong></td>
        <td><img src="assets/media/img/white/folders.png" width="50" /></td>
        <td><strong>Abstracted</strong></td>
        <td>AWS S3 ( see {{% sk-link-arch page="files" name="files" %}} )</td>
    </tr>
    <tr>
        <td><strong>Queues</strong></td>
        <td><img src="assets/media/img/white/queue.png" width="50" /></td>
        <td><strong>Abstracted</strong></td>
        <td>AWS SQS ( see {{% sk-link-arch page="queues" name="queues" %}} )</td>
    </tr>
    <tr>
        <td><strong>Documents</strong></td>
        <td><img src="assets/media/img/white/print.png" width="50" /></td>
        <td><strong>Abstracted</strong></td>
        <td>AWS Dynamo ( see {{% sk-link-arch page="docs" name="docs" %}} )</td>
    </tr>
    <tr>
        <td><strong>Entities</strong></td>
        <td><img src="assets/media/img/white/layers.png" width="50" /></td>
        <td><strong>Abstracted</strong></td>
        <td>Support for MySql ( see {{% sk-link-arch page="data" name="data" %}} docs )PostGres & Mongo coming soon</td>
    </tr>
    <tr>
        <td><strong>APIs</strong></td>
        <td><img src="assets/media/img/white/webapi.png" width="50" /></td>
        <td><strong>Direct Usage</strong></td>
        <td>Ktor ( from JetBrains ) - used as the Http server using our Universal API approach</td>
    </tr>
    <tr>
        <td><strong>Http Client </strong></td>
        <td><img src="assets/media/img/white/webapi.png" width="50" /></td>
        <td><strong>Partially Abstracted</strong></td>
        <td>OkHttp </td>
    </tr>
    <tr>
        <td><strong>Metrics</strong></td>
        <td><img src="assets/media/img/white/diagnostic.png" width="50" /></td>
        <td><strong>Partially Abstracted</strong></td>
        <td>Micrometer.io ( see {{% sk-link-arch page="tracking" name="tracking" %}} )</td>
    </tr>
    <tr>
        <td><strong>Logs</strong></td>
        <td><img src="assets/media/img/white/error.png" width="50" /></td>
        <td><strong>Abstracted</strong></td>
        <td>Logback ( see {{% sk-link-util page="logger" name="logger" %}} )</td>
    </tr>
    <tr>
        <td><strong>SMS</strong></td>
        <td><img src="assets/media/img/white/mobile.png" width="50" /></td>
        <td><strong>Abstracted</strong></td>
        <td>Twilio ( see {{% sk-link-arch page="sms" name="sms" %}} )</td>
    </tr>
    <tr>
        <td><strong>Email</strong></td>
        <td><img src="assets/media/img/white/email.png" width="50" /></td>
        <td><strong>Abstracted</strong></td>
        <td>SendGrid ( see {{% sk-link-arch page="email" name="email" %}} )</td>
    </tr>
    <tr>
        <td><strong>Alerts</strong></td>
        <td><img src="assets/media/img/white/speaker.png" width="50" /></td>
        <td><strong>Abstracted</strong></td>
        <td>Slack Web Hooks ( see {{% sk-link-arch page="alerts" name="alerts" %}} )</td>
    </tr>
    <tr>
        <td><strong>Dates</strong></td>
        <td><img src="assets/media/img/white/timer.png" width="50" /></td>
        <td><strong>Aliased</strong></td>
        <td>ThreeTen BP is used for Full-Stack / Android alignment</td>
    </tr>
</table>
{{% section-end mod="start/overview" %}}


# Modules
These are the main architecture components available in {{% sk-name %}}.
{{% sk-modules %}}
{{% section-end mod="start/overview" %}}

# Design
The architecture of the {{% sk-name %}} can be visualized in this high-level diagram of the modules and how they are logical organized.
<div class="container">
    <div class="row">
        <div class="col-lg-10 flex">
            <img src="assets/app/media/arch/kiit-overview.png" class="rounded mx-auto d-block img-fluid" />
        </div>
    </div>
</div>
{{% section-end mod="start/overview" %}}


## Philosophy
{{% sk-philosophy %}}
{{% section-end mod="start/overview" %}}


## Releases
{{% sk-release-cycle %}} 
{{% section-end mod="start/overview" %}}


## Timeline
{{% sk-timeline %}}
{{% section-end mod="start/overview" %}}


## Security
Security details of the various modules will be coming soon and available/documented within each applicable module such as App, CLI, Jobs, APIs, Queues, etc. Generally speaking, most modules security revolve around protecting sensitive configuration settings, data during transmission and authentication / authorization for runnable services such as the App, CLI, APIs.
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Type</strong></td>
        <td><strong>Security</strong></td>
        <td><strong>Note(s)</strong></td>
    </tr>
    <tr>
        <td>{{% sk-link-util page="conf" name="Conf" %}}</td>
        <td>Config settings</td>
        <td>Settings can be encrypted or loaded from env vars</td>
    </tr>
    <tr>
        <td>{{% sk-link-arch page="files" name="Files" %}}</td>
        <td>AWS S3</td>
        <td>Also refer to AWS S3 docs</td>
    </tr>
    <tr>
        <td>{{% sk-link-arch page="queues" name="Queues" %}}</td>
        <td>AWS SQS</td>
        <td>Also refer to AWS SQS docs</td>
    </tr>
    <tr>
        <td>{{% sk-link-arch page="app" name="App" %}}</td>
        <td>Runnable App</td>
        <td>See module docs for more info</td>
    </tr>
    <tr>
        <td>{{% sk-link-arch page="apis" name="APIs" %}}</td>
        <td>Web/Http APIs</td>
        <td>See module docs for more info</td>
    </tr>
    <tr>
        <td>{{% sk-link-arch page="cli" name="CLI" %}}</td>
        <td>CLI</td>
        <td>See module docs for more info</td>
    </tr>
    <tr>
        <td>{{% sk-link-arch page="data" name="Data" %}}</td>
        <td>Sql</td>
        <td>See module docs for more info</td>
    </tr>
</table>
{{% section-end mod="start/overview" %}}

<script>
    var archComponent = {
        name: "Overview",
        page: "start/overview",
        icon: "assets/media/img/white/desktop.png",
        menu: {
            mode: "normal",
            useTemplate:false,
            sections: [
                {
                    name: "Overview",
                    items: [
                        { name:"About"    , anchor: "#about" },
                        { name:"Goals"       , anchor: "#goals"  },
                        { name:"Uses"        , anchor: "#uses" },
                        { name:"Tech"        , anchor: "#tech"  },
                        { name:"Modules"     , anchor: "#modules"  },
                        { name:"Design"      , anchor: "#design"  },
                        { name:"Philosophy"  , anchor: "#philosophy"  },
                        { name:"Releases"    , anchor: "#releases"  },
                        { name:"Timeline"    , anchor: "#timeline"  },
                        { name:"Security"    , anchor: "#security"  },
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>


