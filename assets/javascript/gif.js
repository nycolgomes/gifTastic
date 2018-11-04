class gifObject{
    constructor(
        gifName = "Untitled"
    ){
        this.gifName = gifName;
    }
    addButton(){
        $(".buttonWrap").append('<button type="button" class="btn btn-primary" style="margin-right:10px;margin-top:10px;" id = "' + this.gifName + '"value="' + this.gifName + '">' + this.gifName + '</div>');
    }
}

var g_o_array = [];
$("#find-gif").on("click", function(event) {
    event.preventDefault();

    var gif = $("#gif-input").val();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    var gif = new gifObject(gif);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        $("#gif-view").text(JSON.stringify(response));
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").append(gifDiv);
        };
        if(response.Response !="False"){
            gif.addButton();
            g_o_array.push(gif);
        }
    })
});

$(".buttonWrap").on("click", function(event){
    console.log(event);
    var gif = event.target.value;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    if(event.target.value != undefined){
        $.ajax({
            url: queryURL,
            method: "GET"
        })//then(function(response){
        //     $("#gif-view").text(JSON.stringify(response));
            
        // })
    }
})

