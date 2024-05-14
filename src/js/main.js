import Dictionary from "./Dictionary.js";
import Template_Book from "./Template_Book.js";
import Haiku_Book from "./Haiku_Book.js";
import dictionary_data from "./dictionary_data.js";
import template_data from "./template_data.js";

class Haiku_View {
  dictionary;
  template_book;
  haiku_book;

  generate_button;
  text_element;

  constructor() {
    // Set class as Singleton.
    if (Haiku_View._instance) {
        return Haiku_View._instance;
    } else {
      Haiku_View._instance = this;
    }

    // Initialize variables.
    this.dictionary = new Dictionary(dictionary_data);
    this.template_book = new Template_Book(template_data);
    this.haiku_book = new Haiku_Book(this.dictionary, this.template_book);

    // Prefetch DOM calls.
    this.generate_button = document.getElementById("generate-btn");
    this.text_element = document.getElementById("text");

    // Set up event listeners.
    this.generate_button.addEventListener("click", () => {this.haiku_display("generate");});
    document.addEventListener("keydown", function(event) {
      switch (event.code) {
        case "ArrowLeft":
          window.app.haiku_display("prev");
          break;
        case "ArrowRight":
          window.app.haiku_display("next");
          break;
      }
    });
    window.onload = () => {this.haiku_display("generate");};
  }

  haiku_display = code => {
    // Takes the following inputs to change the "text" element to a new haiku:
    //   "next": Move to next haiku in list.
    //   "prev": Move to previous haiku in list.
    //   "generate": Generate a new haiku at the end of the list, and move to it.
  
    let current_haiku;
    switch (code) {
      case "next":
        current_haiku = this.haiku_book.get_next_haiku();
        break;
      case "prev":
        current_haiku = this.haiku_book.get_prev_haiku();
        break;
      case "generate":
        current_haiku = this.haiku_book.generate_haiku();
        break;
    }
    if (current_haiku) {
      this.text_element.innerHTML = current_haiku.to_str();
    }
  }
}

window.app = new Haiku_View();
