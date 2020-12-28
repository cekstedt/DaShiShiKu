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
		while (true) {
			for (var syllables of [5, 7, 5]) {
				this.verses.push(new Verse(this.dictionary, this.template_book, syllables));
			}
			if (this.cash_phrases_total()) {
				break;
			} else {
				verses = [];
			}
		}
	}
	
	to_str() {
		var str = this.verses.map(x => x.to_str()).join("<br>");
	
		if (str.endsWith("&comma;")) {
			str = str.slice(0, -7) + ".";
		}
		
		return str;
	}
	
	cash_phrases_total() {
		var total = 0;
		for (var verse of this.verses) {
			total += verse.cash_phrases_total();
		}
		return total;
	}
}