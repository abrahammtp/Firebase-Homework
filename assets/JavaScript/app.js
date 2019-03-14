// var config = {
//     apiKey: "AIzaSyCAlUs1o7-3cpFCXQ_f_J7ymRlfe6N6myQ",
//     authDomain: "train-tracker-03-12-19.firebaseapp.com",
//     databaseURL: "https://train-tracker-03-12-19.firebaseio.com",
//     projectId: "train-tracker-03-12-19",
//     storageBucket: "train-tracker-03-12-19.appspot.com",
//     messagingSenderId: "413897219999"
// };
// firebase.initializeApp(config);

// var database = firebase.database();

// // Initial Values
// var trainName = "";
// var destination = "";
// var firstTrainTime = 0;
// var frequency = 0;
// var nextArrival = 0;
// var minutesAway = 0;

// // Capture Button Click
// $("#add-train-btn").on("click", function (event) {
//     event.preventDefault();

//     // Grabbed values from text boxes
//     trainName = $("#train-name-input").val().trim();
//     destination = $("#train-destination-input").val().trim();
//     frequency = $("#frequency-train-input").val().trim();
//     firstTrainTime = $("#first-train-time-input").val().trim();

//     var newTrain = {
//         trainName: trainName,
//         destination: destination,
//         frequency: frequency,
//         firstTrainTime: firstTrainTime,
//     };

//     // Uploads employee data to the database
//     database.ref().push(newTrain);
//     // // Firebase watcher .on("child_added"

//     console.log(newTrain.trainName);
//     console.log(newTrain.destination);
//     console.log(newTrain.firstTrainTime);
//     console.log(newTrain.frequency);

//     // Clears all of the text-boxes
//     $("#train-name-input").val("");
//     $("#train-destination-input").val("");
//     $("#frequency-train-input").val("");
//     $("#first-train-time-input").val("");
// });

// // database.ref().on("child_added", function (snapshot) {
// //     console.log(childSnapshot.val());

// database.ref().on("child_added", function(childSnapshot) {
//     console.log(childSnapshot.val());

//     var trainName = childSnapshot.val().trainName;
//     var destination = childSnapshot.val().destination;


//     var newRow = $("<tr>").append(
//         $("<td>").text(sv.trainName),
//         $("<td>").text(sv.destination),
//         $("<td>").text(sv.frequency),
//         $("<td>").text(sv.nextArrival),
//         $("<td>").text(sv.minutesAway),
//     )

//     // Change the HTML to reflect
//     $("#trains-table > tbody").append(newRow);


//     // Handle the errors
//     //  function (errorObject) {
//     //     console.log("Errors handled: " + errorObject.code);
//     //  }
// });

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
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#train-name-input").val().trim();
    destination = $("#train-destination-input").val().trim();
    frequency = $("#frequency-train-input").val().trim();
    firstTrainTime = $("#first-train-time-input").val().trim();

    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    });

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#frequency-train-input").val("");
    $("#first-train-time-input").val("");

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTrainTime);
    console.log(sv.frequency);


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainTimeConverted = moment(sv.firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

    // Current Time
    var actualTime = moment();
    console.log("CURRENT TIME: " + moment(actualTime).format("HH:mm"));

    // Difference between the times
    var timeDifference = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDifference);

    // Time apart (remainder)
    var timeRemaining = timeDifference % sv.frequency;
    console.log(timeRemaining);

    // Minute Until Train
    var minutesAway = sv.frequency - timeRemaining;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextArrival =  moment().add(minutesAway, "minutes").format("HH:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(sv.trainName),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    )


    // Change the HTML to reflect
    $("#trains-table > tbody").append(newRow);


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

moment(nextArrival).format("HH:mm");
