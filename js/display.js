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
	this.init = function() {
		//draw grid
		var field = document.createElement("table");
		for (i=0; i < this.size; i++) {
			var tr = document.createElement("tr");
			for (j=0; j< this.size; j++) {
				var td = document.createElement("td");
				td.appendChild(document.createTextNode("0"));
				tr.append(td);
			}
			field.append(tr);
		}

		var game = document.getElementById("game");
		game.append(field);
		document.body.append(game);
	}

	this.draw = function() {
		//draw board
		$("tr").addClass("row");
        $("td").addClass("data");

	}
} 

/*
function start() {
	//grid map
	var field = document.createElement("table");
		//grass
		for (i=0; i < 10; i++) {
			var tr = document.createElement("tr");
			for (j=0; j< 10; j++) {
				var td = document.createElement("td");
				td.appendChild(document.createTextNode("0"));
				tr.append(td);
			}
			field.append(tr);
		}
		var game = document.getElementById("game");
		game.append(field);
		document.body.append(game);

        $("tr").addClass("row");
        $("td").addClass("data");
} 
*/