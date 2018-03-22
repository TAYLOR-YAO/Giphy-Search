var input = $("#input");
var submit = $("#submit");
var names = ["Nelson Mandela", "Etoo", "Black Panther", "Wonder Woman"]
var myApiKey = "3spo5yNpHgbAbeBBWth9U1W6kG1ibNkA";
var inputValue = $("#input").val().trim();

$(document).ready(function(){

    function setButton(){
        $(".buttons").empty();
        for(var i=0; i<names.length; i++){
            var newbtn = $("<button>").text(names[i]);
            newbtn.addClass("submit");
            $(".buttons").append(newbtn);
            var getBtnValue = names[i].valueOf(names[i]);                
            console.log( " this is the buton value :" + getBtnValue);
            $("button").css({" margin": "20px", "background-color": "teal", "color": "white", });
            buttonImages();
        }
        function buttonImages(){
            $(".buttons").on("click",newbtn , function(){
                $.ajax({
                    url:"http://api.giphy.com/v1/gifs/search?q=" + getBtnValue + "&api_key=" + myApiKey + "&limit=10",
                    method:"GET"
                }).then(function(response){
                    var dataResults = response.data;
                    for(a=0; a<dataResults.length; a++){
                        var arrayDiv = $("<div>");
                        console.log(response);
                        console.log( "This is the response URL:"+ "" + dataResults[a].images.original.url);
                        var ratingPar = $("<p>").text("Rating:" + dataResults[a].rating);
                        var inputImage = $("<img>");
                        inputImage.attr('src', dataResults[a].images.original.url)
                        arrayDiv.append(ratingPar);
                        arrayDiv.append(inputImage);
                        $("#images").prepend(arrayDiv);
                        $("img").css({" width": "100px", "margin": "5px", "height": "100px", "float":"left" });            
                    }
                   
                });
            });
        }
    }
    setButton();

    function addinput (){
        submit.on("click",function(){
            event.preventDefault();
            var inputValue = $("#input").val();
            names.push(inputValue);
            console.log(names);
            console.log("this is the input:" + inputValue);
            $.ajax({
                url:"http://api.giphy.com/v1/gifs/search?q=" + inputValue + "&api_key=" + myApiKey + "&limit=10",
                method:"GET"
            }).then(function(response){
                setButton();
                var dataResults = response.data;
                for (x=0; x<dataResults.length; x++){
                    var inputDiv = $("<div>");
                    console.log(response);
                    console.log( "This is the response URL:"+ "" + dataResults[x].images.original.url);
                    var ratingPar = $("<p>").text("Rating:" + dataResults[x].rating);
                    var inputImage = $("<img>");
                    inputImage.addClass("pausing");
                    inputImage.attr('src', dataResults[x].images.original.url)
                    inputDiv.append(ratingPar);
                    inputDiv.append(inputImage);
                    $("#images").prepend(inputDiv);
                    $("img").css({" width": "100px", "margin-right": "10px", "height": "100px","float":"left" });
                    // // I want to control the pause and play in the image click.................
                    // $(".pausing").on("click", function(){
                
                    //     console.log("IMADE Clickes!")
                    // });

                }
            
            })
        });
        
   }
   addinput();
      
});