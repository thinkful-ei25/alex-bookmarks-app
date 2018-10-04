'use strict';

const store = (function(){
  const addItem = function(item) {
    this.list.push(item);
  };

  const setAddingItem = function(){
    this.addingItem = !this.addingitem;
  };

  return {
    list: [],
    addingItem: false,
    
    addItem,
    setAddingItem,

  };

}());