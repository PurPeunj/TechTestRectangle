import Vector2 from './vector2.min.js'

/// <summary>
/// Reprensent a rectangle in memory
/// </summary>
/// <param name="drawingContainer">the dom area allocated for drawing</param>
/// <param name="drawingBasePoint">the y position of the top left corner of the rectangle</param>
/// <param name="drawingEndPoint">the width in pixel of the rectangle</param>
/// <param name="minSelectionSize">the minimum selection to draw a rectangle</param>
export default class SelectionRectangle {	

	constructor (drawingContainer) {
		this.drawingContainer = drawingContainer;

		//Top left corner of the rectangle
		this.drawingBasePoint = new Vector2(0,0);
		
		//Bottom right corner of the rectangle
		this.drawingEndPoint = new Vector2(0,0);
		
		this.minSelectionSize = 20;
	}
	
	setBasePoint (e){
		this.drawingBasePoint = this.getMousePosition(e);		
	}
	
	setEndPoint (e){
		this.drawingEndPoint = this.getMousePosition(e);
	}
	
	getSelectionDomElement (){
		return document.querySelector(".selection-rect");
	}
	
	showSelectionDomRectangle() {
		var rect = this.getSelectionDomElement();
		var dimension = this.getDomDimension();

		rect.style.left = `${dimension.left}px`;
		rect.style.top = `${dimension.top}px`;
		rect.style.width = `${dimension.width}px`;
		rect.style.height = `${dimension.height}px`;
		rect.style.opacity = 0.5;
	}
	
	hideSelectionDomRectangle() {
		var rect = this.getSelectionDomElement();
		rect.style.left = 0;
		rect.style.top = 0;
		rect.style.width = 0;
		rect.style.height = 0;
		rect.style.opacity = 0;	
	}
	
	resetSelection (){
		this.drawingBasePoint = new Vector2(0,0);
		this.drawingEndPoint = new Vector2(0,0);
	}
	
	getDomDimension (){
		
		var pointDiff = this.drawingEndPoint.substract(this.drawingBasePoint);
		return {
			left: this.drawingBasePoint.x,
			top : this.drawingBasePoint.y,
			width : pointDiff.x,
			height : pointDiff.y
		}
	}
	
	getMousePosition(e){
		var rect = this.drawingContainer.getBoundingClientRect();
		var x = e.clientX - rect.left; 
		var y = e.clientY - rect.top;
		return new Vector2(x,y);
	}
	
	isNotInSelection(){
		return this.drawingBasePoint.x === 0 && this.drawingBasePoint.y ===0
		&& this.drawingEndPoint.x === 0 && this.drawingEndPoint.y ===0	
	}
	
	isSelectionToSmall(){
		var dimension = this.drawingEndPoint.substract(this.drawingBasePoint);
		return dimension.x < this.minSelectionSize || dimension.y < this.minSelectionSize;
	}
}