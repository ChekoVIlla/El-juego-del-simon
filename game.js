var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var startGame = false;
var level = 0
	
function nextSequence(){
	userClickedPattern = [];
	var randomNumber = Math.floor(Math.random() * 3) + 1;
	var randomChosenColour = buttonColors[randomNumber];
	 gamePattern.push(randomChosenColour);
	 $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
	 playSound(randomChosenColour)
	 animatePress(randomChosenColour);
	 level++
	 $("#level-title").text("Vas en el nivel  " + level);
	}
	
	$(".btn").on("click",function(){
		var userChosenColour = this.id;
		userClickedPattern.push(userChosenColour)
		playSound(userChosenColour);
		animatePress(userChosenColour);
		checkAnswer(userClickedPattern.length-1)
	});
	
	function playSound(name){
	var audio = new Audio("./sounds/" + name + '.mp3');
   audio.play();
	}

	function animatePress(currentColour){
	$("#" + currentColour).addClass("pressed");
	setTimeout(function(){
		$("#" + currentColour).removeClass("pressed")
	}, 100);
	}

	$(document).on ("touchStart", function (){
		if(startGame === true) {
			startGame = false;
		}
		else{
			startGame = true;
		}

		if(startGame === true	) {
			nextSequence();
		}
	})
	$(document).keydown(function (){
		if(startGame === true) {
			startGame = false;
		}
		else{
			startGame = true;
		}

		if(startGame === true	) {
			nextSequence();
		}
	})

	function checkAnswer(currentLevel){
		if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
			console.log("Succes");
		}
		else{
			playSound("wrong");
			$("body").addClass("game-over");
			setTimeout(function (){
				$("body").removeClass("game-over");			
			}, 200);
			$("h1").text("La cajeteaste, dale a otra tecla para empezar de nuevo");
			starOver()
		}
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout (function(){
				nextSequence();
			}, 1000)
		}
		else{
			console.log("wrong");
		}
	}

	function starOver(){
		level = 0;
		gamePattern = [];
	}
	// for(var i = 0; i < gamePattern.length; i++){
	// var flash = $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
	//    setTimeout(flash, 10000);
	// }