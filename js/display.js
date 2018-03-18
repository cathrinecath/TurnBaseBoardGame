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
		field.style.setProperty('grid-template-rows', `repeat(${size}, 60px)`);
		field.style.setProperty('grid-template-columns', `repeat(${size}, 60px)`);
		for (i=0; i < this.size; i++) {
			//create column
			//var column = document.createElement("div");
			//column.className += "row";
			for (j=0; j< this.size; j++) {
				//create data
				var data = document.createElement("div");
				data.className += "data ";
				data.className += board.getClassName(i,j);

				//data.appendChild(document.createTextNode(board.map[i][j]));
				//column.append(data);
				field.append(data);
			}
			//field.append(column);
		}

		var game = document.getElementById("game");
		$("#game").empty();
		game.append(field);
		document.body.append(game);

		$('#game').css({"background-color":"black", "height":"600px", "width":"800px", "padding":"20px"});
		$('.stone').append('<img src="../assets/boulder.png" class="boulder_img">');
		$('.sword').append('<img src="../assets/sword2.png" class="sword_img">');
		$('.spear').append('<img src="../assets/spear.png" class="spear_img">');
		$('.hammer').append('<img src="../assets/axe2.png" class="hammer_img">');
		$('.player1').append('<img src="../assets/player1.png" class="player1_img">');
		$('.player2').append('<img src="../assets/player2.png" class="player2_img">');

		//dashboard
		var dashboard = $('<div id="dashboard"></div>');
		var player1_status = $('<div id="player1_status" class="status"><h3>Player1</h3></div>');
		var player2_status = $('<div id="player2_status" class="status"><h3>Player2</h3></div>');
		var command = $('<div id="command"></div>');
		var move_count = $('<div id="move"></div>');
		$('#game').append(dashboard);
		$('#dashboard').append(player1_status);
		$('#dashboard').append(player2_status);
		$('#dashboard').append(command);
		$('#dashboard').append(move_count);

		//active status highlight
		board.activePlayerStatus = function() {
			if (board.currentPlayer.id == board.PLAYER1 ) {
				$('#player1_status').addClass('active_status');
				
			} else {
				$('#player2_status').addClass('active_status');
			}
		}
		board.activePlayerStatus();

		//status elements
		var $hp = $('<div id="hp"></div>');
		var $weapon = $('<div id="hold"></div>');
		var $damage = $('<div id="damage"></div>');
		var $stat_arr = [$hp, $weapon, $damage];
		$.each($stat_arr, function(i, el) {
			$(el).appendTo(".status");
		})

		$('#player1_status #hp').text('HP: ' + board.player1.hp);
		$('#player2_status #hp').text('HP: ' + board.player2.hp);
		$('#player1_status #damage').text('Damage: ' + board.player1.currentWeapon.damage);
		$('#player2_status #damage').text('Damage: ' + board.player2.currentWeapon.damage);
		$('#player1_status #hold').text('Weapon: '  + board.player1.currentWeapon.name);
		$('#move').text('Move Count: ' + board.currentPlayerAction);
		$('#player2_status #hold').text('Weapon: ' + board.player2.currentWeapon.name);



		
	}

} 

var board;
var display;

function start() {
	board = new Board(10);
	board.init(); 
	display = new Display(10); 
	display.draw(board);

	$("body").on('keyup', handler);
}

function handler(e) {
	event.preventDefault();
	console.log(e.which); 
	//check e.which if left arrow key is pressed call board.moveCurrentPlayer("left");
	switch (e.which) {
		case 37 :
			board.moveCurrentPlayer("left");
			display.draw(board);
		break;

		case 39 :
			board.moveCurrentPlayer("right");
			display.draw(board);
		break;

		case 38 :
			board.moveCurrentPlayer("up");
			display.draw(board);
		break;

		case 40 :
			board.moveCurrentPlayer("down");
			display.draw(board);
		break;
	}
}


