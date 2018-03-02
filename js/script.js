/*

lis of objects for game:
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
	this.currentPlayer = null;
	this.GRASS = 0;
	this.STONE = 1;
	this.SWORD = 2;
	this.SPEAR = 3;
	this.HAMMER1 = 4;
	this.HAMMER2 = 5;
	this.PLAYER1 = 6;
	this.PLAYER2 = 7;


	//write the method to get the class nameofgiven obj by position
	this.getClassName = function(x,y) {
		if (this.map[x][y] == this.currentPlayer.id ) {
			return this.classNames[this.currentPlayer.id] + " activePlayer";
		} 
		return this.classNames[this.map[x][y]];
	}

	//weapons
	this.sword = new Weapon(this.SWORD, 20);
	this.spear = new Weapon(this.SPEAR, 40);
	this.hammer1 = new Weapon(this.HAMMER1,50);
	this.hammer2 = new Weapon(this.HAMMER2, 50);
	this.weapons;

	this.generateWeapons = function() {
		
		this.weapons = [this.sword, this.spear, this.hammer1, this.hammer2];
		var i = 0;
		while ( i < this.weapons.length ) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == this.GRASS) {
				this.map[x][y] = this.weapons[i].id;
				this.weapons[i].setPosition(x,y);
				i++;
			}
		}
	}




	this.moveCurrentPlayer = function(direction) {
		//goal : move player to left
		//get currentPlayer's x y
		//check if x-1 is within boundary
			//check if x-1,y is free to move 
				//set this.map x,y to grass 
				//set this.map x-1,y to currentPlayer's id
				//set currentPlayer's position to x-1,y through the setPosition method
				// change currentPlayer to the other player
		
		var x = this.currentPlayer.x;
		var y = this.currentPlayer.y;


		if (direction == "left") {
			if (y-1 >= 0) {
				
				if(this.map[x][y-1] >= this.SWORD && this.map[x][y-1] <= this.HAMMER2) {

					var tempWeapon = this.currentPlayer.currentWeapon;
					this.currentPlayer.currentWeapon = this.weapons[this.map[x][y-1]];
					this.currentPlayer.setPosition(x,y-1);
					this.map[x][y] = this.GRASS;
				}
				
				if (this.map[x][y-1] == this.GRASS) {
					this.map[x][y-1] = this.currentPlayer.id;
					this.currentPlayer.setPosition(x,y-1);
					this.map[x][y] = this.GRASS;
					
				} 
			}
		} else if (direction == "right") {
			if (y+1 < this.size) {
				if (this.map[x][y+1] == this.GRASS) {
					this.map[x][y+1] = this.currentPlayer.id;
					this.currentPlayer.setPosition(x,y+1);
					this.map[x][y] = this.GRASS;
					
				}
			}
		} else if (direction == "up") {
			if (x-1 >= 0) {
				if (this.map[x-1][y] ==this.GRASS) {
					
					this.map[x-1][y] = this.currentPlayer.id;
					this.currentPlayer.setPosition(x-1,y);
					this.map[x][y] = this.GRASS;
					
				}
			}
		} else if (direction == "down") {
			if (x+1 < this.size) {
				if (this.map[x+1][y] ==this.GRASS) {
					
					this.map[x+1][y] = this.currentPlayer.id;
					this.currentPlayer.setPosition(x+1,y);
					this.map[x][y] = this.GRASS;
					
				}
			}
		}


		//this.toggleCurrentPlayer();
		

	}

	this.generateStones = function() {
		var numStones = Math.floor(0.12 * this.size * this.size); //12 percentage of the number of cells on the board
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
	this.player1 = new Player(this.PLAYER1);
	this.player2 = new Player(this.PLAYER2);

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

}

var Player = function(id) {

	this.id = id;
	this.hp = 100;
	this.currentWeapon = new Weapon(0, 5);

	this.x = null;
	this.y = null;
	this.setPosition = function(x,y) {
		this.x = x;
		this.y = y;
	}

}

var Weapon = function(id, damage) {
	this.id = id;
	this.damage = damage;

	this.x = null;
	this.y = null;
	this.setPosition = function(x,y) {
		this.x = x;
		this.y = y;
	}
}