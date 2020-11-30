class Util {
	/* A static class that provides some useful functions */
	
	static choose(arr) {
		return arr[Math.floor(arr.length * Math.random())];
	}

	static sum(arr) {
		return arr.reduce(function(a,b){return a+b}, 0);
	}

	static randint(begin, end) {
		return Math.floor(Math.random() * (end - begin)) + begin;
	}

	static split(str, sep) {
		var i = str.indexOf(sep);
		return [str.substring(0, i), str.substring(i + sep.length)];
	}
	
	static is_capitalized(str) {
		return /^[A-Z]/.test(str);
	}
}