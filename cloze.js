var ClozeFlash = function(cloze, quest){
	this.cloze = cloze;
	this.quest = quest;

	this.displayQuest = function(){
		var display = quest.replace(cloze, "....");
		return display;
	}
}

var array = [];

var substance = {
	"Javascript" : "Javascript is standardized in EMCAScript language specification",
	"Mosaic Netscape" : "Mosaic Netscape was created by Mosaic Communications, and was the first popular graphical web browser.",
	"LiveScript" : "Produced under the name Mocha, LiveScript eventually became known as JavaScript.",
	"JScript" : "Microsoft created their own version of JavaScript in 1996, called JScript.",
	"Oracle" : "Javascript is a trademark of Oracle.",
	"object oriented" : "Javascript is an object oriented programming language."
};

for(var key in substance){
	array.push(new ClozeFlash(key, substance[key]));
};

module.exports = {array, ClozeFlash};