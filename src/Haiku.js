class Haiku {
	/*
		Haiku object will contain three Verse objects.
	*/
	
	dictionary;
	template_book;
	verses = [];
	
	constructor(dictionary, template_book) {
		this.dictionary = dictionary;
		this.template_book = template_book;
		for (var syllables of [5, 7, 5]) {
			this.verses.push(new Verse(this.dictionary, this.template_book, syllables));
		}
		
	}
	
	to_str() {
		var str = this.verses.map(x => x.to_str()).join("<br>");
	
		if (str.endsWith("&comma;")) {
			str = str.slice(0, -7) + ".";
		}
		
		return str;
	}
}