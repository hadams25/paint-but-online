mouse_pos = {x: 0, y: 0};
last_mouse_pos = {x:0, y:0};
mouse_pressed = {left:false, right:false};
var ctx;
var ongoingTouches = [];


function init_canvas() 
{

    let canvas = document.getElementById('canvas');
    let effect_layer = document.getElementById("effect-layer");
    ctx = canvas.getContext("2d");

    //fill canvas with white by default
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //remove right click menu
    canvas.addEventListener("contextmenu", e => e.preventDefault());
    effect_layer.addEventListener("contextmenu", e => e.preventDefault());

    $('#effect-layer').mousedown(function (e) 
    {
        //left click is 0, right click is 2
        if(e.button == 0)
        {
            mouse_pressed.left = true;
            current_tool.on_left_click(e);
        }
        if(e.button == 2)
        {
            mouse_pressed.right = true;
            current_tool.on_right_click(e);
        }
    });

    $("#effect-layer").on("touchstart", function (e)
    {
        e.preventDefault();
        var touches = e.changedTouches;

        let canvas_area = canvas.getBoundingClientRect();
        mouse_pos.x = e.changedTouches[0].pageX - canvas_area.left;
        mouse_pos.y = e.changedTouches[0].pageY - canvas_area.top;
        last_mouse_pos.x = mouse_pos.x;
        last_mouse_pos.y = mouse_pos.y;
        mouse_pressed.left = true;
        document.getElementById("coords").textContent = String(parseInt(mouse_pos.x)) +", " + String(parseInt(mouse_pos.y));

        for (var i = 0; i < touches.length; i++) 
        {
            ongoingTouches.push(copyTouch(touches[i]));
            current_tool.on_left_click(e);
        }
    });

    $("#effect-layer").on("touchmove", function (e)
    {
        e.preventDefault();
        var touches = e.changedTouches;

        let canvas_area = canvas.getBoundingClientRect();
        last_mouse_pos.x = mouse_pos.x;
        last_mouse_pos.y = mouse_pos.y;
        mouse_pos.x = e.changedTouches[0].pageX - canvas_area.left;
        mouse_pos.y = e.changedTouches[0].pageY - canvas_area.top;
        document.getElementById("coords").textContent = String(parseInt(mouse_pos.x)) +", " + String(parseInt(mouse_pos.y));

        for (var i = 0; i < touches.length; i++) 
        {
            var idx = ongoingTouchIndexById(touches[i].identifier);

            if (idx >= 0) 
            {
                current_tool.on_left_click(e);
                ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
            }
        }
    });

    $("#effect-layer").on("touchend", function (e)
    {
        e.preventDefault();
        var touches = e.changedTouches;
        let canvas_area = canvas.getBoundingClientRect();
        last_mouse_pos.x = mouse_pos.x;
        last_mouse_pos.y = mouse_pos.y;
        mouse_pos.x = e.changedTouches[0].pageX - canvas_area.left;
        mouse_pos.y = e.changedTouches[0].pageY - canvas_area.top;
        mouse_pressed.left = false;

        for (var i = 0; i < touches.length; i++) 
        {
            var idx = ongoingTouchIndexById(touches[i].identifier);

            if (idx >= 0) 
            {
                current_tool.on_left_click(e);
                ongoingTouches.splice(idx, 1);  // remove it; we're done
            }
        }

        coords_reset();
    });


    $('#effect-layer').mousemove(function (e) 
    {
        if(mouse_pressed.left)
        {
            current_tool.on_left_click(e)
        }
        if(mouse_pressed.right)
        {
            current_tool.on_right_click(e)
        }

        let canvas_area = canvas.getBoundingClientRect();
        last_mouse_pos.x = mouse_pos.x;
        last_mouse_pos.y = mouse_pos.y;
        mouse_pos.x = e.clientX - canvas_area.left;
        mouse_pos.y = e.clientY - canvas_area.top;
        document.getElementById("coords").textContent = String(parseInt(mouse_pos.x)) +", " + String(parseInt(mouse_pos.y));
    });

    $('#effect-layer').mouseup(function (e) 
    {
        //left click is 0, right click is 2
        if(e.button == 0)
        {
            mouse_pressed.left = false;
        }
        if(e.button == 2)
        {
            mouse_pressed.right = false;
        }
    });
    
    $('#effect-layer').mouseleave(function (e) 
    {
        mouse_pressed.left = false;
        mouse_pressed.right = false;
    });
}

function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;
  
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
}

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}


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

    draw(start, end, context, color, width)
    {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = width;
        context.lineJoin = "round"
        context.moveTo(start.x,start.y);
        context.lineTo(end.x, end.y);
        context.closePath();
        context.stroke();
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
            this.draw(last_mouse_pos, mouse_pos, ctx, primary_color, 1);
        }
    }
    on_right_click(event)
    {
        if(mouse_pressed.right)
        {
            this.draw(last_mouse_pos, mouse_pos, ctx, secondary_color, 1);
        }
    }
}
class brush extends tools
{
    on_left_click(event)
    {
        if(mouse_pressed.left)
        {
            this.draw(last_mouse_pos, mouse_pos, ctx, primary_color, 5);
        }
    }
    on_right_click(event)
    {
        if(mouse_pressed.right)
        {
            this.draw(last_mouse_pos, mouse_pos, ctx, secondary_color, 5);
        }
    }
}
class airbrush extends tools{}
class text extends tools{}
class line extends tools
{
    first_click = true;
    first_pos = {x: 0, y: 0};
    effect_layer = null;
    effect_ctx = null;

    on_start()
    {
        this.effect_layer = document.getElementById("effect-layer");
        this.effect_ctx = this.effect_layer.getContext("2d");
    }

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
        this.effect_ctx.clearRect(0, 0, this.effect_layer.width, this.effect_layer.height);
        //     this.draw(this.first_pos, mouse_pos, this.effect_ctx, primary_color, 2);
        // }
    }
    on_right_click(event)
    {
        if(mouse_pressed.right)
        {
            this.draw(last_mouse_pos, mouse_pos, this.effect_ctx, secondary_color, 5);
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