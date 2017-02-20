'use strict';
(function(Fly){
	var Bird = function(config){
		this.ctx = config.ctx;
		this.cv = config.cv;
		this.img = config.img;
        this.imgW = this.img.width/3;
        this.imgH = this.img.height;

        this.y = this.cv.height/2;
        this.x = 100;
        this.v = 0;
        this.a = 0.0015;
        this.imgIdx = 0;
        this.maxAngle = 45;
        this.curAngle = 0;
        this.maxSpeed = 0.3;
	};
	Bird.prototype = {
		constructor:Bird,
		draw:function(delta){
			    this.v += this.a*delta;
                this.y += this.v*delta + 0.5*this.a*Math.pow(delta,2);
                this.curAngle = this.v/this.maxSpeed * 45;
                if(this.v >= this.maxSpeed){
                    this.curAngle = this.maxAngle;
                    // this.console.log(this.curAngle)
                }else if(this.v <= -this.maxSpeed){
                    this.curAngle = -this.maxAngle;
                }
                //小鸟转向
                this.ctx.translate(this.x,this.y);
                this.ctx.rotate(Fly.toRadian(this.curAngle));
                this.ctx.drawImage(this.img,this.imgW*this.imgIdx++,0,this.imgW,this.imgH,-this.imgW/2,-this.imgH/2,this.imgW,this.imgH);
                this.imgIdx %=3;
		},
		changeSpeed:function(speed){
			 this.v = speed;
		}
	}
	Fly.Bird = Bird;
})(Fly)