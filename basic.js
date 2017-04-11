var BasicFlash = function(front,back){
	this.front = front;
	this.back = back;
}

var array = [];

var substance = {
	"How many triple doubles has Russell Westbrook had this season?": "42",
	"Who is the only other player prior to Russell to have more than 40 in a season?": "Oscar Robinson",
	"One other player had more than 20 triple doubles this season, he was: ": "James Harden",
	"What do you call a triple double with 10 turnovers?": "Triple Trouble",
	"What seed is OKC in the Western Conference?": "6th"
};

for (var key in substance){
	array.push(new BasicFlash(key, substance[key]));
};

module.exports = {array, BasicFlash};