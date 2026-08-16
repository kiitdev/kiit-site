---
title: "Sms"
date: 2019-11-17T23:55:42-05:00
section_header: Sms
---

# Overview
The SMS component is an abstraction of Text messaging/sending with a default implementation using **Twilio**. 
{{% break %}}


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
</table>
{{% section-end mod="arch/sms" %}}

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
{{% section-end mod="arch/sms" %}}

# Sources {#sources}
{{% sk-module 
    name="SMS"
    package="slatekit.notifications"
    jar="slatekit.notifications.jar"
    git="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-cloud"
    gitModule="slatekit-notifications"
    url="arch/sms"
    bintray="slatekit-notifications"
    uses="slatekit.results, slatekit.core, slatekit.notifications"
    exampleUrl=""
    exampleFileName="Example_Sms.kt"
%}}

{{% section-end mod="arch/sms" %}}

# Imports {#imports}
Refer to {{% sk-link-example file="Example_Sms.kt" name="Example_Sms.kt" %}} for all imports.
{{< highlight kotlin >}}
         
    // Required
    import slatekit.notifications.sms.SmsMessage
    import slatekit.notifications.sms.SmsService
    import slatekit.notifications.sms.TwilioSms

    // For Examples ( templated messages )
    import slatekit.common.templates.Template
    import slatekit.common.templates.TemplatePart
    import slatekit.common.templates.Templates
     
{{< /highlight >}}

{{% section-end mod="arch/sms" %}}

# Setup
{{< highlight kotlin >}}
        
    // Setup 1: Getting Api key/login info from config
    // Load the config file from slatekit directory in user_home directory
    // e.g. {user_home}/myapp/conf/sms.conf
    // NOTE: It is safer/more secure to store config files there.
    val conf =  Config.of("~/.slatekit/conf/sms.conf")
    val apiKey1 = conf.apiLogin("sms")

    // Setup 2: Get the api key either through conf or explicitly
    val apiKey2 = ApiLogin("17181234567", "ABC1234567", "password", "dev", "twilio-sms")

    // Setup 3a: Setup the sms service ( basic ) with api key
    // Note: The sms service will default to only USA ( you can customize this later )
    val apiKey  = apiKey1 ?: apiKey2
    val sms1 =  TwilioSms(apiKey.key, apiKey.pass, apiKey.account)

    // Setup 3b: Setup the sms service with support for templates
    // Template 1: With explicit text and embedded variables
    // Template 2: Loaded from text file 
    val templates = Templates.build(
      templates = listOf(
         Template("sms_welcome", """
            Hi @{user.name}, Welcome to @{app.name}!
            We have sent a welcome email and account confirmation to @{user.email}.
         """.trimIndent()),
         Template("sms_confirm", Uris.readText("~/slatekit/templates/sms_confirm.txt") ?: "")
      ),
      subs = listOf(
        "app.name" to { s: TemplatePart -> "My App"       },
        "app.from" to { s: TemplatePart -> "My App Team"  }
      )
    )
    val sms2 =  TwilioSms(apiKey.key, apiKey.pass, apiKey.account, templates)

    // Setup 3b: Setup the templates with support for different country codes
    val countries = listOf(CountryCode("US"), CountryCode("FR"))
    val sms3 =  TwilioSms(apiKey.key, apiKey.pass, apiKey.account, templates, countries)
    val sms:SmsService = sms3

{{< /highlight >}}

{{% section-end mod="arch/sms" %}}

# Usage
{{< highlight kotlin >}}
        
    // Sample phone number
    val phone = "SLATEKIT_EXAMPLE_PHONE".env().orElse("1234567890")

    // Use case 1: Send an invitation message to phone "234567890 in the United States.
    sms.send("Invitation to MyApp.com 1", "us", phone)

    // Use case 2: Send using a constructed message object
    sms.sendSync(SmsMessage("Invitation to MyApp.com 2", "us", phone))

    // Use case 3: Send message using one of the templates
    sms.sendTemplate("sms_welcome", "us", phone,
          Vars(listOf(
                  "user.name"  to "user1",
                  "user.email" to "user1@gmail.com"
          )))

{{< /highlight >}}
{{% section-end mod="arch/sms" %}}

<script>
    var archComponent = {
        name: "SMS",
        page: "arch/sms",
        icon: "assets/media/img/white/mobile.png",
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




