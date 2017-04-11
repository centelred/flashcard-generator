//exports cloze/basic for different flashcard games
var clozeExp = require('./cloze.js');
var basicExp = require('./basic.js');
//inquirer for prompt, fs for file writing
var inquirer = require('inquirer');
var fs = require('fs');
//set counts to 0
var count = 0;
var correct = 0;
var incorrect = 0;
//begin game logic
function start() {
    console.log('-------------------------------');
    console.log('-------Custom-Flashcards-------');
    console.log('-------------------------------');
    //pick from list of options
    inquirer.prompt([{
            type: "list",
            message: "Pick from below:",
            choices: ["Cloze Flashcard Quiz",
                "Basic Flashcard Quiz",
                "Add a cloze card",
                "Add a basic card",
                "End/Exit"
            ],
            name: "choices"
        }

    ]).then(function(data) {
        if (data.choices === "Cloze Flashcard Quiz") {
            ClozeFlash();
        } else if (data.choices === "Basic Flashcard Quiz") {
            BasicFlash();
        } else if (data.choices === "Add a cloze card") {
            addCloze();
        } else if (data.choices === "Add a basic card") {
            addBasic();
        } else {
            process.exit();
        };
    });
};
//function to add cards to basic array
function addBasic() {
    inquirer.prompt([{
        type: "input",
        message: "Enter the text for the front of the card",
        name: "front",
        default: ""
    }, {
        type: "input",
        message: "Enter the text for the back of the card",
        name: "back",
        default: ""
    }
    ]).then(function(data) {
        basicExp.array.push(new basicExp.BasicFlash(data.front, data.back));
        inquirer.prompt([{
            type: "confirm",
            name: "confirm",
            message: "Do you want to save this card?"
        }]).then(function(data) {
            if (data.confirm) {
                addBasic(basicExp.array[basicExp.array.length - 1]);
                start();
            } else {
                start();
            };
        });
    });
};
//function for adding a cloze card
function addCloze() {
    inquirer.prompt([{
            type: "input",
            message: "Enter new answer",
            name: "cloze",
            default: ""
        }, {
            type: "input",
            message: "Enter new question, including the answer.",
            name: "question",
            default: ""
        }

    ]).then(function(data) {
        if (data.question.indexOf(data.cloze) !== -1) {
            clozeExp.array.push(new clozeExp.ClozeFlash(data.cloze, data.question));
            inquirer.prompt([{
                    type: "confirm",
                    name: "confirm",
                    message: "Do you want to save this card?"
                }

            ]).then(function(data) {
                if (data.confirm) {
                    addCloze(clozeExp.array[clozeExp.array.length - 1]);
                    start();
                } else {
                    start();
                };
            });
        } else {
            console.log("There is no answer included in this question");
            closeSave();
        };
    });
};
//saving basic card to log.txt
function basicSave(flash) {
    fs.appendFile('log.txt', 'Front: ' + flashcard.front + 'Back: ' + flashcard.back + '\n', 'UTF-8', function(error) {
        if (error) throw error;
    });
}
//saving cloze card to log.txt
function clozeSave(flash) {
    fs.appendFile('log.txt', 'Cloze: ' + flashcard.cloze + 'Question: ' + flashcard.question + '\n' + 'UTF-8', function(error) {
        if (error) throw error;
    });
}
//basic quiz logic
function BasicFlash(front, back) {
    if (count < basicExp.array.length) {
        inquirer.prompt([{
            type: "input",
            message: basicExp.array[count].front,
            name: "question",
            default: ""
        }]).then(function(data) {
            if (data.question === basicExp.array[count].back) {
                console.log('CORRECT!');
                correct++;
            } else {
                console.log(basicExp.array[count].back);
                incorrect++;
            };

            count++;
            BasicFlash();
        });
    } else {
        basicGameOver();
    };
};
//cloze quiz logic
function ClozeFlash(cloze, question) {
    if (count < clozeExp.array.length) {
        inquirer.prompt([{
            type: "input",
            message: clozeExp.array[count].displayQuest(),
            name: "question",
            default: ""
        }]).then(function(data) {
            if (data.question === clozeExp.array[count].cloze) {
                console.log('CORRECT!');
                correct++;
            } else {
                console.log(clozeExp.array[count].quest);
                incorrect++;
            };
            count++;
            ClozeFlash();
        });
    } else {
        clozeGameOver();
    };
};
//basic game over
function basicGameOver() {
    console.log('You had ' + correct + ' correct answers and ' + incorrect + ' wrong answers');

    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Try again?"
    }]).then(function(data) {
        count = 0;
        correct = 0;
        incorrect = 0;

        if (data.confirm) {
            BasicFlash();
        } else {
            start();
        }
    });
};
//cloze game over
function clozeGameOver() {
    console.log('You had ' + correct + ' correct answers and ' + incorrect + ' wrong answers');

    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Try again?"
    }]).then(function(data) {
        count = 0;
        correct = 0;
        incorrect = 0;

        if (data.confirm) {
            ClozeFlash();
        } else {
            start();
        }
    });
};

start();
