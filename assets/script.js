$(document).ready(function() {

	var hardWords = ["abacinate", "abseil", "abulia", "acarpous", "adust", "afflatus", "afflatus", "albedo", "anaglyph", "anapestic", 
					 "backsheesh", "batrachomyomachia", "belletristic", "billingsgate", "brobdingnagian", "bumf", "buskin",
					 "callathump", "caparisoned", "capriole", "catachresis", "cerulean", "cerumen", "chilblain", "chrestomathy", "cicatrice", "cygnet",
					 "daedal", "deliquesce", "demimondaine", "devitrify", "dithyramb", "durance",
					 "eidetic", "embouchure", "epistaxis", "etiolate", "euphuism", "exordium",
					 "falcate", "flocculate", "fulgurous", "frowsty", "funambulism", "fustian", "fustigate",
					 "gallimaufry", "gharry", "gimcrack", "grampus",
					 "haecceity", " hapax legomenon", "haulm", "hebdomad", "hobbledehoy", "horripilation", "hypostatize", "hypothecate",
					 "icosahedron", "incalescence", "incarnadine", "incommensurable", "inculpate", "involution",
					 "jackanapes", "jacitation", "janissary", "kerygma", "khamsin", "kopje", "lagniappe", "lammergeyer", "lancinating", "leptorhine", 
					 "liege", "logomachy", "longanimity", "maieutic method", "malversate", "matutinal", "muliebrity", "mumpsimus", 
					 "neap tide", "nonesuch", "objurgate", "obnubilate", "odalisque", "orangery", "oscitance", "palanquin", "pandiculation", "paranomasia",
					 "parvenu", "peculate", "periphrasis", "peristyle", "pettifoggery", "picaresque", "platitudunarian", "plenipotentiary", "propaedeutic",
					 "purblind", "quidnunc", "quandam", "sacerdotal", "salmagundi", "scholium", "sempiternal", "seraglio", "spavined", "spoliation", "tatterdemalion",
					 "thanatopsis", "thaumaturgist", "umbilicus", "valetudinarian", "vermiculation", "vigesimal", "zymurgy", "asyndeton", "nescient"];
	var mediumWords = ["hadal", "xeric", "welkin", "verruca", "ullage", "twee", "tosh", "tarn", "swale", "skint", "rive", "pule", "prink", "palter", "nard", "moil", 
					   "mews", "marl", "manse", "magus", "lollop", "ligneous", "kith", "kibe", "hogget", "halberd", "ghat", "footling", 
					   "fen", "fain", "eremite", "eidos", "doxy", "dint", "devoir", "davit", "umber", "cumber", "crapulous", "corsair", "condemn", "imprison", 
					   "secretary", "cockade", "claver", "chirk", "chaffer", "bezel", "blatant", "fidgit", "bewray", "corporeal", "universal", "weighty", "anile", "hobgoblin", 
					   "homunculous"];
	var easyWords = ["cast", "cats", "dogs", "glass", "computer", "mouse", "keyboard", "monitor", "remote", "work", "pen", "paper", "notebook", "banana", "camel", "bear", "beer",
					 "deer", "forest", "mountain", "coffee", "mug", "match", "finger", "hand", "television", "pipe", "picture", "painting", "duck", "goose", "sitcom", "yoyo", 
					 "money", "bitcoin", "invest", "book", "shelf", "power", "candy", "smile", "hair", "tooth", "knife", "fork", "spoon", "left", "right", "government", "anarchy",
					 "medicine", "forget", "building", "tower", "house", "apartment", "tissue", "frog", "mouth", "tongue", "tooth", "bean", "fridge", "water", "food", "safe",
					 "bike", "toy", "pencil", "bark", "meow"];
	
	var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	var guesses;
	var difficulty;
	var difficultyChosen;
	var numberOfWins;
	var numberOfLosses;
	var answer;
	var answerDisplay;
	var randomWord;
	var currentWord;
	var remainingLetters;
	var matchingLetter;

	//INITIALIZE THE APP 
	function initializeApp() {
    guesses = "";
    difficulty = "";
    result = "";
    difficultyChosen = false;
    answer = [];
    randomWord = "";
    currentWord = [];
    answerDisplay = [];
    remainingLetters = "";
    matchingLetter = "";
    numberOfWins = 0;
    numberOfLosses = 0;

    $(".letter-buttons").empty();
	}

	initializeApp();

	function resetApp(wins, losses){
	guesses = "";
    difficulty = "";
    result = "";
    difficultyChosen = false;
    answer = [];
    randomWord = "";
    currentWord = [];
    answerDisplay = [];
    remainingLetters = "";
    matchingLetter = "";
    numberOfLosses = losses;
    numberOfWins = wins;    
	}

	//CREATE AN EVENT LISTENER FOR THE DIFFICULTY BUTTONS
	$(".difficulty-button").click(function() {
		if(difficultyChosen === true) return;
		difficulty = $(this).val();
		$("#nicCage").attr("src", "./images/nicCage_dementedLookUp.png");
		$(".letter-buttons").empty();
		$(".wrong-letters").empty();

		//CREATE THE LETTER BUTTON DISPLAYS
		for(index = 0; index < letters.length; index++){
				var letterBtn = $("<button>");
				letterBtn.addClass("available-letter-button available-letter available-letter-button-color");
				letterBtn.attr("data-letter", letters[index]);
				letterBtn.html(letters[index]);
				$(".letter-buttons").append(letterBtn);
		}
		if(difficulty === "easy"){
			guesses = 5;
			randomWord = easyWords[Math.floor(Math.random() * easyWords.length)];
			startGame(randomWord, guesses);
		}else if(difficulty === "medium"){
			guesses = 10;
			randomWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
			startGame(randomWord, guesses);
		}else if(difficulty === "hard"){
			guesses = 10;
			randomWord = hardWords[Math.floor(Math.random() * hardWords.length)];
			startGame(randomWord, guesses);
		}
		//SET DIFFICULTY CHOSEN TO TRUE
		difficultyChosen = true;

		//PRIMARY GAME LOGIC
		function startGame(randomWord, guesses){
			randomWord = randomWord.toLowerCase();
			console.log(randomWord);
			currentWord = randomWord.split("");
				for(var index = 0; index < currentWord.length; index++){
					answerDisplay[index] = " __ ";
				}
			remainingLetters = currentWord.length;
			var blankSpaces = answerDisplay.join("");
			$("#answerDisplay").html(blankSpaces);
			$("#guessCounter").html(guesses);
		}
		$(".available-letter-button").click(function(){
			guessedLetter = $("<div>");
			guessedLetter.text($(this).attr("data-letter"));
		for(var j = 0; j < currentWord.length; j++){
		 	matchingLetter = guessedLetter.text().toLowerCase();
			if(currentWord[j] === matchingLetter){
				answer[j] = matchingLetter;
				answerDisplay[j] = " " + matchingLetter + " ";
				remainingLetters--;
				$("#answerDisplay").html(answerDisplay);
				$(".correct-letters").append(guessedLetter);
				$(this).prop("disabled", true);
				$(this).addClass("btn-disabled");
				guessedLetter.addClass("letter correct-letter");
				var letterInWord = true;
			}
		}
			if(!letterInWord){
				console.log("INCORRECT " + matchingLetter);
				$(".wrong-letters").append(guessedLetter);
				$(this).prop("disabled", true);
				$(this).addClass("btn-disabled");
				guessedLetter.addClass("letter wrong-letter");
				guesses--;
				$("#guessCounter").html(guesses);
			}
			endGame();
			//console.log("This is my current word " + currentWord);
		});
			
	//SET THE LOGIC TO DISPLAY THE OTHER APP INFORMATION
	});

	function endGame(){
		if(randomWord === answer.join("")){
			numberOfWins++;
			$("#winCounter").html(numberOfWins);
			$(".available-letter-button").prop("disabled", true);
			$("#nicCage").attr("src", "./images/nicCage_isAlive.png");
			$("#gameInstructions").html("To Play Again Choose A Difficulty!");
			difficultyChosen = false;
			resetApp(numberOfWins, numberOfLosses);
			

		}else if(guesses === 0){
			numberOfLosses++;
			$("#lossCounter").html(numberOfLosses);
			$(".available-letter-button").prop("disabled", true);
			$("#nicCage").attr("src", "./images/nicCage_isDead.png");
			$("#gameInstructions").html("To Play Again Choose A Difficulty!");
			difficultyChosen = false;
			resetApp(numberOfWins, numberOfLosses);

		}
	}
	
});








