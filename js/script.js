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
		2: "weapon",
		3: "weapon",
		4: "weapon",
		5: "player1",
		6: "player2"
	};
	this.currentPlayer = null;

	//write the method to get the class nameofgiven obj by position
	this.getClassName = function(x,y) {
		if (this.map[x][y] == this.currentPlayer.id ) {
			return this.classNames[this.currentPlayer.id] + " activePlayer";
		} 
		return this.classNames[this.map[x][y]];
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
	}

	this.generateStones = function() {
		var numStones = Math.floor(0.12 * this.size * this.size); //12 percentage of the number of cells on the board
		var i = 0;
		while ( i<numStones ) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == 0) {
				this.map[x][y] = 1;
				i++;
			}
		}
	}



	//weapons
	this.sword = new Weapon(2, 20);
	this.spear = new Weapon(3, 40);
	this.hammer = new Weapon(4,50);

	this.generateWeapons = function() {
		this.weapons = [this.sword, this.spear, this.hammer];


		for (i=0; i< this.weapons.length; i++) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == 0) {
				this.map[x][y] = this.weapons[i].id;
			} else {
				i =- 1;
			}
		}

		/*
		var i = 0;
		while ( i<3 ) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == 0) {
				this.map[x][y] = this.weapons[i].id;
				i++;
			}
		} */


	}


	//players
	this.player1 = new Player(5);
	this.player2 = new Player(6);

	this.generatePlayers = function() {
		this.player = [this.player1, this.player2];

		i=0;
		while(i<this.player.length) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == 0) {
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
				row.push(0); //initialize the row of empty spaces
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
	this.damage = 5;

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