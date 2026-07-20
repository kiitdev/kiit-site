---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
section_header: "{{ replace .Name "-" " " | title }}"
description: ""
tags: []
draft: true
---

# Overview {#overview}
Write a 1-3 sentence intro/hook here.
{{% section-end mod="blog/{{ .Name }}" %}}

# Next Section {#next-section}
Start writing here. Add more `# Heading {#anchor}` sections as needed, closing each one with
`{{%/* section-end mod="blog/{{ .Name }}" */%}}` for spacing and a "Back to top" link, and add a
matching `{ name: "...", anchor: "#..." }` entry to the archComponent script below for each one.
{{% section-end mod="blog/{{ .Name }}" %}}

<script>
    var archComponent = {
        name: "{{ replace .Name "-" " " | title }}",
        page: "blog/{{ .Name }}",
        icon: "assets/media/img/white/notes.png",
        menu: {
            mode: "normal",
            useTemplate: false,
            sections: [
                {
                    name: "In this post",
                    items: [
                        { name: "Overview", anchor: "#overview" },
                        { name: "Next Section", anchor: "#next-section" }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>
