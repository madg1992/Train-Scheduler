  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBwdU60aRSrZqroPd7syjGHv2kdG7QkH_o",
    authDomain: "train-schedule-b21d3.firebaseapp.com",
    databaseURL: "https://train-schedule-b21d3.firebaseio.com",
    projectId: "train-schedule-b21d3",
    storageBucket: "train-schedule-b21d3.appspot.com",
    messagingSenderId: "194592148535",
    appId: "1:194592148535:web:06d26d9ce346ddd27603b2",
    measurementId: "G-YL9LJTFT2S"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

//create a shortcut in trainData to reference the Firebase database 
//so we don't have to type firebase.database() everytime
var database = firebase.database();

// capture data from the form when button to add new train is clicked
$("#trainForm").on("click", function(event){
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency =$("#frequency").val().trim();
    var firstTrain = moment($("#first-train").val().trim(),"HH:mm").subtract(10,"years").format("X");

    database.ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain 
    })
// resets and clears the values in the form when button is clicked and form is submitted
    $("#train-form")[0].reset();
    
    //avoid reloading the page when button is clicked
    event.preventDefault();
  });

    
  

// collect data from Firebase
database.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    //function for figuring out when the next train will arrive
    //function for calculating minutes left until next train

    var timeRemaining = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutesLeft = frequency - timeRemaining;
    var nextArrival = moment().add(minutes,"m").format("HH:mm A");

    // var newTableRow = $("<tr>");

    // var newTableData =
    // $("<td id='train-name-data'>" + snapshot.val())

    //append train data to train table
    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+nextArrival+"</td><td>"+minutesLeft+"</td></tr>");
})







    

    