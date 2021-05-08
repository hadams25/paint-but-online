mouse_pos = {x: 0, y: 0};
last_mouse_pos = {x:0, y:0};
mouse_pressed = {left:false, right:false};
var ctx;


function init_canvas() 
{

    let canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    $('#canvas').mousedown(function (e) 
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

    $('#canvas').mousemove(function (e) 
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

    $('#canvas').mouseup(function (e) 
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
    
    $('#canvas').mouseleave(function (e) 
    {
        mouse_pressed.left = false;
        mouse_pressed.right = false;
    });
}


//tools each have a left click function, a right click function, and optionally, option selections

class tools
{
    constructor(name)
    {
        this.name = name;
    }

    on_start()
    {
        this.populate_options();
    }

    on_left_click(event)
    {
        console.log("tool: " + String(this.name) + " left click event");
    }

    on_right_click(event)
    {
        console.log("tool: " + String(this.name) + " right click event");
    }

    populate_options()
    {
        document.getElementById("options-box").textContent = "NONE"
    }

    draw(color, width)
    {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineJoin = "round"
        ctx.moveTo(last_mouse_pos.x,last_mouse_pos.y);
        ctx.lineTo(mouse_pos.x, mouse_pos.y);
        ctx.closePath();
        ctx.stroke();
    }
}

class dropper extends tools
{
    on_left_click(event)
    {
        if(mouse_pressed.left)
        {
            this.draw(primary_color, 2);
        }
    }
    on_right_click(event)
    {
        if(mouse_pressed.right)
        {
            this.draw(secondary_color, 2);
        }
    }
    populate_options(){}
}

current_tool = new dropper("dropper");