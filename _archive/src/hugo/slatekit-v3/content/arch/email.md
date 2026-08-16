---
title: "Email"
date: 2019-11-17T23:55:42-05:00
section_header: Email
---

# Overview
The Email component is an abstraction of an Email Service with support for simple templates and a default implementation for sending emails using **SendGrid**. 


# Status
This component is currently **stable**. Following limitations, current work, planned features apply.
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Feature</strong></td>
        <td><strong>Status</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td>**Templates**</td>
        <td>Upcoming</td>
        <td>Enhanced templating, possibly leveraging existing open-source templating systems.</td>
    </tr>
    <tr>
        <td>**Attachments**</td>
        <td>Upcoming</td>
        <td>Support for adding attachments</td>
    </tr>
    <tr>
        <td>**HTML**</td>
        <td>Upcoming</td>
        <td>Improved HTML support</td>
    </tr>
</table>
{{% section-end mod="arch/email" %}}

# Install
{{< highlight groovy >}}

    repositories {
        // other repositories
        maven { url  "http://dl.bintray.com/codehelixinc/slatekit" }
    }

    dependencies {
        // other dependencies ...

        compile 'com.slatekit:slatekit-notifications:1.0.0'
    }

{{< /highlight >}}
{{% section-end mod="arch/email" %}}

# Sources {#sources}
{{% sk-module 
    name="Email"
    package="slatekit.notifications"
    jar="slatekit.notifications.jar"
    git="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-notifications"
    gitModule="slatekit-notifications"
    url="arch/email"
    bintray="slatekit-notifications"
    uses="slatekit.results, slatekit.core, slatekit.notifications"
    exampleUrl=""
    exampleFileName="Example_Email.kt"
%}}
{{% section-end mod="arch/email" %}}

# Imports {#imports}
Refer to {{% sk-link-example file="Example_Email.kt" name="Example_Email.kt" %}} for all imports.
{{< highlight kotlin >}}
         
    // Required
    import slatekit.notifications.email.EmailMessage
    import slatekit.notifications.email.EmailService
    import slatekit.notifications.email.SendGrid

    // For Examples ( templated messages )
    import slatekit.common.templates.Template
    import slatekit.common.templates.TemplatePart
    import slatekit.common.templates.Templates
     
{{< /highlight >}}

{{% section-end mod="arch/email" %}}

# Setup {#setup}
{{< highlight kotlin >}}
        
    // Setup 1: Getting Api key/login info from config
    // Load the config file from slatekit directory in user_home directory
    // e.g. {user_home}/slatekit/conf/sms.conf
    // NOTE: It is safer/more secure to store config files there.
    val conf = Config.of("~/.slatekit/conf/email.conf")
    val apiKey1 = conf.apiLogin("email")

    // Setup 2: Get the api key either through conf or explicitly
    val apiKey2 = ApiLogin("17181234567", "ABC1234567", "password", "dev", "sendgrid-email")

    // Setup 3a: Setup the email service ( basic ) with api key
    val apiKey = apiKey1 ?: apiKey2
    val emailService1 = SendGrid(apiKey.key, apiKey.pass, apiKey.account)

    // Setup 3b: Setup the sms service with support for templates
    val templates = Templates.build(
                templates = listOf(
                        Template("email_welcome", Uris.readText("~/slatekit/templates/email_welcome.txt") ?: ""),
                        Template("email_pass", """
                         Hi @{user.name},

                        <p>
                        Your code for @{app.name} is @{app.code}.
                        </p>

                        Regards,
                        @{app.from}
                        @{app.tagline}
                     """.trimIndent())
                ),
                subs = listOf(
                        "app.name" to { s: TemplatePart -> "My App" },
                        "app.from" to { s: TemplatePart -> "My App Team" },
                        "app.tagline" to { s:TemplatePart -> "My App tagline" }
                )
        )
    val emailService2 = SendGrid(apiKey.key, apiKey.pass, apiKey.account, templates)
    val email: EmailService = emailService2

{{< /highlight >}}

{{% section-end mod="arch/email" %}}

# Usage {#usage}
{{< highlight kotlin >}}
        
    // Sample email ( loaded from environment variable for test/example purposes )
    val toAddress = "SLATEKIT_EXAMPLE_EMAIL".env().orElse("user1@gmail.com")

    // Use case 1: Send a confirmation code to the U.S. to verify a users phone number.
    val result1 = email.send(toAddress, "Welcome to MyApp.com 1", "showWelcome!", false)

    // Use case 2: Send using a constructed message object
    email.sendSync(EmailMessage(toAddress, "Welcome to MyApp.com 2", "showWelcome!", false))

    // Use case 3: Send message using one of the setup templates
    val result2 = email.sendTemplate("email_welcome", toAddress, "Welcome to MyApp.com 3", true,
            Vars(listOf(
                    "app.confirmUrl" to "https://www.myapp.com/confirm?abc=123",
                    "user.name" to "user1",
                    "user.email" to "user1@gmail.com",
                    "app.code" to "ABC123"
            )))
     

{{< /highlight >}}
{{% section-end mod="arch/email" %}}

<script>
    var archComponent = {
        name: "Email",
        page: "arch/email",
        icon: "assets/media/img/white/email.png",
        menu: {
            mode: "normal",
            useTemplate:true,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"Imports" , anchor: "#imports" },
                        { name:"Setup" , anchor: "#setup" },
                        { name:"Usage" , anchor: "#usage"  }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>

