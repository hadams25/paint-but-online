class canvas
{
    constructor(id)
    {
        this.id = id;
        this.self = document.getElementById(id);
        this.ctx = self.getContext("2d");
    }

    resize(width, height)
    {
        var inMemCanvas = document.createElement('canvas');
        var inMemCtx = inMemCanvas.getContext('2d');

        inMemCanvas.width = this.self.width;
        inMemCanvas.height = this.self.height;
        inMemCtx.drawImage(this.self, 0, 0);
        this.self.width = width;
        this.self.height = height;
        this.ctx.drawImage(inMemCanvas, 0, 0);
    }

    clear(fill)
    {
        this.ctx.clearRect(0, 0, this.self.width, this.self.height);
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(0, 0, this.self.width, this.self.height);
    }
}