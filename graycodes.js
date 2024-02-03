// The function gets called when the window is fully loaded

window.onload = function() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var ctx = canvas.getContext("2d");
    //document.getElementById ("gen").addEventListener ("click", main, false);
    
    // Define the image dimensions
    var width;
    var height;

    var scale = 16;
    var n = 10;
    var running = false;
    var bit_colour = "rgb(256,256,256)";

    
    // ------------------------------------------------------- // Time

    var startTime, endTime;

    function start() {
        startTime = new Date();
    };

    function end() {
        endTime = new Date();
        var timeDiff = endTime - startTime; //in ms
        // strip the ms
        console.log(timeDiff + " ms");
    }
    // ------------------------------------------------------- // Display
    function displayCode(gc) {
        ctx.fillStyle = "orange";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        for(j=0; j<height;j++){
            for(i=0; i<width;i++){
                if (gc[j][i] == 1){
                    console.log(i + " " + j)
                    ctx.rect(i * scale, j * scale, scale, scale);
                }
            }
        }
        ctx.fillStyle = bit_colour ; 
        ctx.fill();ctx.closePath();
    }

    // ------------------------------------------------------- // Algorithms

    function BRGC(n){
        if (n==1){
            return [[0],[1]];
        }
        let A = BRGC(n-1);
        let len = A.length;
        let B = Array.apply(0, Array(len*2)).map(function (x,i) {
            return [~~(i/len)].concat(A[i%len]);
        })
        return B;
    }
    // ------------------------------------------------------- // Main
    function setup(){
        width = n;
        height = Math.pow(2,n);
        canvas.width = width * scale;
        canvas.height = height * scale;
        //
        start();
        let graycode = BRGC(n);
        end();
        console.log(graycode);
        displayCode(graycode);
        console.log("done");
    }
    setup();
    

    function main(tframe) {    
        window.requestAnimationFrame(main);
        // Create the image
        
    }

    // Call the main loop
    if(running && count<10000 )main(0);
};
