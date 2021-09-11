$(function(){

$(".search").on('keyup',function(e){
	e.preventDefault();
    
    var count = $(this).val().length;
    var searchText = $(this).val();
    $(".search-suggestions").addClass("hidden");
    if(count > 3) {
    	getAjaxResults(searchText); 
    }
});

$(".search-btn").on('click',function(e){
$(".suggestions-list").toggle();
});

function getAjaxResults(searchText){
	//console.log('inside if');
	//console.log(searchText);   
	$.ajax({
                url: "/auto-suggest/"+searchText,
                beforeSend : function() {
                    //$(".site-search").addClass("loading");
                }
            }).done(function(results) {
                //var parse_results = JSON.parse(results);
                var parse_results = results;
                //console.log(parse_results);
                $(".site-search").removeClass("loading");
                $(".search-suggestions").removeClass("hidden");
                var searchResults = "<ul class='suggestions-list'>";
                if(parse_results === '') searchResults += '<li>No Result Found</li>'
                for (var key in parse_results) {
                    searchResults += "<li><a href='/search?q="+parse_results[key].slug+"'>"+parse_results[key].name+"</a></li>";
                }
                searchResults += "</ul>";
                $(".search-suggestions").html(searchResults);
            });
}


});	