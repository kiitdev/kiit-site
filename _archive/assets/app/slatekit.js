
function buildArchMenuCommon() {
    return [
        {
            name: "Overview",
            items: [
                { name:"About" , anchor: "#about" },
                { name:"Goals" , anchor: "#goals" },
                { name:"Status", anchor: "#status" }
            ]
        },
        {
            name: "Setup",
            items: [
                { name:"Install" , anchor: "#install" },
                { name:"Sources", anchor: "#sources" },
                { name:"Example" , anchor: "#example", highlight:true }
            ]
        }
    ];
}

function buildArchComponent(archComp) {
    // Set name, link, icon
    console.log("setting up component");
    $("#sk_arch_component_name").text(archComp.name);
    $("#sk_arch_component_img").attr("src",archComp.icon);
    $("#sk_arch_component_link").attr("href", archComp.page);

    if(archComp.menu.useTemplate) {
        var common = buildArchMenuCommon();
        var all = common.concat(archComp.menu.sections);
        archComp.menu.sections = all;
    }

    var sections = "";
    for (ndxSection = 0; ndxSection < archComp.menu.sections.length; ndxSection++) { 
        var section = archComp.menu.sections[ndxSection]; 
        sections += buildArchMenuSection(archComp, section);
    } 
    console.log(sections);
    $("#sk_arch_component_menu_sections").html(sections);
}


function buildArchMenuSection(archComp, section) {
    var start = '<div class="sidebar-nav-item">' 
        + '<div class="sidebar-section">' + section.name + '</div>'
        + '<ul style="display: block;">';
    var links = "";
    for (ndxItem = 0; ndxItem < section.items.length; ndxItem++) { 
        var link = section.items[ndxItem];
        links += buildArchMenuLink(archComp, link);
    }
    var end = '</ul><hr></div>';
    return start + links + end;
} 


function buildArchMenuLink(archComp, link) {
    // Build template 
    var text = link.name;
    if(link.highlight && link.highlight === true) {
        text = "<strong>" + link.name + "</strong>";
    }
    var name = "<span>" + text + "</span>";
    var href = '<a href="' + archComp.page + link.anchor + '">'
    var link = '<li>' + href + name + '</a></li>';
    return link
} 