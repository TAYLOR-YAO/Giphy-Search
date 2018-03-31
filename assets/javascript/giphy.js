var names = ["Nelson Mandela", "Etoo", "Black Panther", "Wonder Woman", "Cats", "Atlanta United", "Cow", "The Mob"]
var myApiKey = "3spo5yNpHgbAbeBBWth9U1W6kG1ibNkA";

$(document).ready(function () {

   $(document).on("click",".gif", function(){
    
    var state = $(this).attr("data-state");
        if (state === "still") { 
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
   })

    function setButton() {
        $(".buttons").empty();
        for (var i = 0; i < names.length; i++) {
            var newbtn = $("<button>").text(names[i]);
            newbtn.addClass("submit");
            $(".buttons").append(newbtn);
            newbtn.attr("value", names[i]);
            $("button").css({ " margin": "20px", "background-color": "dodgerblue", "color": "white", });
        }

    }
    $(".buttons").on("click", ".submit", function () {
        $("#images").empty();
        var state = $(this).attr("data-state");
        var getBtnValue = $(this).attr("value");
        console.log(" this is the buton value :" + getBtnValue);
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + getBtnValue + "&api_key=" + myApiKey + "&limit=10",
            method: "GET"
        }).then(function (response) {
            var dataResults = response.data;
            for (a = 0; a < dataResults.length; a++) {
                var arrayDiv = $("<div>");
                console.log(response);
                console.log("This is the response URL:" + "" + dataResults[a].images.original.url);
                console.log("This is the still:" + dataResults[a].images.downsized_still.url);
                var ratingPar = $("<p>").text("Rating:" + dataResults[a].rating);
                var inputImage = $("<img>");
                inputImage.addClass("gif");
                inputImage.attr('src', dataResults[a].images.original_still.url);
                inputImage.attr("data-still", dataResults[a].images.original_still.url);
                inputImage.attr("data-animate", dataResults[a].images.original.url);
                inputImage.attr("data-state", "still");
                arrayDiv.append(ratingPar);
                arrayDiv.append(inputImage);
                $("#images").prepend(arrayDiv);
            }

        });
    });

    $("#submit").on("click", function () {
        event.preventDefault();
        
        var inputValue = $("#input").val().trim();
        names.push(inputValue);
        console.log(names);
        console.log("this is the input:" + inputValue);

        setButton();
    });
    setButton();

});