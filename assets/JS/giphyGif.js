var shows =['Simpsons', 'Family Guy', 'Archer', 'Full House'];
// show API
function displayShowInfo(){
    var show = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=10&&apikey=7TPNpVWpc425RyTeETksHwwpHrPDxd17";
// console.log("I am in display info");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        // console.log(showData)
        var giphys = response.data;
        renderGiphys(giphys)

    });

}
//create a four loop now that pulls the 10 giphys
function renderGiphys(giphys){
    $('#shows-view').empty();
    
        for(var i = 0 ; giphys.length; i++){
            var giphy = giphys[i];
            var images= giphy.images

            var giphyTemplate =`
            
            <div class="giphy-image">
                <img 
                src="${images.original_still.url}" 
                data-still="${images.original_still.url}" 
                data-animate="${images.original.url}" 
                data-state="still">      
            `;
    
            $('#shows-view').append(giphyTemplate)
    
        }
    
    }
    
function renderButtons(){
    $('#buttons-view').empty();

    for( var i =0 ; i < shows.length; i++){
        var showContent = $('<button>');

        showContent.addClass("show");

        showContent.attr('data-name', shows[i]);

        showContent.text(shows[i]);

        $('#buttons-view').append(showContent);
    }
}

$('#add-show').on('click', function(event){
    event.preventDefault();

    var show = $('#show-input').val()

    shows.push(show);

    renderButtons();

});
//Function so the Giphy will play
function imgClick(){
    var giphyCard = $(this);
    var img = giphyCard.find('img');
   

//get element where images are coming from
var still = img.attr('data-still');
var animate = img.attr('data-animate');
var state = img.attr('data-state');

//Run Conditional Statment and set the icon to be removed and add back when pushed
if(state === 'still'){
    img.attr({
        src: animate,
        'data-state': 'animate'
    });
}else{
    img.attr({
        src: still,
        'data-state': 'animate'
    });
}

}

$(document).on('click', '.show', displayShowInfo);
$(document).on('click', '.giphy-image', imgClick);
renderButtons();