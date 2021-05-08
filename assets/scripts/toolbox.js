current_tool = null;
primary_color = "#000000";
secondary_color = "#FFFFFF";

function setup()
{
    //load in icons
    var tools = document.getElementById("tools").children;
    for(var i = 0; i < tools.length; i++)
    {
        tools[i].style.backgroundImage = "url('./assets/toolbar/"+tools[i].id+".png')";
        tools[i].className = "unselected"
    } 

    //add colors to color picker
    var top_row = document.getElementById("palette-top-row");
    top_row.addEventListener("contextmenu", e => e.preventDefault());
    var top_default_colors = ["#000000", "#808080", "#800000", "#808000", "#008000", "#008080", 
    "#000080", "#800080", "#808040", "#004040", "#0080FF", "#004080", "#8000FF", "#804000"];

    for(var i = 0; i < top_default_colors.length; i++)
    {
        let box_color = document.createElement("div");
        box_color.className = "color-boxes";
        box_color.style.backgroundColor = top_default_colors[i];
        box_color.id = top_default_colors[i];
        box_color.setAttribute("onclick", "set_primary_color(this.id)");
        box_color.setAttribute("oncontextmenu", "set_secondary_color(this.id)");
        box_color.addEventListener("contextmenu", e => e.preventDefault());
        top_row.appendChild(box_color);
    }

    var bottom_row = document.getElementById("palette-bottom-row");
    bottom_row.addEventListener("contextmenu", e => e.preventDefault());
    var bottom_default_colors = ["#FFFFFF", "#C0C0C0", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF", 
    "#0000FF", "#FF00FF", "#FFFF80", "#00FF80", "#80FFFF", "#8080FF", "#FF0080", "#FF8040"];

    for(var i = 0; i < bottom_default_colors.length; i++)
    {
        let box_color = document.createElement("div");
        box_color.className = "color-boxes";
        box_color.style.backgroundColor = bottom_default_colors[i];
        box_color.id = bottom_default_colors[i];
        box_color.setAttribute("onclick", "set_primary_color(this.id)");
        box_color.setAttribute("oncontextmenu", "set_secondary_color(this.id)");
        box_color.addEventListener("contextmenu", e => e.preventDefault());
        bottom_row.appendChild(box_color);
    }

    //fill canvas with white by default
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("contextmenu", e => e.preventDefault());
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function toolbox_handler(id)
{
    var tools = document.getElementById("tools").children;
    for(var i = 0; i < tools.length; i++)
    {
        tools[i].className = "unselected";
    }

    current_tool = id;
    document.getElementById(id).className = "selected";
}

function set_primary_color(id)
{
    primary_color = id;
}

function set_secondary_color(id)
{
    secondary_color = id;
    return false;
}