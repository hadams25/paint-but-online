current_tool = null;

function setup()
{
    //load in icons
    var tools = document.getElementById("tools").children;
    for(var i = 0; i < tools.length; i++)
    {
        tools[i].style.backgroundImage = "url('./assets/toolbar/"+tools[i].id+".png')";
        tools[i].style.backgroundSize = "1rem";
        tools[i].style.backgroundRepeat = "no-repeat";
        tools[i].style.backgroundPosition = "center";
        tools[i].style.imageRendering = "crisp-edges";
    } 

    //fill canvas with white by default
    var canvas = document.getElementById("canvas");
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
    console.log(id);

}