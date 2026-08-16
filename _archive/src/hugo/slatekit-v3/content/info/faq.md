---
title: "FAQ"
date: 2019-03-17T13:02:30-04:00
draft: true
section_header: FAQ
---


# FAQ Index
More faq topics/sections coming soon.

<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Area</strong></td>
        <td><strong>Description</strong></td>
        <td><strong>More</strong></td>
    </tr>
    <tr>
        <td><strong>Setup</strong></td>
        <td>Trouble with setup</td>
        <td><a href="/info/faq#setup_trouble" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>-</strong></td>
        <td>What are the dependencies</td>
        <td><a href="/info/faq#setup_dependencies" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Starting</strong></td>
        <td>How do I get started?</td>
        <td><a href="/info/faq#starting_start" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>-</strong></td>
        <td>What does the Slate Kit CLI tool do?</td>
        <td><a href="/info/faq#starting_cli" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Modules</strong></td>
        <td>What are all the modules available</td>
        <td><a href="/info/faq#modules_list" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>-</strong></td>
        <td>Which modules are for server side</td>
        <td><a href="/info/faq#modules_server" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>-</strong></td>
        <td>Which modules are for android</td>
        <td><a href="/info/faq#modules_android" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>-</strong></td>
        <td>What are the dependencies of each module</td>
        <td><a href="/info/faq#modules_dependencies" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>Help</strong></td>
        <td>How do I get help?</td>
        <td><a href="/info/faq#help_overview" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>-</strong></td>
        <td>How do I submit an idea or issue?</td>
        <td><a href="/info/faq#help_submit" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
    <tr>
        <td><strong>-</strong></td>
        <td>How do I get updates?</td>
        <td><a href="/info/faq#help_updates" class="more"><span class="btn btn-primary">more</span></a></td>
    </tr>
</table>
{{% break %}}


<section class="about">
  <div class="container">
      <div class="row ">
          <div class="text">
            <h1>Setup</h1><br/>
            <a id="setup_trouble" />
            <h3>1. Trouble with setup</h3>
            <p>
            Check the <a href="/start/setup">Setup</a> page for details. You can reach us on Git, Gitter for discussions, and Twitter for more info.
            </p>
            <a id="setup_dependencies" />
            <h3>2. What are the dependencies</h3>
            <p>Dependencies vary by module. Each module has a setup#sources section with a link to the build.gradle containing the list of all dependencies for that module. In general, external dependencies include Logback for logs, Micrometer.io for metrics, json-simple for JSON, ThreeTenBP for Date/Time libraries. This is meant to ensure Slate Kit libraries work for both Server and Android. These dependencies are <strong>ONLY</strong> used if the respective Slate Kit module depends on them.
            </p>
          </div>
      </div>
  </div>
</section>

<section class="about">
  <div class="container">
      <div class="row ">
          <div class="text">
            <h1>Starting</h1><br/>
            <a id="starting_start" />
            <h3>1. How do I get started?</h3>
            <p>
            Check the <a href="/start/hello_world">Hello World</a> page for to get started to create a sample app using the Slate Kit CLI tool.
            </p>
            <a id="starting_cli" />
            <h3>2. What does the Slate Kit CLI tool do?</h3>
            <p>The Slate Kit CLI tool is a project generator / scaffolding tool to generate project using predefined templates. See <a href="/start/generators">Generator</a> page for more details.
            </p>
          </div>
      </div>
  </div>
</section>

<section class="about">
  <div class="container">
      <div class="row ">
          <div class="text">
            <h1>Modules</h1><br/>
            <a id="modules_list" />
            <h3>1. What are the modules available?</h3>
            <p>All the modules are listed on the <a href="arch/overview">Components</a> page.
            </p>
            <a id="modules_server" />
            <h3>2. What modules are available for server side?</h3>
            <p>
            There is a badge called <span class="badge badge-light">Server</span> on the <a href="arch/overview">Components</a> page that indicates that a module is for server side use only.
            </p>
            <a id="modules_android" />
            <h3>3. What modules are available for server side?</h3>
            <p>
            There is a badge called <span class="badge badge-light">Android / Server</span> on the <a href="arch/overview">Components</a> page that indicates that a module is for both Android and Server side use only.
            </p>
            <a id="modules_dependencies" />
            <h3>4. What are the dependencies on the modules?</h2>
            <p>
            Each module has a setup#sources section with a link to the build.gradle file containing the dependencies on the module. Typically, each Slate Kit module depends on the <a href="arch/results">Results</a> and <a href="utils/overview">Utils</a> modules. 
            </p>
          </div>
      </div>
  </div>
</section>

<section class="about">
  <div class="container">
      <div class="row ">
          <div class="text">
            <h1>Help</h1><br/>
            <a id="help_overview" />
            <h3>1. How to get help?</h3>
            <p>
            Check the <a href="/info/contact">Contact</a> page for details. You can reach us on Git, Gitter for discussions, and Twitter. We will try to get back to you as soon as we can.
            </p>
            <a id="help_submit" />
            <h3>2. How to submit ideas/issues?</h3>
            <p>Log any issues on <a href="https://github.com/slatekit/slatekit/issues">Git Issues</a>. There are issue templates for bugs/features.
            </p>
            <a id="help_updates" />
            <h3>3. How to get updates?</h3>
            <p>Follow us on twitter ( link on <a href="/info/contact">Contact</a> page ) and check the <a href="/info/updates">Updates</a> page. 
            </p>
          </div>
      </div>
  </div>
</section>
