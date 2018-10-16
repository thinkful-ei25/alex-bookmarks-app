'use strict';

const store = (function(){
  const addItem = function(item) {
    this.list.push(item);
  };

  const addExpandedProp = function() {
    this.list.map(item => item.expanded = false);
  };

  const addEditingProp = function() {
    this.list.map(item => item.editing = false);
  };

  const setExpandedProp = function(item) {
    item.expanded = !item.expanded;
  };

  const setEditingProp = function(item) {
    item.editing = !item.editing;
  };

  const setAddingItem = function(bool){
    this.addingItem = bool;
  };

  const findAndDelete = function(id){
    this.list = this.list.filter(item => item.id !== id);
  };

  const setRatingFilter = function(val){
    this.ratingFilter = val;
  };

  const setError = function(err) {
    this.error = err;
  };

  const closingExpandedPropForRemoval = function (id) {
    let bookmark = this.list.find(item => item.id === id);
    delete bookmark.expanded;
    console.log(bookmark.expanded);
  };
  return {
    list: [],
    addingItem: false,
    ratingFilter: 1,
    error: null,
    
    addItem,
    setError,
    addExpandedProp,
    closingExpandedPropForRemoval,
    addEditingProp,
    setExpandedProp,
    setEditingProp,
    setAddingItem,
    findAndDelete,
    setRatingFilter
  };

}());