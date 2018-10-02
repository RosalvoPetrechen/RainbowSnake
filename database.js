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
  var ref = highScores.ref('scores');
  ref.on('value', gotData, errData);
}

function gotData(data) {
  var ref = highScores.ref('scores');
  ref.orderByChild("score").limitToLast(1).on("child_added", function(snapshot) {
    highScore = snapshot.val().score;
  });
}

function errData(err) {
  console.log('Error!');
  console.log(err);
}

function submitScore() {
  var ref = highScores.ref('scores');
  var name = prompt("Please enter your name", "I am Groot");
  if (name == null || name == "") {
    name = "I am Groot";
  }
  var date = day() + "/" + month() + "/" + year();
  var time = hour() + ":" + minute() + ":" + second();
  var data = {
    name: name,
    score: score,
    eated: snake.body.length - 1,
    speed: Number(speed.toFixed(1)),
    date: date,
    time: time
  }
  ref.push(data, scorepush);
  var   scoreText = "TOP 5 HIGH SCORES\n";
  ref.orderByChild("score").limitToLast(5).on("child_added", function(snapshot) {
    scoreText = scoreText + '\n' + "- " + (snapshot.val().name) + "  ---> " + (snapshot.val().score);
  });
  alert(scoreText);
}

function scorepush(error) {
  if (error) {
    console.log('Could not connect to the firebase!');
  }
}
