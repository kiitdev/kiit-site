---
title: "Files"
date: 2019-11-17T23:55:42-05:00
section_header: Files
---

# Overview
The Files component is an abstraction of file storage with a default implementation using **AWS S3**. This also provides a much simplified API while making the underlying implementation swappable.


# Status
This component is currently **stable**. Following limitations, current work, planned features apply.
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Feature</strong></td>
        <td><strong>Status</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td>**Binary**</td>
        <td>In-Progress</td>
        <td>Ability to store/retrieve binary files. ( you can still use the underlying AWS provider to so )</td>
    </tr>
    <tr>
        <td>**Names**</td>
        <td>Upcoming</td>
        <td>Ability to enforce a naming convention on the file names</td>
    </tr>
    <tr>
        <td>**Async**</td>
        <td>Upcoming</td>
        <td>Async support via Kotlin suspend/coroutines and Java AWS 2.0 SDK</td>
    </tr>
    <tr>
        <td>**URI**</td>
        <td>Upcoming</td>
        <td>Ability to use Slate Kit Uri for explicit references to file paths</td>
    </tr>
</table>
{{% section-end mod="arch/files" %}}

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
{{% section-end mod="arch/files" %}}

# Sources {#sources}
{{% sk-module 
    name="Files"
    package="slatekit.cloud"
    jar="slatekit.cloud.jar"
    git="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-cloud"
    gitModule="slatekit-cloud"
    url="arch/files"
    bintray="slatekit-cloud"
    uses="slatekit.results, slatekit.core, slatekit.cloud"
    exampleUrl=""
    exampleFileName="Example_Cloud_Files.kt"
%}}

{{% section-end mod="arch/files" %}}

# Imports {#imports}
Refer to {{% sk-link-example file="Example_Cloud_Files.kt" name="Example_Cloud_Files.kt" %}} for all imports.
{{< highlight kotlin >}}
    // Required
    import slatekit.cloud.aws.S3
    import slatekit.core.files.CloudFiles

    // Optional ( For examples)
    import com.amazonaws.auth.profile.ProfileCredentialsProvider
    import com.amazonaws.regions.Regions

{{< /highlight >}}

{{% section-end mod="arch/files" %}}

# Setup
{{< highlight kotlin >}}
        
    // Setup 1: Use the default aws config file in "{user_dir}/.aws/credentials"
    val files1 = S3(credentials = ProfileCredentialsProvider().credentials,
            region = Regions.US_EAST_1, bucket = "slatekit-unit-tests", createBucket = false)

    // Setup 2: Use the default aws config file in "{user_dir}/.aws/credentials"
    val files2 = S3.of(region = "us-west-2", bucket = "slatekit-unit-tests", createBucket = false)

    // Setup 3: Use the config "{user_id}/myapp/conf/files.conf"
    // Specify the api key section as "files"
    /**
     *  SAMPLE CONFIG:
     *  files = true
     *  files.key  = AWS_KEY_HERE
     *  files.pass = AWS_PASSWORD_HERE
     *  files.env  = dev
     *  files.tag  = samples
     */
    val files3 = S3.of(region = "us-west-2", bucket = "slatekit-unit-tests", createBucket = false,
            confPath = "~/.slatekit/conf/files.conf", confSection = "files")

    val files:CloudFiles = files2.getOrElse { files1 }
     
{{< /highlight >}}

{{% section-end mod="arch/files" %}}

# Usage
{{< highlight kotlin >}}
        
    // Use case 1: Creates bucket if configured
    files.init()

    // NOTES: 
    // 1. All operations use the slate kit Result<T,E> type
    // 2. All operations return a slate kit Try<T> = Result<T, Exception>
    // Use case 2: create using just name and content
    val result1:Try<String> = files.create("file-1", "content 1")

    // Use case 3: update using just name and content
    files.update("file-1", "content 2")

    // Use case 4: create using folder and file name
    files.create("folder-1", "file-1", "content 1")

    // Use case 5: update using folder and file name
    files.update("folder-1", "file-1", "content 2")

    // Use case 6: get file as a text using just name
    files.getAsText("file-1")

    // Use case 7: get file using folder and file name
    files.getAsText("folder-1", "file-1")

    // Use case 8: download file to local folder
    files.download("file-1", "~/dev/temp/")

    // Use case 9: download using folder and file name to local folder
    files.download("folder-1", "file-1", "~/dev/temp")

    // Use case 10: delete file by just the name
    files.delete("file-1")

    // Use case 11: delete using folder and name
    files.delete("folder-1", "file-1")
      

{{< /highlight >}}
{{% section-end mod="arch/files" %}}

<script>
    var archComponent = {
        name: "Files",
        page: "arch/files",
        icon: "assets/media/img/white/folders.png",
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

