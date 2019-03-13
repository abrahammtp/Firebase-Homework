var config = {
    apiKey: "AIzaSyCAlUs1o7-3cpFCXQ_f_J7ymRlfe6N6myQ",
    authDomain: "train-tracker-03-12-19.firebaseapp.com",
    databaseURL: "https://train-tracker-03-12-19.firebaseio.com",
    projectId: "train-tracker-03-12-19",
    storageBucket: "train-tracker-03-12-19.appspot.com",
    messagingSenderId: "413897219999"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var firstTrainTime = 0;
    var frequency = 0;
    var nextArrival = 0;
    var minutesAway = 0;

    // Capture Button Click
    $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      trainName = $("#train-name-input").val().trim();
      destination = $("#train-destination-input").val().trim();
      firstTrainTime = $("#first-train-time-input").val().trim();
      frequency = $("#frequency-train-input").val().trim();

      // Code for handling the push
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
      });

    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.firstTrainTime);
      console.log(sv.frequency);
    //   console.log(sv.monthlyRate);
    //   console.log(sv.totalBilled);

      var newRow = $("<tr>").append(
          $("<td>").text(sv.trainName),
          $("<td>").text(sv.destination),
          $("<td>").text(sv.firstTrainTime),
          $("<td>").text(sv.frequency),
        //   $("<td>").text(sv.monthlyRate),
        //   $("<td>").text(sv.totalBilled),
      )

      // Change the HTML to reflect
      $("#trains-table > tbody").append(newRow);
   

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });