/*
to do :
this.size
this.init --> draw css grid and assign basic css
this.draw --> draw the board
this.clear
 */

/* console call :
var display = new Display(10);
display.init();
display.draw();
*/


var Display = function(size) {
	this.size = size;
	this.draw = function(board) {
		//draw grid
		var field = document.createElement("div");
		field.id += "field";
		//column base from the size
		field.style.setProperty('grid-template-columns', `repeat(${size}, 70px)`);
		for (i=0; i < this.size; i++) {
			//create column
			var column = document.createElement("div");
			column.className += "column";
			for (j=0; j< this.size; j++) {
				//create data
				var data = document.createElement("div");
				data.className += "data ";
				data.className += board.getClassName(i,j);

				data.appendChild(document.createTextNode(" "));
				column.append(data);
			}
			field.append(column);
		}

		var game = document.getElementById("game");
		$("#game").empty();
		game.append(field);
		document.body.append(game);

	}

} 

function start() {
	var board = new Board(10);
	board.init(); 
	var display = new Display(10); 
	display.draw(board);

	$("body").on('keyup', handler);
}

function handler(e) {
	event.preventDefault();
	console.log(e.which); 
	//check e.which if left arrow key is pressed call board.moveCurrentPlayer("left");
}