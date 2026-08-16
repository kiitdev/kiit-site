---
title: Kotlin101
date: 2019-03-17T13:02:30-04:00
section_header: Kotlin
---


# Basics
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Name</strong></td>
        <td><strong>Description</strong></td>
        <td><strong>More</strong></td>
    </tr>
    <tr>
        <td><strong>package</strong></td>
        <td>how to declare a package</td>
        <td><a href="start/kotlin101/#package" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>main</strong></td>
        <td>a simple main method as the entry point for your app</td>
        <td><a href="start/kotlin101#main" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>import</strong></td>
        <td>the different ways to import components</td>
        <td><a href="start/kotlin101#import" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>vals</strong></td>
        <td>declare immutable values of different data types</td>
        <td><a href="start/kotlin101#vals" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>vars</strong></td>
        <td>declare mutable variables of different data types</td>
        <td><a href="start/kotlin101#vars" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
</table>
<br/>

# 1. Basics

## Package
Declaring your code in a pacakge
{{< highlight kotlin >}}
  package slatekit.common.log

  class Logger {
  
      // ...
   
  }
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}


## Main
Simple main method as entry point into application. use println to print to the system console
{{< highlight kotlin >}}
  package slatekit.samples.sampleapp1

  fun main(args: Array<String>): Unit {
      println("hello world")
  }
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}


## Import
You can import items from a package in various ways, 1 item, multiple items, all items from a package, or functions from a module
{{< highlight kotlin >}}
  // 1. Import 1 item from a package 
  import slatekit.common.log.Logger
  
  // 2. Import all items from a pacakge using "*"
  import slatekit.common.log.*
  
  // 3. Import 1 method ( string6 ) from an Object ( Random )
  // NOTE: An object is essentially a Singleton class 
  import slatekit.common.Random.string6
  
  fun main(args:Array<String>):Unit {
      println(string6())
  }
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}


## Vals
Constants / immutable values are declared using val
{{< highlight kotlin >}}
  val name = "john doe"
  val age = 35
  val account = 1234567890L
  val isActive = false
  val salary = 20.5
  val date = LocalDateTime.now()
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}


## Vars
Variables are declared using var
{{< highlight kotlin >}}
  var name = "john doe"
  var age = 35
  var account = 1234567890L
  var isActive = false
  var salary = 20.5
  var date = LocalDateTime.now()
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}


# 2. Types

## Data types
You can declare types simply using the values (in which case the type is inferred), or by explicitly specifying the type name. To indicate a value can be null, use the ? operator
{{< highlight kotlin >}}
  // Inferred  
  val name1     = "john doe"
  val age1      = 35
  val account1  = 12345678901L
  val isActive1 = false
  val salary1   = 20.5
  val date1     = LocalDateTime.now()
  val pair1     = Pair("john doe", 35)
  val range1    = 1..4
  val list1     = listOf("a", "b", "c")
  val map1      = mapOf("a" to 1, "b" to 2)

  // Explicit  
  val name2    : String            = "john doe"
  val age2     : Int               = 35
  val account2 : Long              = 12345678901L
  val isActive2: Boolean           = false
  val salary2  : Double            = 20.5
  val date2    : LocalDateTime     = LocalDateTime.now()
  val pair2    : Pair<String, Int> = Pair("john doe", 35)
  val range2   : IntRange          = 1..4
  val list2    : List<String>      = listOf("a", "b", "c")
  val map2     : Map<String,Int>   = mapOf("a" to 1, "b" to 2)

  // Nullable via "?"  
  val name3    : String?            = "john doe"
  val age3     : Int?               = 35
  val account3 : Long?              = 12345678901L
  val isActive3: Boolean?           = false
  val salary3  : Double?            = 20.5
  val date3    : LocalDateTime?     = LocalDateTime.now()
  val pair3    : Pair<String, Int>? = Pair("john doe", 35)
  val range3   : IntRange?          = 1..4
  val list3    : List<String>?      = listOf("a", "b", "c")
  val map3     : Map<String,Int>?   = mapOf("a" to 1, "b" to 2)
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}


## Strings
Basic String operations and string interpolation ( referencing of other values/expressions inside a string )
{{< highlight kotlin >}}
  // 1. Declaring strings
  val name = "john doe"

  // 2. Adding strings together
  val fullName = "Clark" + ", Kent"
  
  // 3. Getting a char position in a string e.g. 1st pos
  val c1 = "Batman"[0]
  
  // 4. Convert strings to other types
  val age     = "30".toInt()
  val isActive  = "true".toBoolean()
  val salary  = "20.5".toDouble()
  
  // 5. String interpolation
  val account = 1234567890L
  val date = LocalDateTime.now()  
  val info1 = "$name $age $account $isActive $salary $date"
  println( info1 )
  
  // 6. String interpolation ( with braces )
  // Use this explicit approach when you dont have spaces
  val info2 = "${name}${age}${account}${isActive}${salary}${date}"
  println( info2 )
  
  // 7. String interpolation with more expressions
  val info3 = "${name} salary is now ${salary + 200} start on ${date}"
  println( info3 )
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}


## Multiline strings
Multiline strings are enclosed with triple quotes """
{{< highlight kotlin >}}
  // 1. Space / indentation is preserved
  val example1 = """ app.users.activate
          - userid: number ( required )
          - phone : string ( required )
          - email : string ( required )
       """
  
  // 2. Indentation is stripped and next line starts after "|"
  val example2 = """ app.users.activate
         | - userid: number ( required )
         | - phone : string ( required )
         | - email : string ( required )
         | """.trimIndent()

  // 3. Indentation is stripped and next line starts after "#"
  val example3 = """ app.users.activate
         # - userid: number ( required )
         # - phone : string ( required )
         # - email : string ( required )
         # """.trimMargin("#")
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}


## Enums
Enumerations
{{< highlight kotlin >}}
  enum class LogLevel {
      DEBUG, INFO, WARN, ERROR, FATAL
  }
  
  enum class LogLevel2(val level:Short) {
      DEBUG(1), INFO(2), WARN(3), ERROR(4), FATAL(5)
  }
  
  fun showEnums():Unit {
      println(LogLevel.DEBUG)
      println(LogLevel.DEBUG.name)
      println(LogLevel.DEBUG.ordinal)
  
      println(LogLevel2.WARN)
      println(LogLevel2.WARN.name)
      println(LogLevel2.WARN.ordinal)
      println(LogLevel2.WARN.level)
  }
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}


## Dates/Times
Date and time using Java 8
{{< highlight kotlin >}}
  // Refer to Java 8 Date/Time classes
{{< /highlight >}}
{{% feature-end mod="start/kotlin101" %}}
