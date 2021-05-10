var layers = [];
var current_canvas = null;

class canvas
{
    constructor(id, width, height, z)
    {
        this.id = id;
        this.self = document.createElement('canvas');
        this.self.id = id;
        this.self.className = "canvas";
        this.z = z;
        this.self.style.zIndex = parseInt(z);
        this.ctx = this.self.getContext("2d");
        this.self.width = width;
        this.self.height = height;
        this.ctx.imageSmoothingEnabled = false;
    }

    resize(width, height)
    {
        let inMemCanvas= document.createElement('canvas');
        let inMemCtx = inMemCanvas.getContext('2d');

        inMemCanvas.width = this.self.width;
        inMemCanvas.height = this.self.height;
        inMemCtx.drawImage(this.self, 0, 0);
        this.self.width = width;
        this.self.height = height;
        this.ctx = this.self.getContext("2d");
        this.ctx.drawImage(inMemCanvas, 0, 0);
    }

    clear(fill)
    {
        this.ctx.clearRect(0, 0, this.self.width, this.self.height);
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(0, 0, this.self.width, this.self.height);
    }

    save_state()
    {
        var inMemCanvas = document.createElement('canvas');
        var inMemCtx = inMemCanvas.getContext('2d');

        inMemCanvas.width = this.self.width;
        inMemCanvas.height = this.self.height;
        inMemCtx.drawImage(this.self, 0, 0);

        return inMemCanvas;
    }

    load_state(input_canvas)
    {
        this.ctx.drawImage(input_canvas,0,0);
    }

    set_z_index(z)
    {
        this.z = z;
        this.self.style.zIndex = parseInt(z);
    }
}
class interact_canvas extends canvas
{
    ongoingTouches = [];

    touch_start(e)
    {
        e.preventDefault();
        var touches = e.changedTouches;

        this.update_touch_coords(e);
        mouse_pressed.left = true;

        for (var i = 0; i < touches.length; i++) 
        {
            this.ongoingTouches.push(copyTouch(touches[i]));
            current_tool.on_left_click(e);
        }
    }
    touch_move(e)
    {
        e.preventDefault();
        var touches = e.changedTouches;

        this.update_touch_coords(e);

        for (var i = 0; i < touches.length; i++) 
        {
            var idx = this.ongoingTouchIndexById(touches[i].identifier);

            if (idx >= 0) 
            {
                current_tool.on_left_click(e);
                this.ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
            }
        }
    }
    touch_end(e)
    {
        e.preventDefault();
        var touches = e.changedTouches;
        this.update_touch_coords(e);
        mouse_pressed.left = false;

        for (var i = 0; i < touches.length; i++) 
        {
            var idx = ongoingTouchIndexById(touches[i].identifier);

            if (idx >= 0) 
            {
                current_tool.on_left_click(e);
                this.ongoingTouches.splice(idx, 1);  // remove it; we're done
            }
        }

        coords_reset();
    }

    mouse_down(e)
    {
        //left click is 0, right click is 2
        if(event.button == 0)
        {
            mouse_pressed.left = true;
            current_tool.on_left_click(e);
        }
        if(event.button == 2)
        {
            mouse_pressed.right = true;
            current_tool.on_right_click(e);
        }
    }
    mouse_move(e)
    {
        if(mouse_pressed.left)
        {
            current_tool.on_left_click(e)
        }
        if(mouse_pressed.right)
        {
            current_tool.on_right_click(e)
        }
        this.update_mouse_coords(e);
    }
    mouse_up(e)
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
    }
    mouse_leave(e)
    {
        mouse_pressed.left = false;
        mouse_pressed.right = false;
        coords_reset();
    }

    ongoingTouchIndexById(idToFind) 
    {
        for (var i = 0; i < ongoingTouches.length; i++) {
          var id = ongoingTouches[i].identifier;
      
          if (id == idToFind) {
            return i;
          }
        }
        return -1;    // not found
    }
    copyTouch({ identifier, pageX, pageY }) 
    {
      return { identifier, pageX, pageY };
    }
    update_touch_coords(e)
    {
        let canvas_area = this.self.getBoundingClientRect();
        last_mouse_pos.x = mouse_pos.x;
        last_mouse_pos.y = mouse_pos.y;
        mouse_pos.x = e.changedTouches[0].pageX - canvas_area.left;
        mouse_pos.y = e.changedTouches[0].pageY - canvas_area.top;
        document.getElementById("coords").textContent = String(parseInt(mouse_pos.x)) +", " + String(parseInt(mouse_pos.y));
    }
    update_mouse_coords(e)
    {
        let canvas_area = this.self.getBoundingClientRect();
        last_mouse_pos.x = mouse_pos.x;
        last_mouse_pos.y = mouse_pos.y;
        mouse_pos.x = e.clientX - canvas_area.left;
        mouse_pos.y = e.clientY - canvas_area.top;
        document.getElementById("coords").textContent = String(parseInt(mouse_pos.x)) +", " + String(parseInt(mouse_pos.y));
    }
}

function init_canvas() 
{
    //get parent element for canvases
    let draw_area = document.getElementById('draw-area');

    //create base canvas
    let base_layer = new canvas("base", 1152, 648, 0);
    draw_area.appendChild(base_layer.self);
    layers.push(base_layer);

    //fill canvas with white by default
    base_layer.ctx.fillStyle = "white";
    base_layer.ctx.fillRect(0, 0, base_layer.self.width, base_layer.self.height);

    current_canvas = base_layer;

    //create the interactable canvas where all the effects happen
    let effect_layer = new interact_canvas("effects", 1152, 648, 1);
    draw_area.appendChild(effect_layer.self);
    layers.push(effect_layer);

    //remove right click menu
    effect_layer.self.addEventListener("contextmenu", e => e.preventDefault());

    layer = $("#effects");

    //pass touch interactions to the interactable canvas/effects layer
    layer.on("touchstart", function (e)
    {
        effect_layer.touch_start(e);
    });

    layer.on("touchmove", function (e)
    {
        effect_layer.touch_start(e);
    });

    layer.on("touchend", function (e)
    {
        effect_layer.touch_end(e); 
    });

    //pass mouse interactions to the interactable canvas/effects layer
    layer.mousedown(function (e) 
    {
        effect_layer.mouse_down(e);
    });

    layer.mousemove(function (e) 
    {
        effect_layer.mouse_move(e);
    });

    layer.mouseup(function (e) 
    {
        effect_layer.mouse_up(e);
    });
    
    layer.mouseleave(function (e) 
    {
        effect_layer.mouse_leave(e);
    });
}