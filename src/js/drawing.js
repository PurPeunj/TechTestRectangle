(function () {
	//Register events
	const drawingContainer = document.getElementById("drawingArea");
	drawingContainer.addEventListener("mousedown", onMouseDown, false);
	drawingContainer.addEventListener("mouseup", onMouseUp, false);
	drawingContainer.addEventListener("mousemove", onMouseMove, false);
	
	const colorbutton = document.getElementsByClassName("drawing-table-cta")[0];
	colorbutton.addEventListener("click", onColorButtonClick), false;
	
	//Drawing variables
	const _minRectSize = 20;
	
	var isMouseDown = false;
	var drawingBasePoint;
	var drawingEndPoint;
	var selectionRectangle = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	};
	
	//Storage variables
	var _repository;
	function getRepository(){
		if(!_repository){
			_repository = new window.RectangleRepository();
		}
		
		return _repository;
	}
	
	//---Draw rectangle Events functions ---//	
	function onMouseDown(e) {
		event.stopPropagation();
		
		isMouseDown = true;
		
		drawingBasePoint = getMousePosition(e);
		selectionRectangle.left = drawingBasePoint.x;
		selectionRectangle.top = drawingBasePoint.y;
	}

	function onMouseMove(e) {	
		event.stopPropagation();
		
		if (!isMouseDown) {
			return;
		}
		
		drawingEndPoint = getMousePosition(e);
		selectionRectangle.right = drawingEndPoint.x;
		selectionRectangle.bottom = drawingEndPoint.y;
		showSelectionRectangle(selectionRectangle);
	}

	function onMouseUp(e) {
		event.stopPropagation();
		
		isMouseDown = false;
		hideSelectionRectangle();
		selectionRectangle = {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		};
		
		//No mouse Mouvement
		if(!(drawingBasePoint && drawingEndPoint)){
			return;
		}
		
		//Rectangle to small
		var diff = drawingEndPoint.subtract(drawingBasePoint);
		if(diff.x < _minRectSize || diff.y < _minRectSize){
			return;
		}
		
		drawRectangle(drawingBasePoint, drawingEndPoint);
		drawingBasePoint = drawingEndPoint = null;
	}
	
	
	//---Drawing same area rectangles Events functions ---//
	function onColorButtonClick(e){
		
		e.stopPropagation();	
		e.preventDefault();
		
		if(getRepository().count() < 2){
			alert("You need at least 2 rectangles to use this feature");
			return;
		}	
		if(getRepository().count() === 2){
			repaintRectangles(getRepository().getByIndex(0),getRepository().getByIndex(1));
			return;
		}
		
		var result = getRepository().getSmallestAreaDifference();
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

	
	//--- Selection Box functions ---//
	
	//Get x/y position of cursor within the element.
	function getMousePosition(e){
		var rect = drawingContainer.getBoundingClientRect();
		var x = e.clientX - rect.left; 
		var y = e.clientY - rect.top;
		return new window.Vector2(x,y);
	}
	
	
	function getSelectionRectNode() {
		return document.querySelector(".selection-rect");
	}

	function showSelectionRectangle(selection) {
		var rect = getSelectionRectNode();
		rect.style.left = `${selection.left}px`;
		rect.style.top = `${selection.top}px`;
		rect.style.width = `${selection.right - selection.left}px`;
		rect.style.height = `${selection.bottom - selection.top}px`;
		rect.style.opacity = 0.5;
	}

	function hideSelectionRectangle() {
		var rect = getSelectionRectNode();
		rect.style.opacity = 0;
	}
	
	//--- Draw Rectangle functions ---//
	function drawRectangle(topleftCorner, bottomRightCorner){
		var rectEntity = getRectangleEntity(topleftCorner, bottomRightCorner);
		var success = getRepository().add(rectEntity);
		
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
		return new window.RectangleEntity(
		getRepository().getNewId(),
		topleftCorner,
		bottomRightCorner,
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
		var entity = getRepository().getById(domId);
		entity.isRotating =  true;
	}
	
	function onTransitionEnd(e){
		
		if(e.propertyName != "transform"){
			return;
		}
		
		var domId = e.currentTarget.getAttribute("id");
		var entity = getRepository().getById(domId);
		entity.isRotating =  false;
		entity.isWaitingDelete = true;
		
		deleteWaitingRectangles();
	}
	
	function onRectangleDblClick(e){
		e.currentTarget.classList.toggle("rotate360");
	}
	
	function deleteWaitingRectangles(){
		var isStillRotating = getRepository().areRectangleStillRotating();
		if(isStillRotating){
			return;
		}
		
		var toDeleteList = getRepository().getWaitingForDeleteRectangles();	
		toDeleteList.forEach(deleteDomRectangle);
		getRepository().deleteWaitingRectangles();
	}
	
	function deleteDomRectangle(rectEntity){
		var domElement = document.getElementById(rectEntity.id);
		domElement.remove();
	}
}())
