; (function () {
    var canvas = document.getElementById('bg');
    var width=400,//canvas宽
        height=500,//canvas高
        tetrisBaseList=[],
        tetrisNum=1,//当前方块索引||方块总数
        tetrisWidth=50,//方块宽
        tetrisHeight=50,//方块高
        tetrisX=3,//方块初始值X位移
        tetrisY=0,//方块初始值Y位移
        moveSpace=10,//每次移动增加高
        ctx=null,
        imgData,
        raf,
        raf1;
    if (canvas.getContext) {
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
    }
    var xlength=width/tetrisWidth;
    var ylength=height/tetrisHeight;
    var data=[];
    for(let i=0;i<ylength;i++){
        data[i]=[];
        for(let j=0;j<xlength;j++){
            data[i].push(0)
        }
    }
    //颜色集合
    var color=[
        '#000000',//0
        '#FF0000',//1
        '#00FF00',//2
        '#0000FF',//3
        '#FFFF00',//4
        '#00FFFF',//5
        '#FF00FF',//6
        '#C0C0C0',//7
        '#999999' //8
    ]
    //方块
    var tetris=null;
    init();
    /**
     * 业务相关
     * */
    //创建背景,加载首个方块，动画
    function init() {
        initTetris();
        if (canvas.getContext) {
            canvas.width=width;
            canvas.height=height;
            var ctx = canvas.getContext('2d');
            ctx.lineWidth=1;
            ctx.strokeStyle = '#769bc2';
            ctx.strokeRect(0,0,width,height);
            for(var i =0;i<12;i++){
                for(var j =0;j<10;j++){
                    ctx.strokeStyle = 'rgba(78,144,156,0.5)';
                    ctx.strokeRect(i*50,j*50+100,50,50);
                }
            };
            canvas_copy();
            tetris.draw()
            // window.requestAnimationFrame(draw);开启动画
        }
    }
    //创建方块
    function initTetris() {
        let r=Math.floor(Math.random() * (7 - 0) + 0);
        // let r=0;
        tetris={
            x:tetrisX,
            y:tetrisY,
            rotate1Index:r,//当前方块索引
            rotate2Index:0//当前方块变形索引
        }
        tetris.random=baseTetris(tetrisX,tetrisY,tetris.rotate1Index,tetris.rotate2Index);
        tetris.draw=function() {
            ctx.fillStyle = color[tetrisNum];
            drawTetris(this.x,this.y,this.random);
        }
    }
    //方块列表
    function baseTetris(x,y,rotate1Index,rotate2Index) {
        if(typeof x=="undefined") x=0;
        if(typeof y=="undefined") y=0;
        var Xcrea=(0+x);
        var Ycrea=(0+y);
        tetrisBaseList=[
            [
                //■■■■
                [[Xcrea,Ycrea],[Xcrea+1,Ycrea],[Xcrea+2,Ycrea],[Xcrea+3,Ycrea]],
                //■
                //■
                //■
                //■
                [[Xcrea,Ycrea-1],[Xcrea,Ycrea],[Xcrea,Ycrea+1],[Xcrea,Ycrea+2]],
            ],
            [
                //  ■■
                //■■
                [[Xcrea+1,Ycrea],[Xcrea+2,Ycrea],[Xcrea,Ycrea+1],[Xcrea+1,Ycrea+1]],

                // ■
                // ■■
                //   ■
                [[Xcrea,Ycrea],[Xcrea,Ycrea+1],[Xcrea+1,Ycrea+1],[Xcrea+1,Ycrea+2]]
            ],
            [
                //■■
                //  ■■
                [[Xcrea,Ycrea],[Xcrea+1,Ycrea],[Xcrea+1,Ycrea+1],[Xcrea+2,Ycrea+1]],
                //   ■
                // ■■
                // ■
                [[Xcrea+1,Ycrea],[Xcrea,Ycrea+1],[Xcrea+1,Ycrea+1],[Xcrea,Ycrea+2]],
            ],
            [
                //  ■
                //■■
                //  ■
                [[Xcrea+1,Ycrea],[Xcrea,Ycrea+1],[Xcrea+1,Ycrea+1],[Xcrea+1,Ycrea+2]],

                // ■■■
                //   ■
                [[Xcrea,Ycrea],[Xcrea+1,Ycrea],[Xcrea+2,Ycrea],[Xcrea+1,Ycrea+1]],
                // ■
                // ■■
                // ■
                [[Xcrea,Ycrea],[Xcrea,Ycrea+1],[Xcrea+1,Ycrea+1],[Xcrea,Ycrea+2]],
                //   ■
                // ■■■
                [[Xcrea+1,Ycrea],[Xcrea,Ycrea+1],[Xcrea+1,Ycrea+1],[Xcrea+2,Ycrea+1]],
            ],
            [
                //   ■
                //■■■
                [[Xcrea+2,Ycrea],[Xcrea,Ycrea+1],[Xcrea+1,Ycrea+1],[Xcrea+2,Ycrea+1]],
                //■■
                //  ■
                //  ■
                [[Xcrea,Ycrea],[Xcrea+1,Ycrea],[Xcrea+1,Ycrea+1],[Xcrea+1,Ycrea+2]],
                //■■■
                //■
                [[Xcrea,Ycrea],[Xcrea+1,Ycrea],[Xcrea+2,Ycrea],[Xcrea,Ycrea+1]],
                //■
                //■
                //■■
                [[Xcrea,Ycrea],[Xcrea,Ycrea+1],[Xcrea,Ycrea+2],[Xcrea+1,Ycrea+2]],
            ],
            [
                //■
                //■■■
                [[Xcrea,Ycrea],[Xcrea,Ycrea+1],[Xcrea+1,Ycrea+1],[Xcrea+2,Ycrea+1]],
                //  ■
                //  ■
                //■■
                [[Xcrea+1,Ycrea],[Xcrea+1,Ycrea+1],[Xcrea,Ycrea+2],[Xcrea+1,Ycrea+2]],
                //■■■
                //   ■
                [[Xcrea,Ycrea],[Xcrea+1,Ycrea],[Xcrea+2,Ycrea],[Xcrea+2,Ycrea+1]],
                //■■
                //■
                //■
                [[Xcrea,Ycrea],[Xcrea+1,Ycrea],[Xcrea,Ycrea+1],[Xcrea,Ycrea+2]],
            ],
            [
                //■■
                //■■
                [[Xcrea,Ycrea],[Xcrea+1,Ycrea],[Xcrea,Ycrea+1],[Xcrea+1,Ycrea+1]],
            ]
        ];
        return tetrisBaseList[rotate1Index][rotate2Index]
    }
    //动画逻辑
    function draw() {
        //判断是否可以降落,降落到当前位置最底部
        if(!getNextState(tetris)){
            if(tetris.y<=moveSpace){//不可下落并且位置在初始高度
                gameOver()
                return;
            }
            setData(tetris,function () {
                tetrisNum++;
                initTetris();
                canvas_copy();
                canvas_paste();
                ctx.restore();
                tetris.draw();
                raf = window.requestAnimationFrame(draw);
            });

        }else{
            tetris.y += moveSpace;
            canvas_paste();
            ctx.restore();
            tetris.draw();
            raf = window.requestAnimationFrame(draw);
        }

    }
    //当前方块是否可以进行下一步
    function getNextState(tetris, direction) {
        let tetris_x=tetris.x;
        let tetris_y=tetris.y;
        switch (direction) {
            case 'bottom':
                tetris_y=tetris_y+100;
                break;
            case 'left':
                tetris_x=parseInt(tetris_x)-1;
                break;
            case 'right':
                tetris_x=parseInt(tetris_x)+1;
                break;
            default:
                tetris_y=tetris_y+100;
                break;
        }
        let c=baseTetris(tetris_x,parseInt(tetris_y/100),tetris.rotate1Index,tetris.rotate2Index);
        let boo=false;
        for(let i=0;i<4;i++){
            if(!data[(c[i][1])]){
                break
            }
            if(typeof data[(c[i][1])][c[i][0]] == "undefined" || data[(c[i][1])][c[i][0]]>0){
                console.log(data)
                break
            }
            if(i==3){
                boo=true;
            }
        }
        return boo;
    }
    //方块是否可以旋转
    function isrotate(tetris,index) {
        var d=baseTetris(tetris.x,tetris.y/100,tetris.rotate1Index,index);
        console.log(d);
        console.log(data);
        for(let i =0;i<4;i++){
            let y=d[i][1];
            let x=d[i][0];
            if(typeof data[y][x] == "undefined" || data[y][x]!=0){
                console.log('无法旋转');
                return false;
            }
        }
        console.log('可以旋转');
        return true;
    }
    //渲染方块
    function drawTetris(x,y,b) {
        for(let i =0;i<b.length;i++){
            ctx.fillRect(b[i][0]*50+x*50-tetrisX*50, b[i][1]*50+y/100*50-tetrisY*50, tetrisWidth, tetrisHeight);
        }
    }
    //旋转
    function rotate(tetris) {
        var index=tetris.rotate2Index+1;
        if(tetrisBaseList[tetris.rotate1Index].length-1<index){
            index=0;
        }
        if(isrotate(tetris,index)){
            canvas_paste();
            if(tetris.rotate1Index == 0 && tetris.rotate2Index == 0 && tetris.x == 0){
                tetris.x+=1
                tetrisX=tetris.x
            }
            tetris.rotate2Index=index;
            tetris.random=baseTetris(tetrisX,tetrisY,tetris.rotate1Index,tetris.rotate2Index);
            tetris.draw();
        }
    }
    //结束
    function gameOver() {
        alert('游戏结束')
    }
    //键盘事件
    document.onkeyup=function(e) {
        e = e || window.event;
        e.preventDefault();
        switch (e.keyCode) {
            case 13:
                rotate(tetris);
                break;
            case 37:
                console.log('左键');
                canvas_paste();
                if(tetris.x<width && getNextState(tetris,'left')){
                    tetris.x=tetris.x-1;
                }
                if(tetris.x<=0){
                    tetris.x=0;
                }
                tetris.draw();
                break;
            case 39:
                console.log('右键');
                canvas_paste();
                if(tetris.x>=0  && getNextState(tetris,'right')){
                    tetris.x=tetris.x+1;
                }
                if(((tetris.x)+tetrisWidth)>=width){
                    tetris.x=width-tetrisWidth;
                }
                tetris.draw();
                break;
            case 40:
                console.log('下键');
                if(!getNextState(tetris)){
                    if(tetris.y<=moveSpace){//不可下落并且位置在初始高度
                        gameOver()
                        return;
                    }
                    setData(tetris,function () {
                        tetrisNum++;
                        initTetris();
                        canvas_copy();
                        canvas_paste();
                        ctx.restore();
                        tetris.draw();
                    });

                }else{
                    tetris.y += 100;
                    canvas_paste();
                    ctx.restore();
                    tetris.draw();
                }
                break;
        }
    };

    /**
     * 基本函数
     * */
    //二维数组查找index项最大值
    function getArrMax(index,arr) {
        if(!Array.isArray(arr)) return;
        if(!Array.isArray(arr[0])) return;
        let a=[]
        for(let i =0;i<arr.length;i++){
            a.push(arr[i][index]);
        }
        return Math.max.apply(null, a);
    }
    //二维数组查找index项最小值
    function getArrMin(index,arr) {
        if(!Array.isArray(arr)) return;
        if(!Array.isArray(arr[0])) return;
        let a=[]
        for(let i =0;i<arr.length;i++){
            a.push(arr[i][index]);
        }
        return Math.min.apply(null, a);
    }
    //判断是否整数
    function isInteger(obj) {
        return obj%1 === 0
    }
    //填充值
    function setData(tetris,callback) {
        let k=tetris.random;
        let x=parseInt(tetris.x);
        let y=parseInt(tetris.y/100);
        for(let i=0;i<4;i++){
            data[(k[i][1]+y-tetrisY)][(k[i][0]+x-tetrisX)]=tetrisNum;
        }
        clear(callback);
    }
    //每次降落后判断是否存在可以消除的数据
    function clear(callback) {
        let clearIndex=[];
        for(let i =0;i<data.length;i++){
            for(let j =data[i].length-1;j>-1;j--){
                if(data[i][j]==0){
                    break
                }
                if(j==0){
                    let o={};
                    o[i]=data[i];
                    clearIndex.push(o);
                }
            }
        }
        if(clearIndex.length>0){
            twinkle(clearIndex,callback)
        }else{
            callback()
        }
    }
    //消除
    function twinkle(clearIndex,callback) {
        console.log(data);
        console.log(clearIndex)
        for(let i=0;i<clearIndex.length;i++){
            let o=clearIndex[i];
            let key=parseInt(Object.keys(o)[0]);
            ctx.clearRect(0,key*tetrisHeight,width,tetrisHeight);
            ctx.strokeStyle = 'rgba(78,144,156,0.5)';
/*            ctx.strokeRect(0,key*tetrisHeight,width,tetrisHeight);*/
            for(let j =0;j<o[key].length;j++){
                ctx.strokeRect(j*tetrisWidth, key*50, tetrisWidth, tetrisHeight);
                data[key][j]=0;
            }
        }
        for(let i=0;i<clearIndex.length;i++){
            let o=clearIndex[i];
            let key=parseInt(Object.keys(o)[0]);
            let temp=[...data[key]];
            for(let j=key;j>-1;j--){
                if(j==0){
                    data[j]=temp;
                }else{
                    data[j]=data[j-1];
                }
            }
        }
        setTimeout(function () {
            drawByData(callback)
        },300)

    }
    //根据data渲染canvas
    function drawByData(callback) {
        ctx.clearRect(0,0,width,height);
        ctx.lineWidth=1;
        ctx.strokeStyle = '#769bc2';
        ctx.strokeRect(0,0,400,400);
        for(var i =0;i<12;i++){
            for(var j =0;j<10;j++){
                ctx.strokeStyle = 'rgba(78,144,156,0.5)';
                ctx.strokeRect(i*50,j*50+100,50,50);
            }
        };
        for(let i=0;i<data.length;i++){
            for(let j=0;j<data[i].length;j++){
                if(data[i][j]>0){
                    ctx.fillStyle = color[data[i][j]];
                    ctx.fillRect(j*50, i*50, tetrisWidth, tetrisHeight);
                }
            }
        }
        canvas_copy();
        callback()
    }

    //复制
    function canvas_copy(){
        var w = ctx.canvas.width;
        var h = ctx.canvas.height;
        imgData = ctx.getImageData(0, 0, w, h);
    }
    //粘贴
    function canvas_paste(){
        ctx.putImageData(imgData,0,0);
    }
}())
