var container = $('#div-1'),
    wrapper = $('#div-2');

// temporarily fix the outer div's width
container.css({width: wrapper.width()});
// fade opacity of inner div - use opacity because we cannot get the width or height of an element with display set to none
wrapper.fadeTo('slow', 0, function(){
    // change the div content
    container.html("<div id=\"2\" style=\"display: none;\">new content (with a new width)</div>");
    // give the outer div the same width as the inner div with a smooth animation
    container.animate({width: wrapper.width()}, function(){
        // show the inner div
        wrapper.fadeTo('slow', 1);
    });
});
latexFormat = $(".latexFormat")
console.log("Entering")
for (var j=0; j<latexFormat.length; j++){
	console.log(latexFormat[j]);
	var place = j
	latexFormat[place].onkeyup =  function() {
		console.log(this.value);
		latexFormatQueries = []
		for (var i =0;i<4;i++){
			latexFormatQueries.push(latexFormat[i].value)
		}
		var xhr = new XMLHttpRequest()
		xhr.open("POST", "/", false);
		xhr.send(JSON.stringify({
			"chemType": "element",
			"name": $("#holder").children()[0].children[1].children[0].innerHTML,
			"value": latexFormatQueries
		}));
		$("#latex").html("\\[ " + xhr.response + " \\]");
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, "latex"]);
		// $.ajax({
		// 	url: "/",
		// 	type: "POST",
		// 	data: {'csrfmiddlewaretoken': '{{csrf_token}}', "typeChem":"periodicTable", "name": latexFormat[place].name, "value": latexFormat[place].value}
		// }).done(function( html ){
		// 	console.log("done")
		// })
	}
}
var elements = document.getElementsByClassName("modal");
var disableHover = false;
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mouseenter", function() {
		if (!disableHover) {
            // console.log(this.outerHTML);
			var xhr = new XMLHttpRequest();
			$("#holder").html(this.outerHTML);
            document.getElementById("holder").firstChild.style.width="80px";
            document.getElementById("holder").firstChild.style.height="83px";
            document.getElementById("holder").firstChild.style.fontSize="200%";
            document.getElementById("holder").firstChild.style.verticalAlign="top-text";
            document.getElementById("holder").style.marginTop="10px";
            // jqxhr = $.ajax{
            // 	url: "/",
            // 	data: {}
            // }
			// this.getElementsByTagName("div")[1].firstChild.firstChild.innerHTML <-- chemical symbol for element
			// xhr.open("POST", serverURL /* to be filled in */ , false /* make async later */ );
			// xhr.send(this.getElementsByTagName("div")[1].firstChild.firstChild.innerHTML);
			/*
			* {
			*    "chemType": {{"compound", "element"}},
			*    "data": {{data}}
			* }
			*/
		}

    });
	elements[i].addEventListener("click", function() {
		if (disableHover == true) {
			disableHover = false;
			document.getElementById("holder").innerHTML = "";
		} else {
			var xhr = new XMLHttpRequest();
			disableHover = true;
			$("#holder").html(this.outerHTML);
            document.getElementById("holder").firstChild.style.width="80px";
            document.getElementById("holder").firstChild.style.height="83px";
            document.getElementById("holder").firstChild.style.fontSize="200%";
            document.getElementById("holder").firstChild.style.verticalAlign="top-text";
            document.getElementById("holder").style.marginTop="10px";
		}
	});
}


function addAutocompleteWord(word) {
	$("#autocompletion").append("<p name='autocompletion' style='margin:0;padding:0;' value='" +  word + "'>" + word + "</p>");
}
function removeAutocompleteWord(word) {
	for (var i = 0; i < $("#autocompletion").children().length; i++) {
		if ($("#autocompletion").children()[i].innerHTML == word) {
			$("#autocompletion").children()[i].remove();
		}
	}
}
function removeAllAutocompleteWords() {
	$("#autocompletion").empty();
}
$("#searchinput").keyup(function() {
	if (this.value) {
		xhr = new XMLHttpRequest()
		xhr.open("POST", "/", false);
		xhr.send(JSON.stringify({
			"chemType": "compound",
			"value": this.value
		}));
		addAutocompleteWord(this.value);
	} else {
		removeAllAutocompleteWords();
	}
});

$('.mirror').on('keyup', function() {
    $('.'+$(this).attr('class')).val($(this).val());
});