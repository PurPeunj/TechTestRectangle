
window.RectangleEntity = function(id, topLeftCorner, bottomRightCorner, color) {
	
	var dimensionVector = bottomRightCorner.subtract(topLeftCorner);
	
	this.id = id,
	this.top = topLeftCorner.y,
	this.left = topLeftCorner.x,
	this.width = dimensionVector.x,
	this.height = dimensionVector.y,
	this.color = color,
	this.area = this.getArea(dimensionVector),
	this.isRotating = false,
	this.waitingDelete = false
}

window.RectangleEntity.prototype = {
	getArea: function(dimensionVector) {
		return dimensionVector.x * dimensionVector.y;
	},
	getRectangleTemplate: function() {
		return `<div class='rotatable drawnRectangle' id='${this.id}' `+
				`style='${this.getStyleAttribute()}'></div>`;
	},
	getStyleAttribute: function() {
		return `top:${this.top}px;`+
		`left:${this.left}px;`+
		`width:${this.width}px;`+
		`height:${this.height}px;`+
		`background-color:${this.color};`;
	}	
};