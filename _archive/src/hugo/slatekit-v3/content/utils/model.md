
# Model

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <td><strong>desc</strong></td>
      <td>Allows construction of model schema with fields for code-generation. Also used in the ORM mapper</td>
    </tr>
    <tr>
      <td><strong>date</strong></td>
      <td>{{% sk-version-date %}}</td>
    </tr>
    <tr>
      <td><strong>version</strong></td>
      <td>{{% sk-version-number %}}</td>
    </tr>
    <tr>
      <td><strong>jar</strong></td>
      <td>slatekit.common.jar</td>
    </tr>
    <tr>
      <td><strong>namespace</strong></td>
      <td>slatekit.common.Model</td>
    </tr>
    <tr>
      <td><strong>artifact</strong></td>
      <td>com.slatekit:slatekit-meta</td>
    </tr>
    <tr>
      <td><strong>source folder</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-meta/src/main/kotlin/slatekit/common/Model" class="url-ch">src/lib/kotlin/slatekit-meta/src/main/kotlin/slatekit/common/Model</a></td>
    </tr>
    <tr>
      <td><strong>example</strong></td>
      <td><a href="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-examples/src/main/kotlin/slatekit/examples/Example_Model.kt" class="url-ch">src/lib/kotlin/slate-examples/src/main/kotlin/slatekit/examples/Example_Model.kt</a></td>
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
import slatekit.meta.models.*


// optional 
import slatekit.cmds.Command
import slatekit.common.DateTime
import slatekit.results.Try
import slatekit.results.Success
import slatekit.common.auth.User
import slatekit.common.info.Host
import slatekit.cmds.CommandRequest
import slatekit.orm.databases.vendors.MySqlBuilder




{{< /highlight >}}
{{% break %}}

## Setup
{{< highlight kotlin >}}


n/a


{{< /highlight >}}
{{% break %}}

## Usage
{{< highlight kotlin >}}


    // ABOUT:
    // The Model component allows you to easily build up a model with fields
    // This allows you to have a schema / structure representing a data model.
    // With the structure in place, it helps facilitate code-generation.
    // Also, the ORM / Mapper of Slate Kit internally builds a model for each
    // Kotlin class that is mapped by the ORM.

    // CASE 1: specify the api of the model e.g. "Resource"
    // NOTE: The model is IMMUTABLE ( any additions of fields will result in a new model )
    var model = Model("Resource", "slate.ext.resources.Resource")

    // CASE 2. add a field for uniqueness / identity
    model = model.addId  (name = "id", autoIncrement = true, dataType = Long::class)

    // CASE 3: add fields for text, bool, int, date etc.
    model = model.addText(name = "key"        , isRequired = true, maxLength = 30)
                 .addText(name = "api"        , isRequired = true, maxLength = 30)
                 .addText(name = "category"   , isRequired = true, maxLength = 30)
                 .addText(name = "country"    , isRequired = true, maxLength = 30)
                 .addText(name = "region"     , isRequired = true, maxLength = 30)
                 .addText(name = "aggRegion"  , isRequired = true, maxLength = 30)
                 .addText(name = "aggCategory", isRequired = true, maxLength = 30)
                 .addText(name = "links"      , isRequired = true, maxLength = 30)
                 .addText(name = "owner"      , isRequired = true, maxLength = 30)
                 .addText(name = "status"     , isRequired = true, maxLength = 30)
                 .addInt (name = "recordState", isRequired = true)
                 .addObject     (name = "hostInfo"   , isRequired = true, dataType = Host::class)
                 .addLocalDate  (name = "activated"  , isRequired = true                )
                 .addLocalTime  (name = "checkTime"  , isRequired = true                )
                 .addLocalDateTime(name = "created"  , isRequired = true                )
                 .addDateTime(name = "updated"  , isRequired = true                )

    // CASE 3: add fields for text, bool, int, date etc.
    model = Model("Resource", "", dataType = User::class, desc = "", tableName = "users", modelFields = listOf(
            ModelField(name = "key"        , isRequired = true, maxLength = 30, dataCls = String::class),
            ModelField(name = "api"        , isRequired = true, maxLength = 30, dataCls = String::class),
            ModelField(name = "recordState", isRequired = true, dataCls = Int::class),
            ModelField(name = "hostInfo"   , isRequired = true, dataCls = Host::class),
            ModelField(name = "created"    , isRequired = true, dataCls = DateTime::class),
            ModelField(name = "updated"    , isRequired = true, dataCls = DateTime::class)
    ))

    // CASE 4. check for any fields
    showResult( "any fields: " + model.any )

    // CASE 5. total number of fields
    showResult( "total fields: " + model.size )

    // CASE 6. get the id field
    showResult( "id field: " + model.hasId )

    // CASE 7. get the id field
    showResult( "id field: " + model.idField )

    // CASE 8. string representation of field
    showResult( "id field to string: " + model.idField.toString())

    // CASE 8. access the fields
    showResult ("access to fields : " + model.fields.size)

    // CASE 9. get api + full api of model
    showResult ("model api/fullName: " + model.name + ", " + model.fullName)

    // CASE 10. build up the table sql for this model
    showResult( "table sql : " + MySqlBuilder(null).createTable(model))
    

{{< /highlight >}}
{{% break %}}

