var layers = [];
var current_canvas = null;

class canvas
{
    constructor(parent, id, width, height, z, bg)
    {
        this.id = id;
        this.self = document.createElement('canvas');
        this.self.id = id;

        this.z = z;
        this.self.style.zIndex = z;

        parent.appendChild(this.self);


        this.canvas = new fabric.Canvas(id);
        

        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        this.canvas.setBackgroundColor(bg, this.canvas.renderAll.bind(this.canvas));

        var rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
          });
          
          // "add" rectangle onto canvas
        this.canvas.add(rect);
    }

}

function init_canvas() 
{
    //get parent element for canvases
    let draw_area = document.getElementById('draw-area').children[0];

    //create base canvas
    let base_layer = new canvas(draw_area, "base", 1152, 648, 0, "#FFFFFF");
    layers.push(base_layer);
}

