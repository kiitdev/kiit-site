---
title: "Features"
date: 2019-03-17T14:30:52-04:00
section_header: Archtecture Components
layout : "overview"
---

# Overview
Kiit offers <strong>several features</strong> as modular <strong>Architecture components</strong>. These are designed as a collection of Kotlin libraries that help you to quickly build fully featured, testable, 
and scalable applications on the JVM. Several of the modules can be used for both **Server and Android**. Click any of the modules below for more info.

 <div class="alert alert-info" role="alert">
<strong>TAGS</strong>
<br/>
1. The <span class="badge badge-light">Server</span> tag indicates that the component is a runnable application and meant to be used on the <strong>Server</strong>.<br/>
2. The <span class="badge badge-light">Full Stack</span> tag indicates that the component is a library and can be used for both <strong>Android</strong> and <strong>Server</strong>.<br/>
3. The <span class="badge badge-success">Stable</span> tag indicates the module is a <strong>stable</strong> release. <br/>
4. The <span class="badge badge-primary">Beta</span> tag indicates a module still in <strong>Beta</strong>, but soon to become a stable release.<br/>
5. The <span class="badge badge-warning">Internal</span> tag indicates a module that is for internal use only <strong>( these may be replaced by other open-source libraries )</strong><br/>

</a>
</div>

<section id="services" class="integration">
  <div class="container">
      <div class="row text-center">
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/results"><img src="assets/media/img/white/target.png" alt="" class="img-fluid" /></a>
              <div><a href="arch/results"><h3>Results</h3></a></div>
              <p>Models <strong>successes and failures</strong> with <strong>optional</strong> sub-categories of errors with codes. Works with exceptions, validations.
                 See {{% sk-link-arch name="results" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/app"><img src="assets/media/img/white/desktop.png" alt="" class="img-fluid"></a>
              <div><a href="arch/app"><h3>App</h3></a></div>
              <p>An general purpose <strong>App template</strong> with support for environments, logging, configs, diagnostics, help usage and more. See {{% sk-link-arch page="app" name="App" %}} 
              </p>
              <span class="badge badge-light">Server</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/apis"><img src="assets/media/img/white/webapi.png" alt="" class="img-fluid"></a>
              <div><a href="arch/apis"><h3>APIs</h3></a></div>
              <p>A simple, intuitive, <strong>protocol independent</strong> approach to building APIs so they run as Web APIs or on the CLI. See {{% sk-link-arch page="apis" name="APIs" %}} 
              </p>
              <span class="badge badge-light">Server</span>
              <span class="badge badge-primary">Beta</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/actors"><img src="assets/media/img/white/gears.png" alt="" class="img-fluid"></a>
              <div><a href="arch/actors"><h3>Actors</h3></a></div>
              <p>A micro actor library with support for pausable actors to gracefully start, stop, pause and resume actors.
                See {{% sk-link-arch page="actors" name="Actors" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-danger">To be removed!</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/cli"><img src="assets/media/img/white/terminal.png" alt="" class="img-fluid"></a>
              <div><a href="arch/cli"><h3>CLI</h3></a></div>
              <p>Command line interface to handle actions in an interactive way. Has customization and formatting features. See {{% sk-link-arch page="cli" name="CLI" %}} </a>.
              </p>
              <span class="badge badge-light">Server</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/cache"><img src="assets/media/img/white/lightning.png" alt="" class="img-fluid"></a>
              <div><a href="arch/cache"><h3>Cache</h3></a></div>
              <p>Light-weight cache with an emphasis towards diagnostics, and a synchronous or async Channel based APIs. See {{% sk-link-arch page="cache" name="Cache" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <!--
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="core/kotlin-cmd.html"><img src="assets/media/img/white/command2.png" alt="" class="img-fluid"></a>
              <div><a href="core/kotlin-cmd.html"><h3>Commands</h3></a></div>
              <p>A variation to the command pattern to support ad-hoc execution of code, 
                with support for metrics and time-stamps. 
                See <a class="url-ch" href="core/kotlin-cmd.html">example</a> 
              </p>
            </div>
          </div>
        -->
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/context"><img src="assets/media/img/white/connected.png" alt="" class="img-fluid"></a>
              <div><a href="arch/context"><h3>Context</h3></a></div>
              <p>An application context to hold common dependencies like command line args, envs, configs, logger, encryptor, etc, 
                 See {{% sk-link-arch page="context" name="Context" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/data"><img src="assets/media/img/white/layers.png" alt="" class="img-fluid"></a>
              <div><a href="arch/data"><h3>Data</h3></a></div>
              <p>Light-weight, domain-driven entity framework with optional ORM. You can use the Entity Interfaces and code without the ORM. See {{% sk-link-arch page="data" name="Data" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/files"><img src="assets/media/img/white/folders.png" alt="" class="img-fluid"></a>
              <div><a href="arch/files"><h3>Files</h3></a></div>
              <p>A simplified interface and abstraction for persistent file storage. Default implementation available in <strong>AWS S3</strong> See {{% sk-link-arch page="files" name="Files" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/generators"><img src="assets/media/img/white/prototype.png" alt="" class="img-fluid"></a>
              <div><a href="arch/generators"><h3>Generator</h3></a></div>
              <p>Command Line Project generator with extensible templates to quickly create new or custom apps. See {{% sk-link-arch page="generators" name="Generators" %}} 
              </p>
              <span class="badge badge-light">Server</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/jobs"><img src="assets/media/img/white/gears.png" alt="" class="img-fluid"></a>
              <div><a href="arch/jobs"><h3>Jobs</h3></a></div>
              <p>Background Jobs/Task queue system for one-off, paged, and queued jobs with middleware support and diagnostics.
                See {{% sk-link-arch page="jobs" name="Jobs" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-primary">Beta</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/email"><img src="assets/media/img/white/speaker.png" alt="" class="img-fluid"></a>
              <div><a href="arch/email"><h3>Notifications</h3></a></div>
              <p>Send alerts, emails, sms, push messages with optional templates. Works with Slack, SendGrid, Twilio.
                 See samples for {{% sk-link-arch page="email" name="Email" %}} and {{% sk-link-arch page="sms" name="SMS" %}} 
              </p>
              <span class="badge badge-light">Server</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/queues"><img src="assets/media/img/white/queue.png" alt="" class="img-fluid"></a>
              <div><a href="arch/queues"><h3>Queues</h3></a></div>
              <p>A simplified interface and abstraction for persistent queues. 
                Support for <strong>AWS SQS</strong> and in-memory queue. See {{% sk-link-arch page="queues" name="Queues" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="arch/tracking"><img src="assets/media/img/white/diagnostic.png" alt="" class="img-fluid"></a>
              <div><a href="arch/tracking"><h3>Tracking</h3></a></div>
              <p>Support for diagnostics and tracking of runtime values and recording of events. This supplements typical metrics libraries. See {{% sk-link-arch page="tracking" name="Tracking" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="utils/overview"><img src="assets/media/img/white/multitool.png" alt="" class="img-fluid"></a>
              <div><a href="utils/overview"><h3>Utilities</h3></a></div>
              <p>A large suite of common code / utilities to supplement the Standard Library with items like Args, Envs, Configs etc. {{% sk-link-util page="overview" name="Utilities" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-success">Stable</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="utils/http"><img src="assets/media/img/white/webapi.png" alt="" class="img-fluid"></a>
              <div><a href="utils/http"><h3>HTTP</h3></a></div>
              <p>A simple and thin HTTP library that is a wrapper on top of <strong>OkHTTP</strong> to make declaritive  RPC like calls over HTTP. For internal use only {{% sk-link-util page="overview" name="Utilities" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-warning">Internal use</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="utils/reflect"><img src="assets/media/img/white/search.png" alt="" class="img-fluid"></a>
              <div><a href="utils/reflect"><h3>Meta</h3></a></div>
              <p>A collection of various Reflection and Meta programming utilites and components. Used to support other libraries in this tool set. {{% sk-link-util page="overview" name="Utilities" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-warning">Internal use</span>
            </div>
          </div>
          <div class="col-md-4 wow fadeInUp">
            <div class="box text-center">
              <a href="utils/serialization"><img src="assets/media/img/white/print.png" alt="" class="img-fluid"></a>
              <div><a href="utils/serialization"><h3>Serialization</h3></a></div>
              <p>Library for serialization of a single object or a set of values. Handles custom use-cases, but may be replaced by <strong>Mocha</strong> {{% sk-link-util page="overview" name="Utilities" %}} 
              </p>
              <span class="badge badge-light">Full Stack</span>
              <span class="badge badge-warning">Internal use</span>
            </div>
          </div>
      </div>
  </div>
</section>
<br/><br/>
<img src="assets/app/media/arch/kiit-overview.png" class="rounded mx-auto d-block img-fluid" />




