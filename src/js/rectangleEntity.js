/// <summary>
/// Reprensent a rectangle in memory
/// </summary>
/// <param name="id">the unique id of the rectangle</param>
/// <param name="top">the x position of the top left corner of the rectangle</param>
/// <param name="left">the y position of the top left corner of the rectangle</param>
/// <param name="width">the width in pixel of the rectangle</param>
/// <param name="height">the height in pixel of the rectangle</param>
/// <param name="color">the background color of the rectangle in hexadecimal</param>
/// <param name="area">the area width * height precalculated</param>
/// <param name="isRotating">is the rectangle is currently rotating on screen (bool)</param>
/// <param name="waitingDelete">is the rectangle waiting for deletion (bool)</param>
export default class RectangleEntity {
	
	constructor (id,domDimension,color) {
		this.id = id,
		this.top = domDimension.top,
		this.left = domDimension.left,
		this.width = domDimension.width,
		this.height = domDimension.height,
		this.color = color,
		this.area = this.getArea(),
		this.isRotating = false,
		this.waitingDelete = false
	}
	
	getArea() {
		return this.width * this.height;
	}
	
	getRectangleTemplate() {
		return `<div class='rotatable drawnRectangle' id='${this.id}' `+
				`style='${this.getStyleAttribute()}'></div>`;
	}
	
	getStyleAttribute() {
		return `top:${this.top}px;`+
		`left:${this.left}px;`+
		`width:${this.width}px;`+
		`height:${this.height}px;`+
		`background-color:${this.color};`;
	}	
}