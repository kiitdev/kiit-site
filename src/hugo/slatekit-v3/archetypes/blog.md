---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
section_header: "{{ replace .Name "-" " " | title }}"
description: ""
tags: []
draft: true
---

Write a 1-3 sentence intro/hook here.

## Overview {#overview}
Start writing here. Add more `## Heading {#anchor}` sections as needed, and add a matching
`{ name: "...", anchor: "#..." }` entry to the archComponent script below for each one.

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
                        { name: "Overview", anchor: "#overview" }
                    ]
                }
            ]
        }
    };

    function setupArchComponent() {
        buildArchComponent(archComponent);
    }
</script>
