
[![WebSite](https://img.shields.io/badge/site-slatekit-blue)](https://www.kiit.dev)
![Kotlin](https://img.shields.io/badge/kotlin-1.3-orange.svg)
![Apache 2](https://img.shields.io/badge/license-Apache2-brightgreen.svg?style=flat)
![BSL ](https://img.shields.io/badge/license-bsl__1.0-yellow.svg?style=flat)
[![Follow us on twitter](https://img.shields.io/badge/twitter-slatekit-blue.svg)](https://twitter.com/slatekit)
![image](assets/media/slatekit-banner.png)

# About
Sources for the www.kiit.dev Website

Kiit is a **Kotlin** Tool-Kit, a simple, light-weight, modular framework to build Apps, APIs, CLIs, Jobs, and more for **Start-ups, Personal projects, and SMBs** ( small-medium sized businesses ). These libraries can be used for both Server and Android and there are modules for the server that abstract infrastructure ( Queues, Files, SMS, Emails, Alerts ) with integrations for **AWS** ( SQS, S3 ), Twilio ( SMS ), SendGrid ( Email ), Slack ( Alerts ) and more. Multi-platform support is planned as a future state.

This contains all the source code for generating www.kiit.dev site content. 
This uses a static site generator ( Hugo ) and most of the content is in markdown.
It is automatically published via github-pages. 

# Links
num | type | link 
----|-----|------
1 | Website   | https://www.kiit.dev
2 | Framework | https://github.com/slatekit/kiit
3 | Modules   | https://www.kiit.dev/arch/overview/
4 | Install   | https://github.com/slatekit/slatekit-cli ( Homebrew )


# Install
1. Hugo ( see https://gohugo.io/getting-started/installing/ )
2. Clone this repo ( git clone git@github.com:code-helix/kiit-site.git )

# Develop
Currently, the root directory of the hugo theme/site is at **src/hugo/slatekit-v3**

```bash
# Move to dir
cd ~/git/kiit/kiit-site/src/hugo/slatekit-v3

# Run hugo while serving drafts
hugo serve -D 

# Go to http://localhost:1313/
```

# Publish
Make changes on a separate branch e.g **docs-version-1.20.0** and then merge to main/master.

1. Move to directory `cd ~/git/kiit-site/src/hugo/slatekit-v3`
2. Generate site `hugo`
3. Content is at `~/git/kiit-site/src/hugo/slatekit-v3/public`
4. Copy content to root directory e.g. `public/info` -> `~/git/kiit-site/info`
5. Publish your branch
6. Create a PR to merge your branch to main/master.
7. After the merge to main/master, the site will automatically update(delayed due to cached content)


# Folders

name | purpose | location 
--|---|---
theme   | theme for site   | src/hugo/slatekit-v3/themes/wavo
content | content for page | src/hugo/slatekit-v3/content/start/overview
assets  | js,css,img       | src/hugo/slatekit-v3/themes/wavo/static/assets
shortcodes   | reusable html | src/hugo/slatekit-v3/themes/layouts/shortcodes/sk-modules.html

