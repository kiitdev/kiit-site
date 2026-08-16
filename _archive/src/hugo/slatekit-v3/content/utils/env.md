
# Env

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <td><strong>summary</strong></td>
      <td>Environment selector and validator for environments such as (local, dev, qa, stg, prod) )</td>
    </tr>
    <tr>
      <td><strong>jar</strong></td>
      <td>kiit.common.jar</td>
    </tr>
    <tr>
      <td><strong>package</strong></td>
      <td>kiit.common.envs</td>
    </tr>
    <tr>
      <td><strong>artifact</strong></td>
      <td><a href="https://github.com/orgs/slatekit/packages?q=dev.kiit.kiit-common">dev.kiit:kiit-common</a></td>
    </tr>
    <tr>
      <td><strong>sources</strong></td>
      <td><a href="https://github.com/slatekit/kiit/tree/main/src/common/common/src/main/kotlin/kiit/common/envs" class="url-ch">src/common/common/src/main/kotlin/kiit/common/envs</a></td>
    </tr>
    <tr>
      <td><strong>example</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-examples/src/main/kotlin/slatekit/examples/Example_Env.kt" class="url-ch">src/lib/kotlin/slate-examples/src/main/kotlin/slatekit/examples/Example_Env.kt</a></td>
    </tr>
    <tr>
      <td><strong>dependency</strong></td>
      <td> kiit-results</td>
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
import kiit.common.envs.*


// optional 
import kiit.results.Try
import kiit.results.Success
  
{{< /highlight >}}
{{% break %}}

## Setup
{{< highlight kotlin >}}


n/a


{{< /highlight >}}
{{% break %}}

## Usage
{{< highlight kotlin >}}



    // CASE 1: Build a list of environments
    val envs1 = Envs(listOf(
            Env("loc", EnvMode.Dev , desc = "Dev environment (local)"),
            Env("dev", EnvMode.Dev , desc = "Dev environment (dev)"),
            Env("qat", EnvMode.Qat , desc = "QAT environment (test)"),
            Env("stg", EnvMode.Uat , desc = "STG environment (demo)"),
            Env("pro", EnvMode.Pro , desc = "LIVE environment")
    ))

    // CASE 2: Use the default list of environments ( same as above )
    val envs = slatekit.common.envs.Envs.defaults()

    // CASE 3: Get one of the environments by api
    val qa1 = envs.get("qa1")
    println( qa1 )

    // CASE 4: Validate one of the environments by api
    println( envs.isValid("qa2") )

    // CASE 5: Current environment ( nothing - none selected )
    println( envs.current )

    // CASE 6: Select an environment
    val envs2 = envs.select("dev")
    println( envs2 )

    // CASE 7: Get info about currently selected environment
    println( envs2.name    )
    println( envs2.isDev   )
    println( envs2.isQat    )
    println( envs2.isUat   )
    println( envs2.isPro  )
    println( envs2.current )
    

{{< /highlight >}}
{{% break %}}

