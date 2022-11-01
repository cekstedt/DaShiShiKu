class Dictionary {
	/*
		This class takes a 2d list of phrases (first row is titles)
		and converts it to a dictionary of Word objects.
	*/
	
	dictionary = [];
	
	constructor(data) {
		for (var row of data.slice(1)) {
			this.dictionary.push(new Word(row, data[0]));
		}
	}
	
	get_random_word(part_of_speech, form, syllables) {
        // Returns a random Word object that fits the given criteria.
        // if none exist, returns null.

        var partial = this.dictionary.filter(word => (! part_of_speech || word.part_of_speech === part_of_speech) &&
                                                     (! syllables      || word.syllables      === syllables) &&
                                                     (! form           || word.form           === form));
        if (partial.length > 0) {
            return Util.choose(partial);
        } else {
            return null;
        }
    }
}
