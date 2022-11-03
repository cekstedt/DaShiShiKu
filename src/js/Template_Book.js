class Template_Book {
  /*
		This class takes a 2d list of templates (first row is titles)
		and converts it to a template_book of Template objects.
	*/

  template_book = [];

  constructor(data) {
    for (const row of data.slice(1)) {
      this.template_book.push(new Word(row, data[0]));
    }
  }

  get_random_template() {
    return Util.choose(this.template_book);
  }
}
