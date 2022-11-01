class Template {
	/*
		Template object will contain all column titles as attributes,
		in addition to the following:
		
		used - Added attribute, initialized at 0.
		
		add_used() - Called whenever a template is successfully used in a Verse.
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
}
