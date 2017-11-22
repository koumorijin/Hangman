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
	var lives;
	var guesses;
	var difficulty;
	var difficultyChosen;
	var hasWon;
	var hasLost;
	var numberOfWins;
	var numberOfLosses;
	var answer;
	var answerDisplay;
	var randomWord;
	var currentWord;
	var remainingLetters;

	//INITIALIZE THE APP 
	function initializeApp() {
    lives = "";
    guess = "";
    difficulty = "";
    result = "";
    difficultyChosen = false;
    hasWon = false;
    hasLost = false;
    answer = [];
    randomWord = "";
    currentWord = [];
    answerDisplay = [];
    remainingLetters = "";

    $(".letter-buttons").empty();
	}

	initializeApp();

	//CREATE AN EVENT LISTENER FOR THE DIFFICULTY BUTTONS
	$(".difficulty-button").click(function() {
		if(difficultyChosen === true) return;
		difficulty = $(this).val();
		//console.log($(this).val());
		//console.log(difficulty);

		//CREATE THE LETTER BUTTON DISPLAYS
		for(index = 0; index < letters.length; index++){
				var letterBtn = $("<p>");
				letterBtn.addClass("available-letter-button available-letter available-letter-button-color");
				letterBtn.attr("data-letter", letters[index]);
				letterBtn.html(letters[index]);
				$(".letter-buttons").append(letterBtn);
		}

		if(difficulty === "easy"){
			lives = 10;
			guesses = 10;
			randomWord = easyWords[Math.floor(Math.random() * easyWords.length)];
			startGame(randomWord);
			console.log(randomWord);
		}else if(difficulty === "medium"){
			lives = 5;
			guesses = 10;
			randomWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
			startGame(randomWord);
			console.log(randomWord);
		}else if(difficulty === "hard"){
			lives = 5;
			guesses = 15;
			randomWord = hardWords[Math.floor(Math.random() * hardWords.length)];
			startGame(randomWord);
			console.log(randomWord);
		}
	//SET DIFFICULTY CHOSEN TO TRUE
	difficultyChosen = true;
	//console.log(difficultyChosen);
	//SET THE LOGIC TO DISPLAY THE OTHER APP INFORMATION
		
	});

		function startGame(randomWord){
		randomWord = randomWord.toLowerCase();
		currentWord = randomWord.split("");
			for(var index = 0; index < currentWord.length; index++){
				answerDisplay[index] = " __ ";
			}
		remainingLetters = currentWord.length;
		var blankSpaces = answerDisplay.join("");
		$("#answerDisplay").html(blankSpaces);
		}	

	//CREATE THE EVENT HANDLER FOR THE LETTERS CLASS
		$(".available-letter-button").click(function(){
			var guessedLetter = $(this).attr("data-letter");
			console.log($(this).attr("data-letter"));
			$(this).prop("disabled", true);
			$(this).addClass("btn-disabled");
			//guessedLetter = $(".correct-letters");

		});
	// for(var index = 0; index < remainingLetters; index++){
	// 	if (currentWord[index] === ) {

	// 	}	
	
	//CREATE THE LOGIC TO ADD THE CHOSEN LETTERS TO THE CORRECT OR THE INCCORECT LETTERS DISPLAY

	//CREATE THE LOGIC TO DISPLAY THE CORRECT LETTERS IN THE CORRECT ORDER OF THE ARRAY OF THE RANDOMLY CHOSON WORD

	// CREATE THE LOGIC FOR THE END GAME WIN/LOSS SCENARIOS


	
});







