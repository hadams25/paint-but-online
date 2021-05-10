primary_color = "#000000";
secondary_color = "#FFFFFF";

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
    //load in tool icons
    var tools = document.getElementById("tools").children;
    for(var i = 0; i < tools.length; i++)
    {
        tools[i].style.backgroundImage = "url('./assets/toolbar/"+tools[i].id+".png')";
        tools[i].className = "unselected"
        tools[i].setAttribute("onmouseover", "help_text(this.id)");
        tools[i].setAttribute("onmouseout", "help_reset()");
        tools[i].setAttribute("data-index", i);
        tools[i].setAttribute("title", tools_tool_tips[i]);
        if(tools[i].id == current_tool.name)
        {
            tools[i].className = "selected";
        }
    } 

    //add colors to color picker

    function populate_color_bar(parent, colors, left_click, right_click)
    {
        for(var i = 0; i < colors.length; i++)
        {
            let box_color = document.createElement("div");
            box_color.className = "color-boxes";
            box_color.style.backgroundColor = colors[i];
            box_color.id = colors[i];
            box_color.setAttribute("onclick", left_click);
            box_color.setAttribute("oncontextmenu", right_click);
            box_color.addEventListener("contextmenu", e => e.preventDefault());
            parent.appendChild(box_color);
        }
    }

    //get palette top row element
    let top_row = document.getElementById("palette-top-row");
    //disable right click menu
    top_row.addEventListener("contextmenu", e => e.preventDefault());

    //fill top row
    populate_color_bar(
        top_row,
        ["#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080", "#808040", "#004040", "#0080FF", "#004080", "#8000FF", "#804000"],
        "set_primary_color(this.id)",
        "set_secondary_color(this.id)"
    );

    //get palette bottom row element
    let bottom_row = document.getElementById("palette-bottom-row");
    //disable right click menu
    bottom_row.addEventListener("contextmenu", e => e.preventDefault());

    //fill bottom row
    populate_color_bar(
        bottom_row,
        ["#FFFFFF", "#C0C0C0", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF", "#FFFF80", "#00FF80", "#80FFFF", "#8080FF", "#FF0080", "#FF8040"],
        "set_primary_color(this.id)",
        "set_secondary_color(this.id)"
    );

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

    for(var i = 0; i < tool_box.length; i++)
    {
        if (id == tool_box[i].name)
        {
            current_tool = tool_box[i];
        }
    }

    current_tool.on_start();
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

function coords_reset()
{
    document.getElementById("coords").textContent = "";
}