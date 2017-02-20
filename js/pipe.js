'use strict';
(function(Fly){
	var Pipe = function(config){
		this.ctx = config.ctx,
		this.cv = config.cv,
		this.x = config.x,
		this.y = config.y,
		this.speed = config.speed,
		this.imgUp = config.imgUp,
		this.imgDown = config.imgDown,
		this.imgW = this.imgUp.width,
		this.imgH = this.imgUp.height,
		this.pipeSpace = config.pipeSpace
	}
	Pipe.prototype = {
		constructor:Pipe,
		draw:function( delta ){
			this.x += delta * this.speed;
			if(this.x <= -this.imgW * 3){
				this.x += this.imgW * 3 * 6
			}
			this.ctx.drawImage(this.imgUp,this.x,this.y,this.imgW,this.imgH)
			this.ctx.drawImage(this.imgDown,this.x,this.imgH + this.y + this.pipeSpace,this.imgW,this.imgH)

			this.ctx.rect(this.x,this.y,this.imgW,this.imgH)
			this.ctx.rect(this.x,this.imgH + this.y + this.pipeSpace,this.imgW,this.imgH)
			
		}
	}
	Fly.Pipe = Pipe;
})(Fly)