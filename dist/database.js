let player;
let highScores;

let highScore = 0; //high score
let score = 0; //current score

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
  var ref = highScores.ref(level);
  ref.on("value", gotData, errData);
}

function gotData(data) {
  var ref = highScores.ref(level);
  ref
    .orderByChild("score")
    .limitToLast(1)
    .on("child_added", function(snapshot) {
      highScore = snapshot.val().score;
    });
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}

function retrieveScore() {
  if (player == null || player == "") {
    player = "I am Groot";
  }
  document.getElementById("scorename").value = player;
  document.getElementById("personalscore1").innerHTML = "Your Score: " + score;
  document.getElementById("personalscore").innerHTML = "Your Score: " + score;
  $("#inputscore").modal({ backdrop: false });
}

function submitScore() {
  var ref = highScores.ref(level);
  player = document.getElementById("scorename").value;
  var date = day() + "/" + month() + "/" + year();
  var time = hour() + ":" + minute() + ":" + second();
  var data = {
    name: player,
    score: score,
    eated: snake.body[0].length - 1,
    speed: Number(speed.toFixed(1)),
    grid: resolution,
    width: document.getElementById("newwidth").value,
    height: document.getElementById("newheight").value,
    date: date,
    time: time
  };
  ref.push(data, scorepush);
  showScores();
}

function scorepush(error) {
  if (error) {
    console.log("Could not connect to the firebase!");
  }
}

function showScores() {
  var ref = highScores.ref(level);
  var scoreText = `TOP 10 ${level} <br>`;
  // var scoreText = "TOP 10 " + level + "<br>";
  ref
    .orderByChild("score")
    .limitToLast(10)
    .on("child_added", function(snapshot) {
      scoreText = `${scoreText} <br> - ${snapshot.val().name} ---> ${
        snapshot.val().score
      }`;
    });
  document.getElementById("highscoretext").innerHTML = scoreText;
  $("#highscore").modal({ backdrop: false });
}
