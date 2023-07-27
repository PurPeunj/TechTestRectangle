import SelectionRectangle from './selectionRectangle.min.js'
import RectangleRepository from './RectangleRepository.min.js'
import RectangleEntity from './RectangleEntity.min.js'

/// <summary>
/// The main class for drawing rectangles
/// </summary>
(function () {
	//Register events
	const drawingContainer = document.getElementById("drawingArea");
	drawingContainer.addEventListener("mousedown", onMouseDown, false);
	drawingContainer.addEventListener("mouseup", onMouseUp, false);
	drawingContainer.addEventListener("mousemove", onMouseMove, false);
	
	const colorbutton = document.getElementsByClassName("drawing-table-cta")[0];
	colorbutton.addEventListener("click", onColorButtonClick), false;
	
	var isMouseDown = false;
	
	//Storage service
	var _repository = new RectangleRepository();
	
	//Selection module && getter
	var _selectionRectangle = new SelectionRectangle(drawingContainer);
	
	//---Draw rectangle Events functions ---//	
	function onMouseDown(e) {
		event.stopPropagation();
		
		isMouseDown = true;
		
		_selectionRectangle.setBasePoint(e);			
	}

	function onMouseMove(e) {	
		event.stopPropagation();
		
		if (!isMouseDown) {
			return;
		}
		
		_selectionRectangle.setEndPoint(e)
		_selectionRectangle.showSelectionDomRectangle();
	}

	function onMouseUp(e) {
		event.stopPropagation();
		
		isMouseDown = false;	
		
		//No mouse Mouvement
		if(_selectionRectangle.isNotInSelection()){
			return;
		}
		
		_selectionRectangle.hideSelectionDomRectangle();
		
		//Rectangle to small
		if(_selectionRectangle.isSelectionToSmall()){
			return;
		}
		
		drawRectangle();
		_selectionRectangle.resetSelection();
	}

	//--- Draw Rectangle functions ---//
	function drawRectangle(){
		var rectEntity = getRectangleEntity();
		var success = _repository.add(rectEntity);
		
		if(success){
			var domTemplate = rectEntity.getRectangleTemplate();
			var htmlElement = htmlToElement(domTemplate);
			registerRectangleEvenement(htmlElement);
			drawingContainer.appendChild(htmlElement);
			console.log("Success");
		}			
	}
	
	function htmlToElement(html) {
		var template = document.createElement('template');
		html = html.trim();
		template.innerHTML = html;
		return template.content.firstChild;
	}

	
	function getRectangleEntity(topleftCorner, bottomRightCorner){
		return new RectangleEntity(
		_repository.getNewId(),
		_selectionRectangle.getDomDimension(),
		getRandomHexColor());
	}
	
	function getRandomHexColor(){
		var randomColor = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
		return `#${randomColor}`;
	}
	
	//--- Rectangle rotation animation functions ---//	
	function registerRectangleEvenement(rectElement) {
		rectElement.addEventListener("transitionstart", onTransitionBegin);
		rectElement.addEventListener("transitionend", onTransitionEnd);
		rectElement.addEventListener("dblclick", onRectangleDblClick);
	}
	
	function onTransitionBegin(e){
		
		if(e.propertyName != "transform"){
			return;
		}
		
		var domId = e.currentTarget.getAttribute("id");
		var entity = _repository.getById(domId);
		entity.isRotating =  true;
	}
	
	function onTransitionEnd(e){
		
		if(e.propertyName != "transform"){
			return;
		}
		
		var domId = e.currentTarget.getAttribute("id");
		var entity = _repository.getById(domId);
		entity.isRotating =  false;
		entity.isWaitingDelete = true;
		
		deleteWaitingRectangles();
	}
	
	function onRectangleDblClick(e){
		e.currentTarget.classList.toggle("rotate360");
	}
	
	function deleteWaitingRectangles(){
		var isStillRotating = _repository.areRectangleStillRotating();
		if(isStillRotating){
			return;
		}
		
		var toDeleteList = _repository.getWaitingForDeleteRectangles();	
		toDeleteList.forEach(deleteDomRectangle);
		_repository.deleteWaitingRectangles();
	}
	
	function deleteDomRectangle(rectEntity){
		var domElement = document.getElementById(rectEntity.id);
		domElement.remove();
	}
	
	//---Drawing same area rectangles Events functions ---//
	function onColorButtonClick(e){
		
		e.stopPropagation();	
		e.preventDefault();
		
		if(_repository.count() < 2){
			alert("You need at least 2 rectangles to use this feature");
			return;
		}	
		if(_repository.count() === 2){
			repaintRectangles(_repository.getByIndex(0),_repository.getByIndex(1));
			return;
		}
		
		var result = _repository.getSmallestAreaDifference();
		repaintRectangles(result.entity1, result.entity2);
		
	}
	
	function repaintRectangles(a , b){
		var color = getRandomHexColor();
				
		setNewColor(a, color);
		setNewColor(b, color);
		
	}
	
	function setNewColor(rectEntity, color){
		rectEntity.color = color;
		var domElement = document.getElementById(rectEntity.id);
		domElement.setAttribute("style", rectEntity.getStyleAttribute());
	}
}())
