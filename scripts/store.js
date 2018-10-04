'use strict';

const store = (function(){
  const addItem = function(item) {
    this.list.push(item);
  };

  const addExpandedProp = function() {
    this.list.map(item => item.expanded = false);
  };

  const setExpandedProp = function(item) {
    item.expanded = !item.expanded;
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
    addExpandedProp,
    setExpandedProp,
    setAddingItem,
    findAndDelete,
  };

}());