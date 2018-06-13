

var triviaQuestions = [{
	question: "what is the World’s biggest spider?",
	answerList: ["Goliath birdeater tarantula",
		"Black widow spiders",
		"Wolf spiders",
		"Huntsman spider"],
	answer: 0,
	gif: "assets/images/goliath.gif"
}, {
	question: "What bird is the international symbol of happiness?",
	answerList: ["Hummingbird", "Sparrow", "Bluebird",
		"Bird of paradise"],
	answer: 2,
	gif : "assets/images/bluebird.gif"
}, {
	question: "Which ape gets its name from the Malay word meaning “man of the forest”?",
	answerList: [
		"Gorilla",
		"Mandrill",
		"Chimpanzee", "The orangutan"],
	answer: 3,
	gif : "assets/images/orangutan.gif"
}, {
	question: "Name the largest freshwater lake in the world?",
	answerList: [
		"Lake Victoria", "Lake superior",
		"Lake Huron",
		"Lake Michigan"],
	answer: 1,
	gif: "assets/images/lake.gif"
}, {
	question: "What color is a Himalayan poppy?",
	answerList: [
		"Red",
		"Yellow",
		"Blue",
		"Orange"],
	answer: 2,
	gif: "assets/images/bluepoppy.gif"

}, {
	question: "What type of leaves does a Koala use for food?",
	answerList: ["Eucalyptus", "Elms", "Beech", "Alder"],
	answer: 0,
	gif: "assets/images/kola.gif"
}, {
	question: "What existing bird has the largest wingspan?",
	answerList: ["Stork", "Swan", "Condor", "Albatross"],
	answer: 3,
	gif: "assets/images/albatross.gif"
}, {
	question: "Which of the following animals sleep standing up?",
	answerList: ["Gorillas", "Flamingos", "Camels", "Ravens"],
	answer: 1,
	gif: "assets/images/flamingo.gif"
}, {
	question: "What animal lives the longest?",
	answerList: ["Ocean Quahog(clam)", "Red Sea Urchin", "Galapagos tortois", "Rougheye rockfish"],
	answer: 0,
	gif: "assets/images/clam.gif"
},];
var answerList = $("<button>");
var search = ["toy+story", "frozen"];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered; var seconds;
var time;
var answered;
var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}
var myGif;

$('#startBtn').on('click', function () {
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function () {
	$(this).hide();
	newGame();
});

function newGame() {
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion() {
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;

	//sets up new questions & answerList

	$('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for (var i = 0; i < 4; i++) {
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({ 'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
		myGif = triviaQuestions[currentQuestion].gif;

	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click', function () {
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown() {
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//giphy api

	newGif = $('<img>');

	newGif.attr('src', myGif );
	newGif.addClass('gifImg');
	$('#gif').html(newGif);


	//checks to see correct, incorrect, or unanswered
	if ((userSelect == rightAnswerIndex) && (answered == true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((userSelect != rightAnswerIndex) && (answered == true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}

	if (currentQuestion == (triviaQuestions.length - 1)) {
		setTimeout(scoreboard, 5000)
	} else {
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}
}

function scoreboard() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}