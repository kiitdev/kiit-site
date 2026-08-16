
# Auth

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <td><strong>summary</strong></td>
      <td>A simple authentication component to check current user role and permissions</td>
    </tr>
    <tr>
      <td><strong>jar</strong></td>
      <td>kiit.common.jar</td>
    </tr>
    <tr>
      <td><strong>package</strong></td>
      <td>kiit.common.auth</td>
    </tr>
    <tr>
      <td><strong>artifact</strong></td>
      <td><a href="https://github.com/orgs/slatekit/packages?q=dev.kiit.kiit-common">dev.kiit:kiit-common</a></td>
    </tr>
    <tr>
      <td><strong>sources</strong></td>
      <td>
        <a href="https://github.com/slatekit/kiit/tree/main/src/common/common/src/main/kotlin/kiit/common/auth" class="url-ch">src/common/common/src/main/kotlin/kiit/common/auth</a>
      </td>
    </tr>
    <tr>
      <td><strong>example</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-examples/src/main/kotlin/slatekit/examples/Example_Auth.kt" class="url-ch">src/lib/kotlin/slate-examples/src/main/kotlin/slatekit/examples/Example_Auth.kt</a></td>
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
import kiit.common.auth.AuthConsole
import kiit.common.auth.User



// optional 
import kiit.cmds.Command
import kiit.cmds.CommandRequest
import kiit.results.Try
import kiit.results.Success




{{< /highlight >}}
{{% break %}}

## Setup
{{< highlight kotlin >}}



    // Setup: Setup the Auth wrapper with the user to inspect info about the user
    // NOTES:
    // * 1. This component does NOT handle any actual login/logout/authorization features.
    // * 2. This set of classes are only used to inspect information about a user.
    // * 3. Since authorization is a fairly complex feature with implementations such as
    // *    OAuth, Social Auth, Slate Kit has purposely left out the Authentication to more reliable
    // *    libraries and frameworks.
    // * 4. The SlateKit.Api component, while supporting basic api "Keys" based authentication,
    // *    and a roles based authentication, it leaves the login/logout and actual generating
    // *    of tokens to libraries such as OAuth.
    val user2 = User( "2", "john doe", "john", "doe", "jdoe@gmail.com", "123-456-7890", false, false, true)
    val auth = AuthConsole(isAuthenticated = true, user = user2, roles = "admin")
    


{{< /highlight >}}
{{% break %}}

## Usage
{{< highlight kotlin >}}


    // CASE 1: Use the auth to check user info
    println ("Checking auth info in desktop/local mode" )
    println ( "user info         : " + auth.user                   )
    println ( "user id           : " + auth.userId                 )
    println ( "is authenticated  : " + auth.isAuthenticated        )
    println ( "is email verified : " + auth.isEmailVerified        )
    println ( "is phone verified : " + auth.isPhoneVerified        )
    println ( "is a moderator    : " + auth.isInRole( "moderator") )
    println ( "is an admin       : " + auth.isInRole( "admin" )    )
    

{{< /highlight >}}
{{% break %}}

