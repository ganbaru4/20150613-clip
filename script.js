(function(){

    var canvas = document.getElementById('canvas');
    if(!canvas || !canvas.getContext) return false;
    var ctx = canvas.getContext('2d');

    var canvasWidth  = canvas.width;
    var canvasHeight = canvas.height;

    var url = [
    	'1000.jpg',
    	'1000-1.jpg',
    	'1000-2.jpg',
    	'1000-3.jpg'
    ];

    var images     = [];
    var imageCount = url.length;

    //キャンバス内キャンバス
    var clipCanvases     = [];
    var clipCanvasWidth  = 100;
    var clipCanvasHeight = 100;
    var clipCanvasX      = 0;
    var clipCanvasY      = 0;

    //クリップキャンバスマージン
    var gutter = 30;

    //クリップタイプ
    var clipTypeGB;
    var clipType = {
    	circle: function(){
    		clipTypeGB.arc(50, 50, 50, 0, Math.PI*2);
    	},
    	triangle: function(){
			clipTypeGB.moveTo(0, 100);
			clipTypeGB.lineTo(50, 0);
			clipTypeGB.lineTo(100, 100);
			clipTypeGB.lineTo(0, 100);
			clipTypeGB.closePath();
    	},
    	reTriangle: function(){
			clipTypeGB.moveTo(0, 0);
			clipTypeGB.lineTo(100, 0);
			clipTypeGB.lineTo(50, 100);
			clipTypeGB.lineTo(0, 0);
			clipTypeGB.closePath();
    	},
    	hexagon: function(){
			clipTypeGB.moveTo(50, 0);
			clipTypeGB.lineTo(100, 25);
			clipTypeGB.lineTo(100, 75);
			clipTypeGB.lineTo(50, 100);
			clipTypeGB.lineTo(0, 75);
			clipTypeGB.lineTo(0, 25);
			clipTypeGB.lineTo(50, 0);
			clipTypeGB.closePath();
    	}
    };


    //クリップタイプの数取得
    var clipTypeSize = 0;
    for(var prop in clipType){
    	clipTypeSize++;
    }


    function loaded(){
    	imageCount--;
    	if(imageCount === 0){
    		render();
    	}
    }

    for(var i = 0; i < url.length; i++){
    	var imageObj = new Image();
    	imageObj.src = url[i];
    	imageObj.onload = loaded;
    	images.push(imageObj);
    }

    //描画する画像分のキャンバス作成
    function createClipCanvas(){

    	for (var i = 0; i < images.length; i++) {
	    	var clipCanvas = document.createElement('canvas');
	    	clipCanvas.width = clipCanvasWidth;
	    	clipCanvas.height = clipCanvasHeight;
	    	clipCanvases.push(clipCanvas);
    	};

    }

    //クリッピングする形をランダムで決定
    function createCliptype(){
    	var typeNumber = Math.floor(Math.random() * clipTypeSize);
    	switch(typeNumber){
    		case 0:
    			clipType.circle();
    			break;
    		case 1:
    			clipType.triangle();
    			break;
    		case 2:
    			clipType.reTriangle();
    			break;
    		case 3:
    			clipType.hexagon();
    			break;
    		default:
    			clipType.circle();
    			break;
    	}
    }



    function render(){
    	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    	createClipCanvas();

    	for (var i = 0; i < images.length; i++) {
    		var clipCtx = clipCanvases[i].getContext('2d');
    		clipTypeGB = clipCtx;//グローバル変数に一時保管
    		clipCtx.beginPath();
    		createCliptype();
    		clipCtx.clip();
    		clipCtx.drawImage(images[imageCount], 0, 0, clipCanvasWidth, clipCanvasHeight);
    		imageCount++;

    		//キャンバスを描画
    		ctx.drawImage(clipCanvases[i], clipCanvasX, clipCanvasY);
    		clipCanvasX += (clipCanvasWidth + gutter);
    	};

    }




})();