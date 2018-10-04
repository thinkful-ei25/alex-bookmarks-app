'use strict';

const store = (function(){
  const addItem = function(item) {
    this.list.push(item);
  };

  const setAddingItem = function(){
    this.addingItem = !this.addingitem;
  };

  const findAndDelete = function(id){
    this.list = this.list.filter(item => item.id !== id);
  };

  return {
    list: [],
    addingItem: false,
    
    addItem,
    setAddingItem,
    findAndDelete,

  };

}());