window.RectangleRepository = function() {
	this.repository = [];
	this._lastId = -1;
}

window.RectangleRepository.prototype = {
	set: function(rectArray) {
		this.repository = rectArray || [];
	},
	count : function(){
		return this.repository.length;
	},
	add: function(rectangleEntity) {
		var result = this.repository.find((element, index) => {if (element.id === rectangleEntity.id) return true});
		if(result){
			console.error(`A rectangle with id ${rectangleEntity.id} already exist`);
			return false;
		}
		
		this.repository.push(rectangleEntity);
		return true;
	},
	deleteWaitingRectangles: function() {
		this.repository = this.repository.filter(element => !element.isWaitingDelete)
		return true;
	},
	getWaitingForDeleteRectangles: function() {	
		return this.repository.filter(element => element.isWaitingDelete);
	},
	getById: function(entityId){
		return this.repository.find((element, index) => {if (element.id === entityId) return true});
	},
	getByIndex: function(index){
		return this.repository[index];
	},
	getNewId: function() {
		this._lastId++;
		return `rect_${this._lastId}`;
	},
	areRectangleStillRotating : function(){
		var atLeastOneRotate = this.repository.find((element, index) => {if (element.isRotating) return true});
		return atLeastOneRotate;
	},
	getSmallestAreaDifference : function(){
		//sort rectangle by area
		var ascAreaRectangleArray = this.repository.sort(function(a,b){return a.area - b.area});
		
		var result = {
			entity1: null,
			entity2: null,
			areaDiff: -1
		};
		var prevEntity;
		
		//Calculate area between each adjacent entity
		for(var i =0; i < ascAreaRectangleArray.length; i++){
			
			if(i !== 0){
				var currentDiff = Math.abs(prevEntity.area - ascAreaRectangleArray[i].area);
				
				//kepp smallest entities area diff
				if(result.areaDiff === -1 || currentDiff < result.areaDiff){
					result = {
						entity1: prevEntity,
						entity2: ascAreaRectangleArray[i],
						areaDiff: currentDiff
					};
				}
			}
			prevEntity = ascAreaRectangleArray[i];
		}
		
		return result;
	}
};