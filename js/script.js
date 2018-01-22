/*

lis of objects for game:
Board object : responsible of knowing where everyhing is in the map.


 */

var Board = function(size) {
	//map
	this.map= [];
	this.size = size;

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


		for (i=0; i< 3; i++) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == 0) {
				this.map[x][y] = this.weapons[i].id;
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

		for(i=0; i< this.player.length; i++) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == 0) {
				this.map[x][y] = this.player[i].id;
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