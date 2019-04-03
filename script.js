//canvas variables
var c = document.getElementById("canvas");
var context = c.getContext("2d");

//number of rows and columns in 2d array
var row = 300;
var col = 300;

//pixel width and height (resolution x resolution)
console.log(canvas.height);
var resolution = canvas.height / row; 
console.log(resolution);
var speed = 200; //default 50

//generates random seed for alive pixel spawner
var seed = Math.floor(Math.random() * (1000000 - -1000000 + 1)) + -1000000;

//generates frequency based on last digit of seed
//smaller the frequency the higher the spawn rate
var frequency;
	if(seed < 0){
		 frequency = (seed % 10) * -1;
	}else{
		frequency = (seed % 10);
		if(frequency == 0){
			frequency++;
		}
	}

//2d array which is displayed
var cell = new Array(row);
for(var i = 0; i < cell.length; i++){
	cell[i] = new Array(col);
}

//temp storage array that stores updated pixels
var tempCell = new Array(row);
for(var i = 0; i < tempCell.length; i++){
	tempCell[i] = new Array(col);
}

//fills 2d array 'cell' with a random assortment of 1's or 0's
function randomizeCells(){
	var val;
	for(var i = 0; i < cell.length; i++){
		for(var j = 0; j < cell[0].length; j++){
			val = Math.floor(random() * (frequency - 0 + 1));
			if(val == 1){
				cell[i][j] = 1;
				tempCell[i][j] = 0;
			}else{
				cell[i][j] = 0;
				tempCell[i][j] = 0;
			}
		}
	}
}

//random function that can be seeded in order to
//generate the same environment more than once
function random(){
	var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

//displays the 2d array 'cell' to canvas
function drawCells(){
	var xPos = 0;
	var yPos = 0;
	
	//draws grid of white and black cells
	for(var i = 0; i < cell.length; i++){
		for(var j = 0; j < cell[0].length; j++){
			neighbors = countNeighbors(i, j);
			if(cell[i][j] == 1){
				//this section is draw out for customization
				if(neighbors == 1){
					context.fillStyle = "#FF0000";
				}else if(neighbors == 2){
					context.fillStyle = "#0abf00";
				}else if(neighbors == 3){
					context.fillStyle = "#0abf00";
				}else if(neighbors == 4){
					context.fillStyle = "#FF0000";
				}else if(neighbors == 5){
					context.fillStyle = "#FF0000";
				}else if(neighbors == 6){
					context.fillStyle = "#FF0000";
				}else if(neighbors == 7){
					context.fillStyle = "#FF0000";
				}else if(neighbors == 8){
					context.fillStyle = "#FF0000";
				}
				context.fillRect(xPos, yPos ,resolution, resolution);
			}else{
				context.fillStyle = "#000000";
				context.fillRect(xPos, yPos, resolution, resolution);
			}
			xPos += resolution;
		}
		yPos += resolution;
		xPos = 0;
	}
}

//calculates the state of each pixel for the next frame (step)
//this is where step rules are calculated
function advance(){
	var neighbors, state;
	for(var i = 0; i < row; i++){
		for(var j = 0; j < col; j++){
			neighbors = countNeighbors(i, j);
			state = cell[i][j]; 
			
			/*			
			-test rules
			if(state == 0 && neighbors == 3){
				tempCell[i][j] = 1;
			}else if(state == 0 && neighbors == 2){
				tempCell[i][j] = 1;
			}else if(state == 1 && neighbors == 4){
				tempCell[i][j] = 0;
			}
			*/
			
			//original rules
			if(state == 0 && neighbors == 3){
				tempCell[i][j] = 1;
			}else if(state == 1 && (neighbors < 2 || neighbors > 3)){
				tempCell[i][j] = 0;
			}else{
				tempCell[i][j] = state;
			}
		}
	}
	overwriteCells();
}

//copys data from array 'tempCell' to array 'cell'
function overwriteCells(){
	for(var i = 0; i < row; i++){
		for(var j = 0; j < col; j++){
			cell[i][j] = tempCell[i][j];
		}
	}
}

//determines the number of 'live' cells around a given cell (0 - 8)
//Note to self: make this cleaner. Please.
function countNeighbors(i, j){
	var count = 0;
	if(i - 1 >= 0){
		count += cell[i - 1][j];
		if(j - 1 >= 0){
			count += cell[i - 1][j - 1];
		}
		if(j + 1 < col){
			count += cell[i - 1][j + 1]
		}
	}
	if(i + 1 < row){
		count += cell[i + 1][j];
		if(j - 1 >= 0){
			count += cell[i + 1][j - 1];
		}
		if(j + 1 < col){
			count += cell[i + 1][j + 1]
		}
	}
	if(j - 1 >= 0){
		count += cell[i][j - 1];
	}
	if(j + 1 < col){
		count += cell[i][j + 1];
	}
	
	return count;
}

//function to clear canvas
function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

//the main driver for the simulation
//updates cell states, clears and draws cells in order to animate them
function runSimulation(){
	//randomly generated seed and frequency can be found in the console
	//note to self: make visible by simulation
	console.log("Seed: " + seed);
	
	randomizeCells();
	drawCells();
	setInterval(function(){
		advance();
		clearCanvas();
		drawCells();
	}, speed);
}

window.onload = function(){
	runSimulation();
}


//keyboard shortcuts
window.onkeypress = function(e){
	//spacebar to pause
	if(e.which == 32){
		alert("Paused");
	}
}