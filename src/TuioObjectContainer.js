(function(root) {
    
var Tuio = root.Tuio;

if (typeof require !== "undefined") {
    Tuio = require("./Tuio");
}
    
Tuio.ObjectContainer = Tuio.Model.extend({
    
    pointer: null,
    sessionId: null,
    startTime: null,
    currentTime: null,
    source: null,
    state: null,
    
    initialize: function(params) {
        params = params || {};
        
        this.sessionId = params.si;
        this.startTime = params.ttime || Tuio.Time.getSystemTime();
        this.currentTime = this.startTime;
        this.source = params.src;
        this.state = Tuio.TUIO_ADDED;
    },
    
    remove: function(ttime) {
        this.removeTuioPointer(ttime);
        this.state = Tuio.TUIO_REMOVED;
    },
    
    update: function(ttime) {
        this.currentTime = ttime;
        this.state = Tuio.TUIO_IDLE;
    },
    
    stop: function(ttime) {
        if (this.pointer) {
            this.pointer.stop(ttime);
        }
        this.currentTime = ttime;
    },
    
    isMoving: function() {
        return this.constainsTuioPointer() &&
                    this.pointer.isMoving();
    },
    
    removeTuioPointer: function(ttime) {
        if (this.pointer) {
            this.pointer.remove(ttime);
        }
        this.currentTime = ttime;
    },
    
    deleteTuioPointer: function() {
        this.pointer = null;
    },
    
    constainsTuioPointer: function() {
        return !!this.pointer;
    },
    
    containsNewTuioPointer: function() {
        return this.constainsTuioPointer()
                && this.pointer.getTuioState() === Tuio.TUIO_ADDED;
    },
    
    setTuioPointer: function(pointer) {
        this.pointer = pointer;
    },
                                         
    getTuioPointer: function() {
        return this.pointer;
    },
    
    getSessionId: function() {
        return this.sessionId;
    },
    
    getTuioTime: function() {
        return this.currentTime;
    },
    
    getStartTime: function() {
        return this.startTime;
    },
    
    setTuioSource: function(source) {
        this.source = source;
    },
    
    getTuioSource: function() {
        return this.source;
    },
    
    getTuioState: function() {
        return this.state;
    }
});
    
if (typeof exports !== "undefined") {
    module.exports = Tuio.ObjectContainer;
}
    
})(this);