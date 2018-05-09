/*

list of objects for game:
Board object : responsible of knowing where everyhing is in the map.


 */

var Board = function(size) {
	//map
	this.map= [];
	this.size = size;
	this.classNames = {
		0: "grass",
		1: "stone",
		2: "weapon sword",
		3: "weapon spear",
		4: "weapon hammer",
		5: "weapon hammer",
		6: "player1",
		7: "player2"
	};
	var MAX_TURNS = 3;
	var MIN_TURNS = 0;
	var STONE_VARIANCE = 0.12;

	this.currentPlayer = null;
	this.currentPlayerAction = MAX_TURNS;
	this.GRASS = 0;
	this.STONE = 1;
	this.SWORD = 2;
	this.SPEAR = 3;
	this.HAMMER1 = 4;
	this.HAMMER2 = 5;
	this.PLAYER1 = 6;
	this.PLAYER2 = 7;
	this.PUNCH = 0;

	this.sword = new Weapon(this.SWORD, "Sword", 20);
	this.spear = new Weapon(this.SPEAR, "Spear", 40);
	this.hammer1 = new Weapon(this.HAMMER1, "Hammer", 50);
	this.hammer2 = new Weapon(this.HAMMER2, "Hammer", 50);
	this.weapons = {
			"2": this.sword,
			"3": this.spear,
			"4": this.hammer1,
			"5": this.hammer2
	}

	var weapons_on_map = [this.sword, this.spear, this.hammer1, this.hammer2];
	var weapons_with_players = [];

	this.getOtherPlayer = function() {
		if (this.currentPlayer.id == this.PLAYER1 ) {
			return this.player2;
		} else {
			return this.player1;
		}
	}

	this.switchCurrentPlayer = function() {
		if (this.currentPlayer.id == this.PLAYER1 ) {
			this.currentPlayer = this.player2;
		} else {
			this.currentPlayer = this.player1;
		}
		this.currentPlayerAction = MAX_TURNS;
		sendMessage(this.currentPlayer.name + "'s turn.");
	}

	//write the method to get the class nameofgiven obj by position
	this.getClassName = function(x,y) {
		if (this.map[x][y] == this.currentPlayer.id ) {
			return this.classNames[this.currentPlayer.id] + " activePlayer ";
		} 
		return this.classNames[this.map[x][y]];
	}

	//weapons
	

	this.generateWeapons = function() {

		var weapons_list = [this.sword, this.spear, this.hammer1, this.hammer2];
		
		var i = 0;
		while ( i < weapons_list.length ) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == this.GRASS) {
				this.map[x][y] = weapons_list[i].id;
				weapons_list[i].setPosition(x,y);
				i++;
			}
		}
	}

	this.attackCommand = function() {
		this.getOtherPlayer().takeDamage(this.currentPlayer.currentWeapon.damage);
		if (this.getOtherPlayer().alive == false) {
			$(document).off('keyup');
			$.event.trigger ({
				type:"gameOver",
				detail: {
					name: this.currentPlayer.name
				}
			});
		} else {$(document).on('keyup', handler);}

		this.switchCurrentPlayer();
	}

	this.moveCurrentPlayer = function(direction) {
		var oldX = this.currentPlayer.x;
		var oldY = this.currentPlayer.y;
		var newX = oldX;
		var newY = oldY;
		var tempWeapon = this.currentPlayer.currentWeapon;
		this.clearCommandLine();

		switch(direction) {
			case "left": newY = oldY-1; break;
			case "right": newY = oldY+1; break;
			case "up": newX = oldX-1; break;
			case "down": newX = oldX+1; break;
		}

		if (newX >=0 && newY >=0 && newX < this.size && newY < this.size) { //boundary check
			//check if the next position is the other player
			if (this.map[newX][newY] == this.PLAYER1 || this.map[newX][newY] == this.PLAYER2) {
				//do nothing

			} 
			
			else if(this.map[newX][newY] >= this.SWORD && this.map[newX][newY] <= this.HAMMER2) { //weapon exchange
				
				this.currentPlayer.currentWeapon = this.weapons[this.map[newX][newY]];

				this.map[newX][newY] = this.currentPlayer.id;

				this.currentPlayer.setPosition(newX,newY);
				this.map[oldX][oldY] = this.GRASS;

				if (tempWeapon.id == this.PUNCH) {
					weapons_with_players.push(weapons_on_map.splice(weapons_on_map.indexOf(this.currentPlayer.currentWeapon), 1));
				} else {
					weapons_with_players.push(weapons_on_map.splice(weapons_on_map.indexOf(this.currentPlayer.currentWeapon), 1));
					tempWeapon.setPosition(newX,newY);
					weapons_on_map.push(tempWeapon);
				}

				this.currentPlayerAction -= 1;
				
			}
			
			else if (this.map[newX][newY] == this.GRASS) { //move to free space
				this.map[newX][newY] = this.currentPlayer.id;
				this.currentPlayer.setPosition(newX,newY);
				this.map[oldX][oldY] = this.GRASS;
				this.currentPlayerAction -= 1;
			} 

			this.repositionWeapons();

			var adjacentPosition = {
				"up": [this.currentPlayer.x-1, this.currentPlayer.y],
				"down": [this.currentPlayer.x+1, this.currentPlayer.y],
				"left":[this.currentPlayer.x, this.currentPlayer.y-1],
				"right": [this.currentPlayer.x, this.currentPlayer.y+1]
			}

			
			//check if there is player next to each other
			
			for(key in adjacentPosition) {
				if (this.checkForPlayer(adjacentPosition[key][0],adjacentPosition[key][1])) {
					this.currentPlayerAction += 1;
					$.event.trigger({
						type: "warEvent"
					});
					break;
				}
			}

			if (this.currentPlayerAction == MIN_TURNS) {
				this.switchCurrentPlayer();
			}

		}


	}

	this.checkForPlayer = function(x,y) {
		if (x >= 0 && y>=0 && x<this.size && y<this.size) {
			if(this.map[x][y] == this.getOtherPlayer().id) {
				return true;
			}
		}
		return false;
	}
	
	
	this.repositionWeapons = function() {
		for(i=0; i<weapons_on_map.length; i++) {
			var x = weapons_on_map[i].x;
			var y = weapons_on_map[i].y;
			if (this.map[x][y] !== this.PLAYER1 && this.map[x][y] !== this.PLAYER2) {
				this.map[x][y] = weapons_on_map[i].id;
			}
			
		} 

	} 

	this.generateStones = function() {
		var numStones = Math.floor(STONE_VARIANCE * this.size * this.size); //12 percentage of the number of cells on the board
		var i = 0;
		while ( i<numStones ) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == this.GRASS) {
				this.map[x][y] = this.STONE;
				i++;
			}
		}
	}


	//players
	this.player1 = new Player(this.PLAYER1, "Alice");
	this.player2 = new Player(this.PLAYER2, "Bob");

	this.generatePlayers = function() {
		this.player = [this.player1, this.player2];

		i=0;
		while(i<this.player.length) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == this.GRASS) {
				this.map[x][y] = this.player[i].id;
				this.player[i].setPosition(x,y); //get player position
				i++;
			}
		}
	}

	this.init = function() {
		//generate empty spaces
		var row = [];
		for (i=0; i< this.size; i++) {
			for (j=0; j<this.size; j++){
				row.push(this.GRASS); //initialize the row of empty spaces
			}
			this.map.push(row);
			row=[]
		}
		
		//generate stones
		this.generateStones();
		//generate weapons
		this.generateWeapons();
		//generate players
		this.generatePlayers();
		this.currentPlayer = this.player[0];
	}

	this.clearCommandLine = function() {
		$('#commandLine').text('');
	}

}

var Player = function(id,name) {
	this.name = name;
	this.id = id;
	this.hp = 100;
	this.currentWeapon = new Weapon(0, "Punch", 10);
	this.defend = false;
	this.alive =true;
	this.x = null;
	this.y = null;
	this.setPosition = function(x,y) {
		this.x = x;
		this.y = y;
	}

	this.takeDamage = function(dp) {
		if(this.defend) {
			dp = dp/2;
		}
		this.hp = this.hp - dp;
		this.defend = false;
		if (this.hp <= 0) {
			this.alive = false;
		}
	}
}

var Weapon = function(id, name, damage) {
	this.id = id;
	this.name = name;
	this.damage = damage;

	this.x = null;
	this.y = null;
	this.setPosition = function(x,y) {
		this.x = x;
		this.y = y;
	}
}