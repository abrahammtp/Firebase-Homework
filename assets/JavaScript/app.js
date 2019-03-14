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

// Initial variables
var trainName = "";
var destination = "";
var firstTrainTime = 0;
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;

// When the user clicks the submit button, this will happen
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // We are going to grab the values from these ID's on the html
    trainName = $("#train-name-input").val().trim();
    destination = $("#train-destination-input").val().trim();
    frequency = $("#frequency-train-input").val().trim();
    firstTrainTime = $("#first-train-time-input").val().trim();

    // We are goin to push these variables to Firebase, they will be used again later
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    });

    // We clear the boxes where the user inputs the train information once they have submitted it, this betters the user experience
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#frequency-train-input").val("");
    $("#first-train-time-input").val("");

});

// When we add those variables to the database, the next lines of code happen
database.ref().on("child_added", function (snapshot) {
    // Storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainTimeConverted = moment(sv.firstTrainTime, "HH:mm").subtract(1, "years");

    // Actual time
    var actualTime = moment();
    console.log("CURRENT TIME: " + moment(actualTime).format("HH:mm"));

    // Difference between the times
    var timeDifference = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDifference);

    // Time apart 
    var timeRemaining = timeDifference % sv.frequency;
    console.log(timeRemaining);

    // Minutes away (train)
    var minutesAway = sv.frequency - timeRemaining;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // When the next arrival is going to be
    var nextArrival =  moment().add(minutesAway, "minutes").format("HH:mm");

    // Here we append these variables to the html page
    var newRow = $("<tr>").append(
        $("<td>").text(sv.trainName),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    )

    // Here we update the table on the html to reflect the new trains added
    $("#trains-table > tbody").append(newRow);


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

