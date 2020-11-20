window.addEventListener('load', main);



function main() {
    let nrOfDots = 0;
    let multiplier = 0;
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    addEventListeners();
    setFullScreen(canvas)
    draw(context, nrOfDots, multiplier);

    function addEventListeners() {
        const dotsInput=document.getElementById('dots');
        const multiplierInput=document.getElementById('multiplier');
    
        dotsInput.addEventListener('input', handleNumberOfDotsChange)
        multiplier.Input=document.addEventListener('input',handleMultiplierChange)
    }
    
    function handleNumberOfDotsChange(event){
        nrOfDots= event.target.value;
        draw(context, nrOfDots, multiplier);
    }
    
    function handleMultiplierChange(event){
        multiplier = event.target.value;
        draw(context, nrOfDots, multiplier);
    }
}



function draw(context, nrOfDots, multiplier) { 
    const radius = window.innerWidth * 0.25;

    context.clearRect(0,0,window.innerWidth,window.innerHeight)
    drawCircle(context, radius);
    const dots = drawDotsOnCircle(context, radius, nrOfDots);//<<< another alternative is to save global variables.
    drawLinesBetweenDots(context, multiplier, dots);//<<<
}

/**
 * Draws a circle in the browser. 
 * @param {CanvasRenderingContext2D} context 
 * @param {Number} radius 
 */
function drawCircle(context, radius){ 
    context.strokeStyle = 'lightgrey';
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;


    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.closePath();

    context.stroke();
}

/**
 * adds points to the circle 
 * @param {CanvasRenderingContext2D} context 
 * @param {Number} radius 
 * @param {Number} nrOfDots
 * @returns {Array<any>} positions of the dots.
 */
function drawDotsOnCircle(context, radius, nrOfDots) {
    context.fillStyle = 'red';
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dotRadius = radius / 200;
    const dots = [];

    for (let i = 0; i < nrOfDots; i++) {
        const angle = Math.PI * 2 / nrOfDots * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        dots.push({x,y});//<<<<< pushes dot positions out of for loop into array.

        context.beginPath();
        context.arc(x,y,dotRadius,0,Math.PI * 2);
        context.closePath();
        context.fill();
    }
    
    return dots;//<<<
}

/**
 * 
 * @param {CanvasRenderingContext2d} context 
 * @param {Number} multiplier 
 */
function drawLinesBetweenDots(context, multiplier, dots) {//<<<
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    
    for (let i = 0; i < dots.length; i++){
        const dot = dots[i];
        const nextIndex = (i * multiplier) % dots.length;//modulus 
        const nextDot = dots[nextIndex];

        context.strokeStyle = `hsl(${199 + i % 70}, 100%, 40%)`;
        context.beginPath();
        context.moveTo(dot.x,dot.y);
        context.lineTo(nextDot.x, nextDot.y);
        context.stroke();
        context.closePath();
    }
}

    

function setFullScreen(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
