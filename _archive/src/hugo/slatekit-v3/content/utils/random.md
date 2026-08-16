
# Random

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <td><strong>summary</strong></td>
      <td>A random generator for strings, guids, numbers, alpha-numeric, and alpha-numeric-symbols for various lengths</td>
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
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-examples/src/main/kotlin/slatekit/examples/Example_Random.kt" class="url-ch">src/lib/kotlin/slate-examples/src/main/kotlin/slatekit/examples/Example_Random.kt</a></td>
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
import kiit.common.utils.Random.alpha3
import kiit.common.utils.Random.alpha6
import kiit.common.utils.Random.alphaN
import kiit.common.utils.Random.alphaSym3
import kiit.common.utils.Random.alphaSym6
import kiit.common.utils.Random.alphaSymN
import kiit.common.utils.Random.digits3
import kiit.common.utils.Random.digits6
import kiit.common.utils.Random.digitsN
import kiit.common.utils.Random.string3
import kiit.common.utils.Random.string6
import kiit.common.utils.Random.uuid
import kiit.common.utils.Random.stringN


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


    // CASE 1: Create random strings ( characters only ) of different lengths
    println("Random STRINGS - UPPER + lower case")
    println( "len 3 : " + string3()  )
    println( "len 6 : " + string6()  )
    println( "len n : " + stringN(9) )
    println()

    println("Random STRINGS - lower case only")
    println( "len 3 : " + stringN(3, allowUpper = false) )
    println( "len 6 : " + stringN(6, allowUpper = false) )
    println( "len n : " + stringN(9, allowUpper = false) )
    println()

    // CASE 2: Create Guid
    println("Random GUID")
    println( "dashes - yes : " + uuid() )
    println( "dashes - no  : " + uuid(includeDashes = false) )
    println( "casing - no  : " + uuid(includeDashes = false, upperCase = true) )
    println()

    // CASE 3: Create numbers of different lengths
    println("Random NUMBERS")
    println( "len 3 : " + digits3()  )
    println( "len 6 : " + digits6()  )
    println( "len n : " + digitsN(9) )
    println()

    // CASE 4: Create alpha-numeric strings ( chars + digits ) of different lengths
    println("Random ALPHA-NUMERIC")
    println( "len 3 : " + alpha3()  )
    println( "len 6 : " + alpha6()  )
    println( "len n : " + alphaN(9) )
    println()

    // CASE 5: Create alpha-numeric-symbol strings ( chars + digits + symbols ) of different lengths
    println("Random ALPHA-NUMERIC-SYMBOL")
    println( "len 3 : " + alphaSym3()  )
    println( "len 6 : " + alphaSym6()  )
    println( "len n : " + alphaSymN(9) )

    

{{< /highlight >}}
{{% break %}}


## Output

{{< highlight kotlin >}}
  Random STRINGS - UPPER + lower case
  len 3 : ndo
  len 6 : mRqDIz
  len n : mjTWZkARV

  Random STRINGS - lower case only
  len 3 : qdc
  len 6 : hqqnab
  len n : chnedbmlp

  Random GUID
  dashes - yes : 54E49A58-5A4E-45F2-994B-6E0D783B95E9
  dashes - no  : 18496EC779EB48ABAC4B61B2DC4357F5

  Random NUMBERS
  len 3 : 697
  len 6 : 909051
  len n : 181651948

  Random ALPHA-NUMERIC
  len 3 : ghs
  len 6 : 194cpb
  len n : vw9upkh4p

  Random ALPHA-NUMERIC-SYMBOL
  len 3 : n0i
  len 6 : m27h6h
  len n : k}y!m+fz)
{{< /highlight >}}
  