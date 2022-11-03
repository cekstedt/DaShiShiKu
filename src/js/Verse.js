class Verse {
  /*
		Verse object will contain one randomly selected Template and enough
		randomly selected Words to fill it.
	*/

  dictionary;
  template_book;
  syllables;

  words;
  word_caps;
  separators;
  template;

  constructor(dictionary, template_book, syllables) {
    this.dictionary = dictionary;
    this.template_book = template_book;
    this.syllables = syllables;

    let success;
    do {
      success = this.try_template();
    } while (!success);

    this.template.add_used();
    for (const word of this.words) {
      word.add_used();
    }
  }

  try_template(syllables) {
    // Will try to create a sentence with the given number of syllables.
    // Returns a boolean status code (false for failed, true for succeeded).

    this.template = this.template_book.get_random_template();
    this.words = [];
    this.word_caps = [];
    this.separators = [];

    let temp_str = this.template.template;
    let syllables = this.syllables;

    syllables -= this.template.syllables;
    let syl_list = new Array(this.template.substitutions).fill(1);
    if (syl_list.length > 1) {
      while (Util.sum(syl_list) < syllables) {
        syl_list[Util.randint(0, syl_list.length)] += 1;
      }
    } else {
      syl_list[0] = syllables;
    }

    let syl_index = 0;

    while (temp_str.length > 0) {
      if (!temp_str.includes("<")) {
        this.separators.push(temp_str);
        break;
      } else {
        let prefix, pos;
        [prefix, temp_str] = Util.split(temp_str, "<");
        [pos, temp_str] = Util.split(temp_str, ">");

        this.separators.push(prefix);

        let form;
        if (pos.includes(" ")) {
          [pos, form] = pos.split(" ");
        } else {
          form = "";
        }
        this.word_caps.push(Util.is_capitalized(pos));

        let word = this.dictionary.get_random_word(
          pos.toLowerCase(),
          form,
          syl_list[syl_index]
        );
        syl_index += 1;
        if (!word) {
          return false;
        }

        this.words.push(word);
      }
    }

    return true;
  }

  to_str() {
    let ret = [];
    for (const i = 0; i < this.words.length; i++) {
      ret.push(this.separators[i]);
      ret.push(this.words[i].to_str(this.word_caps[i]));
    }
    ret.push(this.separators[this.separators.length - 1]);
    return ret.join("");
  }

  cash_phrases_total() {
    let total = 0;
    for (const word of this.words) {
      total += word.cash_phrase;
    }
    return total;
  }
}
