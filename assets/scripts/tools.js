//tools each have a left click function, a right click function, and optionally, option selections

current_tool = null;

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

    on_left_click()
    {
        console.log("tool: " + String(this.name) + " left click event");
    }

    on_right_click()
    {
        console.log("tool: " + String(this.name) + " right click event");
    }

    populate_options()
    {
        document.getElementById("options-box").textContent = "NONE"
    }
}

class dropper extends tools
{
    on_left_click()
    {

    }
    on_right_click()
    {

    }
    populate_options(){}
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return [evt.clientX - rect.left, evt.clientY - rect.top]
}