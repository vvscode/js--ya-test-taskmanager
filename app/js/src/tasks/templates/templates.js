(function() {(window["JST"] = window["JST"] || {})["taskForm.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="task-form">\r\n    <span class="id">' +
__e( (!!id)? ('#'+id) : '[NEW]' ) +
'</span>\r\n    <div class="name"><label>Name: <input name="name" value="' +
__e( name ) +
'"/></label></div>\r\n    <div class="description"><label>Description: <input name="description" value="' +
__e( description ) +
'"/></label></div>\r\n    <div class="state"><label>Status:<select name="state">\r\n        ';
 for(var i in possibleStatuses) { ;
__p += '\r\n            <option>' +
__e( possibleStatuses[i] ) +
'</option>\r\n        ';
 } ;
__p += '\r\n    </select></label></div>\r\n    <div class="message"></div>\r\n    <div class="buttons">\r\n        <button class="save">Save</button>\r\n        <button class="cancel">Cancel</button>\r\n    </div>\r\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["taskList.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    <h1>' +
__e( title ) +
'</h1>\r\n    <button class="js-new-task">New task</button>\r\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["taskListItem.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="task-item">\r\n    <span class="name">' +
__e( name ) +
'</span>\r\n    <p class="description">' +
__e( description ) +
'</p>\r\n    <span class="state">' +
__e( status ) +
'</span>\r\n    <button class="edit">Edit</button>\r\n</div>';

}
return __p
}})();