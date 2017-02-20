'use strict';
(function(window){
	var Fly = {}

	Fly.toRadian = function(angle){
		return angle/180 * Math.PI;
	}
	Fly.toAngle = function(radian){
		return radian/Math.PI * 180;
	}

	Fly.loadImg = function(imgList,callback){
		var imgObj = {},
			loaded = 0;
		imgList.forEach(function(val){
			var img = new Image();
			img.src = 'fy/'+ val +'.png';
			img.addEventListener('load',function(){
				loaded++;
				imgObj[val] = img;
				if(loaded >= imgList.length){
					callback(imgObj);
				}
			})
		})
	}

	Fly.createCanvas = function(id){
		var dv = document.getElementById(id);
		var cv = document.createElement('canvas');
		cv.width = 800;
		cv.height = 600;
		dv.appendChild(cv);

		return cv;
	}
	window.Fly = Fly;
})(window)