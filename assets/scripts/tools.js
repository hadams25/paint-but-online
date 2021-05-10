mouse_pos = {x: 0, y: 0};
last_mouse_pos = {x:0, y:0};
mouse_pressed = {left:false, right:false};

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

    on_left_end()
    {}

    on_right_click(event)
    {
        console.log("tool: " + String(this.name) + " right click event");
    }

    on_right_end()
    {}

    populate_options()
    {
        document.getElementById("options-box").textContent = "NONE"
    }

    draw(start, end, canvas, color, width)
    {
        canvas.ctx.beginPath();
        canvas.ctx.strokeStyle = color;
        canvas.ctx.lineWidth = width;
        canvas.ctx.lineJoin = "round"
        canvas.ctx.moveTo(start.x,start.y);
        canvas.ctx.lineTo(end.x, end.y);
        canvas.ctx.closePath();
        canvas.ctx.stroke();
    }
}

class poly_select extends tools{}
class rect_select extends tools{}
class eraser extends tools{}
class fill extends tools{}
class dropper extends tools{}
class zoom extends tools{}
class pencil extends tools
{
    on_left_click(event)
    {
        if(mouse_pressed.left)
        {
            this.draw(last_mouse_pos, mouse_pos, current_canvas, primary_color, 1);
        }
    }
    on_right_click(event)
    {
        if(mouse_pressed.right)
        {
            this.draw(last_mouse_pos, mouse_pos, current_canvas, secondary_color, 1);
        }
    }
}
class brush extends tools
{
    on_left_click(event)
    {
        if(mouse_pressed.left)
        {
            this.draw(last_mouse_pos, mouse_pos, current_canvas, primary_color, 5);
        }
    }
    on_right_click(event)
    {
        if(mouse_pressed.right)
        {
            this.draw(last_mouse_pos, mouse_pos, current_canvas, secondary_color, 5);
        }
    }
}
class airbrush extends tools{}
class text extends tools{}
class line extends tools
{
    first_click = true;
    first_pos = {x: 0, y: 0};

    on_left_click(event)
    {
        // if(this.first_click)
        // {
        //     this.first_click = false;
        //     this.first_pos.x = mouse_pos.x;
        //     this.first_pos.y = mouse_pos.y;
        // }
        // if((!this.first_click) && mouse_pressed.left)
        // {
        let effect_layer = layers[layers.length - 1];
        effect_layer.ctx.clearRect(0, 0, effect_layer.self.width, effect_layer.self.height);
        //     this.draw(this.first_pos, mouse_pos, this.effect_ctx, primary_color, 2);
        // }
    }
    on_right_click(event)
    {
        if(mouse_pressed.right)
        {
            let effect_layer = layers[layers.length - 1];
            this.draw(last_mouse_pos, mouse_pos, effect_layer, secondary_color, 5);
        }
    }
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