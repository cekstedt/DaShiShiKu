import Haiku from "./Haiku.js";

export default class Haiku_Book {
  /*
		This object will contain a list of generated Haiku objects,
		up to a set maximum.
	*/

  dictionary;
  template_book;
  haikus = [];
  current_index = -1;
  max_haikus = 1000;

  constructor(dictionary, template_book) {
    this.dictionary = dictionary;
    this.template_book = template_book;
  }

  generate_haiku() {
    // Executed whenever the Generate button is pressed.
    // Will create a new haiku, and jump to it.

    this._create_new_haiku();
    this.current_index = this.haikus.length - 1;
    return this.haikus[this.current_index];
  }

  get_next_haiku() {
    // Executed whenever the next button is pressed.

    if (this.current_index < this.haikus.length - 1) {
      this.current_index += 1;
    }
    return this.haikus[this.current_index];
  }

  get_prev_haiku() {
    // Executed whenever the previous button is pressed.

    if (this.current_index > 0) {
      this.current_index -= 1;
    }
    return this.haikus[this.current_index];
  }

  _create_new_haiku() {
    // Create a new haiku at the end of the list.
    // If there are now more than the max number, shift one off the front.

    this.haikus.push(new Haiku(this.dictionary, this.template_book));
    if (this.haikus.length > this.max_haikus) {
      this.haikus.shift();
      this.current_index -= 1;
    }
  }
}
