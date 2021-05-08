current_tool = null;
primary_color = "#000000";
secondary_color = "#FFFFFF";
mouseX = 0;
mouseY = 0;

var help_strings = [
    "Selects a free-form part of the picture to move, copy, or edit.",
    "Selects a rectangular part of the picture to move, copy, or edit.",
    "Erases a portion of the picture, using the selected eraser shape.",
    "Fills an area with the current drawing color.",
    "Picks up a color from the picture for drawing.",
    "Changes the magnification.",
    "Draws a free-form line one pixel wide.",
    "Draws using a brush with the selected shape and size.",
    "Draws using an airbrush of the selected size.",
    "Inserts text into the picture.",
    "Draws a straight line with the selected line width.",
    "Draws a curved line with the selected line width.",
    "Draws a rectangle with the selected fill style.",
    "Draws a polygon with the selected fill style.",
    "Draws an ellipse with the selected fill style.",
    "Draws a rounded rectangle with the selected fill style."
];

var tools_tool_tips = [
    "Free-Form Select",
    "Select",
    "Erase/Color Eraser",
    "Fill With Color",
    "Pick Color",
    "Magnifier",
    "Pencil",
    "Brush",
    "Airbrush",
    "Text",
    "Line",
    "Curve",
    "Rectangle",
    "Polygon",
    "Ellipse",
    "Rounded Rectangle"
];

function setup()
{
    //load in icons
    var tools = document.getElementById("tools").children;
    for(var i = 0; i < tools.length; i++)
    {
        tools[i].style.backgroundImage = "url('./assets/toolbar/"+tools[i].id+".png')";
        tools[i].className = "unselected"
        tools[i].setAttribute("onmouseover", "help_text(this.id)");
        tools[i].setAttribute("onmouseout", "help_reset()");
        tools[i].setAttribute("data-index", i);
        tools[i].setAttribute("title", tools_tool_tips[i]);
    } 

    //add colors to color picker
    //get palette top row element
    var top_row = document.getElementById("palette-top-row");
    //disable right click menu
    top_row.addEventListener("contextmenu", e => e.preventDefault());
    //list default colors
    var top_default_colors = ["#000000", "#808080", "#800000", "#808000", "#008000", "#008080", 
    "#000080", "#800080", "#808040", "#004040", "#0080FF", "#004080", "#8000FF", "#804000"];

    //add an element for each color in the default color list, set it's id to it's respective color,
    //disable right click, then add to parent element
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

    //get palette bottom row element
    var bottom_row = document.getElementById("palette-bottom-row");
    //disable right click menu
    bottom_row.addEventListener("contextmenu", e => e.preventDefault());
    //list default colors
    var bottom_default_colors = ["#FFFFFF", "#C0C0C0", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF", 
    "#0000FF", "#FF00FF", "#FFFF80", "#00FF80", "#80FFFF", "#8080FF", "#FF0080", "#FF8040"];

    //add an element for each color in the default color list, set it's id to it's respective color,
    //disable right click, then add to parent element
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

    //fill default primary and secondary colors
    let primary_box = document.getElementById("primary");
    primary_box.style.backgroundColor = primary_color;

    let secondary_box = document.getElementById("secondary");
    secondary_box.style.backgroundColor = secondary_color;
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
    let primary_box = document.getElementById("primary");
    primary_box.style.backgroundColor = primary_color;
}

function set_secondary_color(id)
{
    secondary_color = id;
    let secondary_box = document.getElementById("secondary");
    secondary_box.style.backgroundColor = secondary_color;
    return false;
}

function help_text(id)
{
    var index = document.getElementById(id).getAttribute("data-index");
    document.getElementById("desc-text").textContent = help_strings[index];
}

function help_reset()
{
    document.getElementById("desc-text").textContent = "For Help, click Help Topics on the Help Menu.";
}

function coords_update(id)
{
    let canvas = document.getElementById(id).getBoundingClientRect();
    let x = event.clientX - canvas.left;
    let y = event.clientY - canvas.top;
    mouseX = x;
    mouseY = y;
    document.getElementById("coords").textContent = String(parseInt(x)) +", " + String(parseInt(y));
}

function coords_reset()
{
    document.getElementById("coords").textContent = "";
}