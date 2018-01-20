/*

lis of objects for game:
Board object : responsible of knowing where everyhing is in the map.


 */

var Board = function(size) {
	this.map= [];
	this.size = size;

	/*this.player_1 = new Player();
	this.player_2 = new Player(); */

	this.sword = new Weapon(2, 20);
	this.spear = new Weapon(3, 40);
	this.hammer = new Weapon(4,50);

	this.generateWeapons = function() {
		var i = 0;
		while ( i<3 ) {
			var x = Math.floor(Math.random() * this.size);
			var y = Math.floor(Math.random() * this.size);

			if (this.map[x][y] == 0) {
				this.map[x][y] = this.sword.id;
				i++;
			}
			if (this.map[x][y] == 0) {
				this.map[x][y] = this.spear.id;
				i++;
			}
		}


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
	}

}

var Player = function(id) {
	//identify players
	//generate players
	//initialize players

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