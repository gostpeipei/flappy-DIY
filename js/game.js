'use strict';
(function(){
	var Game = function(id){
		this.cv = Fly.createCanvas(id);
		this.ctx = this.cv.getContext('2d');

		this.imgList=['birds','land','pipe1','pipe2','sky'];
		this.roleList = [];
        this.gameContinue = true;
        this.lastTime = new Date();
        this.curTime = 0;
        this.bird = null;
	}
	Game.prototype = {
		start:function(){
			var that = this;

			Fly.loadImg(this.imgList,function(list){
				that._initGame(list);

				that.draw(list);

				that.bindEvent();
			})
		},

		over:function(){},

		// 初始化
		_initGame:function( list ){
			//创建小鸟
			this.bird = new Fly.Bird({
                cv:this.cv,
                ctx:this.ctx,
                img:list.birds
            });

			//创建天空
			for(var i = 0; i < 2; i++){
                this.sky = new Fly.Sky({
                    ctx:this.ctx,
                    img:list.sky,
                    x:list.sky.width * i,
                    speed:-0.2
                })  
                this.roleList.push(this.sky);
            }
            //创建管道
			for(var i = 0; i < 6; i++){
                this.pipe = new Fly.Pipe({
                    ctx:this.ctx,
                    cv:this.cv,
                    imgUp:list.pipe2,
                    imgDown:list.pipe1,
                    x:list.pipe1.width * 3 * i + 300,
                    y:Math.random()*200 + 50 - list.pipe2.height,
                    pipeSpace:180,
                    speed:-0.2
                })
                this.roleList.push(this.pipe);
            }
            //创建陆地
            for(var i = 0; i < 4; i++){
                this.land = new Fly.Land({
                    ctx:this.ctx,
                    img:list.land,
                    x:list.land.width * i,
                    y:this.cv.height - list.land.height,
                    speed:-0.2
                })  
                this.roleList.push(this.land);
            }
		},

		// 渲染
		draw:function(list){
			var that = this;
			var render = function(){
                that.curTime = new Date();
                var delta = that.curTime - that.lastTime;
                that.lastTime = that.curTime;

            
                that.ctx.clearRect(0,0,that.cv.width,that.cv.height);
                that.ctx.save();
                that.ctx.beginPath();

                that.roleList.forEach(function(role){
                    role.draw( delta );
                })

                that.bird.draw( delta );
                //小鸟位置坐标
                // console.log(that.bird.x,that.bird.y)
                //超出顶部结束游戏
                if(that.bird.y <= 12){
                    that.gameContinue = false
                }

                //落地结束游戏
                if(that.bird.y >= that.cv.height - list.land.height - 19){
                    that.gameContinue = false;
                }
                //碰到桶 游戏结束
                if(that.ctx.isPointInPath(that.bird.x+15,that.bird.y)){
                    that.gameContinue = false
                }
                

                that.ctx.restore();

                if(that.gameContinue){
                    window.requestAnimationFrame(render);
                }
            }
                window.requestAnimationFrame(render);
		},

		// 绑定事件
		bindEvent:function(){
			var that = this;
			 that.cv.addEventListener('click',function(){
                that.bird.changeSpeed(-0.6);
            })
		}

	}

	Fly.Game = Game;
})(Fly)