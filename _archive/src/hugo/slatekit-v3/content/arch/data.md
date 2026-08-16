---
title: "Data"
date: 2019-11-17T23:55:42-05:00
section_header: Data
---

# Overview
Slate Kit contains 3 modules for working with **data and databases**. These allow you to leverage existing code for low-level database calls, mid-level interfaces/abstractions for Entities/Repositories/Services or high-level ORM functionality.
{{% break %}}

# Goals
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Goal</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>1. Low-Level</strong></td>
        <td>Provide a low-level database API for JDBC and/or Android Sqlite</td>
    </tr>
    <tr>
        <td><strong>2. Entities </strong> </td>
        <td>Provide interfaces/defaults for Entities / Repositories / Services.</td>                     
    </tr>
    <tr>
        <td><strong>3. ORM</strong></td>
        <td>Provide a light-weight ORM for both Android ( Sqlite ) and Server. </td>
    </tr>
</table>

{{% break %}}


# Status
This component is currently stable and works with **MySql**. 
Future versions will include support for:
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Feature</strong></td>
        <td><strong>Status</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>PostGres</strong></td>
        <td>In Progress</td>
        <td>Support for PostGres database</td>
    </tr>
    <tr>
        <td><strong>Android</strong></td>
        <td>In Progress</td>
        <td>Implementations currently internal only but not yet open-sourced.</td>
    </tr>
    <tr>
        <td><strong>Transactions</strong></td>
        <td>In Progress</td>
        <td>For server side</td>
    </tr>
    <tr>
        <td><strong>Exposed</strong></td>
        <td>Future</td>
        <td>Integration with the **JetBrains Exposed ORM** instead of Slate Kit ORM</td>
    </tr>
</table>

{{% section-end mod="arch/data" %}}

# Install
{{< highlight groovy >}}

    repositories {
        // other repositories
        maven { url  "http://dl.bintray.com/codehelixinc/slatekit" }
    }

    dependencies {
        // other dependencies ...

        // Common code for all components
        compile 'com.slatekit:slatekit-common:1.0.0'

        // For database calls to work with JDBC
        compile 'com.slatekit:slatekit-db:1.0.0'

        // Entities / Repositories / Service interfaces and defaults
        compile 'com.slatekit:slatekit-entities:1.0.0'

        // ORM functionality to map to/from models and records and query
        compile 'com.slatekit:slatekit-orm:1.0.0'
    }

{{< /highlight >}}
{{% section-end mod="arch/data" %}}

# Sources {#sources}
{{% sk-module 
    name="Data"
    package="slatekit.entities"
    jar="slatekit.entities.jar"
    git="https://github.com/slatekit/slatekit/tree/master/src/lib/kotlin/slatekit-entities"
    gitModule="slatekit-entities"
    url="arch/data"
    bintray="slatekit-entities"
    uses="slatekit.results, slatekit.common"
    exampleUrl=""
    exampleFileName="Example_Entities.kt"
%}}

{{% section-end mod="arch/data" %}}

# Example {#example}
{{< highlight kotlin >}}

    fun quick_sample() {
        
    }

{{< /highlight >}}
{{% section-end mod="arch/data" %}}


# Guide
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Name</strong></td>
        <td><strong>Description</strong></td>
        <td><strong>More</strong></td>
    </tr>
    <tr>
        <td><strong>1. Connections</strong></td>
        <td>Setting up database connections</td>
        <td><a href="arch/data/#connections" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>2. Databases</strong> </td>
        <td>Low-level database calls and operations</td> 
        <td><a href="arch/data/#databases" class="more"><span class="btn btn-primary">more</span></a></td>                    
    </tr>
    <tr>
        <td><strong>3. Records</strong></td>
        <td>Working with records from the database</td>
        <td><a href="arch/data/#records" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>4. Mappers</strong></td>
        <td>Setting up mappers for converting to/from models to records</td>
        <td><a href="arch/data/#mappers" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>5. Repositories</strong></td>
        <td>Using Repositories for common CRUD operations on data</td>
        <td><a href="arch/data/#repos" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>6. Services</strong></td>
        <td>Entity Services for managing data models</td>
        <td><a href="arch/data/#services" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>7. Vendors</strong></td>
        <td>Support for different databases and setup</td>
        <td><a href="arch/data/#vendors" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>8. Schemas</strong></td>
        <td>Defining your data models as schema for auto-mapping</td>
        <td><a href="arch/data/#schemas" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>9. ORM</strong></td>
        <td>Light-weight ORM layer to managing/querying databases</td>
        <td><a href="arch/data/#orm" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>10. Events</strong></td>
        <td>Observing data operations as events</td>
        <td><a href="arch/data/#events" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>11. Migrations</strong></td>
        <td>Dealing with upgrades to schemas</td>
        <td><a href="arch/data/#migrations" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
</table>
{{% section-end mod="arch/data" %}}


## Connections {#connections}
You can setup connections different ways from explicit creation to loading from configuration settings. This uses {{% sk-link-code component="common" filepath="common/data/DbCon.kt" name="DbCon" %}}. The {{% sk-link-code component="common" filepath="common/data/Connections.kt" name="Connections" %}} is used to store multiple connections by name.
{{< highlight kotlin >}}

    // Connection
    // 1. Explicit creation
    val con1 = DbConString(Vendor.MySql.driver, "jdbc:mysql://localhost/default", "user1", "pswd3210")

    // 2. From config
    val cfg = Config.of("env.dev.conf")
    val con2 = cfg.dbCon("db")

    // Connections ( collection of multiple connections )
    // 1. From single connection
    val cons1 = Connections.of(con1)

    // 2. From config: Shortcut for Connections.of(conf.dbCon("db"))
    val cons2 = Connections.from(cfg)

    // 3. From multiple named connections
    val cons3 = Connections.named(
            listOf(
                    Pair("db1", con1),
                    Pair("db2", con2)
            ))

{{< /highlight >}}
{{% feature-end mod="arch/data" %}}

## Databases {#databases}
The {{% sk-link-code component="common" filepath="common/data/IDb.kt" name="IDb" %}} interface provides a thin abstraction over data access calls, particularly JDBC. This makes it useful for abstracting data access to both Server side database calls via JDBC and Android database calls to Sqlite. Another benefit is facilitating unit-testing/mocking of other data related components in Slate Kit. The interface and supporting implementation for JDBC {{% sk-link-code component="db" filepath="db/Db.kt" name="Db" %}} support the typical operations to perform **execute, update, query, scalar, stored proc** calls.
{{< highlight kotlin >}}
     
    val con1 = DbConString(Vendor.MySql.driver, "jdbc:mysql://localhost/default", "user1", "pswd3210")
    val db = Db(con1)

    // Inserts
    val id1 = db.insert("insert into `city`(`name`) values( 'ny' )")
    val id2 = db.insert("insert into `city`(`name`) values( ? )", listOf("ny"))
    val id3 = db.insertGetId("insert into `city`(`name`) values( ? )", listOf("ny")).toLong()

    // Updates
    val updated1 = db.update("update `city` set `alias` = 'nyc' where id = 2")
    val updated2 = db.update("update `city` set `alias` = 'nyc' where id = ?", listOf(id2))

    // Deletes
    val deleted1 = db.update("delete from `city` where id = 2")
    val deleted2 = db.update("delete from `city` where id = ?", listOf(2))

    // Procs
    val procUpdate1 = db.callUpdate("dbtests_activate_by_id", listOf(2))
    val procQuery1 = db.callQuery("dbtests_max_by_id",
            callback = { rs -> rs.getString(0) }, inputs = listOf(id2))

    // Queries ( mapOne, mapMany )
    val city1 = db.mapOne<City>("select * from `city` where id = ?", listOf(1)) { rs ->
        City(rs.getLong("id"), rs.getString("name"), rs.getString("alias"))
    }
    val city2 = db.mapAll<City>("select * from `city` where id < ?", listOf(2)) { rs ->
        City(rs.getLong("id"), rs.getString("name"), rs.getString("alias"))
    }

    // Scalar calls
    val total1 = db.getScalarBool("select isActive from users where userid = ?", listOf(1))
    val total2 = db.getScalarInt("select age from users where userid = ?", listOf(1))
    val total3 = db.getScalarLong("select account from users where userid = ?", listOf(1))
    val total4 = db.getScalarFloat("select salary from users where userid = ?", listOf(1))
    val total5 = db.getScalarDouble("select total from users where userid = ?", listOf(1))
    val total6 = db.getScalarString("select email from users where userid = ?", listOf(1))
    val total7 = db.getScalarLocalDate("select startDate from users where userid = ?", listOf(1))
    val total8 = db.getScalarLocalTime("select startHour from users where userid = ?", listOf(1))
    val total9 = db.getScalarLocalDateTime("select registered from users where userid = ?", listOf(1))
    val total10 = db.getScalarZonedDateTime("select activated from users where userid = ?", listOf(1))

{{< /highlight >}}
{{% feature-end mod="arch/data" %}}

## Records {#records}
Because the Database abstracts over JDBC, there is also a corresponding interface {{% sk-link-code component="common" filepath="common/Record.kt" name="Record" %}} to abstract over JDBC ResultSets ( this is particularly useful for Android ). The implementation for JDBC is {{% sk-link-code component="db" filepath="db/RecordSet.kt" name="RecordSet" %}}
{{< highlight kotlin >}}
     
    // Sample connection/DB
    val con1 = DbConString(Vendor.MySql.driver, "jdbc:mysql://localhost/default", "user1", "pswd3210")
    val db = Db(con1)

    // Record via wrapped JDBC ResultSet
    val city = db.mapOne<City>("select * from `city` where id = ?", listOf(1)) { rs:Record ->
        City(   rs.getLong("id"),
                rs.getString("name"),
                rs.getString("alias")
        )
    }

    // Simulating a Record from a list of key/value pairs
    val record:Record = RecordMap(
            ListMap(
                    listOf(
                            Pair("id", 1L),
                            Pair("uuid", "ABC"),
                            Pair("email", "kishore@abc.com"),
                            Pair("isActive", true),
                            Pair("age", 35),
                            Pair("status", Status.InActive),
                            Pair("salary", 400.5),
                            Pair("uid", UUID.fromString("ad6ec896-bc1e-4430-b13c-88e3d4924a6a")),
                            Pair("createdAt", DateTimes.of(2017, 1, 1, 12, 0, 0, 0))
                            )
            )
    )
    
    // There are getX methods, getXOrNull, getXOrDefault
    println(record.getBool("isActive"))
    println(record.getBoolOrNull("isActive"))
    println(record.getBoolOrElse("isActive", false))
    
    // There are several methods for various types
    println(record.getString("email"))
    println(record.getBool("isActive"))
    println(record.getInt("age"))
    println(record.getLong("id"))
    println(record.getDouble("salary"))
    println(record.getUUID("uuid"))
    println(record.getZonedDateTime("createdAt"))


{{< /highlight >}}
{{% feature-end mod="arch/data" %}}

## Mappers {#mappers}
A {{% sk-link-code component="common" filepath="common/db/Mapper.kt" name="Mapper" %}} simply encodes/decodes a data model to/from records. The {{% sk-link-code component="common" filepath="common/db/Value.kt" name="Values" %}} is simply a container for key/value pairs representing all the fields on the field that can be persisted/saved to a database. You can simply implement the mapping yourself ( explicitly without any reflection ) or use the OrmMapper ( see ORM section ) along with a schema for the Model to leverage automatic mapping.
{{< highlight kotlin >}}

    // Mapper: manual field mapping
    val mapper = object: Mapper<Long, User> {

        override fun encode(model:User, action: DataAction): Values {
            return listOf(
                    Value("id", model.id),
                    Value("firstname", model.firstName),
                    Value("lastname", model.lastName),
                    Value("email", model.email)
            )
        }

        override fun decode(record: Record): User? {
            return User(
                    id = record.getLong("id"),
                    firstName = record.getString("firstname"),
                    lastName = record.getString("lastname"),
                    email = record.getString("email")
            )
        }
    }

{{< /highlight >}}
{{% feature-end mod="arch/data" %}}

## Repository {#repos}
With the databases, records, mappers in place, the next step is to have a {{% sk-link-code component="entities" filepath="entities/Repo.kt" name="Repo" %}} component that can handle the common **CRUD** operations on model. The implementations for these are {{% sk-link-code component="entities" filepath="entities/repos/SqlRepo.kt" name="SqlRepo" %}}
{{< highlight kotlin >}}
    
    // Setup: This is boiler-plate that can be moved
    // to a helper function/builder
    // 1. connection
    // 2. database
    // 3. mapper
    // 4. repo
    // 5. service
    val con = DbConString(Vendor.H2.driver, "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "", "")
    val db = Db.open(con)
    val mapper:Mapper<Long, City> = mapper()
    val repo = Repo.h2<Long, City>(db, mapper)

    // Common CRUD ( Create, Retrieve, Update, Delete ) operations available
    val city = City(0, "Brooklyn", "bk")

    // Create
    val id = repo.create(city)
    repo.save(City(0, "New York", "NYC"))

    // Checks
    repo.any()
    repo.count()

    // Gets
    repo.getAll()
    repo.getById(1)
    repo.getByIds(listOf(1, 2))
    repo.first()
    repo.last()
    repo.recent(10)
    repo.oldest(10)

    // Finds
    val item1 = repo.findOneByField("name", "=", "Brooklyn")
    val items2 = repo.findByField("name", "=", "Brooklyn")
    val items3 = repo.findByFields(listOf(Pair("name", "Brooklyn")))
    val items4= repo.findIn("name", listOf("Queens", "Brooklyn"))
    repo.find(repo.query())

    // Updates
    val updated = city.copy(id = id, name = "Queens")
    repo.update(updated)
    repo.patch(id, listOf(Pair("name", "Queens City"), Pair("alias", "QCity")))
    repo.updateByField("name", "Queens", "Queens City")
    repo.updateField("tag", "test")
    repo.updateByProc("update_alias", listOf(1, "QCity"))

    // Deletes
    repo.deleteAll()
    repo.delete(city)
    repo.deleteById(2)
    repo.deleteByIds(listOf(1, 2))
    repo.deleteByField(City::id.name, Op.Eq, 1)
    repo.deleteByQuery(repo.query().where(City::id.name, Op.Eq, 1))

{{< /highlight >}}
{{% feature-end mod="arch/data" %}}

## Services {#services}
Entity Services expose CRUD operations on your data model in a "managed way" via Service layer. This is to avoid other code/services from directly modifying your models via the Repo/Repositories and for allow you to override various methods to add in your custom logic for CRUD operations. You can also pick and choose which features (Read only, Write only, full CRUD ) you want applicable for your service. This allows using Slate Kit for standardizing **Repositories / Services** 
{{< highlight kotlin >}}

    // Setup: This is boiler-plate that can be moved
    // to a helper function/builder
    // 1. connection
    // 2. database
    // 3. mapper
    // 4. repo
    // 5. service
    val con = DbConString(Vendor.H2.driver, "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "", "")
    val db = Db.open(con)
    val mapper:Mapper<Long, City> = mapper()
    val repo = Repo.h2<Long, City>(db, mapper)
    val service = EntityService<Long, City>(repo)

    // CRUD operations
    val city = City(0, "Brooklyn", "bk")

    // Create
    val id = service.create(city)
    service.save(City(0, "New York", "NYC"))

    // Checks
    service.any()
    service.count()

    // Gets
    service.getAll()
    service.getById(1)
    service.getByIds(listOf(1, 2))
    service.first()
    service.last()
    service.recent(10)
    service.oldest(10)

    // Finds
    val item1 = service.findOneByField(User::email, Op.Eq,"Brooklyn")
    val items2 = service.findByField(City::name, Op.Eq, "Brooklyn")
    val items3 = service.findByFields(listOf(Pair("name", "Brooklyn")))
    val items4= service.findIn(City::name, listOf("Queens", "Brooklyn"))
    val items5 = service.findByQuery(Query().where(City::name.name, Op.Eq, "Brooklyn"))

    // Updates
    val updated = city.copy(id = id, name = "Queens")
    service.update(updated)
    service.patch(id, listOf(Pair("name", "Queens City"), Pair("alias", "QCity")))
    service.updateByField(City::name, "Queens", "Queens City")
    service.updateField(City::name, "test")
    service.updateByProc("update_alias", listOf(1, "QCity"))

    // Deletes
    service.deleteAll()
    service.delete(city)
    service.deleteById(2)
    service.deleteByIds(listOf(1, 2))
    service.deleteByField(City::id, Op.Eq, 1)
    service.deleteByQuery(Query().where(City::id.name, Op.Eq, 1))

{{< /highlight >}}
{{% feature-end mod="arch/data" %}}

## Schemas {#schemas}
You can set up auto-mapping of models to/from records using the Slate Kit Model Schemas. This leverages Kotlins Property references for safely get the name/type information and stores the definition of a model. This model is then supplied to a Mapper to auto-map the model to Values for inserts/updates, and for mapping Records back to the instance. There are 2 ways set up the schema, either explicitly construction or with annotations.

### Construct
Explicitly setup of a Model/Schema
{{< highlight kotlin >}}
     
    import slatekit.meta.Schema

    // OPTION 1: Explicit Schema Setup
    // Uses property references for strongly typed setup
    // Also, can use KType to get if field is required ( via isMarkedNullabel )
    object UserSchema : Schema<Long, User>(Long::class, User::class, "user") {
        val id         = id    (User::id        )
        val email      = field  (User::email     , min = 10, max = 50, indexed = true)
        val first      = field  (User::first     , min = 10, max = 50)
        val last       = field  (User::last      , min = 10, max = 50)
        val age        = field  (User::age       )
        val salary     = field  (User::salary    )
        val active     = field  (User::active    )
        val registered = field  (User::registered)
        val createdAt  = field  (User::updatedAt , category = FieldCategory.Meta)
        val updatedAt  = field  (User::updatedAt , category = FieldCategory.Meta)
    }

    // Access the model which stores all the fields
    val model = UserSchema.model

    // Iterate over the models
    model.fields.forEach {
        println("field: name=${it.name}, ${it.storedName}, ${it.isRequired}, ${it.dataTpe}")
    }

{{< /highlight >}}

### Annotations
You can also use annotations at the source of the data model.
{{< highlight kotlin >}}
     
    data class User(
        @property:Id()
        override val id:Long = 0L,

        @property:Field(length = 30)
        val email:String = "",

        @property:Field(length = 30)
        val first:String = "",

        @property:Field(length = 30)
        val last:String = "",

        @property:Field()
        val isMale:Boolean = false,

        @property:Field()
        val age:Int = 35,

        @property:Field()
        val active:Boolean = false,

        @property:Field()
        val salary:Double = 100.00,

        @property:Field()
        val registered:DateTime? = null

    ) : EntityWithId<Long> {

        override fun isPersisted(): Boolean = id > 0
    }

    // Access the model which stores all the fields
    val model = ModelMapper.loadSchema(User::class)

    // Iterate over the models
    model.fields.forEach {
        println("field: name=${it.name}, ${it.storedName}, ${it.isRequired}, ${it.dataTpe}")
    }

{{< /highlight >}}

{{% feature-end mod="arch/data" %}}

## ORM {#orm}
By having the models defined with a schema, we can then set up the auto-mapping of models. This builds the Entity Service using all the individual parts shown from prior examples.
{{< highlight kotlin >}}

    // Setup: This is boiler-plate that can be moved
    // to a helper function/builder
    // 1. connection
    // 2. database
    // 3. mapper
    // 4. repo
    // 5. service
    val con = DbConString(Vendor.H2.driver, "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "", "")
    val db = Db.open(con)
    val model = UserSchema.model
    val mapper:Mapper<Long, City> = OrmMapper<Long, City>(model, db, Long::class, City::class)
    val repo = Repo.h2<Long, City>(db, mapper)
    val service = EntityService<Long, City>(repo)

    service.save(City(0, "New York", "NYC"))

    // CRUD operations
    service.any()
    service.count()
    service.getById(1)

{{< /highlight >}}
{{% feature-end mod="arch/data" %}}

## Events {#events}
Functionality available, docs coming soon.
{{< highlight kotlin >}}

    // COMING SOON

{{< /highlight >}}
{{% feature-end mod="arch/data" %}}

## Migrations {#migrations}
Functionality available, docs coming soon.
{{< highlight kotlin >}}

    // COMING SOON

{{< /highlight >}}
{{% feature-end mod="arch/data" %}}

{{% section-end mod="arch/data" %}}

<script>
    var archComponent = {
        name: "Data",
        page: "arch/data",
        icon: "assets/media/img/white/layers.png",
        menu: {
            mode: "normal",
            useTemplate:true,
            sections: [
                {
                    name: "Guide",
                    items: [
                        { name:"Connections" , anchor: "#connections" },
                        { name:"Databases" , anchor: "#databases"  },
                        { name:"Records", anchor: "#records" },
                        { name:"Mappers" , anchor: "#mappers"  },
                        { name:"Repos" , anchor: "#repos"  },
                        { name:"Services" , anchor: "#services"  },
                        { name:"Vendors" , anchor: "#vendors"  },
                        { name:"Schemas" , anchor: "#schemas"  },
                        { name:"ORM" , anchor: "#orm"  },
                        { name:"Events" , anchor: "#events"  },
                        { name:"Migrations" , anchor: "#migrations"  }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>

