
# Reflect

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <td><strong>desc</strong></td>
      <td>Reflection helper to create instances, get methods, fields, annotations and more</td>
    </tr>
    <tr>
      <td><strong>jar</strong></td>
      <td>slatekit.common.jar</td>
    </tr>
    <tr>
      <td><strong>namespace</strong></td>
      <td>slatekit.common.Reflector</td>
    </tr>
    <tr>
      <td><strong>artifact</strong></td>
      <td>com.slatekit:slatekit-meta</td>
    </tr>
    <tr>
      <td><strong>source folder</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-meta/src/main/kotlin/slatekit/common/Reflector" class="url-ch">src/lib/kotlin/slatekit-meta/src/main/kotlin/slatekit/common/Reflector</a></td>
    </tr>
    <tr>
      <td><strong>example</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-examples/src/main/kotlin/slatekit/examples/Example_Reflect.kt" class="url-ch">src/lib/kotlin/slate-examples/src/main/kotlin/slatekit/examples/Example_Reflect.kt</a></td>
    </tr>
    <tr>
      <td><strong>depends on</strong></td>
      <td></td>
    </tr>
  </tbody>
</table>
{{% break %}}

## Gradle
{{< highlight gradle >}}
    // other setup ...
    repositories {
        maven { url  "https://dl.bintray.com/codehelixinc/slatekit" }
    }

    dependencies {
        // other libraries

        // slatekit-common: Utilities for Android or Server
        compile 'com.slatekit:slatekit-common:0.9.35'
    }

{{< /highlight >}}
{{% break %}}

## Import
{{< highlight kotlin >}}


// required 
import slatekit.apis.Api
import slatekit.apis.Action
import slatekit.common.Field
import slatekit.common.conf.Config
import slatekit.meta.Reflector



// optional 
import slatekit.cmds.Command
import slatekit.cmds.CommandRequest
import slatekit.results.Try
import slatekit.results.Success
import slatekit.examples.common.User
import slatekit.examples.common.UserApi
import slatekit.integration.common.AppEntContext




{{< /highlight >}}
{{% break %}}

## Setup
{{< highlight kotlin >}}




    


{{< /highlight >}}
{{% break %}}

## Usage
{{< highlight kotlin >}}


    val ctx = AppEntContext.sample(Config(), "sample", "sample", "", "")
    val api = UserApi(ctx)

    // CASE 1: Create instance of a class ( will pick a 0 parameter constructor )
    val user = Reflector.create<User>(User::class)
    println("user: " + user)


    // CASE 2: Get a field value
    val user2 = user.copy(email = "johndoe@home.com")
    val name = Reflector.getFieldValue(user2, "email")
    println("email : " + name)


    // CASE 3: Set a field value
    Reflector.setFieldValue(user, User::email, "johndoe@work.com")
    println("email : " + user.email)


    // CASE 4: Call a method with parameters
    val result = Reflector.callMethod(UserApi::class, api, "create", arrayOf("superman@metro.com", "super", "man", true, 35))
    println((result as User ).toString())


    // CASE 5: Get a class level annotation
    // NOTE: The annotation must be created with all parameters ( not named parameters )
    val annoCls = Reflector.getAnnotationForClass<Api>(UserApi::class, Api::class)
    println(annoCls)


    // CASE 6: Get a method level annotations
    // NOTE: The annotation must be created with all parameters
    val annoMems = Reflector.getAnnotatedMembers<Action>(UserApi::class, Action::class)
    println(annoMems)


    // CASE 7: Get a field level annotations
    // NOTE: The annotation must be created with all parameters
    val annoFlds = Reflector.getAnnotatedProps<Field>(User::class, Field::class)
    println(annoFlds)


    // CASE 8: print parameters
    val method = Reflector.getMethod(UserApi::class, "activate")
    //Reflector.printParams(method)


    // CASE 10: Get method
    val sym = Reflector.getMethod(UserApi::class, "info")
    println(sym?.name)


    // CASE 11: Get method parameters
    val symArgs = Reflector.getMethodArgs(UserApi::class, "activate")
    println(symArgs)


    // CASE 12: Is argument a basic type
    val argType = symArgs!!.toList()[0]
    println(argType.type)


    // CASE 13: Create instance from parameter
    val argInstance = Reflector.create<Any>(symArgs!!.toList()[0].javaClass.kotlin)
    println(argInstance)
    

{{< /highlight >}}
{{% break %}}

