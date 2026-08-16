---
title: "Queues"
date: 2019-11-17T23:55:42-05:00
section_header: Queues
---

# Overview
The Files component is an abstraction of persistent queues with a default implementation using **AWS SQS**. This also provides a much simplified API while making the underlying implementation swappable.


# Status
This component is currently **stable**. Following limitations, current work, planned features apply.
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Feature</strong></td>
        <td><strong>Status</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td>**Meta**</td>
        <td>Upcoming</td>
        <td>Ability to easily default / inject meta data for every entry.</td>
    </tr>
    <tr>
        <td>**URI**</td>
        <td>Upcoming</td>
        <td>Ability to use Slate Kit Uri for explicit references to file paths</td>
    </tr>
    <tr>
        <td>**Errors**</td>
        <td>Upcoming</td>
        <td>Ability to use a dead-letter queue for failed items.</td>
    </tr>
    <tr>
        <td>**Batch**</td>
        <td>Upcoming</td>
        <td>Ability to perform batch insert operations</td>
    </tr>
</table>
{{% section-end mod="arch/queues" %}}

# Install
{{< highlight groovy >}}

    repositories {
        // other repositories
        maven { url  "http://dl.bintray.com/codehelixinc/slatekit" }
    }

    dependencies {
        // other dependencies ...

        compile 'com.slatekit:slatekit-cloud:1.0.0'
    }

{{< /highlight >}}
{{% section-end mod="arch/queues" %}}

# Sources {#sources}
{{% sk-module 
    name="Files"
    package="slatekit.cloud"
    jar="slatekit.cloud.jar"
    git="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-cloud"
    gitModule="slatekit-cloud"
    url="arch/queues"
    bintray="slatekit-cloud"
    uses="slatekit.results, slatekit.core, slatekit.cloud"
    exampleUrl=""
    exampleFileName="Example_Cloud_Queues.kt"
%}}
{{% section-end mod="arch/queues" %}}

# Imports {#imports}
Refer to {{% sk-link-example file="Example_Cloud_Queues.kt" name="Example_Cloud_Queues.kt" %}} for all imports.
{{< highlight kotlin >}}
         
    // Required
    import slatekit.cloud.aws.SQS
    import slatekit.core.queues.QueueEntry
    import slatekit.core.queues.QueueStringConverter

    // Optional ( For examples)
    import com.amazonaws.auth.profile.ProfileCredentialsProvider
    import com.amazonaws.regions.Regions
     
{{< /highlight >}}

{{% section-end mod="arch/queues" %}}

# Setup
{{< highlight kotlin >}}
        
    // This converts the queue entry payload to a type
    // NOTES:
    // 1. This can be String converter for any payload ( e.g. JSON )
    // 2. You can create a custom type for type safety
    val converter = QueueStringConverter()
    
    // Not storing any key/secret in source code for security purposes
    // Setup 1: Use the default aws config file in "~/.aws/credentials and supply AWS region
    val queue1 = SQS<String>(credentials = ProfileCredentialsProvider().credentials,
            region = Regions.US_EAST_1, name = "slatekit", converter = converter)

    // Setup 2: Allow auto-loading of credentials from ~/.aws/credentials and region by string name supplied
    val queue2 = SQS.of<String>(region = "us-east-1", name = "slatekit", converter = converter)

    // Setup 3: Use the config at "~/myapp/conf/queue.conf"
    // Reads from the section "queues" by default
    /**
     *  SAMPLE CONFIG:
     *  queues = true
     *  queues.key  = AWS_KEY_HERE
     *  queues.pass = AWS_PASSWORD_HERE
     *  queues.env  = dev
     *  queues.tag  = samples
     */
    val queue3 = SQS.of<String>( region = "us-east-1", name = "slatekit", converter = converter,
        confPath = "~/myapp/conf/queue.conf", confSection = "queues")

    val queue = queue3.getOrElse { queue1 }

     
{{< /highlight >}}

{{% section-end mod="arch/queues" %}}

# Usage
{{< highlight kotlin >}}
        
    // Use case 1: init()
    queue.init()

    // NOTES:
    // 1. All operations use the slate kit Result<T,E> type
    // 2. All operations return a slate kit Try<T> = Result<T, Exception>
    // Use case 2: send 1 message ( get back message id as String )
    queue.send("item 1")

    // Use case 3: send multiple messages
    queue.send("item 2")

    // Use case 4: send message with tags
    queue.send("user=kishore", tagName = "type", tagValue = "reg")

    // Use case 5: receive 1 message
    val item1 = queue.next()
    println(item1?.getValue())
    println(item1?.getTag("type"))

    // Use case 6: recieve 2 messages
    val items = queue.next(2)

    // Use case 7: delete a message
    queue.done(item1)

    // Use case 8: delete many
    queue.done(items)

    // Use case 9: abandon a message
    queue.abandon(queue.next())

    // Use case 10: get count ( approximation )
    val count = queue.count()
    println(count)
      

{{< /highlight >}}
{{% section-end mod="arch/queues" %}}

<script>
    var archComponent = {
        name: "Queues",
        page: "arch/queues",
        icon: "assets/media/img/white/queue.png",
        menu: {
            mode: "normal",
            useTemplate:true,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"Imports" , anchor: "#imports" },
                        { name:"Setup" , anchor: "#setup" },
                        { name:"Usage" , anchor: "#usage" }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>

