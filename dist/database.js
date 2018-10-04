let dbhighscore = 'snake';

function dbconfig() {
  var config = {
    apiKey: "AIzaSyAKX3eGm1cI0vRXRTVq1FkgcPnvV4D1ebM",
    authDomain: "rainbowsnake-e3e49.firebaseapp.com",
    databaseURL: "https://rainbowsnake-e3e49.firebaseio.com",
    projectId: "rainbowsnake-e3e49",
    storageBucket: "rainbowsnake-e3e49.appspot.com",
    messagingSenderId: "942359945784"
  };

  firebase.initializeApp(config);
  highScores = firebase.database();

  //retrieve db data
  var ref = highScores.ref(dbhighscore);
  ref.on('value', gotData, errData);
}

function gotData(data) {
  var ref = highScores.ref(dbhighscore);
  ref.orderByChild("score").limitToLast(1).on("child_added", function (snapshot) {
    highScore = snapshot.val().score;
  });
}

function errData(err) {
  console.log('Error!');
  console.log(err);
}

function retrieveScore() {
  var ref = highScores.ref(dbhighscore);
  if (player == null || player == "") {
    player = "I am Groot";
  }
  document.getElementById("scorename").value = player;
  document.getElementById("personalscore1").innerHTML = "Your Score: " + score;
  document.getElementById("personalscore").innerHTML = "Your Score: " + score;
  $("#inputscore").modal();
}

function submitScore() {
  var ref = highScores.ref(dbhighscore);
  player = document.getElementById("scorename").value
  var date = day() + "/" + month() + "/" + year();
  var time = hour() + ":" + minute() + ":" + second();
  var data = {
    name: player,
    score: score,
    eated: snake.body.length - 1,
    speed: Number(speed.toFixed(1)),
    date: date,
    time: time
  }
  ref.push(data, scorepush);
  showScores();
}

function scorepush(error) {
  if (error) {
    console.log('Could not connect to the firebase!');
  }
}

function showScores() {
  var ref = highScores.ref(dbhighscore);
  var scoreText = "TOP 10<br>";
  ref.orderByChild("score").limitToLast(10).on("child_added", function (snapshot) {
    scoreText = scoreText + '<br>' + "- " + (snapshot.val().name) + "  ---> " + (snapshot.val().score);
  });
  document.getElementById("highscoretext").innerHTML = scoreText;
  $("#highscore").modal({backdrop: false});
}