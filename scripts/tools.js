mouse_pos = {x: 0, y: 0};
last_mouse_pos = {x:0, y:0};
mouse_pressed = {left:false, right:false};
current_scale = 1;

//tools each have a left click function, a right click function, and optionally, option selections

class tools
{
    constructor(name)
    {
        this.name = name;
    }

    on_start()
    {}

    on_left_click(event)
    {
        console.log("tool: " + String(this.name) + " left click event");
    }

    on_right_click(event)
    {
        console.log("tool: " + String(this.name) + " right click event");
    }

    on_mouse_move(event)
    {
        console.log("tool: " + String(this.name) + " move event");
    }

    on_mouse_up(event)
    {
        console.log("tool: " + String(this.name) + " mouseup event");
    }

    populate_options()
    {
        document.getElementById("options-box").textContent = "NONE"
    }
}

class poly_select extends tools{}
class rect_select extends tools{}
class eraser extends tools{}
class fill extends tools{}
class dropper extends tools{}
class zoom extends tools
{
   
}
class pencil extends tools
{
}
class brush extends tools
{
}
class airbrush extends tools{}
class text extends tools{}
class line extends tools
{
    
}
class curve extends tools{}
class rectangle extends tools{}
class polygon extends tools{}
class circle extends tools{}
class round_rectangle extends tools{}

tool_box = 
[
    new poly_select("poly_select"),
    new rect_select("rect_select"),
    new eraser("eraser"),
    new fill("fill"),
    new dropper("dropper"),
    new zoom("zoom"),
    new pencil("pencil"),
    new brush("brush"),
    new airbrush("airbrush"),
    new text("text"),
    new line("line"),
    new curve("curve"),
    new rectangle("rectangle"),
    new polygon("polygon"),
    new circle("circle"),
    new round_rectangle("round_rectangle")
]

current_tool = new pencil("pencil");