$(document).ready(function() {
var intQuestionCounter = 0;
var intQuestionNumber = 0;
var intAnswerNumber = 0;
var intRandom = 0;
var intCorrect = 0;
var intIncorrect = 0;
var intTimer = 0;
var objTriviaQuestions = null;
var objCurrentQuestion = null;
var arrChoices = [1,2,3,4];
var strQuestion = "";
var strAnswer = "";
var strAnswerId = "";
var strRandom = "";
var strWrong1 = "";
var strWrong2 = "";
var strWrong3 = "";
var bolQuestionLoaded = false;
var bolAnswerSelected = false;
var timer = null;

function questionLoader(){
	intQuestionCounter++;
	intTimer = 30;
	$("#timer").text(intTimer + " Seconds");
	timer = setInterval(function () {
		intTimer--;
		$("#timer").text(intTimer + " Seconds");
		if (intTimer === 0) {
			timeUp();
		}
	},1000);
	$("#questionStat").text("Question " + intQuestionCounter + " of 20");
	intQuestionNumber = Math.floor(Math.random() * _.size(objTriviaQuestions));
	$("#questionNum").text(intQuestionNumber.toString() + ".")
	strQuestion = objTriviaQuestions[intQuestionNumber].question;
	$("#questionText").text(strQuestion);
	intAnswerNumber = Math.floor(Math.random() * objTriviaQuestions[intQuestionNumber].answers.length);
	console.log("Answers.length: " + objTriviaQuestions[intQuestionNumber].answers.length);
	strAnswer = objTriviaQuestions[intQuestionNumber].answers[intAnswerNumber];
	console.log("strAnswer: " + strAnswer);
	intRandom = Math.floor(Math.random() * arrChoices.length);
	console.log("intRandom answer: " + intRandom);
	strRandom = (intRandom + 1).toString();
	$("#answer" + strRandom).text(strAnswer);
	console.log("arrLength" + arrChoices.length);
	arrChoices.splice(intRandom, 1);
	console.log(arrChoices);
	console.log("arrLength" + arrChoices.length);
	$.each(arrChoices, function(i, val){
		$("#answer" + val.toString()).text(objTriviaQuestions[intQuestionNumber].wrong[i]);
	});
	bolQuestionLoaded = true;
	delete objTriviaQuestions[intQuestionNumber];
	arrChoices = [1,2,3,4];
}

function checker (response) {
	if (response === strRandom) {
		correct(response);
	}
	else {
		incorrect(response);
	}
}

function correct(position) {
	$("#answerContainer" + position).css("background", "#457500", "color", "#fff");
	intCorrect++;
	$("#correctCounter").text(intCorrect);
	clearInterval(timer);
	intTimer = 30;
	$("#timer").text(intTimer + " Seconds");
	setTimeout(function () {
		$(".answers").css("background", "#fff", "color", "#000");
		questionLoader();
		bolAnswerSelected = false;
		if (intQuestionCounter === 20) {
			gameOver();
		}
	}, 4000)
}

function incorrect(position) {
	$("#answerContainer" + position).css("background", "#CC3333", "color", "#fff");
	$("#answerContainer" + strRandom).css("background", "#457500", "color", "#fff");
	intIncorrect++;
	$("#incorrectCounter").text(intIncorrect);
	clearInterval(timer);
	intTimer = 30;
	$("#timer").text(intTimer + " Seconds");
	setTimeout(function () {
		questionLoader();
		$(".answers").css("background", "#fff", "color", "#000");
		bolAnswerSelected = false;
		if (intQuestionCounter === 20) {
			gameOver();
		}
	}, 4000)
}

function timeUp() {
	$("#answerContainer" + strRandom).css("background", "#457500", "color", "#fff");
	intIncorrect++;
	clearInterval(timer);
	$("#incorrectCounter").text(intIncorrect);
	setTimeout(function () {
		questionLoader();
		$(".answers").css("background", "#fff", "color", "#000");
		bolAnswerSelected = false;
		if (intQuestionCounter === 20) {
			gameOver();
		}
	}, 4000)
}

function gameOver() {
	$("#anthem").get(0).pause();
	$("#containerQuestions").css("display", "none");
	$("#containerResult").css("display", "block");
	$("#correctResult").append(intCorrect);
	$("#incorrectResult").append(intIncorrect);
}
	
	$(".answers").hover(function () {if (!bolAnswerSelected) {
		$(this).css("background", "#eee");
		}},
		function () {if (!bolAnswerSelected) {
		$(this).css("background", "#fff");
		}}
	)
	$("#start").click(function() {
		$("#anthem").get(0).play();
		$("#containerIntro").css("display", "none");
		$("#containerQuestions").css("display", "block");
		objTriviaQuestions = objQuestions;
		console.log(objTriviaQuestions);
		console.log(_.size(objTriviaQuestions));
		questionLoader();
	});

	$("#startOver").click(function() {
		location.reload(true);
	});

	$(".answers").click(function() {
	if (!bolAnswerSelected) {
		checker($(this).attr("data-position"));
		console.log($(this).attr("data-position"));
		bolAnswerSelected = true;
	}
	})
})