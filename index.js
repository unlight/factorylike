var _objects = {};
var _dependencies = {};

const INSTANCE = 1;
const PROTOTYPE = 2;
const SINGLETON = 3;
const OBJECT = 4;

function install(name, object, type, data) {
	var definition = {
		object: object,
		type: type || OBJECT,
		data: data
	};
	_objects[name] = definition;
}

function factory(name) {
	var result = null;
	var definition = _objects[name];
	var result = null;

	switch (definition.type) {
		case OBJECT:
			if (typeof _objects[name] === "undefined") throw new Error("Object is not installed.");
			result = _objects[name].object;
			break;
		default:
			throw new Error();
	}

	return result;
}

function _instantiateObject(name, constructor) {
	var args = Array.prototype.slice.call(arguments, 2);
	var result = null;
	// This odd looking case statement is purely for speed optimization.
	switch (count(args)) {
		case 0:
			result = new constructor();
			break;
		case 1:
			result = new constructor(args[0]);
			break;
		case 2:
			result = new constructor(args[0], args[1]);
			break;
		case 3:
			result = new constructor(args[0], args[1], args[2]);
			break;
		case 4:
			result = new constructor(args[0], args[1], args[2], args[3]);
			break;
		case 5:
			throw new Error();
	}
	if (_dependencies[name]) {
		var dependencies = _dependencies[name];
		for (var key in dependencies) {
			result[key] = dependencies[key];
		}
	}

	return result;
}

module.exports = factory;
module.exports.install = install;
module.exports.INSTANCE = INSTANCE;
module.exports.PROTOTYPE = PROTOTYPE;
module.exports.SINGLETON = SINGLETON;
module.exports.OBJECT = OBJECT;