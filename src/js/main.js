// Initialize global variables.
var dictionary;
var template_book;
var haiku_book;

//import json data.
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
    }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

xmlhttp.onload = function() {
    dictionary = new Dictionary(myObj[0]);
	template_book = new Template_Book(myObj[1]);
	haiku_book = new Haiku_Book(dictionary, template_book);
    document.getElementById("generate_button").innerHTML = "Generate!";
};

// Button functions.

function generate_haiku() {
    haiku_display("generate");
}

document.addEventListener('keydown', function(event) {
	// console.log(event);
	switch (event.code) {
		case "ArrowLeft":
			haiku_display("prev");
			break;
		case "ArrowRight":
			haiku_display("next");
			break;
	};
});

function haiku_display(code) {
	if (document.getElementById("generate_button").innerHTML == "Generate!") {
		var current_haiku;
		switch (code) {
			case "next":
				current_haiku = haiku_book.get_next_haiku();
				break;
			case "prev":
				current_haiku = haiku_book.get_prev_haiku();
				break;
			case "generate":
				current_haiku = haiku_book.generate_haiku();
				break;
		}
		if (current_haiku) {
			document.getElementById("text").innerHTML = current_haiku.to_str();
		}
	}
}