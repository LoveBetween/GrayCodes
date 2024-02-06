// The function gets called when the window is fully loaded
window.onload = function() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var ctx = canvas.getContext("2d");
    //document.getElementById ("gen").addEventListener ("click", main, false);
    
    // Define the image dimensions
    var width;
    var height;

    var scale = 4;
    var n = 10;
    var running = false;
    var bit_colour = "lightblue";

    
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

    function mod(n, m) {
        return ((n % m) + m) % m;
      }
    // ------------------------------------------------------- // Display
    function displayCode(gc) {
        ctx.fillStyle = "orange";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        for(j=0; j<height;j++){
            for(i=0; i<width;i++){
                if (gc[j][i] == 1){
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
            let a = ~~(i/len);
            return [a].concat(A[(1-a) * i + a * (len-1 - (i%len))]);
        });
        return B;
    }
    
    function BRGCmod(n){
        let A = Array.apply(0, Array(n)).map(function (x,i){
            return Math.pow(2, n-i-1);
        });
        /*
        let B = Array.apply(0, Math.pow(2, n)).map(function (x,i) {
            return Array.apply(0, n).map(function (x,1)
        });
        */
        let B = Array.apply(0, Array(Math.pow(2,n))).map(function(){return [];});
        for(i=0;i<A[0]*2;i++){
            for(j=0;j<n;j++){
                let res = mod((i-A[j]),(4*A[j]));
                if(res <2*A[j]){
                    B[i][j]= 1;
                }
            }
        }
        return B;
    }

    function BRGC3(n){
        let A = Array.apply(0, Array(1)).map(function() {
            return Array.apply(0, Array(n)).map(function() {
                return 0;
            });
        });
        for (let i=1;i<2**n;i++){
            if (i%2==1) {
                A.push([...A[A.length-1]]);
                A[A.length-1][n-1]=A[A.length-1][n-1]^1;
            }else{
                for (let k=n-1;k>=0;k--){
                    if (A[A.length-1][k]==1) {
                        A.push([...A[A.length-1]]);
                        A[A.length-1][k-1]=A[A.length-1][k-1]^1;
                        break;
                    }
                }
            }
        }
        return A;
    }

    // ------------------------------------------------------- // Main
    function setup(){
        width = n;
        height = Math.pow(2,n);
        canvas.width = width * scale;
        canvas.height = height * scale;
        //
        start();
        let graycode = BRGCmod(n);
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
