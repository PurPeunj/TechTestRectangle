/// <summary>
/// Represent a point in 2d space
/// </summary>
export default class Vector2 {
	
	constructor (x, y) {
		this.x = (x === undefined) ? 0 : x;
		this.y = (y === undefined) ? 0 : y;
	}
	
	set(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	
	clone() {
		return new Vector2(this.x, this.y);
	}
	
	add(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}
	
	substract(vector) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}
	
	toString () {
		var vector = this.toPrecision(1);
		return ("[" + vector.x + "; " + vector.y + "]");
	}
}