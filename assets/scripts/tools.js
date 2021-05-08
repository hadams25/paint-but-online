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