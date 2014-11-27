var EventDispatcher = (function() {

  function EventDispatcher(target) {
    this.target = target;
  }

  EventDispatcher.prototype = {
    target: null,

    // empty hash for event listeners
    listeners: {},

    addEventListener: function(type, listener, listener_scope, params) {

      if (!this.listeners[type]) {
        this.listeners[type] = [];
      } else {
        // check if listener for this event type is not already added
        for (var i = this.listeners[type].length - 1; i >= 0; i--) {
          // return false if same listener for such type is already added
          if (this.listeners[type][i].callback == listener) {
            return false;
          }
        }
      }

      this.listeners[type].push({
        callback:listener,
        scope:listener_scope,
        params: params
      });

      // return true if listener added
      return true;
    },

    removeEventListener: function(type, listener) {
      if (this.listeners[type]) {
        for (var i = this.listeners[type].length - 1; i >= 0; i--) {
          // return false if same listener for such type is already added
          if (this.listeners[type][i].callback == listener) {
            this.listeners[type].splice(i, 1);
            return true;
          }
        }
      } else {
        // return false if listener is not found
        return false;
      }
    },

    dispatchEvent: function(type, data) {
      var _this = this; // save reference to 'this'
      var listeners = this.listeners[type];
      if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i].callback.call(
            listeners[i].scope,
            {
              type: type, // name of event
              target: _this.target, // inform about dispatcher's origin
              data: listeners[i].params.concat() // copy params array to prevent accidental changes in listeners
            });
        }
      }
    }

  };

  return EventDispatcher;

})();
