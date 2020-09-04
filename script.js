//Dispaly current day of the week
var currentDay = document.getElementById("currentDay");
var formattedDay = moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm a');
currentDay.textContent = formattedDay;

//Create time blocks for each hour
for(var i=0; i<24; i++){
    var hour = "";
    //format in standard time h:mm
    var formatHour = moment(i, 'HH').format('h:mm');
    //I didn't know moment.js had am/pm until after I wrote this!
    if(i >= 12){
        hour = formatHour + "pm";
    }else{
        hour = formatHour + "am";
    }
    //create time-block, hour, description, save button for each block
    var newHour = $("<div>").attr({class: "col-2 hour", id: i}).text(hour);
    var newDesc = $("<div>").attr({class: "col-8 description", id: "desc"+i}).html("<textarea></textarea>");
    var newSaveBtn = $("<div>").attr("class", "col-2 saveBtn");
    //apend 3 divs to newRow div
    var newRow = $("<div>").attr("class", "row time-block").append(newHour,newDesc,newSaveBtn);
    //append newRow to container
    $(".container").append(newRow);
    //style save button
    $(".saveBtn").html("<i class='fas fa-lock'></i>");
    
}

//If the time is x set class to .past .present .future

for(var i=0; i<24; i++){
    if(moment(document.getElementsByClassName("hour")[i].id, 'HH').format('h a') === moment().format('h a')){
        document.getElementsByClassName("hour")[i].parentElement.setAttribute("class", "row time-block present");
    }else if(moment(document.getElementsByClassName("hour")[i].id, 'HH').format('HH ') < moment().format('HH')){
        document.getElementsByClassName("hour")[i].parentElement.setAttribute("class", "row time-block past");
        // console.log(moment(document.getElementsByClassName("hour")[i].id, 'HH').format('HH') +" is less than "+ moment().format('HH') );    
    }else {
        document.getElementsByClassName("hour")[i].parentElement.setAttribute("class", "row time-block future");
    }
}

/*SAVING TO LOCAL STORAGE AND RENDERING EVENTS TO PAGE */
var eventArray = [];
var eventObj = {};

//Initialize saved events
init();
function init(){
    var storedEvents = JSON.parse(localStorage.getItem("myEvents"));
    //if not null then put the storedEvents in the eventArray
    if(storedEvents !== null){
        eventArray = storedEvents;
    }
    renderEvents();
}

//Save Events
function saveEvent(){
    localStorage.setItem("myEvents", JSON.stringify(eventArray));
}

//Render Events to the page
function renderEvents(){
    for(var i=0; i<eventArray.length; i++){
        //for eventArray[i], look at its eventArray[i].id
        //then set the textContent of the .description with that id 
        //to the eventArray[i].desc
        $(".description#desc"+eventArray[i].id).children().text(eventArray[i].desc);    
    }
}

//Event listener for .saveBtn
$(".saveBtn").on("click", function(e){
    e.preventDefault();
    //aka eventArray eventObj.desc
    var eventText = $(this).parent().children(".description").children().val().trim()
    //aka eventArray eventObj.id
    var eventID = $(this).parent().children(".hour").attr("id");
   
    eventObj.id = eventID;
    eventObj.desc = eventText;
    
    eventArray.push(eventObj);
    saveEvent(); //save to localStorage
    renderEvents(); //re-render the page
});
