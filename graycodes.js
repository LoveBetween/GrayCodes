// Get the canvas and context
var canvas = document.getElementById("viewport");
var ctx = canvas.getContext("2d");
var n_input = document.getElementById("ninput"); 
//document.getElementById ("gen").addEventListener ("click", genCode, false);

// Define the image dimensions
var scale = 16;
var c_scale = 16;
var N = 5;
var bg_colour = "rgb(252,230,206)";
var bit_colour = "rgb(38,33,33)";

var width;
var height;

//other colors in palette (124,107,101), (247,154,54), (233,233,233)


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
// ------------------------------------------------------- // Display/js
function displayCode(gc) {
    canvas.width = width * scale + 1;
    canvas.height = height * scale  + 1;

    ctx.fillStyle = bg_colour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for(j=0; j<height;j++){
        for(i=0; i<width;i++){
            if (gc[j][i] == 1){
                ctx.rect(i * scale+1, j * scale+1, scale-1, scale-1);
            }
        }
    }
    ctx.fillStyle = bit_colour ; 
    ctx.fill();ctx.closePath();
}
// Display as a circle
//TODO - optimize loop, maybe inverse button?
function displayCircle(gc) {
    canvas.width = 2*c_scale*(N * 2);
    canvas.height = 2*c_scale*(N * 2);
    ctx.fillStyle = bg_colour;
    ctx.beginPath();
    ctx.lineWidth = N*c_scale;
    ctx.arc(canvas.width/2, canvas.height/2 , canvas.width/2-(N*c_scale/2), 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = bg_colour;
    ctx.lineWidth = c_scale-1;
    for(i=0;i<width;i++){
        for(j=0; j<height;j++){
            if (gc[j][i] == 1){
                ctx.beginPath();
                ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2-((i+0.5)*c_scale), 2 * Math.PI * j / height, 2 * Math.PI * (j+1) / height);
                ctx.stroke();
                ctx.closePath();
            } 
        }
        
        
    }
}

function dropDownFunction(a) {
    a.parentNode.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
    }
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) 
                openDropdown.classList.remove('show');
        }
    }
} 

// ------------------------------------------------------- // Algorithms

//Algo récursif naif pour BRGC
//On genere le BGRC de taille n puis on le copie en mirroir pour generer le BGRC de taille n+1
function BRGC(n){
    if (n==1){
        return [[0],[1]];
    }
    let A = BRGC(n-1);
    let len = A.length;
    let B = Array.apply(0, Array(len*2)).map(function (_,i) {
        let a = ~~(i/len);
        return [a].concat(A[(1-a) * i + a * (len-1 - (i%len))]);
    });
    return B;
}
//Algo basé sur ce calcul : 
//
function BRGCmod(n){
    let A = Array.apply(0, Array(50)).map(function(_,i){
        return 2**(n-i-1);
    });
    let B = Array.apply(0, Array(2**n)).map(function(){return [];});
    for(i=0;i<A[0]*2;i++){
        for(j=0;j<n;j++){
            let res = (i+3*A[j])%(4*A[j]);
            if(res <2*A[j]){
                B[i][j]= 1;
            }
        }
    }
    return B;
}

function BRGC3(n){      
    //Returns the Gray code on n bits of every number between 0 and (2**n)-1 with parity
    let A = Array.apply(0, Array(1)).map(function() {  
        return Array.apply(0, Array(n)).map(function() {
            return 0;
        });
    });
    //A an array containing an array with n zeros
    for (let i=1;i<2**n;i++){ 
        if (i%2==1) {
        //If the lign number is odd we flip the last bit of the lign
            A.push([...A[A.length-1]]);
            A[A.length-1][n-1]=A[A.length-1][n-1]^1;
            //The XOR of the bit with 1 flips the bit
        }else{
        //If the lign number is even we flip the bit on the left of the 1 furthest to the right
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
function  genCode(algorithm){
    N = n_input.value;
    width  = N;
    height = 2**N;
    start();
    let graycode = algorithm(N);
    end();
    console.log(graycode);
    displayCircle(graycode);
    console.log("done");
}
