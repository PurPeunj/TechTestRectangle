
window.Vector2 = function(x, y) {
	this.x = (x === undefined) ? 0 : x;
	this.y = (y === undefined) ? 0 : y;
}

window.Vector2.prototype = {
	set: function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	},
	clone: function() {
		return new window.Vector2(this.x, this.y);
	},
	add: function(vector) {
		return new window.Vector2(this.x + vector.x, this.y + vector.y);
	},
	subtract: function(vector) {
		return new window.Vector2(this.x - vector.x, this.y - vector.y);
	},
	toString: function () {
		var vector = this.toPrecision(1);
		return ("[" + vector.x + "; " + vector.y + "]");
	}
};