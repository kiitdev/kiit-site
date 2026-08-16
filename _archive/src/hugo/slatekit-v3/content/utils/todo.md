
# Todo

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <td><strong>summary</strong></td>
      <td>A programmatic approach to marking and tagging code that is strongly typed and consistent</td>
    </tr>
    <tr>
      <td><strong>jar</strong></td>
      <td>kiit.common.jar</td>
    </tr>
    <tr>
      <td><strong>package</strong></td>
      <td>kiit.common</td>
    </tr>
    <tr>
      <td><strong>artifact</strong></td>
      <td><a href="https://github.com/orgs/slatekit/packages?q=dev.kiit.kiit-common">dev.kiit:kiit-common</a></td>
    </tr>
    <tr>
      <td><strong>sources</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-common/src/main/kotlin/slatekit/common" class="url-ch">src/lib/kotlin/slatekit-common/src/main/kotlin/slatekit/common</a></td>
    </tr>
    <tr>
      <td><strong>example</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-examples/src/main/kotlin/slatekit/examples/Example_NOTE.kt" class="url-ch">src/lib/kotlin/slate-examples/src/main/kotlin/slatekit/examples/Example_NOTE.kt</a></td>
    </tr>
    <tr>
      <td><strong>dependency</strong></td>
      <td>kiit-results</td>
    </tr>
  </tbody>
</table>
{{% break %}}

## Gradle
{{% sk-install name="kiit-common" %}}
{{% break %}}

## Import
{{< highlight kotlin >}}
  
// required 
import kiit.common.NOTE

// optional 
import kiit.cmds.Command
import kiit.cmds.CommandRequest
import kiit.results.Success
import kiit.results.Try
  
{{< /highlight >}}
{{% break %}}

## Setup
{{< highlight kotlin >}}


n/a


{{< /highlight >}}
{{% break %}}

## Usage
{{< highlight kotlin >}}


    // About: Strongly typed, structured representation of code notes/tasks
    // This is in code to enforce consistent usage and to be able
    // to track code usages

    // Use case 1: Implement
    NOTE.IMPLEMENT("Component 1", "This code needs further error handling" )

    // Use case 2: Supply a block of code to refactor
    NOTE.REFACTOR("Feature 2", "Refactor logic to handle empty values") {
      // Your code to refactor goes here
    }

    // Use case 3: Mark a bug
    NOTE.BUG("Component 3", "invalid data, bug fix needed", "JIRA:12434" )

    // Use case 4: Code removal tag
    NOTE.REMOVE("Story 123", "@kishore, this code no longer needed") {
      // Your code to remove here.
    }
    

{{< /highlight >}}
{{% break %}}

