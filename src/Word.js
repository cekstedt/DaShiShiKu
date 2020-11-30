class Word {
	/*
		Word object will contain all column titles as attributes,
		in addition to the following:
		
		used - Added attribute, initialized at 0.
		
		add_used() - Called whenever a word is successfully used in a Verse.
		to_str() - Retrieves the string that represents this Word object in a webpage,
			- Either the simple phrase, or a longer formatted string, based on the presence of a definition,
			- Optionally capitalized, based on the boolean parameter "capitalized".
	*/
	
	constructor(data, titles) {
		for (var i = 0; i < data.length; i++) {
			this[titles[i]] = data[i];
		}
		this.used = 0;
	}
	
	add_used() {
		this.used += 1;
	}
	
	to_str(capitalized=false) {
		var temp_phrase = this.phrase;
		// Set capitalization.
		if (capitalized) {
			temp_phrase = temp_phrase.charAt(0).toUpperCase() + temp_phrase.slice(1);
		}
		// Return phrase only or full HTML, based on presence of a definition.
		if (this.definition) {
			return '<a href="' + this.link + '" title="' + this.definition + '" target="_blank">' + temp_phrase + '</a>';
		} else {
			return temp_phrase;
		}
	}
}
