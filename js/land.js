'use strict';
(function(Fly){
	var Land = function(config){
		this.ctx = config.ctx
		this.x = config.x || 0
		this.y = config.y || 0
		this.img = config.img
		this.imgW = this.img.width
		this.imgH = this.img.height
		this.speed = config.speed
	}
	Land.prototype = {
		constructor : Land,
		draw:function(delta){
			this.x += this.speed*delta;
			if(this.x <= -this.imgW){
				this.x += this.imgW * 4
			}
			this.ctx.drawImage(this.img,this.x,this.y,this.imgW,this.imgH)
		}
	}

	Fly.Land = Land;
})(Fly)