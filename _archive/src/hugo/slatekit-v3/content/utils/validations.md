
# Validations

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <td><strong>summary</strong></td>
      <td>A set of validation related components, simple validation checks, RegEx checks, error collection and custom validators</td>
    </tr>
    <tr>
      <td><strong>jar</strong></td>
      <td>kiit.common.jar</td>
    </tr>
    <tr>
      <td><strong>package</strong></td>
      <td>kiit.common.validation</td>
    </tr>
    <tr>
      <td><strong>artifact</strong></td>
      <td><a href="https://github.com/orgs/slatekit/packages?q=dev.kiit.kiit-common">dev.kiit:kiit-common</a></td>
    </tr>
    <tr>
      <td><strong>sources</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-common/src/main/kotlin/slatekit/common/validation" class="url-ch">src/lib/kotlin/slatekit-common/src/main/kotlin/slatekit/common/validation</a></td>
    </tr>
    <tr>
      <td><strong>example</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-examples/src/main/kotlin/slatekit/examples/Example_Validation.kt" class="url-ch">src/lib/kotlin/slate-examples/src/main/kotlin/slatekit/examples/Example_Validation.kt</a></td>
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
import kiit.common.validations.ValidationFuncsExt


// optional 
import kiit.results.Try
import kiit.results.Success
import kiit.common.validations.ValidationFuncs.isEmpty
import kiit.common.validations.ValidationFuncs.isNotEmpty
import kiit.common.validations.ValidationFuncs.isLength
import kiit.common.validations.ValidationFuncs.isMinLength
import kiit.common.validations.ValidationFuncs.isMaxLength
import kiit.common.validations.ValidationFuncs.isMinValue
import kiit.common.validations.ValidationFuncs.isMaxValue
import kiit.common.validations.ValidationFuncs.hasDigits
import kiit.common.validations.ValidationFuncs.hasCharsLCase
import kiit.common.validations.ValidationFuncs.hasCharsUCase
import kiit.common.validations.ValidationFuncs.hasSymbols
import kiit.common.validations.ValidationFuncs.isAlpha
import kiit.common.validations.ValidationFuncs.isAlphaLowerCase
import kiit.common.validations.ValidationFuncs.isAlphaNumeric
import kiit.common.validations.ValidationFuncs.isAlphaUpperCase
import kiit.common.validations.ValidationFuncs.isEmail
import kiit.common.validations.ValidationFuncs.isNumeric
import kiit.common.validations.ValidationFuncs.isPhoneUS
import kiit.common.validations.ValidationFuncs.isUrl
import kiit.common.validations.ValidationFuncs.isZipCodeUS
  
{{< /highlight >}}
{{% break %}}

## Setup
{{< highlight kotlin >}}


n/a


{{< /highlight >}}
{{% break %}}

## Usage
{{< highlight kotlin >}}


  // CASE 1: Simple true/false checks
  fun showSimple():Unit {

    println("CASE 1: Simple true/false checks")
    println( isEmpty      ("")              )
    println( isNotEmpty   ("123")           )
    println( isLength     ("123", 3)        )
    println( isMinLength  ("123", 3)        )
    println( isMaxLength  ("12" , 3)        )
    println( isMinValue   (100, 100)        )
    println( isMaxValue   (99 , 100)        )
    println( hasDigits    ("a1b2c3"  , 3)   )
    println( hasCharsLCase("a1b2c3"  , 3)   )
    println( hasCharsUCase("A1B2C3"  , 3)   )
    println( hasSymbols   ("A@B%C^"  , 3)   )
    println()
  }


  // CASE 2: Simple RegEx based checks returning true/false
  fun showSimpleRegEx():Unit {

    println("CASE 2: Simple RegEx based checks returning true/false")
    println( isEmail         ("wonderwoman@amazonian.com"))
    println( isUrl           ("http://slatekit.com") )
    println( isAlpha         ("abcDEF")      )
    println( isAlphaUpperCase("ABCDEFG")     )
    println( isAlphaLowerCase("abcdefg")     )
    println( isAlphaNumeric  ("abCD12")      )
    println( isNumeric       ("123456")      )
    println( isPhoneUS       ("123-456-7890"))
    println( isZipCodeUS     ("12345")       )
    println()
  }


  // CASE 3: Same checks above but these return a ValidationResult
  // which contains success(true/false), message, reference, and status code
  // You can supply a reference to a field/position refer to common\Reference.kt
  fun showValidationResult():Unit {

    println("CASE 3: Same checks above but these return a ValidationResult")
    println( ValidationFuncsExt.isEmpty       (""      ,     "Email is required"   ))
    println( ValidationFuncsExt.isAlphaNumeric("abCD12",     "Password is invalid" ))
    println( ValidationFuncsExt.isZipCodeUS   ("12345" ,     "ZipCode is required" ))
    println( ValidationFuncsExt.isMinLength   ("12"    , 3, "Min 3 chars required"))
    println()
  }


  // CASE 4: Collect errors via thunks(0 parameter functions)
  fun showErrorCollection():Unit {

    val password = "abc123XYZ"

    println("CASE 4: Collect errors via thunks(0 parameter functions)")
    val errors = listOf (
        { ValidationFuncsExt.isLength      ( password,   9 , "Email must be 9 characters")          } ,
        { ValidationFuncsExt.hasCharsLCase ( password, 3 , "Email must have 3 lowercase letters") } ,
        { ValidationFuncsExt.hasCharsUCase ( password, 3 , "Email must have 3 uppercase letters") } ,
        { ValidationFuncsExt.hasDigits     ( password, 3 , "Email must have 3 digits")            }
      ).map    { rule -> rule() }
       .filter { result -> !result.success }
       .toList()

    errors.forEach{ err -> println( err ) }
    println()
  }

  // Case 5: Custom validator object
  data class User(val email:String, val password:String) { }


  

{{< /highlight >}}
{{% break %}}

