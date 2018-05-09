
var Display = function(size) {
	this.size = size;
	
	
	this.init = function() {
		//draw grid
		
		var field = document.createElement("div");
		field.id = "field";
		//column base from the size
		field.style.setProperty('grid-template-rows', `repeat(${size}, 60px)`);
		field.style.setProperty('grid-template-columns', `repeat(${size}, 60px)`);
		$('#game').empty();
		$('#game').append(field);
	}

	this.init_dashboard = function() {
		//dashboard
		var dashboard = $('<div/>',{ id: "dashboard" });
		var player1_status = $('<div/>',{ id: "player1_status", class : "status" }).append('<h3>' + board.player1.name + '</h3>');
		player1_status.append($('<div/>',{ id: "hp1" }));
		player1_status.append($('<div/>',{ id: "hold1" }));
		player1_status.append($('<div/>',{ id: "damage1" }));

		var player2_status = $('<div/>',{ id: "player2_status", class : "status" }).append('<h3>' + board.player2.name + '</h3>');
		player2_status.append($('<div/>',{ id: "hp2" }));
		player2_status.append($('<div/>',{ id: "hold2" }));
		player2_status.append($('<div/>',{ id: "damage2" }));

		var command = $('<div/>',{ id: "command" });
		var move_count = $('<div/>',{ id: "move" });
		$(dashboard).append(player1_status, player2_status, command, move_count);
		
		
		$('#game').append(dashboard);
	}

	this.draw = function(board) {
		var field = $('#field');
		field.empty();
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
	
		//game.append(field);


		
		this.activePlayerStatus();

		this.statusUpdate();

	}
	//active status highlight
	this.activePlayerStatus = function() {
		if (board.currentPlayer.id == board.PLAYER1 ) {
			$('#player1_status').addClass('active_status');
			$('#player2_status').removeClass('active_status');

		} else {
			$('#player2_status').addClass('active_status');
			$('#player1_status').removeClass('active_status');
		}
	}

	this.statusUpdate = function() {
		//status elements
		$('#player1_status #hp1').text('HP: ' + board.player1.hp);
		$('#player2_status #hp2').text('HP: ' + board.player2.hp);
		$('#player1_status #damage1').text('Damage: ' + board.player1.currentWeapon.damage);
		$('#player2_status #damage2').text('Damage: ' + board.player2.currentWeapon.damage);
		$('#player1_status #hold1').text('Weapon: '  + board.player1.currentWeapon.name);
		$('#move').text('Move Count: ' + board.currentPlayerAction);
		$('#player2_status #hold2').text('Weapon: ' + board.player2.currentWeapon.name);
	}



	
 

} 

var board;
var display;

function start() {
	var board_size = 10;
	$(document).on('keyup', handler);
	
	$(document).on("warEvent", initiateWar);
	$(document).on("gameOver", gameOver);
	$(document).on("updateCommand", updateCommand);

	board = new Board(board_size);
	board.init(); 
	display = new Display(board_size);
	display.init(); 
	display.init_dashboard();
	display.draw(board);

	$('#description').hide();
	$("#game").show();
}

function credits() {
	$("#credits, #description").toggle();
}

function back() {
	$("#description, #credits").toggle();
}

function handler(e) {
	event.preventDefault();
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

function initiateWar(e) {
	$(document).off('keyup', handler);
	$('#actionCommand').show();
	$( "#actionCommand" ).dialog({
		resizable: false,
		height: "auto",
		dialogClass: "no-close",
		width: 400,
		modal: true,
		buttons: {
			Attack : function() {
				board.attackCommand();
				sendMessage(board.currentPlayer.name + " attacks " + board.getOtherPlayer().name);
				$( this ).dialog( "close" );
				display.draw(board);
			},
			Defend : function() {
				board.currentPlayer.defend = true;
				sendMessage(board.currentPlayer.name + " defends.");
				board.switchCurrentPlayer();
				$(document).on('keyup', handler);
				$( this ).dialog( "close" );
				display.draw(board);
			}
		}
	});

}

function gameOver(e) { 
	/*
	$('#game').text('Game Over! Player ' + e.detail.name + ' has won the game.'); */
	$(document).off();
	$('#winner span').text(e.detail.name); 
	$('#gameOver').show();


	$('#gameOver').dialog({
		resizable: false,
		height: "auto",
		dialogClass: "no-close",
		width: 400,
		modal: true,
		buttons: {
			Restart: function() {
				start();
				$("#gameOver").toggle();
				$( this ).dialog( "close" );
			},
			Quit: function() {
				$( this ).dialog( "close" );
				$("#game, #quit").toggle();
			}
		}
	});
}

function updateCommand(event) {
	$('#command').text(event.detail.message);
	console.log(event.detail.message);
}

function sendMessage(message) {
	$.event.trigger ({
		type:"updateCommand",
		detail: {
			"message": message
		}
	});
}