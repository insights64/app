(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}

function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $author$project$Main$UrlRequested = function (a) {
	return {$: 'UrlRequested', a: a};
};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Main$GotUserInfo = function (a) {
	return {$: 'GotUserInfo', a: a};
};
var $author$project$Main$Guest = {$: 'Guest'};
var $author$project$Types$Last30Days = {$: 'Last30Days'};
var $author$project$Main$LoggedIn = F2(
	function (a, b) {
		return {$: 'LoggedIn', a: a, b: b};
	});
var $author$project$Main$NotFoundPage = {$: 'NotFoundPage'};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Route$Dashboard = {$: 'Dashboard'};
var $author$project$Main$DashboardMsg = function (a) {
	return {$: 'DashboardMsg', a: a};
};
var $author$project$Main$DashboardPage = function (a) {
	return {$: 'DashboardPage', a: a};
};
var $author$project$Main$EmailPreferencesMsg = function (a) {
	return {$: 'EmailPreferencesMsg', a: a};
};
var $author$project$Main$EmailPreferencesPage = function (a) {
	return {$: 'EmailPreferencesPage', a: a};
};
var $author$project$Main$ForgotPasswordPage = function (a) {
	return {$: 'ForgotPasswordPage', a: a};
};
var $author$project$Main$GameDetailMsg = function (a) {
	return {$: 'GameDetailMsg', a: a};
};
var $author$project$Main$GameDetailPage = function (a) {
	return {$: 'GameDetailPage', a: a};
};
var $author$project$Route$Login = {$: 'Login'};
var $author$project$Main$LoginPage = function (a) {
	return {$: 'LoginPage', a: a};
};
var $author$project$Main$RegisterPage = function (a) {
	return {$: 'RegisterPage', a: a};
};
var $author$project$Main$ResetPasswordPage = function (a) {
	return {$: 'ResetPasswordPage', a: a};
};
var $author$project$Main$StudentDetailMsg = function (a) {
	return {$: 'StudentDetailMsg', a: a};
};
var $author$project$Main$StudentDetailPage = function (a) {
	return {$: 'StudentDetailPage', a: a};
};
var $author$project$Main$SubscriptionMsg = function (a) {
	return {$: 'SubscriptionMsg', a: a};
};
var $author$project$Main$SubscriptionPage = function (a) {
	return {$: 'SubscriptionPage', a: a};
};
var $author$project$Main$VerifyEmailMsg = function (a) {
	return {$: 'VerifyEmailMsg', a: a};
};
var $author$project$Main$VerifyEmailPage = function (a) {
	return {$: 'VerifyEmailPage', a: a};
};
var $author$project$Pages$Dashboard$GotUserInfo = function (a) {
	return {$: 'GotUserInfo', a: a};
};
var $author$project$Types$Loading = {$: 'Loading'};
var $author$project$Pages$Dashboard$ResendIdle = {$: 'ResendIdle'};
var $author$project$Types$Success = function (a) {
	return {$: 'Success', a: a};
};
var $author$project$Pages$Dashboard$GotStudents = function (a) {
	return {$: 'GotStudents', a: a};
};
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $author$project$Api$authHeader = function (maybeToken) {
	if (maybeToken.$ === 'Just') {
		var token = maybeToken.a;
		return _List_fromArray(
			[
				A2($elm$http$Http$header, 'Authorization', 'Bearer ' + token)
			]);
	} else {
		return _List_Nil;
	}
};
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $author$project$Api$unwrap = function (_v0) {
	var str = _v0.a;
	return str;
};
var $author$project$Api$getWithQuery = function (config) {
	var queryString = $elm$core$List$isEmpty(config.queryParams) ? '' : ('?' + A2(
		$elm$core$String$join,
		'&',
		A2(
			$elm$core$List$map,
			function (_v0) {
				var k = _v0.a;
				var v = _v0.b;
				return k + ('=' + v);
			},
			config.queryParams)));
	var fullUrl = _Utils_ap(
		$author$project$Api$unwrap(config.endpoint),
		queryString);
	return $elm$http$Http$request(
		{
			body: $elm$http$Http$emptyBody,
			expect: A2($elm$http$Http$expectJson, config.onResponse, config.decoder),
			headers: $author$project$Api$authHeader(config.token),
			method: 'GET',
			timeout: $elm$core$Maybe$Nothing,
			tracker: $elm$core$Maybe$Nothing,
			url: fullUrl
		});
};
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Types$Student = function (id) {
	return function (coachId) {
		return function (displayName) {
			return function (chessComUsername) {
				return function (lastImportedAt) {
					return function (lastInsightAt) {
						return function (avatarUrl) {
							return function (createdAt) {
								return function (archivedAt) {
									return function (stats) {
										return {archivedAt: archivedAt, avatarUrl: avatarUrl, chessComUsername: chessComUsername, coachId: coachId, createdAt: createdAt, displayName: displayName, id: id, lastImportedAt: lastImportedAt, lastInsightAt: lastInsightAt, stats: stats};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (path, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						$elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _v0 = A2(
				$elm$json$Json$Decode$decodeValue,
				A2($elm$json$Json$Decode$at, path, $elm$json$Json$Decode$value),
				input);
			if (_v0.$ === 'Ok') {
				var rawValue = _v0.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_v1.$ === 'Ok') {
					var finalResult = _v1.a;
					return $elm$json$Json$Decode$succeed(finalResult);
				} else {
					return A2(
						$elm$json$Json$Decode$at,
						path,
						nullOr(valDecoder));
				}
			} else {
				return $elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2($elm$json$Json$Decode$andThen, handleResult, $elm$json$Json$Decode$value);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				_List_fromArray(
					[key]),
				valDecoder,
				fallback),
			decoder);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Types$StudentStats = F7(
	function (gameCount, winCount, lossCount, drawCount, winRate, avgAccuracy, analyzedCount) {
		return {analyzedCount: analyzedCount, avgAccuracy: avgAccuracy, drawCount: drawCount, gameCount: gameCount, lossCount: lossCount, winCount: winCount, winRate: winRate};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Types$studentStatsDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'analyzed_count',
	$elm$json$Json$Decode$int,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'avg_accuracy',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$float),
		$elm$core$Maybe$Nothing,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'win_rate',
			$elm$json$Json$Decode$nullable($elm$json$Json$Decode$float),
			$elm$core$Maybe$Nothing,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'draw_count',
				$elm$json$Json$Decode$int,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'loss_count',
					$elm$json$Json$Decode$int,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'win_count',
						$elm$json$Json$Decode$int,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'game_count',
							$elm$json$Json$Decode$int,
							$elm$json$Json$Decode$succeed($author$project$Types$StudentStats))))))));
var $author$project$Types$studentDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'stats',
	$author$project$Types$studentStatsDecoder,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'archived_at',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
		$elm$core$Maybe$Nothing,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'created_at',
			$elm$json$Json$Decode$string,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'avatar_url',
				$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
				$elm$core$Maybe$Nothing,
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'last_insight_at',
					$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
					$elm$core$Maybe$Nothing,
					A4(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'last_imported_at',
						$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
						$elm$core$Maybe$Nothing,
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'chess_com_username',
							$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
							$elm$core$Maybe$Nothing,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'display_name',
								$elm$json$Json$Decode$string,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'coach_id',
									$elm$json$Json$Decode$string,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'id',
										$elm$json$Json$Decode$string,
										$elm$json$Json$Decode$succeed($author$project$Types$Student)))))))))));
var $author$project$Types$studentsDecoder = A2(
	$elm$json$Json$Decode$field,
	'students',
	$elm$json$Json$Decode$list($author$project$Types$studentDecoder));
var $author$project$Api$Endpoint = function (a) {
	return {$: 'Endpoint', a: a};
};
var $author$project$Api$url = F2(
	function (apiUrl, paths) {
		return $author$project$Api$Endpoint(
			apiUrl + ('/' + A2($elm$core$String$join, '/', paths)));
	});
var $author$project$Api$Students$getStudents = function (config) {
	var queryParams = $elm$core$String$isEmpty(config.period) ? _List_Nil : _List_fromArray(
		[
			_Utils_Tuple2('period', config.period)
		]);
	return $author$project$Api$getWithQuery(
		{
			decoder: $author$project$Types$studentsDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'students'])),
			onResponse: config.onResponse,
			queryParams: queryParams,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $author$project$Pages$Dashboard$periodToString = function (filter) {
	if (filter.$ === 'Last7Days') {
		return '7days';
	} else {
		return '30days';
	}
};
var $author$project$Pages$Dashboard$fetchStudents = function (model) {
	return $author$project$Api$Students$getStudents(
		{
			apiUrl: model.apiUrl,
			onResponse: $author$project$Pages$Dashboard$GotStudents,
			period: $author$project$Pages$Dashboard$periodToString(model.timeRangeFilter),
			token: model.token
		});
};
var $author$project$Api$get = function (config) {
	return $elm$http$Http$request(
		{
			body: $elm$http$Http$emptyBody,
			expect: A2($elm$http$Http$expectJson, config.onResponse, config.decoder),
			headers: $author$project$Api$authHeader(config.token),
			method: 'GET',
			timeout: $elm$core$Maybe$Nothing,
			tracker: $elm$core$Maybe$Nothing,
			url: $author$project$Api$unwrap(config.endpoint)
		});
};
var $author$project$Types$UserInfo = F6(
	function (subscription, details, plan, studentCount, isAtLimit, emailVerified) {
		return {details: details, emailVerified: emailVerified, isAtLimit: isAtLimit, plan: plan, studentCount: studentCount, subscription: subscription};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Types$Subscription = F5(
	function (id, coachId, stripeCustomerId, stripeSubscriptionId, status) {
		return {coachId: coachId, id: id, status: status, stripeCustomerId: stripeCustomerId, stripeSubscriptionId: stripeSubscriptionId};
	});
var $author$project$Types$Active = {$: 'Active'};
var $author$project$Types$Cancelled = {$: 'Cancelled'};
var $author$project$Types$Expired = {$: 'Expired'};
var $author$project$Types$PastDue = {$: 'PastDue'};
var $author$project$Types$Trialing = {$: 'Trialing'};
var $author$project$Types$subscriptionStatusFromString = function (str) {
	switch (str) {
		case 'trialing':
			return $author$project$Types$Trialing;
		case 'active':
			return $author$project$Types$Active;
		case 'past_due':
			return $author$project$Types$PastDue;
		case 'cancelled':
			return $author$project$Types$Cancelled;
		case 'expired':
			return $author$project$Types$Expired;
		default:
			return $author$project$Types$Expired;
	}
};
var $author$project$Types$subscriptionDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'status',
	A2($elm$json$Json$Decode$map, $author$project$Types$subscriptionStatusFromString, $elm$json$Json$Decode$string),
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'stripe_subscription_id',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
		$elm$core$Maybe$Nothing,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'stripe_customer_id',
			$elm$json$Json$Decode$string,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'coach_id',
				$elm$json$Json$Decode$string,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'id',
					$elm$json$Json$Decode$string,
					$elm$json$Json$Decode$succeed($author$project$Types$Subscription))))));
var $author$project$Types$SubscriptionDetails = F8(
	function (status, cancelAtPeriodEnd, trialEnd, currentPeriodStart, currentPeriodEnd, planId, planAmount, planInterval) {
		return {cancelAtPeriodEnd: cancelAtPeriodEnd, currentPeriodEnd: currentPeriodEnd, currentPeriodStart: currentPeriodStart, planAmount: planAmount, planId: planId, planInterval: planInterval, status: status, trialEnd: trialEnd};
	});
var $author$project$Types$subscriptionDetailsDecoder = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'plan_interval',
	$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
	$elm$core$Maybe$Nothing,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'plan_amount',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
		$elm$core$Maybe$Nothing,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'plan_id',
			$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
			$elm$core$Maybe$Nothing,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'current_period_end',
				$elm$json$Json$Decode$string,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'current_period_start',
					$elm$json$Json$Decode$string,
					A4(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'trial_end',
						$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
						$elm$core$Maybe$Nothing,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'cancel_at_period_end',
							$elm$json$Json$Decode$bool,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'status',
								A2($elm$json$Json$Decode$map, $author$project$Types$subscriptionStatusFromString, $elm$json$Json$Decode$string),
								$elm$json$Json$Decode$succeed($author$project$Types$SubscriptionDetails)))))))));
var $author$project$Types$SubscriptionPlan = F7(
	function (id, name, displayName, studentLimit, monthlyPriceCents, annualPriceCents, createdAt) {
		return {annualPriceCents: annualPriceCents, createdAt: createdAt, displayName: displayName, id: id, monthlyPriceCents: monthlyPriceCents, name: name, studentLimit: studentLimit};
	});
var $author$project$Types$subscriptionPlanDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'created_at',
	$elm$json$Json$Decode$string,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'annual_price_cents',
		$elm$json$Json$Decode$int,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'monthly_price_cents',
			$elm$json$Json$Decode$int,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'student_limit',
				$elm$json$Json$Decode$int,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'display_name',
					$elm$json$Json$Decode$string,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'name',
						$elm$json$Json$Decode$string,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'id',
							$elm$json$Json$Decode$string,
							$elm$json$Json$Decode$succeed($author$project$Types$SubscriptionPlan))))))));
var $author$project$Types$userInfoDecoder = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'email_verified',
	$elm$json$Json$Decode$bool,
	false,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'is_at_limit',
		$elm$json$Json$Decode$bool,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'student_count',
			$elm$json$Json$Decode$int,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'plan',
				$elm$json$Json$Decode$nullable($author$project$Types$subscriptionPlanDecoder),
				$elm$core$Maybe$Nothing,
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'details',
					$elm$json$Json$Decode$nullable($author$project$Types$subscriptionDetailsDecoder),
					$elm$core$Maybe$Nothing,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'subscription',
						$author$project$Types$subscriptionDecoder,
						$elm$json$Json$Decode$succeed($author$project$Types$UserInfo)))))));
var $author$project$Api$Subscription$getUserInfo = function (config) {
	return $author$project$Api$get(
		{
			decoder: $author$project$Types$userInfoDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'user-info'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Pages$Dashboard$init = F4(
	function (apiUrl, token, initialTimeRange, maybeUserInfo) {
		var _v0 = function () {
			if (maybeUserInfo.$ === 'Just') {
				var info = maybeUserInfo.a;
				return _Utils_Tuple2(
					$author$project$Types$Success(info),
					$elm$core$Platform$Cmd$none);
			} else {
				return _Utils_Tuple2(
					$author$project$Types$Loading,
					$author$project$Api$Subscription$getUserInfo(
						{apiUrl: apiUrl, onResponse: $author$project$Pages$Dashboard$GotUserInfo, token: token}));
			}
		}();
		var userInfoState = _v0.a;
		var userInfoCmd = _v0.b;
		var model = {addError: $elm$core$Maybe$Nothing, apiUrl: apiUrl, archivingStudentId: $elm$core$Maybe$Nothing, isAdding: false, newStudentChessCom: '', openMenuStudentId: $elm$core$Maybe$Nothing, resendStatus: $author$project$Pages$Dashboard$ResendIdle, showAddModal: false, showArchived: false, students: $author$project$Types$Loading, timeRangeFilter: initialTimeRange, token: token, userInfo: userInfoState};
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Pages$Dashboard$fetchStudents(model),
						userInfoCmd
					])));
	});
var $author$project$Pages$EmailPreferences$GotPreferences = function (a) {
	return {$: 'GotPreferences', a: a};
};
var $author$project$Api$Email$EmailPreferences = F3(
	function (analysisCompleteNotifications, weeklySummary, marketingEmails) {
		return {analysisCompleteNotifications: analysisCompleteNotifications, marketingEmails: marketingEmails, weeklySummary: weeklySummary};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Api$Email$emailPreferencesDecoder = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Api$Email$EmailPreferences,
	A2($elm$json$Json$Decode$field, 'analysis_complete_notifications', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'weekly_summary', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'marketing_emails', $elm$json$Json$Decode$bool));
var $author$project$Api$Email$getPreferences = function (config) {
	return $author$project$Api$get(
		{
			decoder: $author$project$Api$Email$emailPreferencesDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'email-preferences'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $author$project$Pages$EmailPreferences$init = F2(
	function (apiUrl, token) {
		return _Utils_Tuple2(
			{apiUrl: apiUrl, error: $elm$core$Maybe$Nothing, isLoading: true, isSaving: false, preferences: $elm$core$Maybe$Nothing, saveSuccess: false, token: token},
			$author$project$Api$Email$getPreferences(
				{apiUrl: apiUrl, onResponse: $author$project$Pages$EmailPreferences$GotPreferences, token: token}));
	});
var $author$project$Pages$ForgotPassword$init = {email: '', error: $elm$core$Maybe$Nothing, isLoading: false, success: $elm$core$Maybe$Nothing};
var $author$project$Pages$GameDetail$GotGameDetail = function (a) {
	return {$: 'GotGameDetail', a: a};
};
var $author$project$Api$Games$GameDetail = F3(
	function (game, pgn, moves) {
		return {game: game, moves: moves, pgn: pgn};
	});
var $author$project$Types$Game = function (id) {
	return function (studentId) {
		return function (platform) {
			return function (platformGameId) {
				return function (whiteUsername) {
					return function (blackUsername) {
						return function (whiteElo) {
							return function (blackElo) {
								return function (result) {
									return function (playedAt) {
										return function (analyzed) {
											return function (openingName) {
												return function (createdAt) {
													return {analyzed: analyzed, blackElo: blackElo, blackUsername: blackUsername, createdAt: createdAt, id: id, openingName: openingName, platform: platform, platformGameId: platformGameId, playedAt: playedAt, result: result, studentId: studentId, whiteElo: whiteElo, whiteUsername: whiteUsername};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Types$gameDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'created_at',
	$elm$json$Json$Decode$string,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'opening_name',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
		$elm$core$Maybe$Nothing,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'analyzed',
			$elm$json$Json$Decode$bool,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'played_at',
				$elm$json$Json$Decode$string,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'result',
					$elm$json$Json$Decode$string,
					A4(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'black_elo',
						$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
						$elm$core$Maybe$Nothing,
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'white_elo',
							$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
							$elm$core$Maybe$Nothing,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'black_username',
								$elm$json$Json$Decode$string,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'white_username',
									$elm$json$Json$Decode$string,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'platform_game_id',
										$elm$json$Json$Decode$string,
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'platform',
											$elm$json$Json$Decode$string,
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'student_id',
												$elm$json$Json$Decode$string,
												A3(
													$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
													'id',
													$elm$json$Json$Decode$string,
													$elm$json$Json$Decode$succeed($author$project$Types$Game))))))))))))));
var $author$project$Types$MoveAnalysis = function (id) {
	return function (gameId) {
		return function (moveNumber) {
			return function (color) {
				return function (fenBefore) {
					return function (movePlayed) {
						return function (bestMove) {
							return function (evalBeforeCp) {
								return function (evalAfterCp) {
									return function (evalDiff) {
										return function (classification) {
											return function (phase) {
												return {bestMove: bestMove, classification: classification, color: color, evalAfterCp: evalAfterCp, evalBeforeCp: evalBeforeCp, evalDiff: evalDiff, fenBefore: fenBefore, gameId: gameId, id: id, moveNumber: moveNumber, movePlayed: movePlayed, phase: phase};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Types$moveAnalysisDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'phase',
	$elm$json$Json$Decode$string,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'classification',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
		$elm$core$Maybe$Nothing,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'eval_diff',
			$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
			$elm$core$Maybe$Nothing,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'eval_after_cp',
				$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
				$elm$core$Maybe$Nothing,
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'eval_before_cp',
					$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
					$elm$core$Maybe$Nothing,
					A4(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'best_move',
						$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
						$elm$core$Maybe$Nothing,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'move_played',
							$elm$json$Json$Decode$string,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'fen_before',
								$elm$json$Json$Decode$string,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'color',
									$elm$json$Json$Decode$string,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'move_number',
										$elm$json$Json$Decode$int,
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'game_id',
											$elm$json$Json$Decode$string,
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'id',
												$elm$json$Json$Decode$string,
												$elm$json$Json$Decode$succeed($author$project$Types$MoveAnalysis)))))))))))));
var $author$project$Api$Games$gameDetailDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'moves',
	$elm$json$Json$Decode$list($author$project$Types$moveAnalysisDecoder),
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'pgn',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
		$elm$core$Maybe$Nothing,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'game',
			$author$project$Types$gameDecoder,
			$elm$json$Json$Decode$succeed($author$project$Api$Games$GameDetail))));
var $author$project$Api$Games$getGame = function (config) {
	return $author$project$Api$get(
		{
			decoder: $author$project$Api$Games$gameDetailDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'games', config.gameId])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $author$project$Pages$GameDetail$init = F3(
	function (apiUrl, token, gameId) {
		return _Utils_Tuple2(
			{gameDetail: $author$project$Types$Loading, gameId: gameId},
			$author$project$Api$Games$getGame(
				{apiUrl: apiUrl, gameId: gameId, onResponse: $author$project$Pages$GameDetail$GotGameDetail, token: token}));
	});
var $author$project$Pages$Login$init = {email: '', error: $elm$core$Maybe$Nothing, isLoading: false, password: ''};
var $author$project$Pages$Register$init = {confirmPassword: '', email: '', error: $elm$core$Maybe$Nothing, isLoading: false, password: ''};
var $author$project$Pages$ResetPassword$init = function (token) {
	return {confirmPassword: '', error: $elm$core$Maybe$Nothing, isLoading: false, password: '', success: false, token: token};
};
var $author$project$Types$AllColors = {$: 'AllColors'};
var $author$project$Types$AllResults = {$: 'AllResults'};
var $author$project$Types$AllTimeControls = {$: 'AllTimeControls'};
var $author$project$Pages$StudentDetail$DateNewest = {$: 'DateNewest'};
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $author$project$Pages$StudentDetail$GotGames = function (a) {
	return {$: 'GotGames', a: a};
};
var $author$project$Types$colorFilterToString = function (cf) {
	switch (cf.$) {
		case 'AllColors':
			return 'all';
		case 'WhiteOnly':
			return 'white';
		default:
			return 'black';
	}
};
var $author$project$Types$GameWithInsights = F3(
	function (game, insight, tags) {
		return {game: game, insight: insight, tags: tags};
	});
var $author$project$Types$GameInsight = function (id) {
	return function (gameId) {
		return function (playerColor) {
			return function (opponentRating) {
				return function (ratingDiff) {
					return function (accuracyOverall) {
						return function (accuracyOpening) {
							return function (accuracyMiddlegame) {
								return function (accuracyEndgame) {
									return function (inaccuraciesCount) {
										return function (mistakesCount) {
											return function (blundersCount) {
												return function (bestMovesCount) {
													return function (excellentMovesCount) {
														return function (worstMoveEvalLoss) {
															return function (maxAdvantage) {
																return function (maxDisadvantage) {
																	return function (criticalMomentsCount) {
																		return function (decisiveAdvantageReached) {
																			return function (decisiveAdvantageSquandered) {
																				return function (phaseDecided) {
																					return {accuracyEndgame: accuracyEndgame, accuracyMiddlegame: accuracyMiddlegame, accuracyOpening: accuracyOpening, accuracyOverall: accuracyOverall, bestMovesCount: bestMovesCount, blundersCount: blundersCount, criticalMomentsCount: criticalMomentsCount, decisiveAdvantageReached: decisiveAdvantageReached, decisiveAdvantageSquandered: decisiveAdvantageSquandered, excellentMovesCount: excellentMovesCount, gameId: gameId, id: id, inaccuraciesCount: inaccuraciesCount, maxAdvantage: maxAdvantage, maxDisadvantage: maxDisadvantage, mistakesCount: mistakesCount, opponentRating: opponentRating, phaseDecided: phaseDecided, playerColor: playerColor, ratingDiff: ratingDiff, worstMoveEvalLoss: worstMoveEvalLoss};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Types$gameInsightDecoder = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'phase_decided',
	$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
	$elm$core$Maybe$Nothing,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'decisive_advantage_squandered',
		$elm$json$Json$Decode$bool,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'decisive_advantage_reached',
			$elm$json$Json$Decode$bool,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'critical_moments_count',
				$elm$json$Json$Decode$int,
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'max_disadvantage',
					$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
					$elm$core$Maybe$Nothing,
					A4(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'max_advantage',
						$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
						$elm$core$Maybe$Nothing,
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'worst_move_eval_loss',
							$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
							$elm$core$Maybe$Nothing,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'excellent_moves_count',
								$elm$json$Json$Decode$int,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'best_moves_count',
									$elm$json$Json$Decode$int,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'blunders_count',
										$elm$json$Json$Decode$int,
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'mistakes_count',
											$elm$json$Json$Decode$int,
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'inaccuracies_count',
												$elm$json$Json$Decode$int,
												A4(
													$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
													'accuracy_endgame',
													$elm$json$Json$Decode$nullable($elm$json$Json$Decode$float),
													$elm$core$Maybe$Nothing,
													A4(
														$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
														'accuracy_middlegame',
														$elm$json$Json$Decode$nullable($elm$json$Json$Decode$float),
														$elm$core$Maybe$Nothing,
														A4(
															$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
															'accuracy_opening',
															$elm$json$Json$Decode$nullable($elm$json$Json$Decode$float),
															$elm$core$Maybe$Nothing,
															A4(
																$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
																'accuracy_overall',
																$elm$json$Json$Decode$nullable($elm$json$Json$Decode$float),
																$elm$core$Maybe$Nothing,
																A4(
																	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
																	'rating_diff',
																	$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
																	$elm$core$Maybe$Nothing,
																	A4(
																		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
																		'opponent_rating',
																		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
																		$elm$core$Maybe$Nothing,
																		A3(
																			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
																			'player_color',
																			$elm$json$Json$Decode$string,
																			A3(
																				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
																				'game_id',
																				$elm$json$Json$Decode$string,
																				A3(
																					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
																					'id',
																					$elm$json$Json$Decode$string,
																					$elm$json$Json$Decode$succeed($author$project$Types$GameInsight))))))))))))))))))))));
var $author$project$Types$GameTag = F6(
	function (id, gameId, tag, moveNumbers, primaryMove, confidence) {
		return {confidence: confidence, gameId: gameId, id: id, moveNumbers: moveNumbers, primaryMove: primaryMove, tag: tag};
	});
var $author$project$Types$Tag = F7(
	function (id, slug, name, category, description, color, priority) {
		return {category: category, color: color, description: description, id: id, name: name, priority: priority, slug: slug};
	});
var $author$project$Types$tagDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'priority',
	$elm$json$Json$Decode$int,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'color',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
		$elm$core$Maybe$Nothing,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'description',
			$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
			$elm$core$Maybe$Nothing,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'category',
				$elm$json$Json$Decode$string,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'name',
					$elm$json$Json$Decode$string,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'slug',
						$elm$json$Json$Decode$string,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'id',
							$elm$json$Json$Decode$string,
							$elm$json$Json$Decode$succeed($author$project$Types$Tag))))))));
var $author$project$Types$gameTagDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'confidence',
	$elm$json$Json$Decode$float,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'primary_move',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int),
		$elm$core$Maybe$Nothing,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'move_numbers',
			$elm$json$Json$Decode$list($elm$json$Json$Decode$int),
			_List_Nil,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'tag',
				$author$project$Types$tagDecoder,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'game_id',
					$elm$json$Json$Decode$string,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'id',
						$elm$json$Json$Decode$string,
						$elm$json$Json$Decode$succeed($author$project$Types$GameTag)))))));
var $author$project$Types$gameWithInsightsDecoder = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'tags',
	$elm$json$Json$Decode$list($author$project$Types$gameTagDecoder),
	_List_Nil,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'insight',
		$elm$json$Json$Decode$nullable($author$project$Types$gameInsightDecoder),
		$elm$core$Maybe$Nothing,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'game',
			$author$project$Types$gameDecoder,
			$elm$json$Json$Decode$succeed($author$project$Types$GameWithInsights))));
var $author$project$Types$gamesWithInsightsDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'total',
	$elm$json$Json$Decode$int,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'games',
		$elm$json$Json$Decode$list($author$project$Types$gameWithInsightsDecoder),
		$elm$json$Json$Decode$succeed(
			F2(
				function (games, total) {
					return {games: games, total: total};
				}))));
var $author$project$Api$Students$getStudentGames = function (config) {
	var tagParams = function () {
		var _v5 = config.tags;
		if (_v5.$ === 'Just') {
			var t = _v5.a;
			return _List_fromArray(
				[
					_Utils_Tuple2('tags', t)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var periodParams = $elm$core$String$isEmpty(config.period) ? _List_Nil : _List_fromArray(
		[
			_Utils_Tuple2('period', config.period)
		]);
	var minRatingDiffParams = function () {
		var _v4 = config.minRatingDiff;
		if (_v4.$ === 'Just') {
			var rd = _v4.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'min_rating_diff',
					$elm$core$String$fromInt(rd))
				]);
		} else {
			return _List_Nil;
		}
	}();
	var minAccuracyParams = function () {
		var _v3 = config.minAccuracy;
		if (_v3.$ === 'Just') {
			var acc = _v3.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'min_accuracy',
					$elm$core$String$fromInt(acc))
				]);
		} else {
			return _List_Nil;
		}
	}();
	var maxRatingDiffParams = function () {
		var _v2 = config.maxRatingDiff;
		if (_v2.$ === 'Just') {
			var rd = _v2.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'max_rating_diff',
					$elm$core$String$fromInt(rd))
				]);
		} else {
			return _List_Nil;
		}
	}();
	var maxBlundersParams = function () {
		var _v1 = config.maxBlunders;
		if (_v1.$ === 'Just') {
			var b = _v1.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'max_blunders',
					$elm$core$String$fromInt(b))
				]);
		} else {
			return _List_Nil;
		}
	}();
	var maxAccuracyParams = function () {
		var _v0 = config.maxAccuracy;
		if (_v0.$ === 'Just') {
			var acc = _v0.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'max_accuracy',
					$elm$core$String$fromInt(acc))
				]);
		} else {
			return _List_Nil;
		}
	}();
	var baseParams = _List_fromArray(
		[
			_Utils_Tuple2('time_control', config.timeControl),
			_Utils_Tuple2('result', config.result),
			_Utils_Tuple2('color', config.color),
			_Utils_Tuple2(
			'limit',
			$elm$core$String$fromInt(config.limit)),
			_Utils_Tuple2(
			'offset',
			$elm$core$String$fromInt(config.offset))
		]);
	var allParams = _Utils_ap(
		baseParams,
		_Utils_ap(
			periodParams,
			_Utils_ap(
				tagParams,
				_Utils_ap(
					minAccuracyParams,
					_Utils_ap(
						maxAccuracyParams,
						_Utils_ap(
							maxBlundersParams,
							_Utils_ap(minRatingDiffParams, maxRatingDiffParams)))))));
	return $author$project$Api$getWithQuery(
		{
			decoder: $author$project$Types$gamesWithInsightsDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'students', config.studentId, 'games', 'insights'])),
			onResponse: config.onResponse,
			queryParams: allParams,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Pages$StudentDetail$periodToString = function (filter) {
	if (filter.$ === 'Last7Days') {
		return '7days';
	} else {
		return '30days';
	}
};
var $author$project$Types$resultFilterToString = function (rf) {
	switch (rf.$) {
		case 'AllResults':
			return 'all';
		case 'WinsOnly':
			return 'win';
		case 'LossesOnly':
			return 'loss';
		default:
			return 'draw';
	}
};
var $author$project$Types$timeControlToString = function (tc) {
	switch (tc.$) {
		case 'AllTimeControls':
			return 'all';
		case 'Bullet':
			return 'bullet';
		case 'Blitz':
			return 'blitz';
		default:
			return 'rapid';
	}
};
var $author$project$Pages$StudentDetail$fetchFilteredGames = function (model) {
	var tagsParam = $elm$core$List$isEmpty(model.selectedTags) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
		A2($elm$core$String$join, ',', model.selectedTags));
	var _v0 = function () {
		var _v1 = model.opponentRatingFilter;
		switch (_v1) {
			case 'higher':
				return _Utils_Tuple2(
					$elm$core$Maybe$Just(1),
					$elm$core$Maybe$Nothing);
			case 'lower':
				return _Utils_Tuple2(
					$elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(-1));
			default:
				return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
		}
	}();
	var minRatingDiff = _v0.a;
	var maxRatingDiff = _v0.b;
	return $author$project$Api$Students$getStudentGames(
		{
			apiUrl: model.apiUrl,
			color: $author$project$Types$colorFilterToString(model.colorFilter),
			limit: model.limit,
			maxAccuracy: model.maxAccuracy,
			maxBlunders: model.maxBlunders,
			maxRatingDiff: maxRatingDiff,
			minAccuracy: model.minAccuracy,
			minRatingDiff: minRatingDiff,
			offset: model.offset,
			onResponse: $author$project$Pages$StudentDetail$GotGames,
			period: $author$project$Pages$StudentDetail$periodToString(model.timeRangeFilter),
			result: $author$project$Types$resultFilterToString(model.resultFilter),
			studentId: model.studentId,
			tags: tagsParam,
			timeControl: $author$project$Types$timeControlToString(model.timeControlFilter),
			token: model.token
		});
};
var $author$project$Pages$StudentDetail$GotStudent = function (a) {
	return {$: 'GotStudent', a: a};
};
var $author$project$Api$Students$getStudent = function (config) {
	var queryParams = $elm$core$String$isEmpty(config.period) ? _List_Nil : _List_fromArray(
		[
			_Utils_Tuple2('period', config.period)
		]);
	return $author$project$Api$getWithQuery(
		{
			decoder: $author$project$Types$studentDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'students', config.studentId])),
			onResponse: config.onResponse,
			queryParams: queryParams,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $author$project$Pages$StudentDetail$fetchStudent = function (model) {
	return $author$project$Api$Students$getStudent(
		{
			apiUrl: model.apiUrl,
			onResponse: $author$project$Pages$StudentDetail$GotStudent,
			period: $author$project$Pages$StudentDetail$periodToString(model.timeRangeFilter),
			studentId: model.studentId,
			token: model.token
		});
};
var $author$project$Pages$StudentDetail$GotTags = function (a) {
	return {$: 'GotTags', a: a};
};
var $author$project$Types$TagWithCount = F2(
	function (tag, count) {
		return {count: count, tag: tag};
	});
var $author$project$Types$tagWithCountDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'count',
	$elm$json$Json$Decode$int,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'tag',
		$author$project$Types$tagDecoder,
		$elm$json$Json$Decode$succeed($author$project$Types$TagWithCount)));
var $author$project$Types$tagsWithCountsDecoder = A2(
	$elm$json$Json$Decode$field,
	'tags',
	$elm$json$Json$Decode$list($author$project$Types$tagWithCountDecoder));
var $author$project$Api$Students$getStudentTags = function (config) {
	var queryParams = $elm$core$String$isEmpty(config.period) ? _List_Nil : _List_fromArray(
		[
			_Utils_Tuple2('period', config.period)
		]);
	return $author$project$Api$getWithQuery(
		{
			decoder: $author$project$Types$tagsWithCountsDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'students', config.studentId, 'tags'])),
			onResponse: config.onResponse,
			queryParams: queryParams,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $author$project$Pages$StudentDetail$fetchTags = function (model) {
	return $author$project$Api$Students$getStudentTags(
		{
			apiUrl: model.apiUrl,
			onResponse: $author$project$Pages$StudentDetail$GotTags,
			period: $author$project$Pages$StudentDetail$periodToString(model.timeRangeFilter),
			studentId: model.studentId,
			token: model.token
		});
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $author$project$Pages$StudentDetail$init = F4(
	function (apiUrl, token, studentId, initialTimeRange) {
		var model = {
			apiUrl: apiUrl,
			archivingStudent: false,
			colorFilter: $author$project$Types$AllColors,
			expandedFilterSections: $elm$core$Set$fromList(
				_List_fromArray(
					['result', 'timeControl'])),
			expandedGames: $elm$core$Set$empty,
			games: $author$project$Types$Loading,
			hoveredGameId: $elm$core$Maybe$Nothing,
			limit: 25,
			maxAccuracy: $elm$core$Maybe$Nothing,
			maxBlunders: $elm$core$Maybe$Nothing,
			minAccuracy: $elm$core$Maybe$Nothing,
			offset: 0,
			opponentRatingFilter: 'all',
			opponentSearch: '',
			resultFilter: $author$project$Types$AllResults,
			selectedTags: _List_Nil,
			sidebarVisible: true,
			sortOrder: $author$project$Pages$StudentDetail$DateNewest,
			student: $author$project$Types$Loading,
			studentId: studentId,
			tags: $author$project$Types$Loading,
			timeControlFilter: $author$project$Types$AllTimeControls,
			timeRangeFilter: initialTimeRange,
			token: token
		};
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Pages$StudentDetail$fetchStudent(model),
						$author$project$Pages$StudentDetail$fetchFilteredGames(model),
						$author$project$Pages$StudentDetail$fetchTags(model)
					])));
	});
var $author$project$Pages$Subscription$GotPlans = function (a) {
	return {$: 'GotPlans', a: a};
};
var $author$project$Types$subscriptionPlansDecoder = A2(
	$elm$json$Json$Decode$field,
	'plans',
	$elm$json$Json$Decode$list($author$project$Types$subscriptionPlanDecoder));
var $author$project$Api$Subscription$getPlans = function (config) {
	return $author$project$Api$get(
		{
			decoder: $author$project$Types$subscriptionPlansDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'subscription', 'plans'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $author$project$Pages$Subscription$fetchPlans = function (model) {
	return $author$project$Api$Subscription$getPlans(
		{apiUrl: model.apiUrl, onResponse: $author$project$Pages$Subscription$GotPlans, token: model.token});
};
var $author$project$Pages$Subscription$GotUserInfo = function (a) {
	return {$: 'GotUserInfo', a: a};
};
var $author$project$Pages$Subscription$fetchSubscription = function (model) {
	return $author$project$Api$Subscription$getUserInfo(
		{apiUrl: model.apiUrl, onResponse: $author$project$Pages$Subscription$GotUserInfo, token: model.token});
};
var $author$project$Pages$Subscription$init = F2(
	function (apiUrl, token) {
		var model = {apiUrl: apiUrl, error: $elm$core$Maybe$Nothing, isLoading: false, plans: $author$project$Types$Loading, subscription: $author$project$Types$Loading, token: token};
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Pages$Subscription$fetchSubscription(model),
						$author$project$Pages$Subscription$fetchPlans(model)
					])));
	});
var $author$project$Pages$VerifyEmail$GotResponse = function (a) {
	return {$: 'GotResponse', a: a};
};
var $author$project$Pages$VerifyEmail$Verifying = {$: 'Verifying'};
var $author$project$Api$Email$VerifyEmailResponse = F2(
	function (message, verified) {
		return {message: message, verified: verified};
	});
var $author$project$Api$Email$verifyEmailResponseDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Api$Email$VerifyEmailResponse,
	A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'verified', $elm$json$Json$Decode$bool));
var $author$project$Api$Email$verifyEmail = function (config) {
	return $author$project$Api$get(
		{
			decoder: $author$project$Api$Email$verifyEmailResponseDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'auth', 'verify-email', config.token])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Nothing
		});
};
var $author$project$Pages$VerifyEmail$init = F2(
	function (apiUrl, token) {
		return _Utils_Tuple2(
			{status: $author$project$Pages$VerifyEmail$Verifying, token: token},
			$author$project$Api$Email$verifyEmail(
				{apiUrl: apiUrl, onResponse: $author$project$Pages$VerifyEmail$GotResponse, token: token}));
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$browser$Browser$Navigation$replaceUrl = _Browser_replaceUrl;
var $author$project$Route$routeToPieces = function (route) {
	switch (route.$) {
		case 'Login':
			return _List_fromArray(
				['login']);
		case 'Register':
			return _List_fromArray(
				['register']);
		case 'Dashboard':
			return _List_fromArray(
				['dashboard']);
		case 'StudentDetail':
			var id = route.a;
			return _List_fromArray(
				['students', id]);
		case 'GameDetail':
			var id = route.a;
			return _List_fromArray(
				['games', id]);
		case 'Subscription':
			return _List_fromArray(
				['subscription']);
		case 'ForgotPassword':
			return _List_fromArray(
				['forgot-password']);
		case 'ResetPassword':
			var token = route.a;
			return _List_fromArray(
				['reset-password', token]);
		case 'VerifyEmail':
			var token = route.a;
			return _List_fromArray(
				['verify-email', token]);
		case 'EmailPreferences':
			return _List_fromArray(
				['email-preferences']);
		default:
			return _List_fromArray(
				['not-found']);
	}
};
var $author$project$Route$routeToString = function (route) {
	return '/' + A2(
		$elm$core$String$join,
		'/',
		$author$project$Route$routeToPieces(route));
};
var $author$project$Route$replaceUrl = F2(
	function (key, route) {
		return A2(
			$elm$browser$Browser$Navigation$replaceUrl,
			key,
			$author$project$Route$routeToString(route));
	});
var $author$project$Main$changeRouteTo = F2(
	function (route, model) {
		switch (route.$) {
			case 'Login':
				var _v1 = model.session;
				if (_v1.$ === 'LoggedIn') {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Dashboard));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								page: $author$project$Main$LoginPage($author$project$Pages$Login$init)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'Register':
				var _v2 = model.session;
				if (_v2.$ === 'LoggedIn') {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Dashboard));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								page: $author$project$Main$RegisterPage($author$project$Pages$Register$init)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'Dashboard':
				var _v3 = model.session;
				if (_v3.$ === 'LoggedIn') {
					var token = _v3.a;
					var coach = _v3.b;
					var _v4 = A4($author$project$Pages$Dashboard$init, model.apiUrl, token, model.timeRangeFilter, coach.subscription);
					var subModel = _v4.a;
					var subCmd = _v4.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								page: $author$project$Main$DashboardPage(subModel)
							}),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$DashboardMsg, subCmd));
				} else {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Login));
				}
			case 'StudentDetail':
				var studentId = route.a;
				var _v5 = model.session;
				if (_v5.$ === 'LoggedIn') {
					var token = _v5.a;
					var _v6 = A4($author$project$Pages$StudentDetail$init, model.apiUrl, token, studentId, model.timeRangeFilter);
					var subModel = _v6.a;
					var subCmd = _v6.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								page: $author$project$Main$StudentDetailPage(subModel)
							}),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$StudentDetailMsg, subCmd));
				} else {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Login));
				}
			case 'GameDetail':
				var gameId = route.a;
				var _v7 = model.session;
				if (_v7.$ === 'LoggedIn') {
					var token = _v7.a;
					var _v8 = A3($author$project$Pages$GameDetail$init, model.apiUrl, token, gameId);
					var subModel = _v8.a;
					var subCmd = _v8.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								page: $author$project$Main$GameDetailPage(subModel)
							}),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$GameDetailMsg, subCmd));
				} else {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Login));
				}
			case 'Subscription':
				var _v9 = model.session;
				if (_v9.$ === 'LoggedIn') {
					var token = _v9.a;
					var _v10 = A2($author$project$Pages$Subscription$init, model.apiUrl, token);
					var subModel = _v10.a;
					var subCmd = _v10.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								page: $author$project$Main$SubscriptionPage(subModel)
							}),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$SubscriptionMsg, subCmd));
				} else {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Login));
				}
			case 'ForgotPassword':
				var _v11 = model.session;
				if (_v11.$ === 'LoggedIn') {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Dashboard));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								page: $author$project$Main$ForgotPasswordPage($author$project$Pages$ForgotPassword$init)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'ResetPassword':
				var token = route.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							page: $author$project$Main$ResetPasswordPage(
								$author$project$Pages$ResetPassword$init(token))
						}),
					$elm$core$Platform$Cmd$none);
			case 'VerifyEmail':
				var token = route.a;
				var _v12 = A2($author$project$Pages$VerifyEmail$init, model.apiUrl, token);
				var subModel = _v12.a;
				var subCmd = _v12.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							page: $author$project$Main$VerifyEmailPage(subModel)
						}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$VerifyEmailMsg, subCmd));
			case 'EmailPreferences':
				var _v13 = model.session;
				if (_v13.$ === 'LoggedIn') {
					var token = _v13.a;
					var _v14 = A2($author$project$Pages$EmailPreferences$init, model.apiUrl, token);
					var subModel = _v14.a;
					var subCmd = _v14.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								page: $author$project$Main$EmailPreferencesPage(subModel)
							}),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$EmailPreferencesMsg, subCmd));
				} else {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Login));
				}
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{page: $author$project$Main$NotFoundPage}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Route$NotFound = {$: 'NotFound'};
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.unvisited;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.value);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0.a;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.path),
					$elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					$elm$core$Basics$identity)));
	});
var $author$project$Route$EmailPreferences = {$: 'EmailPreferences'};
var $author$project$Route$ForgotPassword = {$: 'ForgotPassword'};
var $author$project$Route$GameDetail = function (a) {
	return {$: 'GameDetail', a: a};
};
var $author$project$Route$Register = {$: 'Register'};
var $author$project$Route$ResetPassword = function (a) {
	return {$: 'ResetPassword', a: a};
};
var $author$project$Route$StudentDetail = function (a) {
	return {$: 'StudentDetail', a: a};
};
var $author$project$Route$Subscription = {$: 'Subscription'};
var $author$project$Route$VerifyEmail = function (a) {
	return {$: 'VerifyEmail', a: a};
};
var $elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.visited;
		var unvisited = _v0.unvisited;
		var params = _v0.params;
		var frag = _v0.frag;
		var value = _v0.value;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0.a;
		return $elm$url$Url$Parser$Parser(
			function (_v1) {
				var visited = _v1.visited;
				var unvisited = _v1.unvisited;
				var params = _v1.params;
				var frag = _v1.frag;
				var value = _v1.value;
				return A2(
					$elm$core$List$map,
					$elm$url$Url$Parser$mapState(value),
					parseArg(
						A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return $elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				$elm$core$List$concatMap,
				function (_v0) {
					var parser = _v0.a;
					return parser(state);
				},
				parsers);
		});
};
var $elm$url$Url$Parser$s = function (str) {
	return $elm$url$Url$Parser$Parser(
		function (_v0) {
			var visited = _v0.visited;
			var unvisited = _v0.unvisited;
			var params = _v0.params;
			var frag = _v0.frag;
			var value = _v0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						$elm$url$Url$Parser$State,
						A2($elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0.a;
		var parseAfter = _v1.a;
		return $elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					$elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var $elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return $elm$url$Url$Parser$Parser(
			function (_v0) {
				var visited = _v0.visited;
				var unvisited = _v0.unvisited;
				var params = _v0.params;
				var frag = _v0.frag;
				var value = _v0.value;
				if (!unvisited.b) {
					return _List_Nil;
				} else {
					var next = unvisited.a;
					var rest = unvisited.b;
					var _v2 = stringToSomething(next);
					if (_v2.$ === 'Just') {
						var nextValue = _v2.a;
						return _List_fromArray(
							[
								A5(
								$elm$url$Url$Parser$State,
								A2($elm$core$List$cons, next, visited),
								rest,
								params,
								frag,
								value(nextValue))
							]);
					} else {
						return _List_Nil;
					}
				}
			});
	});
var $elm$url$Url$Parser$string = A2($elm$url$Url$Parser$custom, 'STRING', $elm$core$Maybe$Just);
var $elm$url$Url$Parser$top = $elm$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var $author$project$Route$parser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2($elm$url$Url$Parser$map, $author$project$Route$Dashboard, $elm$url$Url$Parser$top),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$Login,
			$elm$url$Url$Parser$s('login')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$Register,
			$elm$url$Url$Parser$s('register')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$Dashboard,
			$elm$url$Url$Parser$s('dashboard')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$StudentDetail,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('students'),
				$elm$url$Url$Parser$string)),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$GameDetail,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('games'),
				$elm$url$Url$Parser$string)),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$Subscription,
			$elm$url$Url$Parser$s('subscription')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$ForgotPassword,
			$elm$url$Url$Parser$s('forgot-password')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$ResetPassword,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('reset-password'),
				$elm$url$Url$Parser$string)),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$VerifyEmail,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('verify-email'),
				$elm$url$Url$Parser$string)),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$EmailPreferences,
			$elm$url$Url$Parser$s('email-preferences'))
		]));
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Route$fromUrl = function (url) {
	return A2(
		$elm$core$Maybe$withDefault,
		$author$project$Route$NotFound,
		A2($elm$url$Url$Parser$parse, $author$project$Route$parser, url));
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Types$Last7Days = {$: 'Last7Days'};
var $author$project$Types$timeRangeFilterFromString = function (str) {
	if (str === '7days') {
		return $author$project$Types$Last7Days;
	} else {
		return $author$project$Types$Last30Days;
	}
};
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var timeRangeFilter = A2(
			$elm$core$Maybe$withDefault,
			$author$project$Types$Last30Days,
			A2($elm$core$Maybe$map, $author$project$Types$timeRangeFilterFromString, flags.timeRangeFilter));
		var subscriptionCmd = function () {
			var _v3 = flags.token;
			if (_v3.$ === 'Just') {
				var token = _v3.a;
				return $author$project$Api$Subscription$getUserInfo(
					{apiUrl: flags.apiUrl, onResponse: $author$project$Main$GotUserInfo, token: token});
			} else {
				return $elm$core$Platform$Cmd$none;
			}
		}();
		var session = function () {
			var _v1 = _Utils_Tuple2(flags.token, flags.coach);
			if (_v1.a.$ === 'Just') {
				if (_v1.b.$ === 'Just') {
					var token = _v1.a.a;
					var coach = _v1.b.a;
					return A2(
						$author$project$Main$LoggedIn,
						token,
						{createdAt: '', email: coach.email, id: coach.id, subscription: $elm$core$Maybe$Nothing});
				} else {
					var token = _v1.a.a;
					var _v2 = _v1.b;
					return A2(
						$author$project$Main$LoggedIn,
						token,
						{createdAt: '', email: '', id: '', subscription: $elm$core$Maybe$Nothing});
				}
			} else {
				return $author$project$Main$Guest;
			}
		}();
		var _v0 = A2(
			$author$project$Main$changeRouteTo,
			$author$project$Route$fromUrl(url),
			{apiUrl: flags.apiUrl, key: key, page: $author$project$Main$NotFoundPage, session: session, timeRangeFilter: timeRangeFilter});
		var model = _v0.a;
		var routeCmd = _v0.b;
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[routeCmd, subscriptionCmd])));
	});
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Pages$Dashboard$PollProgress = function (a) {
	return {$: 'PollProgress', a: a};
};
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $author$project$Pages$Dashboard$hasAnalysisInProgress = function (students) {
	return A2(
		$elm$core$List$any,
		function (s) {
			return (!s.stats.gameCount) || (_Utils_cmp(s.stats.analyzedCount, s.stats.gameCount) < 0);
		},
		students);
};
var $author$project$Pages$Dashboard$subscriptions = function (model) {
	var _v0 = model.students;
	if (_v0.$ === 'Success') {
		var students = _v0.a;
		return $author$project$Pages$Dashboard$hasAnalysisInProgress(students) ? A2($elm$time$Time$every, 5000, $author$project$Pages$Dashboard$PollProgress) : $elm$core$Platform$Sub$none;
	} else {
		return $elm$core$Platform$Sub$none;
	}
};
var $author$project$Main$subscriptions = function (model) {
	var _v0 = model.page;
	if (_v0.$ === 'DashboardPage') {
		var subModel = _v0.a;
		return A2(
			$elm$core$Platform$Sub$map,
			$author$project$Main$DashboardMsg,
			$author$project$Pages$Dashboard$subscriptions(subModel));
	} else {
		return $elm$core$Platform$Sub$none;
	}
};
var $author$project$Main$ForgotPasswordMsg = function (a) {
	return {$: 'ForgotPasswordMsg', a: a};
};
var $author$project$Main$LoginMsg = function (a) {
	return {$: 'LoginMsg', a: a};
};
var $author$project$Main$RegisterMsg = function (a) {
	return {$: 'RegisterMsg', a: a};
};
var $author$project$Main$ResetPasswordMsg = function (a) {
	return {$: 'ResetPasswordMsg', a: a};
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Main$clearToken = _Platform_outgoingPort(
	'clearToken',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$identifyUser = _Platform_outgoingPort(
	'identifyUser',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'email',
					$elm$json$Json$Encode$string($.email)),
					_Utils_Tuple2(
					'id',
					$elm$json$Json$Encode$string($.id))
				]));
	});
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $author$project$Main$saveCoach = _Platform_outgoingPort(
	'saveCoach',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'email',
					$elm$json$Json$Encode$string($.email)),
					_Utils_Tuple2(
					'id',
					$elm$json$Json$Encode$string($.id))
				]));
	});
var $author$project$Main$saveTimeRangeFilter = _Platform_outgoingPort('saveTimeRangeFilter', $elm$json$Json$Encode$string);
var $author$project$Main$saveToken = _Platform_outgoingPort('saveToken', $elm$json$Json$Encode$string);
var $author$project$Types$timeRangeFilterToString = function (filter) {
	if (filter.$ === 'Last7Days') {
		return '7days';
	} else {
		return '30days';
	}
};
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $author$project$Types$Failure = function (a) {
	return {$: 'Failure', a: a};
};
var $author$project$Pages$Dashboard$GotArchiveResult = function (a) {
	return {$: 'GotArchiveResult', a: a};
};
var $author$project$Pages$Dashboard$GotNewStudent = function (a) {
	return {$: 'GotNewStudent', a: a};
};
var $author$project$Pages$Dashboard$GotResendResult = function (a) {
	return {$: 'GotResendResult', a: a};
};
var $author$project$Pages$Dashboard$ResendError = function (a) {
	return {$: 'ResendError', a: a};
};
var $author$project$Pages$Dashboard$ResendSending = {$: 'ResendSending'};
var $author$project$Pages$Dashboard$ResendSuccess = {$: 'ResendSuccess'};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $author$project$Api$patch = function (config) {
	return $elm$http$Http$request(
		{
			body: $elm$http$Http$jsonBody(config.body),
			expect: A2($elm$http$Http$expectJson, config.onResponse, config.decoder),
			headers: $author$project$Api$authHeader(
				$elm$core$Maybe$Just(config.token)),
			method: 'PATCH',
			timeout: $elm$core$Maybe$Nothing,
			tracker: $elm$core$Maybe$Nothing,
			url: $author$project$Api$unwrap(config.endpoint)
		});
};
var $author$project$Api$Students$archiveStudent = function (config) {
	return $author$project$Api$patch(
		{
			body: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'archived',
						$elm$json$Json$Encode$bool(config.archived))
					])),
			decoder: $author$project$Types$studentDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'students', config.studentId, 'archive'])),
			onResponse: config.onResponse,
			token: config.token
		});
};
var $author$project$Api$post = function (config) {
	return $elm$http$Http$request(
		{
			body: $elm$http$Http$jsonBody(config.body),
			expect: A2($elm$http$Http$expectJson, config.onResponse, config.decoder),
			headers: $author$project$Api$authHeader(config.token),
			method: 'POST',
			timeout: $elm$core$Maybe$Nothing,
			tracker: $elm$core$Maybe$Nothing,
			url: $author$project$Api$unwrap(config.endpoint)
		});
};
var $author$project$Api$Students$createStudent = function (config) {
	return $author$project$Api$post(
		{
			body: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'chess_com_username',
						$elm$json$Json$Encode$string(config.chessComUsername))
					])),
			decoder: $author$project$Types$studentDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'students'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Pages$Dashboard$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			return 'Invalid URL';
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error';
		case 'BadStatus':
			var status = error.a;
			return 'Server error (status ' + ($elm$core$String$fromInt(status) + ')');
		default:
			var message = error.a;
			return 'Error: ' + message;
	}
};
var $elm$core$Basics$not = _Basics_not;
var $author$project$Api$Email$MessageResponse = function (message) {
	return {message: message};
};
var $author$project$Api$Email$messageResponseDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Api$Email$MessageResponse,
	A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string));
var $author$project$Api$Email$resendVerification = function (config) {
	return $author$project$Api$post(
		{
			body: $elm$json$Json$Encode$null,
			decoder: $author$project$Api$Email$messageResponseDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'auth', 'resend-verification'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $author$project$Pages$Dashboard$update = F4(
	function (apiUrl, token, msg, model) {
		switch (msg.$) {
			case 'GotStudents':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var students = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								students: $author$project$Types$Success(students)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								students: $author$project$Types$Failure(
									$author$project$Pages$Dashboard$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotUserInfo':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var info = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								userInfo: $author$project$Types$Success(info)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								userInfo: $author$project$Types$Failure(
									$author$project$Pages$Dashboard$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'SetTimeRangeFilter':
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{students: $author$project$Types$Loading, timeRangeFilter: filter});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$Dashboard$fetchStudents(newModel));
			case 'ShowAddModal':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{addError: $elm$core$Maybe$Nothing, newStudentChessCom: '', showAddModal: true}),
					$elm$core$Platform$Cmd$none);
			case 'HideAddModal':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{showAddModal: false}),
					$elm$core$Platform$Cmd$none);
			case 'NewStudentChessComChanged':
				var username = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{addError: $elm$core$Maybe$Nothing, newStudentChessCom: username}),
					$elm$core$Platform$Cmd$none);
			case 'SubmitNewStudent':
				var config = msg.a;
				return $elm$core$String$isEmpty(model.newStudentChessCom) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							addError: $elm$core$Maybe$Just('Please enter a Chess.com username')
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{addError: $elm$core$Maybe$Nothing, isAdding: true}),
					$author$project$Api$Students$createStudent(
						{apiUrl: config.apiUrl, chessComUsername: model.newStudentChessCom, onResponse: $author$project$Pages$Dashboard$GotNewStudent, token: config.token}));
			case 'GotNewStudent':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var newStudent = result.a;
					var updatedUserInfo = function () {
						var _v5 = model.userInfo;
						if (_v5.$ === 'Success') {
							var info = _v5.a;
							var newCount = info.studentCount + 1;
							var newIsAtLimit = function () {
								var _v6 = info.plan;
								if (_v6.$ === 'Just') {
									var plan = _v6.a;
									return _Utils_cmp(newCount, plan.studentLimit) > -1;
								} else {
									return false;
								}
							}();
							return $author$project$Types$Success(
								_Utils_update(
									info,
									{isAtLimit: newIsAtLimit, studentCount: newCount}));
						} else {
							var other = _v5;
							return other;
						}
					}();
					var updatedStudents = function () {
						var _v4 = model.students;
						if (_v4.$ === 'Success') {
							var students = _v4.a;
							return $author$project$Types$Success(
								A2($elm$core$List$cons, newStudent, students));
						} else {
							return $author$project$Types$Success(
								_List_fromArray(
									[newStudent]));
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isAdding: false, newStudentChessCom: '', showAddModal: false, students: updatedStudents, userInfo: updatedUserInfo}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								addError: $elm$core$Maybe$Just(
									$author$project$Pages$Dashboard$httpErrorToString(error)),
								isAdding: false
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'PollProgress':
				return _Utils_Tuple2(
					model,
					$author$project$Pages$Dashboard$fetchStudents(model));
			case 'ToggleShowArchived':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{showArchived: !model.showArchived}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleStudentMenu':
				var studentId = msg.a;
				return _Utils_eq(
					model.openMenuStudentId,
					$elm$core$Maybe$Just(studentId)) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{openMenuStudentId: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							openMenuStudentId: $elm$core$Maybe$Just(studentId)
						}),
					$elm$core$Platform$Cmd$none);
			case 'CloseStudentMenu':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{openMenuStudentId: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'ArchiveStudent':
				var studentId = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							archivingStudentId: $elm$core$Maybe$Just(studentId),
							openMenuStudentId: $elm$core$Maybe$Nothing
						}),
					$author$project$Api$Students$archiveStudent(
						{apiUrl: apiUrl, archived: true, onResponse: $author$project$Pages$Dashboard$GotArchiveResult, studentId: studentId, token: token}));
			case 'UnarchiveStudent':
				var studentId = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							archivingStudentId: $elm$core$Maybe$Just(studentId),
							openMenuStudentId: $elm$core$Maybe$Nothing
						}),
					$author$project$Api$Students$archiveStudent(
						{apiUrl: apiUrl, archived: false, onResponse: $author$project$Pages$Dashboard$GotArchiveResult, studentId: studentId, token: token}));
			case 'GotArchiveResult':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var updatedStudent = result.a;
					var wasArchived = function () {
						var _v11 = model.students;
						if (_v11.$ === 'Success') {
							var students = _v11.a;
							return A2(
								$elm$core$List$any,
								function (s) {
									return _Utils_eq(s.id, updatedStudent.id) && (!_Utils_eq(s.archivedAt, $elm$core$Maybe$Nothing));
								},
								students);
						} else {
							return false;
						}
					}();
					var updatedStudents = function () {
						var _v10 = model.students;
						if (_v10.$ === 'Success') {
							var students = _v10.a;
							return $author$project$Types$Success(
								A2(
									$elm$core$List$map,
									function (s) {
										return _Utils_eq(s.id, updatedStudent.id) ? updatedStudent : s;
									},
									students));
						} else {
							return model.students;
						}
					}();
					var isNowArchived = !_Utils_eq(updatedStudent.archivedAt, $elm$core$Maybe$Nothing);
					var updatedUserInfo = function () {
						var _v8 = model.userInfo;
						if (_v8.$ === 'Success') {
							var info = _v8.a;
							var countDelta = (wasArchived && (!isNowArchived)) ? 1 : (((!wasArchived) && isNowArchived) ? (-1) : 0);
							var newCount = info.studentCount + countDelta;
							var newIsAtLimit = function () {
								var _v9 = info.plan;
								if (_v9.$ === 'Just') {
									var plan = _v9.a;
									return _Utils_cmp(newCount, plan.studentLimit) > -1;
								} else {
									return false;
								}
							}();
							return $author$project$Types$Success(
								_Utils_update(
									info,
									{isAtLimit: newIsAtLimit, studentCount: newCount}));
						} else {
							var other = _v8;
							return other;
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{archivingStudentId: $elm$core$Maybe$Nothing, students: updatedStudents, userInfo: updatedUserInfo}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{archivingStudentId: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none);
				}
			case 'ResendVerificationEmail':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{resendStatus: $author$project$Pages$Dashboard$ResendSending}),
					$author$project$Api$Email$resendVerification(
						{apiUrl: apiUrl, onResponse: $author$project$Pages$Dashboard$GotResendResult, token: token}));
			case 'GotResendResult':
				var result = msg.a;
				if (result.$ === 'Ok') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{resendStatus: $author$project$Pages$Dashboard$ResendSuccess}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								resendStatus: $author$project$Pages$Dashboard$ResendError(
									$author$project$Pages$Dashboard$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$EmailPreferences$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			return 'Invalid URL';
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error - please check your connection';
		case 'BadStatus':
			var status = error.a;
			return 'Server error (status ' + ($elm$core$String$fromInt(status) + ')');
		default:
			var message = error.a;
			return 'Error parsing response: ' + message;
	}
};
var $author$project$Pages$EmailPreferences$GotSaveResponse = function (a) {
	return {$: 'GotSaveResponse', a: a};
};
var $author$project$Api$put = function (config) {
	return $elm$http$Http$request(
		{
			body: $elm$http$Http$jsonBody(config.body),
			expect: A2($elm$http$Http$expectJson, config.onResponse, config.decoder),
			headers: $author$project$Api$authHeader(config.token),
			method: 'PUT',
			timeout: $elm$core$Maybe$Nothing,
			tracker: $elm$core$Maybe$Nothing,
			url: $author$project$Api$unwrap(config.endpoint)
		});
};
var $author$project$Api$Email$updatePreferences = function (config) {
	return $author$project$Api$put(
		{
			body: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'analysis_complete_notifications',
						$elm$json$Json$Encode$bool(config.preferences.analysisCompleteNotifications)),
						_Utils_Tuple2(
						'weekly_summary',
						$elm$json$Json$Encode$bool(config.preferences.weeklySummary)),
						_Utils_Tuple2(
						'marketing_emails',
						$elm$json$Json$Encode$bool(config.preferences.marketingEmails))
					])),
			decoder: $author$project$Api$Email$emailPreferencesDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'email-preferences'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $author$project$Pages$EmailPreferences$savePreferences = F3(
	function (apiUrl, token, prefs) {
		return $author$project$Api$Email$updatePreferences(
			{apiUrl: apiUrl, onResponse: $author$project$Pages$EmailPreferences$GotSaveResponse, preferences: prefs, token: token});
	});
var $author$project$Pages$EmailPreferences$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'GotPreferences':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var prefs = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Nothing,
								isLoading: false,
								preferences: $elm$core$Maybe$Just(prefs)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Just(
									$author$project$Pages$EmailPreferences$httpErrorToString(error)),
								isLoading: false
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'ToggleAnalysisComplete':
				var value = msg.a;
				var _v2 = model.preferences;
				if (_v2.$ === 'Just') {
					var prefs = _v2.a;
					var newPrefs = _Utils_update(
						prefs,
						{analysisCompleteNotifications: value});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								isSaving: true,
								preferences: $elm$core$Maybe$Just(newPrefs),
								saveSuccess: false
							}),
						A3($author$project$Pages$EmailPreferences$savePreferences, model.apiUrl, model.token, newPrefs));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'ToggleWeeklySummary':
				var value = msg.a;
				var _v3 = model.preferences;
				if (_v3.$ === 'Just') {
					var prefs = _v3.a;
					var newPrefs = _Utils_update(
						prefs,
						{weeklySummary: value});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								isSaving: true,
								preferences: $elm$core$Maybe$Just(newPrefs),
								saveSuccess: false
							}),
						A3($author$project$Pages$EmailPreferences$savePreferences, model.apiUrl, model.token, newPrefs));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'ToggleMarketing':
				var value = msg.a;
				var _v4 = model.preferences;
				if (_v4.$ === 'Just') {
					var prefs = _v4.a;
					var newPrefs = _Utils_update(
						prefs,
						{marketingEmails: value});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								isSaving: true,
								preferences: $elm$core$Maybe$Just(newPrefs),
								saveSuccess: false
							}),
						A3($author$project$Pages$EmailPreferences$savePreferences, model.apiUrl, model.token, newPrefs));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			default:
				var result = msg.a;
				if (result.$ === 'Ok') {
					var prefs = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Nothing,
								isSaving: false,
								preferences: $elm$core$Maybe$Just(prefs),
								saveSuccess: true
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Just(
									$author$project$Pages$EmailPreferences$httpErrorToString(error)),
								isSaving: false
							}),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Pages$ForgotPassword$GotResponse = function (a) {
	return {$: 'GotResponse', a: a};
};
var $author$project$Api$Email$forgotPassword = function (config) {
	return $author$project$Api$post(
		{
			body: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'email',
						$elm$json$Json$Encode$string(config.email))
					])),
			decoder: $author$project$Api$Email$messageResponseDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'auth', 'forgot-password'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Nothing
		});
};
var $author$project$Pages$ForgotPassword$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			return 'Invalid URL';
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error - please check your connection';
		case 'BadStatus':
			var status = error.a;
			return (status === 400) ? 'Invalid request - please check your input' : ((status === 429) ? 'Too many requests. Please try again later.' : ('Server error (status ' + ($elm$core$String$fromInt(status) + ')')));
		default:
			var message = error.a;
			return 'Error parsing response: ' + message;
	}
};
var $author$project$Pages$ForgotPassword$update = F3(
	function (apiUrl, msg, model) {
		switch (msg.$) {
			case 'EmailChanged':
				var email = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{email: email, error: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'SubmitForm':
				return $elm$core$String$isEmpty(model.email) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							error: $elm$core$Maybe$Just('Please enter your email address')
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{error: $elm$core$Maybe$Nothing, isLoading: true, success: $elm$core$Maybe$Nothing}),
					$author$project$Api$Email$forgotPassword(
						{apiUrl: apiUrl, email: model.email, onResponse: $author$project$Pages$ForgotPassword$GotResponse}));
			default:
				var result = msg.a;
				if (result.$ === 'Ok') {
					var response = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Nothing,
								isLoading: false,
								success: $elm$core$Maybe$Just(response.message)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Just(
									$author$project$Pages$ForgotPassword$httpErrorToString(error)),
								isLoading: false
							}),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Pages$GameDetail$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			return 'Invalid URL';
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error';
		case 'BadStatus':
			var status = error.a;
			return (status === 404) ? 'Game not found' : ('Server error (status ' + ($elm$core$String$fromInt(status) + ')'));
		default:
			var message = error.a;
			return 'Error: ' + message;
	}
};
var $author$project$Pages$GameDetail$update = F2(
	function (msg, model) {
		var result = msg.a;
		if (result.$ === 'Ok') {
			var detail = result.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						gameDetail: $author$project$Types$Success(detail)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var error = result.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						gameDetail: $author$project$Types$Failure(
							$author$project$Pages$GameDetail$httpErrorToString(error))
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$Login$GotLoginResponse = function (a) {
	return {$: 'GotLoginResponse', a: a};
};
var $author$project$Pages$Login$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			return 'Invalid URL';
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error - please check your connection';
		case 'BadStatus':
			var status = error.a;
			return (status === 401) ? 'Invalid email or password' : ((status === 400) ? 'Invalid request - please check your input' : ('Server error (status ' + ($elm$core$String$fromInt(status) + ')')));
		default:
			var message = error.a;
			return 'Error parsing response: ' + message;
	}
};
var $author$project$Api$Auth$AuthResponse = F2(
	function (token, coach) {
		return {coach: coach, token: token};
	});
var $author$project$Types$CoachWithSubscription = F4(
	function (id, email, createdAt, subscription) {
		return {createdAt: createdAt, email: email, id: id, subscription: subscription};
	});
var $author$project$Types$coachWithSubscriptionDecoder = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'subscription',
	$elm$json$Json$Decode$nullable($author$project$Types$userInfoDecoder),
	$elm$core$Maybe$Nothing,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'created_at',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'email',
			$elm$json$Json$Decode$string,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'id',
				$elm$json$Json$Decode$string,
				$elm$json$Json$Decode$succeed($author$project$Types$CoachWithSubscription)))));
var $author$project$Api$Auth$authResponseDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Api$Auth$AuthResponse,
	A2($elm$json$Json$Decode$field, 'token', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'coach', $author$project$Types$coachWithSubscriptionDecoder));
var $author$project$Api$Auth$login = function (config) {
	return $author$project$Api$post(
		{
			body: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'email',
						$elm$json$Json$Encode$string(config.email)),
						_Utils_Tuple2(
						'password',
						$elm$json$Json$Encode$string(config.password))
					])),
			decoder: $author$project$Api$Auth$authResponseDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'auth', 'login'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Nothing
		});
};
var $author$project$Pages$Login$update = F3(
	function (apiUrl, msg, model) {
		switch (msg.$) {
			case 'EmailChanged':
				var email = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{email: email, error: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 'PasswordChanged':
				var password = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{error: $elm$core$Maybe$Nothing, password: password}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 'SubmitForm':
				return ($elm$core$String$isEmpty(model.email) || $elm$core$String$isEmpty(model.password)) ? _Utils_Tuple3(
					_Utils_update(
						model,
						{
							error: $elm$core$Maybe$Just('Please fill in all fields')
						}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing) : _Utils_Tuple3(
					_Utils_update(
						model,
						{error: $elm$core$Maybe$Nothing, isLoading: true}),
					$author$project$Api$Auth$login(
						{apiUrl: apiUrl, email: model.email, onResponse: $author$project$Pages$Login$GotLoginResponse, password: model.password}),
					$elm$core$Maybe$Nothing);
			default:
				var result = msg.a;
				if (result.$ === 'Ok') {
					var authResponse = result.a;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{isLoading: false}),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Just(authResponse));
				} else {
					var error = result.a;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Just(
									$author$project$Pages$Login$httpErrorToString(error)),
								isLoading: false
							}),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Nothing);
				}
		}
	});
var $author$project$Pages$Register$GotRegisterResponse = function (a) {
	return {$: 'GotRegisterResponse', a: a};
};
var $author$project$Pages$Register$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			return 'Invalid URL';
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error - please check your connection';
		case 'BadStatus':
			var status = error.a;
			return (status === 409) ? 'An account with this email already exists' : ((status === 400) ? 'Invalid email format or password too short' : ('Server error (status ' + ($elm$core$String$fromInt(status) + ')')));
		default:
			var message = error.a;
			return 'Error parsing response: ' + message;
	}
};
var $author$project$Api$Auth$register = function (config) {
	return $author$project$Api$post(
		{
			body: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'email',
						$elm$json$Json$Encode$string(config.email)),
						_Utils_Tuple2(
						'password',
						$elm$json$Json$Encode$string(config.password))
					])),
			decoder: $author$project$Api$Auth$authResponseDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'auth', 'register'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Nothing
		});
};
var $author$project$Pages$Register$update = F3(
	function (apiUrl, msg, model) {
		switch (msg.$) {
			case 'EmailChanged':
				var email = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{email: email, error: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 'PasswordChanged':
				var password = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{error: $elm$core$Maybe$Nothing, password: password}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 'ConfirmPasswordChanged':
				var confirmPassword = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{confirmPassword: confirmPassword, error: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 'SubmitForm':
				return ($elm$core$String$isEmpty(model.email) || $elm$core$String$isEmpty(model.password)) ? _Utils_Tuple3(
					_Utils_update(
						model,
						{
							error: $elm$core$Maybe$Just('Please fill in all fields')
						}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing) : (($elm$core$String$length(model.password) < 8) ? _Utils_Tuple3(
					_Utils_update(
						model,
						{
							error: $elm$core$Maybe$Just('Password must be at least 8 characters')
						}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing) : ((!_Utils_eq(model.password, model.confirmPassword)) ? _Utils_Tuple3(
					_Utils_update(
						model,
						{
							error: $elm$core$Maybe$Just('Passwords do not match')
						}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing) : _Utils_Tuple3(
					_Utils_update(
						model,
						{error: $elm$core$Maybe$Nothing, isLoading: true}),
					$author$project$Api$Auth$register(
						{apiUrl: apiUrl, email: model.email, onResponse: $author$project$Pages$Register$GotRegisterResponse, password: model.password}),
					$elm$core$Maybe$Nothing)));
			default:
				var result = msg.a;
				if (result.$ === 'Ok') {
					var authResponse = result.a;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{isLoading: false}),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Just(authResponse));
				} else {
					var error = result.a;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Just(
									$author$project$Pages$Register$httpErrorToString(error)),
								isLoading: false
							}),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Nothing);
				}
		}
	});
var $author$project$Pages$ResetPassword$GotResponse = function (a) {
	return {$: 'GotResponse', a: a};
};
var $author$project$Pages$ResetPassword$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			return 'Invalid URL';
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error - please check your connection';
		case 'BadStatus':
			var status = error.a;
			return (status === 400) ? 'Invalid or expired reset link. Please request a new one.' : ('Server error (status ' + ($elm$core$String$fromInt(status) + ')'));
		default:
			var message = error.a;
			return 'Error parsing response: ' + message;
	}
};
var $author$project$Api$Email$resetPassword = function (config) {
	return $author$project$Api$post(
		{
			body: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'token',
						$elm$json$Json$Encode$string(config.token)),
						_Utils_Tuple2(
						'password',
						$elm$json$Json$Encode$string(config.password))
					])),
			decoder: $author$project$Api$Email$messageResponseDecoder,
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'auth', 'reset-password'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Nothing
		});
};
var $author$project$Pages$ResetPassword$update = F3(
	function (apiUrl, msg, model) {
		switch (msg.$) {
			case 'PasswordChanged':
				var password = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{error: $elm$core$Maybe$Nothing, password: password}),
					$elm$core$Platform$Cmd$none);
			case 'ConfirmPasswordChanged':
				var confirmPassword = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{confirmPassword: confirmPassword, error: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'SubmitForm':
				return $elm$core$String$isEmpty(model.password) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							error: $elm$core$Maybe$Just('Please enter a new password')
						}),
					$elm$core$Platform$Cmd$none) : (($elm$core$String$length(model.password) < 8) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							error: $elm$core$Maybe$Just('Password must be at least 8 characters')
						}),
					$elm$core$Platform$Cmd$none) : ((!_Utils_eq(model.password, model.confirmPassword)) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							error: $elm$core$Maybe$Just('Passwords do not match')
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{error: $elm$core$Maybe$Nothing, isLoading: true}),
					$author$project$Api$Email$resetPassword(
						{apiUrl: apiUrl, onResponse: $author$project$Pages$ResetPassword$GotResponse, password: model.password, token: model.token}))));
			default:
				var result = msg.a;
				if (result.$ === 'Ok') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{error: $elm$core$Maybe$Nothing, isLoading: false, success: true}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Just(
									$author$project$Pages$ResetPassword$httpErrorToString(error)),
								isLoading: false
							}),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Pages$StudentDetail$GotArchiveResult = function (a) {
	return {$: 'GotArchiveResult', a: a};
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Pages$StudentDetail$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			return 'Invalid URL';
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error';
		case 'BadStatus':
			var status = error.a;
			return 'Server error (status ' + ($elm$core$String$fromInt(status) + ')');
		default:
			var message = error.a;
			return 'Error: ' + message;
	}
};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$remove, key, dict));
	});
var $author$project$Pages$StudentDetail$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'GotStudent':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var student = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								student: $author$project$Types$Success(student)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								student: $author$project$Types$Failure(
									$author$project$Pages$StudentDetail$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotGames':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var gamesData = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								games: $author$project$Types$Success(gamesData)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								games: $author$project$Types$Failure(
									$author$project$Pages$StudentDetail$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotTags':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var tagsData = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								tags: $author$project$Types$Success(tagsData)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								tags: $author$project$Types$Failure(
									$author$project$Pages$StudentDetail$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'SetTimeRangeFilter':
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, offset: 0, student: $author$project$Types$Loading, tags: $author$project$Types$Loading, timeRangeFilter: filter});
				return _Utils_Tuple2(
					newModel,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$author$project$Pages$StudentDetail$fetchStudent(newModel),
								$author$project$Pages$StudentDetail$fetchFilteredGames(newModel),
								$author$project$Pages$StudentDetail$fetchTags(newModel)
							])));
			case 'SetTimeControlFilter':
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, offset: 0, timeControlFilter: filter});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'SetResultFilter':
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, offset: 0, resultFilter: filter});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'SetColorFilter':
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{colorFilter: filter, games: $author$project$Types$Loading, offset: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'ToggleTag':
				var tagSlug = msg.a;
				var newTags = A2($elm$core$List$member, tagSlug, model.selectedTags) ? A2(
					$elm$core$List$filter,
					function (t) {
						return !_Utils_eq(t, tagSlug);
					},
					model.selectedTags) : A2($elm$core$List$cons, tagSlug, model.selectedTags);
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, offset: 0, selectedTags: newTags});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'ClearTags':
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, offset: 0, selectedTags: _List_Nil});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'SetMinAccuracy':
				var str = msg.a;
				var newModel = _Utils_update(
					model,
					{
						games: $author$project$Types$Loading,
						minAccuracy: $elm$core$String$toInt(str),
						offset: 0
					});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'SetMaxAccuracy':
				var str = msg.a;
				var newModel = _Utils_update(
					model,
					{
						games: $author$project$Types$Loading,
						maxAccuracy: $elm$core$String$toInt(str),
						offset: 0
					});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'ClearAccuracy':
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, maxAccuracy: $elm$core$Maybe$Nothing, minAccuracy: $elm$core$Maybe$Nothing, offset: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'SetMaxBlunders':
				var str = msg.a;
				var newModel = _Utils_update(
					model,
					{
						games: $author$project$Types$Loading,
						maxBlunders: $elm$core$String$toInt(str),
						offset: 0
					});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'ClearBlunders':
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, maxBlunders: $elm$core$Maybe$Nothing, offset: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'SetOpponentRatingFilter':
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, offset: 0, opponentRatingFilter: filter});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'SetOpponentSearch':
				var searchStr = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{opponentSearch: searchStr}),
					$elm$core$Platform$Cmd$none);
			case 'SetSortOrder':
				var order = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sortOrder: order}),
					$elm$core$Platform$Cmd$none);
			case 'ClearAllFilters':
				var newModel = _Utils_update(
					model,
					{colorFilter: $author$project$Types$AllColors, games: $author$project$Types$Loading, maxAccuracy: $elm$core$Maybe$Nothing, maxBlunders: $elm$core$Maybe$Nothing, minAccuracy: $elm$core$Maybe$Nothing, offset: 0, opponentRatingFilter: 'all', opponentSearch: '', resultFilter: $author$project$Types$AllResults, selectedTags: _List_Nil, sortOrder: $author$project$Pages$StudentDetail$DateNewest, timeControlFilter: $author$project$Types$AllTimeControls});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'ToggleGameExpanded':
				var gameId = msg.a;
				var newExpanded = A2($elm$core$Set$member, gameId, model.expandedGames) ? A2($elm$core$Set$remove, gameId, model.expandedGames) : A2($elm$core$Set$insert, gameId, model.expandedGames);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{expandedGames: newExpanded}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleFilterSection':
				var section = msg.a;
				var newSections = A2($elm$core$Set$member, section, model.expandedFilterSections) ? A2($elm$core$Set$remove, section, model.expandedFilterSections) : A2($elm$core$Set$insert, section, model.expandedFilterSections);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{expandedFilterSections: newSections}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleSidebar':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sidebarVisible: !model.sidebarVisible}),
					$elm$core$Platform$Cmd$none);
			case 'LoadMore':
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, offset: model.offset + model.limit});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'GoToPage':
				var page = msg.a;
				var newModel = _Utils_update(
					model,
					{games: $author$project$Types$Loading, offset: page * model.limit});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 'HoverGame':
				var maybeId = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{hoveredGameId: maybeId}),
					$elm$core$Platform$Cmd$none);
			case 'ArchiveStudent':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{archivingStudent: true}),
					$author$project$Api$Students$archiveStudent(
						{apiUrl: model.apiUrl, archived: true, onResponse: $author$project$Pages$StudentDetail$GotArchiveResult, studentId: model.studentId, token: model.token}));
			case 'UnarchiveStudent':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{archivingStudent: true}),
					$author$project$Api$Students$archiveStudent(
						{apiUrl: model.apiUrl, archived: false, onResponse: $author$project$Pages$StudentDetail$GotArchiveResult, studentId: model.studentId, token: model.token}));
			default:
				var result = msg.a;
				if (result.$ === 'Ok') {
					var updatedStudent = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								archivingStudent: false,
								student: $author$project$Types$Success(updatedStudent)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{archivingStudent: false}),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Pages$Subscription$GotPortalUrl = function (a) {
	return {$: 'GotPortalUrl', a: a};
};
var $author$project$Api$Subscription$createBillingPortalSession = function (config) {
	return $author$project$Api$post(
		{
			body: $elm$json$Json$Encode$object(_List_Nil),
			decoder: A2($elm$json$Json$Decode$field, 'portal_url', $elm$json$Json$Decode$string),
			endpoint: A2(
				$author$project$Api$url,
				config.apiUrl,
				_List_fromArray(
					['api', 'subscription', 'portal'])),
			onResponse: config.onResponse,
			token: $elm$core$Maybe$Just(config.token)
		});
};
var $author$project$Pages$Subscription$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			var url = error.a;
			return 'Bad URL: ' + url;
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error';
		case 'BadStatus':
			var status = error.a;
			return 'Server error: ' + $elm$core$String$fromInt(status);
		default:
			var body = error.a;
			return 'Invalid response: ' + body;
	}
};
var $author$project$Pages$Subscription$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'GotUserInfo':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var userInfo = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								subscription: $author$project$Types$Success(userInfo)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								subscription: $author$project$Types$Failure(
									$author$project$Pages$Subscription$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotPlans':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var plansList = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								plans: $author$project$Types$Success(plansList)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								plans: $author$project$Types$Failure(
									$author$project$Pages$Subscription$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'OpenBillingPortal':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{error: $elm$core$Maybe$Nothing, isLoading: true}),
					$author$project$Api$Subscription$createBillingPortalSession(
						{apiUrl: model.apiUrl, onResponse: $author$project$Pages$Subscription$GotPortalUrl, token: model.token}));
			case 'GotPortalUrl':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var url = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isLoading: false}),
						$elm$browser$Browser$Navigation$load(url));
				} else {
					var err = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: $elm$core$Maybe$Just(
									$author$project$Pages$Subscription$httpErrorToString(err)),
								isLoading: false
							}),
						$elm$core$Platform$Cmd$none);
				}
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{error: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$VerifyEmail$Failed = function (a) {
	return {$: 'Failed', a: a};
};
var $author$project$Pages$VerifyEmail$Verified = {$: 'Verified'};
var $author$project$Pages$VerifyEmail$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			return 'Invalid URL';
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error - please check your connection';
		case 'BadStatus':
			var status = error.a;
			return (status === 400) ? 'Invalid or expired verification link.' : ('Server error (status ' + ($elm$core$String$fromInt(status) + ')'));
		default:
			var message = error.a;
			return 'Error parsing response: ' + message;
	}
};
var $author$project$Pages$VerifyEmail$update = F2(
	function (msg, model) {
		var result = msg.a;
		if (result.$ === 'Ok') {
			var response = result.a;
			return response.verified ? _Utils_Tuple2(
				_Utils_update(
					model,
					{status: $author$project$Pages$VerifyEmail$Verified}),
				$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
				_Utils_update(
					model,
					{
						status: $author$project$Pages$VerifyEmail$Failed(response.message)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var error = result.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						status: $author$project$Pages$VerifyEmail$Failed(
							$author$project$Pages$VerifyEmail$httpErrorToString(error))
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		var _v0 = _Utils_Tuple2(msg, model.page);
		_v0$15:
		while (true) {
			switch (_v0.a.$) {
				case 'UrlRequested':
					var urlRequest = _v0.a.a;
					if (urlRequest.$ === 'Internal') {
						var url = urlRequest.a;
						return _Utils_Tuple2(
							model,
							A2(
								$elm$browser$Browser$Navigation$pushUrl,
								model.key,
								$elm$url$Url$toString(url)));
					} else {
						var href = urlRequest.a;
						return _Utils_Tuple2(
							model,
							$elm$browser$Browser$Navigation$load(href));
					}
				case 'UrlChanged':
					var url = _v0.a.a;
					return A2(
						$author$project$Main$changeRouteTo,
						$author$project$Route$fromUrl(url),
						model);
				case 'LoginMsg':
					if (_v0.b.$ === 'LoginPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v2 = A3($author$project$Pages$Login$update, model.apiUrl, subMsg, subModel);
						var newSubModel = _v2.a;
						var subCmd = _v2.b;
						var maybeAuth = _v2.c;
						if (maybeAuth.$ === 'Just') {
							var token = maybeAuth.a.token;
							var coach = maybeAuth.a.coach;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										session: A2($author$project$Main$LoggedIn, token, coach)
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											$author$project$Main$saveToken(token),
											$author$project$Main$saveCoach(
											{email: coach.email, id: coach.id}),
											$author$project$Main$identifyUser(
											{email: coach.email, id: coach.id}),
											A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Dashboard)
										])));
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										page: $author$project$Main$LoginPage(newSubModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$LoginMsg, subCmd));
						}
					} else {
						break _v0$15;
					}
				case 'RegisterMsg':
					if (_v0.b.$ === 'RegisterPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v4 = A3($author$project$Pages$Register$update, model.apiUrl, subMsg, subModel);
						var newSubModel = _v4.a;
						var subCmd = _v4.b;
						var maybeAuth = _v4.c;
						if (maybeAuth.$ === 'Just') {
							var token = maybeAuth.a.token;
							var coach = maybeAuth.a.coach;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										session: A2($author$project$Main$LoggedIn, token, coach)
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											$author$project$Main$saveToken(token),
											$author$project$Main$saveCoach(
											{email: coach.email, id: coach.id}),
											$author$project$Main$identifyUser(
											{email: coach.email, id: coach.id}),
											A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Dashboard)
										])));
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										page: $author$project$Main$RegisterPage(newSubModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$RegisterMsg, subCmd));
						}
					} else {
						break _v0$15;
					}
				case 'DashboardMsg':
					if (_v0.b.$ === 'DashboardPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v6 = model.session;
						if (_v6.$ === 'LoggedIn') {
							var token = _v6.a;
							var _v7 = A4($author$project$Pages$Dashboard$update, model.apiUrl, token, subMsg, subModel);
							var newSubModel = _v7.a;
							var subCmd = _v7.b;
							var _v8 = (!_Utils_eq(newSubModel.timeRangeFilter, model.timeRangeFilter)) ? _Utils_Tuple2(
								_Utils_update(
									model,
									{
										page: $author$project$Main$DashboardPage(newSubModel),
										timeRangeFilter: newSubModel.timeRangeFilter
									}),
								$author$project$Main$saveTimeRangeFilter(
									$author$project$Types$timeRangeFilterToString(newSubModel.timeRangeFilter))) : _Utils_Tuple2(
								_Utils_update(
									model,
									{
										page: $author$project$Main$DashboardPage(newSubModel)
									}),
								$elm$core$Platform$Cmd$none);
							var updatedModel = _v8.a;
							var extraCmd = _v8.b;
							return _Utils_Tuple2(
								updatedModel,
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2($elm$core$Platform$Cmd$map, $author$project$Main$DashboardMsg, subCmd),
											extraCmd
										])));
						} else {
							return _Utils_Tuple2(
								model,
								A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Login));
						}
					} else {
						break _v0$15;
					}
				case 'StudentDetailMsg':
					if (_v0.b.$ === 'StudentDetailPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v9 = A2($author$project$Pages$StudentDetail$update, subMsg, subModel);
						var newSubModel = _v9.a;
						var subCmd = _v9.b;
						var _v10 = (!_Utils_eq(newSubModel.timeRangeFilter, model.timeRangeFilter)) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									page: $author$project$Main$StudentDetailPage(newSubModel),
									timeRangeFilter: newSubModel.timeRangeFilter
								}),
							$author$project$Main$saveTimeRangeFilter(
								$author$project$Types$timeRangeFilterToString(newSubModel.timeRangeFilter))) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									page: $author$project$Main$StudentDetailPage(newSubModel)
								}),
							$elm$core$Platform$Cmd$none);
						var updatedModel = _v10.a;
						var extraCmd = _v10.b;
						return _Utils_Tuple2(
							updatedModel,
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A2($elm$core$Platform$Cmd$map, $author$project$Main$StudentDetailMsg, subCmd),
										extraCmd
									])));
					} else {
						break _v0$15;
					}
				case 'GameDetailMsg':
					if (_v0.b.$ === 'GameDetailPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v11 = A2($author$project$Pages$GameDetail$update, subMsg, subModel);
						var newSubModel = _v11.a;
						var subCmd = _v11.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									page: $author$project$Main$GameDetailPage(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$GameDetailMsg, subCmd));
					} else {
						break _v0$15;
					}
				case 'SubscriptionMsg':
					if (_v0.b.$ === 'SubscriptionPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v12 = A2($author$project$Pages$Subscription$update, subMsg, subModel);
						var newSubModel = _v12.a;
						var subCmd = _v12.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									page: $author$project$Main$SubscriptionPage(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$SubscriptionMsg, subCmd));
					} else {
						break _v0$15;
					}
				case 'ForgotPasswordMsg':
					if (_v0.b.$ === 'ForgotPasswordPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v13 = A3($author$project$Pages$ForgotPassword$update, model.apiUrl, subMsg, subModel);
						var newSubModel = _v13.a;
						var subCmd = _v13.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									page: $author$project$Main$ForgotPasswordPage(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForgotPasswordMsg, subCmd));
					} else {
						break _v0$15;
					}
				case 'ResetPasswordMsg':
					if (_v0.b.$ === 'ResetPasswordPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v14 = A3($author$project$Pages$ResetPassword$update, model.apiUrl, subMsg, subModel);
						var newSubModel = _v14.a;
						var subCmd = _v14.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									page: $author$project$Main$ResetPasswordPage(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ResetPasswordMsg, subCmd));
					} else {
						break _v0$15;
					}
				case 'VerifyEmailMsg':
					if (_v0.b.$ === 'VerifyEmailPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v15 = A2($author$project$Pages$VerifyEmail$update, subMsg, subModel);
						var newSubModel = _v15.a;
						var subCmd = _v15.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									page: $author$project$Main$VerifyEmailPage(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VerifyEmailMsg, subCmd));
					} else {
						break _v0$15;
					}
				case 'EmailPreferencesMsg':
					if (_v0.b.$ === 'EmailPreferencesPage') {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v16 = A2($author$project$Pages$EmailPreferences$update, subMsg, subModel);
						var newSubModel = _v16.a;
						var subCmd = _v16.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									page: $author$project$Main$EmailPreferencesPage(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$EmailPreferencesMsg, subCmd));
					} else {
						break _v0$15;
					}
				case 'GotUserInfo':
					var result = _v0.a.a;
					if (result.$ === 'Ok') {
						var userInfo = result.a;
						var _v18 = model.session;
						if (_v18.$ === 'LoggedIn') {
							var token = _v18.a;
							var coach = _v18.b;
							var updatedSession = A2(
								$author$project$Main$LoggedIn,
								token,
								_Utils_update(
									coach,
									{
										subscription: $elm$core$Maybe$Just(userInfo)
									}));
							var updatedPage = function () {
								var _v19 = model.page;
								if (_v19.$ === 'DashboardPage') {
									var dashModel = _v19.a;
									return $author$project$Main$DashboardPage(
										_Utils_update(
											dashModel,
											{
												userInfo: $author$project$Types$Success(userInfo)
											}));
								} else {
									var other = _v19;
									return other;
								}
							}();
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{page: updatedPage, session: updatedSession}),
								$elm$core$Platform$Cmd$none);
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 'Logout':
					var _v20 = _v0.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{session: $author$project$Main$Guest}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$clearToken(_Utils_Tuple0),
									A2($author$project$Route$replaceUrl, model.key, $author$project$Route$Login)
								])));
				default:
					var filter = _v0.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{timeRangeFilter: filter}),
						$author$project$Main$saveTimeRangeFilter(
							$author$project$Types$timeRangeFilterToString(filter)));
			}
		}
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Main$Logout = {$: 'Logout'};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$main_ = _VirtualDom_node('main');
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$header = _VirtualDom_node('header');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $author$project$Route$href = function (route) {
	return $elm$html$Html$Attributes$href(
		$author$project$Route$routeToString(route));
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$View$Layout$viewSubscriptionBadge = function (maybeUserInfo) {
	if (maybeUserInfo.$ === 'Just') {
		var userInfo = maybeUserInfo.a;
		var planName = A2(
			$elm$core$Maybe$withDefault,
			'Free',
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.displayName;
				},
				userInfo.plan));
		var _v1 = function () {
			var _v2 = userInfo.subscription.status;
			switch (_v2.$) {
				case 'Trialing':
					return _Utils_Tuple2('bg-blue-100 text-blue-700', 'Trial');
				case 'Active':
					return _Utils_Tuple2('bg-green-100 text-green-700', planName);
				case 'PastDue':
					return _Utils_Tuple2('bg-yellow-100 text-yellow-700', 'Payment Due');
				case 'Cancelled':
					return _Utils_Tuple2('bg-gray-100 text-gray-600', 'Cancelled');
				default:
					return _Utils_Tuple2('bg-red-100 text-red-700', 'Expired');
			}
		}();
		var badgeClass = _v1.a;
		var badgeText = _v1.b;
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('px-2 py-0.5 text-xs font-medium rounded-full ' + badgeClass)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(badgeText)
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$View$Layout$viewHeader = F2(
	function (coach, onLogout) {
		return A2(
			$elm$html$Html$header,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('bg-anthro-light/95 backdrop-blur-sm border-b border-anthro-gray-light sticky top-0 z-50')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('max-w-6xl mx-auto px-4 py-4 flex items-center justify-between')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$author$project$Route$href($author$project$Route$Dashboard),
									$elm$html$Html$Attributes$class('flex items-center gap-3 hover:opacity-80 transition')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('w-8 h-8 rounded grid grid-cols-2 grid-rows-2 overflow-hidden')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('bg-anthro-orange')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('bg-anthro-dark')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('bg-anthro-dark')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('bg-anthro-orange')
												]),
											_List_Nil)
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('font-semibold text-anthro-dark tracking-tight')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Insights64')
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center gap-4')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$author$project$Route$href($author$project$Route$Subscription),
											$elm$html$Html$Attributes$class('flex items-center gap-2 text-sm text-anthro-gray hover:text-anthro-dark transition-colors px-3 py-1.5 rounded-lg hover:bg-anthro-cream')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(coach.email),
											$author$project$View$Layout$viewSubscriptionBadge(coach.subscription)
										])),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(onLogout),
											$elm$html$Html$Attributes$class('text-sm text-anthro-gray hover:text-anthro-dark transition-colors px-3 py-1.5 rounded-lg hover:bg-anthro-cream')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Sign out')
										]))
								]))
						]))
				]));
	});
var $author$project$View$Layout$layout = function (config) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen bg-anthro-light')
			]),
		_List_fromArray(
			[
				A2($author$project$View$Layout$viewHeader, config.coach, config.onLogout),
				A2(
				$elm$html$Html$main_,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-6xl mx-auto px-4 py-8')
					]),
				_List_fromArray(
					[config.content]))
			]));
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $author$project$Pages$Dashboard$CloseStudentMenu = {$: 'CloseStudentMenu'};
var $author$project$Pages$Dashboard$ToggleShowArchived = {$: 'ToggleShowArchived'};
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Pages$Dashboard$HideAddModal = {$: 'HideAddModal'};
var $author$project$Pages$Dashboard$NewStudentChessComChanged = function (a) {
	return {$: 'NewStudentChessComChanged', a: a};
};
var $author$project$Pages$Dashboard$NoOp = {$: 'NoOp'};
var $author$project$Pages$Dashboard$SubmitNewStudent = function (a) {
	return {$: 'SubmitNewStudent', a: a};
};
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$html$Html$form = _VirtualDom_node('form');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$html$Html$Events$onSubmit = function (msg) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'submit',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysPreventDefault,
			$elm$json$Json$Decode$succeed(msg)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Pages$Dashboard$viewAddModal = F3(
	function (apiUrl, token, model) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'),
					$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$HideAddModal)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-white rounded-xl shadow-modal max-w-md w-full'),
							A2(
							$elm$html$Html$Events$stopPropagationOn,
							'click',
							$elm$json$Json$Decode$succeed(
								_Utils_Tuple2($author$project$Pages$Dashboard$NoOp, true)))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center justify-between p-5 border-b border-gray-100')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-lg font-semibold text-gray-900')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Add Student')
										])),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$HideAddModal),
											$elm$html$Html$Attributes$class('text-gray-400 hover:text-gray-600 p-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('✕')
										]))
								])),
							A2(
							$elm$html$Html$form,
							_List_fromArray(
								[
									$elm$html$Html$Events$onSubmit(
									$author$project$Pages$Dashboard$SubmitNewStudent(
										{apiUrl: apiUrl, token: token})),
									$elm$html$Html$Attributes$class('p-5')
								]),
							_List_fromArray(
								[
									function () {
									var _v0 = model.addError;
									if (_v0.$ === 'Just') {
										var errorMsg = _v0.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(errorMsg)
												]));
									} else {
										return $elm$html$Html$text('');
									}
								}(),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mb-4')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$label,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1.5')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Chess.com Username')
												])),
											A2(
											$elm$html$Html$input,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('text'),
													$elm$html$Html$Attributes$class('w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-shadow'),
													$elm$html$Html$Attributes$placeholder('Enter username'),
													$elm$html$Html$Attributes$value(model.newStudentChessCom),
													$elm$html$Html$Events$onInput($author$project$Pages$Dashboard$NewStudentChessComChanged),
													$elm$html$Html$Attributes$disabled(model.isAdding)
												]),
											_List_Nil)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mb-6 flex items-start gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-blue-500 flex-shrink-0')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('i')
												])),
											$elm$html$Html$text('Name and avatar will be fetched automatically from Chess.com')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex justify-end gap-3')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('button'),
													$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$HideAddModal),
													$elm$html$Html$Attributes$class('px-4 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors'),
													$elm$html$Html$Attributes$disabled(model.isAdding)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Cancel')
												])),
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('submit'),
													$elm$html$Html$Attributes$class('bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'),
													$elm$html$Html$Attributes$disabled(model.isAdding)
												]),
											_List_fromArray(
												[
													model.isAdding ? $elm$html$Html$text('Adding...') : $elm$html$Html$text('Add Student')
												]))
										]))
								]))
						]))
				]));
	});
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $author$project$Pages$Dashboard$AtLimit = {$: 'AtLimit'};
var $author$project$Pages$Dashboard$LimitUnknown = {$: 'LimitUnknown'};
var $author$project$Pages$Dashboard$UnderLimit = {$: 'UnderLimit'};
var $author$project$Pages$Dashboard$isAtStudentLimitFromUserInfo = function (userInfoRemote) {
	if (userInfoRemote.$ === 'Success') {
		var info = userInfoRemote.a;
		return info.isAtLimit ? $author$project$Pages$Dashboard$AtLimit : $author$project$Pages$Dashboard$UnderLimit;
	} else {
		return $author$project$Pages$Dashboard$LimitUnknown;
	}
};
var $author$project$Pages$Dashboard$pluralize = function (count) {
	return (count === 1) ? '' : 's';
};
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Pages$Dashboard$ShowAddModal = {$: 'ShowAddModal'};
var $author$project$Pages$Dashboard$viewAddStudentButton = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$ShowAddModal),
			$elm$html$Html$Attributes$class('bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-subtle hover:shadow-card flex items-center gap-2')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg leading-none')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('+')
				])),
			$elm$html$Html$text('Add Student')
		]));
var $author$project$Pages$Dashboard$ArchiveStudent = function (a) {
	return {$: 'ArchiveStudent', a: a};
};
var $author$project$Pages$Dashboard$ToggleStudentMenu = function (a) {
	return {$: 'ToggleStudentMenu', a: a};
};
var $author$project$Pages$Dashboard$UnarchiveStudent = function (a) {
	return {$: 'UnarchiveStudent', a: a};
};
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm$core$String$toUpper = _String_toUpper;
var $elm$core$String$words = _String_words;
var $author$project$Pages$Dashboard$getInitials = function (name) {
	return A2(
		$elm$core$String$join,
		'',
		A2(
			$elm$core$List$take,
			2,
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$String$left(1),
					$elm$core$String$toUpper),
				$elm$core$String$words(name))));
};
var $elm$core$Basics$round = _Basics_round;
var $author$project$Pages$Dashboard$getStudentAlerts = function (student) {
	var lowAccuracy = function () {
		var _v1 = student.stats.avgAccuracy;
		if (_v1.$ === 'Just') {
			var acc = _v1.a;
			return (acc < 50) ? _List_fromArray(
				[
					'Low average accuracy (' + ($elm$core$String$fromInt(
					$elm$core$Basics$round(acc)) + '%)')
				]) : _List_Nil;
		} else {
			return _List_Nil;
		}
	}();
	var losingRecord = function () {
		if (student.stats.gameCount > 5) {
			var _v0 = student.stats.winRate;
			if (_v0.$ === 'Just') {
				var rate = _v0.a;
				return (rate < 30) ? _List_fromArray(
					['Struggling with recent games']) : _List_Nil;
			} else {
				return _List_Nil;
			}
		} else {
			return _List_Nil;
		}
	}();
	var importAlert = _Utils_eq(student.lastImportedAt, $elm$core$Maybe$Nothing) ? _List_fromArray(
		['Games not imported yet']) : ((!student.stats.gameCount) ? _List_fromArray(
		['No games in selected period']) : _List_Nil);
	return _Utils_ap(
		importAlert,
		_Utils_ap(lowAccuracy, losingRecord));
};
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Pages$Dashboard$viewAlertRow = function (student) {
	var alerts = $author$project$Pages$Dashboard$getStudentAlerts(student);
	var _v0 = $elm$core$List$head(alerts);
	if (_v0.$ === 'Just') {
		var alert = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('!')
						])),
					$elm$html$Html$text(alert)
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Pages$Dashboard$viewStatCell = F3(
	function (value, label, maybeTrend) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center px-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-lg font-bold text-gray-900')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(value)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-xs text-gray-500 mt-0.5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						])),
					function () {
					if (maybeTrend.$ === 'Just') {
						var trend = maybeTrend.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									A2($elm$core$String$startsWith, '+', trend) ? 'text-xs text-green-600 font-medium mt-1' : (A2($elm$core$String$startsWith, '-', trend) ? 'text-xs text-red-600 font-medium mt-1' : 'text-xs text-gray-400 mt-1'))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(trend)
								]));
					} else {
						return $elm$html$Html$text('');
					}
				}()
				]));
	});
var $author$project$Pages$Dashboard$viewStudentCard = F2(
	function (model, student) {
		var noGamesInPeriod = (!_Utils_eq(student.lastImportedAt, $elm$core$Maybe$Nothing)) && (!student.stats.gameCount);
		var isMenuOpen = _Utils_eq(
			model.openMenuStudentId,
			$elm$core$Maybe$Just(student.id));
		var isArchiving = _Utils_eq(
			model.archivingStudentId,
			$elm$core$Maybe$Just(student.id));
		var isArchived = !_Utils_eq(student.archivedAt, $elm$core$Maybe$Nothing);
		var hasAlerts = !$elm$core$List$isEmpty(
			$author$project$Pages$Dashboard$getStudentAlerts(student));
		var awaitingImport = _Utils_eq(student.lastImportedAt, $elm$core$Maybe$Nothing);
		var analysisInProgress = (student.stats.gameCount > 0) && (_Utils_cmp(student.stats.analyzedCount, student.stats.gameCount) < 0);
		var statusInfo = isArchived ? {dotAnimation: '', dotColor: 'bg-gray-400', statusClass: 'text-gray-500', statusText: 'Archived'} : (awaitingImport ? {dotAnimation: '', dotColor: 'bg-amber-400', statusClass: 'text-amber-600', statusText: 'Awaiting import'} : (noGamesInPeriod ? {dotAnimation: '', dotColor: 'bg-gray-400', statusClass: 'text-gray-500', statusText: 'No games'} : (analysisInProgress ? {
			dotAnimation: ' animate-pulse',
			dotColor: 'bg-blue-500',
			statusClass: 'text-blue-600',
			statusText: $elm$core$String$fromInt(student.stats.analyzedCount) + ('/' + ($elm$core$String$fromInt(student.stats.gameCount) + ' analyzed'))
		} : {
			dotAnimation: '',
			dotColor: 'bg-green-500',
			statusClass: 'text-green-600',
			statusText: $elm$core$String$fromInt(student.stats.gameCount) + ' games'
		})));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'relative bg-white rounded-xl overflow-hidden transition-all duration-200 shadow-card hover:shadow-elevated border border-transparent hover:border-gray-200 ' + (isArchived ? 'opacity-75' : (hasAlerts ? 'border-l-4 border-l-amber-400' : '')))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute top-3 right-3 z-10')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick(
									$author$project$Pages$Dashboard$ToggleStudentMenu(student.id)),
									$elm$html$Html$Attributes$class('w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors'),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'click',
									$elm$json$Json$Decode$succeed(
										_Utils_Tuple2(
											$author$project$Pages$Dashboard$ToggleStudentMenu(student.id),
											true)))
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex flex-col gap-1')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('w-1 h-1 bg-current rounded-full')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('w-1 h-1 bg-current rounded-full')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('w-1 h-1 bg-current rounded-full')
												]),
											_List_Nil)
										]))
								])),
							isMenuOpen ? A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20'),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'click',
									$elm$json$Json$Decode$succeed(
										_Utils_Tuple2($author$project$Pages$Dashboard$NoOp, true)))
								]),
							_List_fromArray(
								[
									isArchived ? A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Pages$Dashboard$UnarchiveStudent(student.id)),
											$elm$html$Html$Attributes$class('w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'),
											$elm$html$Html$Attributes$disabled(isArchiving)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											isArchiving ? 'Unarchiving...' : 'Unarchive')
										])) : A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Pages$Dashboard$ArchiveStudent(student.id)),
											$elm$html$Html$Attributes$class('w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'),
											$elm$html$Html$Attributes$disabled(isArchiving)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											isArchiving ? 'Archiving...' : 'Archive')
										]))
								])) : $elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$author$project$Route$href(
							$author$project$Route$StudentDetail(student.id)),
							$elm$html$Html$Attributes$class('block p-5 group')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-start gap-4')
								]),
							_List_fromArray(
								[
									function () {
									var _v0 = student.avatarUrl;
									if (_v0.$ === 'Just') {
										var url = _v0.a;
										return A2(
											$elm$html$Html$img,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$src(url),
													$elm$html$Html$Attributes$alt(student.displayName),
													$elm$html$Html$Attributes$class(
													'w-14 h-14 rounded-full object-cover flex-shrink-0' + (isArchived ? ' grayscale' : ''))
												]),
											_List_Nil);
									} else {
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-gray-600 font-semibold text-xl')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$author$project$Pages$Dashboard$getInitials(student.displayName))
														]))
												]));
									}
								}(),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex-1 min-w-0 pr-6')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('flex items-center gap-2')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$h3,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('font-semibold text-gray-900 group-hover:text-gray-700 transition-colors truncate')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(student.displayName)
														])),
													isArchived ? A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-500')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Archived')
														])) : $elm$html$Html$text('')
												])),
											function () {
											var _v1 = student.chessComUsername;
											if (_v1.$ === 'Just') {
												var username = _v1.a;
												return A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-sm text-gray-500 truncate')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('@' + username)
														]));
											} else {
												return $elm$html$Html$text('');
											}
										}()
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-2 text-right')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-xs text-gray-400')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											function () {
												var _v2 = student.lastImportedAt;
												if (_v2.$ === 'Just') {
													var date = _v2.a;
													return 'Last sync: ' + A2($elm$core$String$left, 10, date);
												} else {
													return 'Not synced';
												}
											}())
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center justify-around mt-4 pt-4 border-t border-anthro-gray-light')
								]),
							_List_fromArray(
								[
									A3(
									$author$project$Pages$Dashboard$viewStatCell,
									$elm$core$String$fromInt(student.stats.gameCount),
									'games',
									$elm$core$Maybe$Nothing),
									function () {
									var _v3 = student.stats.winRate;
									if (_v3.$ === 'Just') {
										var rate = _v3.a;
										return A3(
											$author$project$Pages$Dashboard$viewStatCell,
											$elm$core$String$fromInt(
												$elm$core$Basics$round(rate)) + '%',
											'win rate',
											$elm$core$Maybe$Nothing);
									} else {
										return A3($author$project$Pages$Dashboard$viewStatCell, '—', 'win rate', $elm$core$Maybe$Nothing);
									}
								}(),
									function () {
									var _v4 = student.stats.avgAccuracy;
									if (_v4.$ === 'Just') {
										var acc = _v4.a;
										return A3(
											$author$project$Pages$Dashboard$viewStatCell,
											$elm$core$String$fromInt(
												$elm$core$Basics$round(acc)) + '%',
											'accuracy',
											$elm$core$Maybe$Nothing);
									} else {
										return A3($author$project$Pages$Dashboard$viewStatCell, '—', 'accuracy', $elm$core$Maybe$Nothing);
									}
								}()
								])),
							(!isArchived) ? $author$project$Pages$Dashboard$viewAlertRow(student) : $elm$html$Html$text(''),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-4 pt-4 border-t border-gray-100 flex items-center justify-between')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('View Games →')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-xs flex items-center gap-1.5 ' + statusInfo.statusClass)
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('w-1.5 h-1.5 rounded-full ' + (statusInfo.dotColor + statusInfo.dotAnimation))
												]),
											_List_Nil),
											$elm$html$Html$text(statusInfo.statusText)
										]))
								]))
						]))
				]));
	});
var $author$project$Pages$Dashboard$SetTimeRangeFilter = function (a) {
	return {$: 'SetTimeRangeFilter', a: a};
};
var $author$project$Pages$Dashboard$viewTimeRangeFilter = function (currentFilter) {
	var pillButton = F2(
		function (filter, label) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$Pages$Dashboard$SetTimeRangeFilter(filter)),
						$elm$html$Html$Attributes$class(
						_Utils_eq(currentFilter, filter) ? 'px-4 py-2 text-sm font-medium rounded-full bg-gray-900 text-white transition-colors' : 'px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(label)
					]));
		});
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex items-center gap-2')
			]),
		_List_fromArray(
			[
				A2(pillButton, $author$project$Types$Last7Days, 'Last 7 days'),
				A2(pillButton, $author$project$Types$Last30Days, 'Last 30 days')
			]));
};
var $author$project$Pages$Dashboard$viewUpgradeButton = A2(
	$elm$html$Html$a,
	_List_fromArray(
		[
			$author$project$Route$href($author$project$Route$Subscription),
			$elm$html$Html$Attributes$class('bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-subtle hover:shadow-card flex items-center gap-2')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg leading-none')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('↑')
				])),
			$elm$html$Html$text('Upgrade Plan')
		]));
var $author$project$Pages$Dashboard$viewDashboard = F3(
	function (model, students, archivedCount) {
		var totalGames = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function (s) {
					return s.stats.gameCount;
				},
				students));
		var displayStudentCount = $elm$core$List$length(students);
		var studentCountText = function () {
			var _v1 = model.userInfo;
			if (_v1.$ === 'Success') {
				var info = _v1.a;
				var _v2 = info.plan;
				if (_v2.$ === 'Just') {
					var plan = _v2.a;
					return $elm$core$String$fromInt(info.studentCount) + ('/' + ($elm$core$String$fromInt(plan.studentLimit) + ' students'));
				} else {
					return $elm$core$String$fromInt(info.studentCount) + (' student' + $author$project$Pages$Dashboard$pluralize(info.studentCount));
				}
			} else {
				return $elm$core$String$fromInt(displayStudentCount) + (' student' + $author$project$Pages$Dashboard$pluralize(displayStudentCount));
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-start justify-between')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h1,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-2xl font-bold text-gray-900')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Your Students')
												])),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-gray-500 mt-1 flex items-center gap-1')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(studentCountText),
													(totalGames > 0) ? A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-gray-400')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															' · ' + ($elm$core$String$fromInt(totalGames) + ' games analyzed'))
														])) : $elm$html$Html$text(''),
													(archivedCount > 0) ? A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$ToggleShowArchived),
															$elm$html$Html$Attributes$class(
															model.showArchived ? 'text-gray-600 hover:text-gray-800 transition-colors ml-1' : 'text-gray-400 hover:text-gray-600 transition-colors ml-1')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															' · ' + (model.showArchived ? ('Hide archived (' + ($elm$core$String$fromInt(archivedCount) + ')')) : ('Show archived (' + ($elm$core$String$fromInt(archivedCount) + ')'))))
														])) : $elm$html$Html$text('')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex items-center gap-4')
										]),
									_List_fromArray(
										[
											$author$project$Pages$Dashboard$viewTimeRangeFilter(model.timeRangeFilter),
											function () {
											var _v0 = $author$project$Pages$Dashboard$isAtStudentLimitFromUserInfo(model.userInfo);
											if (_v0.$ === 'AtLimit') {
												return $author$project$Pages$Dashboard$viewUpgradeButton;
											} else {
												return $author$project$Pages$Dashboard$viewAddStudentButton;
											}
										}()
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							(displayStudentCount === 1) ? 'max-w-md' : ((displayStudentCount === 2) ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'))
						]),
					A2(
						$elm$core$List$map,
						$author$project$Pages$Dashboard$viewStudentCard(model),
						students))
				]));
	});
var $author$project$Pages$Dashboard$viewEmptyState = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('py-16')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-md mx-auto text-center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-4xl')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('+')
									]))
							])),
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-xl font-bold text-gray-900 mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('No students yet')
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-gray-500 mb-8')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Add your first student to start tracking their chess progress and identifying areas for improvement.')
							])),
						function () {
						var _v0 = $author$project$Pages$Dashboard$isAtStudentLimitFromUserInfo(model.userInfo);
						if (_v0.$ === 'AtLimit') {
							return A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$author$project$Route$href($author$project$Route$Subscription),
										$elm$html$Html$Attributes$class('bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-subtle hover:shadow-card inline-flex items-center gap-2')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Upgrade to Add Students')
									]));
						} else {
							return A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$ShowAddModal),
										$elm$html$Html$Attributes$class('bg-anthro-dark hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-subtle hover:shadow-card inline-flex items-center gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg leading-none')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('+')
											])),
										$elm$html$Html$text('Add Student')
									]));
						}
					}()
					]))
			]));
};
var $author$project$Pages$Dashboard$viewError = function (error) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('py-12 text-center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-2xl')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('!')
							]))
					])),
				A2(
				$elm$html$Html$h3,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-lg font-medium text-gray-900 mb-2')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Failed to load students')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-red-600')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(error)
					]))
			]));
};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$Pages$Dashboard$viewLoading = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-8')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex items-start justify-between')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h1,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-2xl font-bold text-gray-900')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Your Students')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-gray-500 mt-1')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Loading...')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center gap-4')
									]),
								_List_fromArray(
									[
										$author$project$Pages$Dashboard$viewTimeRangeFilter(model.timeRangeFilter),
										$author$project$Pages$Dashboard$viewAddStudentButton
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid grid-cols-1 md:grid-cols-2 gap-4')
					]),
				A2(
					$elm$core$List$repeat,
					2,
					A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-xl border border-gray-200 p-5 animate-pulse')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center gap-4 mb-4')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-14 h-14 bg-gray-200 rounded-full')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex-1 space-y-2')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('h-5 w-32 bg-gray-200 rounded')
													]),
												_List_Nil),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('h-4 w-24 bg-gray-200 rounded')
													]),
												_List_Nil)
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('grid grid-cols-3 gap-3')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('h-16 bg-gray-100 rounded-lg')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('h-16 bg-gray-100 rounded-lg')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('h-16 bg-gray-100 rounded-lg')
											]),
										_List_Nil)
									]))
							]))))
			]));
};
var $author$project$Pages$Dashboard$ResendVerificationEmail = {$: 'ResendVerificationEmail'};
var $author$project$Pages$Dashboard$viewVerificationBanner = function (model) {
	var _v0 = model.userInfo;
	if (_v0.$ === 'Success') {
		var info = _v0.a;
		return info.emailVerified ? $elm$html$Html$text('') : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center justify-between')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center gap-3')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-amber-600 text-lg')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('!')
										])),
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-sm font-medium text-amber-800')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Please verify your email address')
												])),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-sm text-amber-700 mt-0.5')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Check your inbox for a verification link.')
												]))
										]))
								])),
							function () {
							var _v1 = model.resendStatus;
							switch (_v1.$) {
								case 'ResendSending':
									return A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-sm text-amber-600')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Sending...')
											]));
								case 'ResendSuccess':
									return A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-sm text-green-600 font-medium')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Verification email sent!')
											]));
								case 'ResendError':
									var err = _v1.a;
									return A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-right')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-sm text-red-600')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(err)
													])),
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$ResendVerificationEmail),
														$elm$html$Html$Attributes$class('text-sm font-medium text-amber-700 hover:text-amber-900 underline mt-1')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Try again')
													]))
											]));
								default:
									return A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$ResendVerificationEmail),
												$elm$html$Html$Attributes$class('text-sm font-medium text-amber-700 hover:text-amber-900 underline')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Resend verification email')
											]));
							}
						}()
						]))
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Pages$Dashboard$view = F3(
	function (apiUrl, token, model) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('min-h-screen')
				]),
			_List_fromArray(
				[
					(!_Utils_eq(model.openMenuStudentId, $elm$core$Maybe$Nothing)) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('fixed inset-0 z-0'),
							$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$CloseStudentMenu)
						]),
					_List_Nil) : $elm$html$Html$text(''),
					$author$project$Pages$Dashboard$viewVerificationBanner(model),
					function () {
					var _v0 = model.students;
					switch (_v0.$) {
						case 'NotAsked':
							return $elm$html$Html$text('');
						case 'Loading':
							return $author$project$Pages$Dashboard$viewLoading(model);
						case 'Failure':
							var error = _v0.a;
							return $author$project$Pages$Dashboard$viewError(error);
						default:
							var students = _v0.a;
							var filteredStudents = model.showArchived ? students : A2(
								$elm$core$List$filter,
								function (s) {
									return _Utils_eq(s.archivedAt, $elm$core$Maybe$Nothing);
								},
								students);
							var archivedCount = $elm$core$List$length(
								A2(
									$elm$core$List$filter,
									function (s) {
										return !_Utils_eq(s.archivedAt, $elm$core$Maybe$Nothing);
									},
									students));
							return A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$core$List$isEmpty(filteredStudents) ? ((model.showArchived || (!archivedCount)) ? $author$project$Pages$Dashboard$viewEmptyState(model) : A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('py-12 text-center')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-gray-500')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('All students are archived.')
													])),
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$ToggleShowArchived),
														$elm$html$Html$Attributes$class('mt-4 text-sm font-medium text-gray-700 hover:text-gray-900')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Show archived students')
													]))
											]))) : A3($author$project$Pages$Dashboard$viewDashboard, model, filteredStudents, archivedCount)
									]));
					}
				}(),
					model.showAddModal ? A3($author$project$Pages$Dashboard$viewAddModal, apiUrl, token, model) : $elm$html$Html$text('')
				]));
	});
var $author$project$Pages$EmailPreferences$ToggleAnalysisComplete = function (a) {
	return {$: 'ToggleAnalysisComplete', a: a};
};
var $author$project$Pages$EmailPreferences$ToggleMarketing = function (a) {
	return {$: 'ToggleMarketing', a: a};
};
var $author$project$Pages$EmailPreferences$ToggleWeeklySummary = function (a) {
	return {$: 'ToggleWeeklySummary', a: a};
};
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$html$Html$Events$targetChecked = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	$elm$json$Json$Decode$bool);
var $elm$html$Html$Events$onCheck = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetChecked));
};
var $author$project$Pages$EmailPreferences$preferenceToggle = function (config) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex items-start justify-between py-4 border-b border-gray-100 last:border-0')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex-1 pr-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('font-medium text-gray-900')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(config.label)
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm text-gray-500 mt-1')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(config.description)
							]))
					])),
				A2(
				$elm$html$Html$label,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('relative inline-flex items-center cursor-pointer')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('checkbox'),
								$elm$html$Html$Attributes$class('sr-only peer'),
								$elm$html$Html$Attributes$checked(config.isEnabled),
								$elm$html$Html$Events$onCheck(config.onToggle),
								$elm$html$Html$Attributes$disabled(config.isSaving)
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[
											'w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-anthro-dark/20 rounded-full peer',
											'peer-checked:after:translate-x-full peer-checked:after:border-white',
											'after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all',
											'peer-checked:bg-anthro-dark',
											config.isSaving ? 'opacity-50' : ''
										])))
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Pages$EmailPreferences$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('max-w-2xl mx-auto')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-8')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h1,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-2xl font-semibold text-gray-900')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Email Preferences')
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-gray-600 mt-1')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Manage your email notification settings')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('bg-white rounded-2xl shadow-card p-6')
					]),
				_List_fromArray(
					[
						function () {
						var _v0 = model.error;
						if (_v0.$ === 'Just') {
							var errorMsg = _v0.a;
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(errorMsg)
									]));
						} else {
							return $elm$html$Html$text('');
						}
					}(),
						(model.saveSuccess && (!model.isSaving)) ? A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Preferences saved')
							])) : $elm$html$Html$text(''),
						function () {
						if (model.isLoading) {
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-center py-8')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('animate-spin rounded-full h-8 w-8 border-b-2 border-anthro-dark mx-auto mb-4')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-gray-500')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Loading preferences...')
											]))
									]));
						} else {
							var _v1 = model.preferences;
							if (_v1.$ === 'Nothing') {
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-center py-8 text-gray-500')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Unable to load preferences')
										]));
							} else {
								var prefs = _v1.a;
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('space-y-6')
										]),
									_List_fromArray(
										[
											$author$project$Pages$EmailPreferences$preferenceToggle(
											{description: 'Get notified when game analysis is complete for your students', isEnabled: prefs.analysisCompleteNotifications, isSaving: model.isSaving, label: 'Analysis Complete Notifications', onToggle: $author$project$Pages$EmailPreferences$ToggleAnalysisComplete}),
											$author$project$Pages$EmailPreferences$preferenceToggle(
											{description: 'Receive a weekly digest of your students\' progress (coming soon)', isEnabled: prefs.weeklySummary, isSaving: model.isSaving, label: 'Weekly Summary', onToggle: $author$project$Pages$EmailPreferences$ToggleWeeklySummary}),
											$author$project$Pages$EmailPreferences$preferenceToggle(
											{description: 'Receive updates about new features and improvements', isEnabled: prefs.marketingEmails, isSaving: model.isSaving, label: 'Product Updates', onToggle: $author$project$Pages$EmailPreferences$ToggleMarketing})
										]));
							}
						}
					}()
					]))
			]));
};
var $author$project$Pages$ForgotPassword$EmailChanged = function (a) {
	return {$: 'EmailChanged', a: a};
};
var $author$project$Pages$ForgotPassword$SubmitForm = {$: 'SubmitForm'};
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $author$project$Pages$ForgotPassword$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen flex items-center justify-center bg-anthro-light')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-md w-full mx-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-2xl shadow-card p-8')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col items-center mb-8')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex items-center gap-3 mb-2')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-10 h-10 rounded grid grid-cols-2 grid-rows-2 overflow-hidden')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil)
													])),
												A2(
												$elm$html$Html$h1,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-2xl font-semibold text-anthro-dark tracking-tight')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Insights64')
													]))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-anthro-gray')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Reset your password')
											]))
									])),
								function () {
								var _v0 = model.success;
								if (_v0.$ === 'Just') {
									var successMsg = _v0.a;
									return A2(
										$elm$html$Html$div,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(successMsg)
													])),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('mt-6 text-center text-sm text-gray-600')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$author$project$Route$href($author$project$Route$Login),
																$elm$html$Html$Attributes$class('text-anthro-dark hover:underline font-medium')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Back to Sign in')
															]))
													]))
											]));
								} else {
									return A2(
										$elm$html$Html$form,
										_List_fromArray(
											[
												$elm$html$Html$Events$onSubmit($author$project$Pages$ForgotPassword$SubmitForm)
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-sm text-gray-600 mb-6')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Enter your email address and we\'ll send you a link to reset your password.')
													])),
												function () {
												var _v1 = model.error;
												if (_v1.$ === 'Just') {
													var errorMsg = _v1.a;
													return A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(errorMsg)
															]));
												} else {
													return $elm$html$Html$text('');
												}
											}(),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('mb-6')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$label,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1'),
																$elm$html$Html$Attributes$for('email')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Email')
															])),
														A2(
														$elm$html$Html$input,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$type_('email'),
																$elm$html$Html$Attributes$id('email'),
																$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors'),
																$elm$html$Html$Attributes$placeholder('coach@example.com'),
																$elm$html$Html$Attributes$value(model.email),
																$elm$html$Html$Events$onInput($author$project$Pages$ForgotPassword$EmailChanged),
																$elm$html$Html$Attributes$disabled(model.isLoading)
															]),
														_List_Nil)
													])),
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('submit'),
														$elm$html$Html$Attributes$class('w-full bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'),
														$elm$html$Html$Attributes$disabled(model.isLoading)
													]),
												_List_fromArray(
													[
														model.isLoading ? $elm$html$Html$text('Sending...') : $elm$html$Html$text('Send Reset Link')
													])),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('mt-6 text-center text-sm text-gray-600')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Remember your password? '),
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$author$project$Route$href($author$project$Route$Login),
																$elm$html$Html$Attributes$class('text-anthro-dark hover:underline font-medium')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Sign in')
															]))
													]))
											]));
								}
							}()
							]))
					]))
			]));
};
var $author$project$Pages$GameDetail$formatDate = function (dateStr) {
	return A2($elm$core$String$left, 10, dateStr);
};
var $author$project$Pages$GameDetail$resultToText = function (result) {
	switch (result) {
		case '1-0':
			return 'White wins';
		case '0-1':
			return 'Black wins';
		case '1/2-1/2':
			return 'Draw';
		default:
			return result;
	}
};
var $author$project$Pages$GameDetail$viewGameHeader = function (game) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-white rounded-lg shadow-card p-6 mb-6')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex items-center gap-3 mb-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-2xl text-gray-600')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								(game.platform === 'chess_com') ? '♞' : '♘')
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h1,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-xl font-bold text-gray-900')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(game.whiteUsername + (' vs ' + game.blackUsername))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm text-gray-500')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$author$project$Pages$GameDetail$formatDate(game.playedAt))
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex items-center gap-4 text-sm')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								'px-3 py-1 rounded font-medium bg-anthro-gray-light text-anthro-gray border-l-2 ' + function () {
									var _v0 = game.result;
									switch (_v0) {
										case '1-0':
											return 'border-anthro-green';
										case '0-1':
											return 'border-red-500';
										default:
											return 'border-anthro-gray-mid';
									}
								}())
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Pages$GameDetail$resultToText(game.result))
							])),
						game.analyzed ? A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-green-600')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('✓ Analyzed')
							])) : A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-gray-400')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Pending analysis')
							]))
					]))
			]));
};
var $author$project$Pages$GameDetail$classificationLabel = function (class_) {
	switch (class_) {
		case 'blunder':
			return 'Blunder';
		case 'mistake':
			return 'Mistake';
		case 'inaccuracy':
			return 'Inaccuracy';
		case 'good':
			return 'Good';
		case 'excellent':
			return 'Excellent';
		default:
			var other = class_;
			return other;
	}
};
var $author$project$Pages$GameDetail$viewMoveRow = function (move) {
	var phaseLabel = function () {
		var _v5 = move.phase;
		switch (_v5) {
			case 'opening':
				return 'Opening';
			case 'middlegame':
				return 'Middlegame';
			case 'endgame':
				return 'Endgame';
			default:
				var other = _v5;
				return other;
		}
	}();
	var _v0 = function () {
		var _v1 = move.classification;
		_v1$5:
		while (true) {
			if (_v1.$ === 'Just') {
				switch (_v1.a) {
					case 'blunder':
						return _Utils_Tuple3('bg-red-50', 'text-red-700', '??');
					case 'mistake':
						return _Utils_Tuple3('bg-yellow-50', 'text-yellow-700', '?');
					case 'inaccuracy':
						return _Utils_Tuple3('bg-orange-50', 'text-orange-700', '?!');
					case 'good':
						return _Utils_Tuple3('', 'text-gray-700', '');
					case 'excellent':
						return _Utils_Tuple3('bg-green-50', 'text-green-700', '!');
					default:
						break _v1$5;
				}
			} else {
				break _v1$5;
			}
		}
		return _Utils_Tuple3('', 'text-gray-700', '');
	}();
	var bgClass = _v0.a;
	var textClass = _v0.b;
	var icon = _v0.c;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('p-4 ' + bgClass)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex items-center justify-between')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex items-center gap-3')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-gray-500 font-mono w-8')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(move.moveNumber) + '.')
									])),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('font-mono')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										(move.color === 'white') ? move.movePlayed : ('...' + move.movePlayed))
									])),
								(icon !== '') ? A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('font-bold ' + textClass)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(icon)
									])) : $elm$html$Html$text('')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex items-center gap-4 text-sm')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-gray-500')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(phaseLabel)
									])),
								function () {
								var _v2 = move.classification;
								if (_v2.$ === 'Just') {
									var class_ = _v2.a;
									return A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class(textClass)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$author$project$Pages$GameDetail$classificationLabel(class_))
											]));
								} else {
									return $elm$html$Html$text('');
								}
							}(),
								function () {
								var _v3 = move.evalDiff;
								if (_v3.$ === 'Just') {
									var diff = _v3.a;
									return (diff > 0) ? A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-gray-500')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												'-' + ($elm$core$String$fromInt(diff) + ' cp'))
											])) : $elm$html$Html$text('');
								} else {
									return $elm$html$Html$text('');
								}
							}()
							]))
					])),
				function () {
				var _v4 = _Utils_Tuple2(move.classification, move.bestMove);
				if ((_v4.a.$ === 'Just') && (_v4.b.$ === 'Just')) {
					var c = _v4.a.a;
					var best = _v4.b.a;
					return ((c === 'blunder') || ((c === 'mistake') || (c === 'inaccuracy'))) ? A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mt-2 text-sm text-gray-500 pl-11')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Best was ' + best)
							])) : $elm$html$Html$text('');
				} else {
					return $elm$html$Html$text('');
				}
			}()
			]));
};
var $author$project$Pages$GameDetail$viewMoveSummary = function (moves) {
	var mistakes = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (m) {
				return _Utils_eq(
					m.classification,
					$elm$core$Maybe$Just('mistake'));
			},
			moves));
	var inaccuracies = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (m) {
				return _Utils_eq(
					m.classification,
					$elm$core$Maybe$Just('inaccuracy'));
			},
			moves));
	var blunders = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (m) {
				return _Utils_eq(
					m.classification,
					$elm$core$Maybe$Just('blunder'));
			},
			moves));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-white rounded-lg shadow-card p-6')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-lg font-medium text-gray-900 mb-4')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Summary')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid grid-cols-3 gap-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-center')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-2xl font-bold text-red-600')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(blunders))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm text-gray-500')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Blunders')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-center')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-2xl font-bold text-yellow-600')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(mistakes))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm text-gray-500')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Mistakes')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-center')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-2xl font-bold text-orange-500')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(inaccuracies))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm text-gray-500')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Inaccuracies')
									]))
							]))
					]))
			]));
};
var $author$project$Pages$GameDetail$viewGameDetail = function (detail) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$author$project$Pages$GameDetail$viewGameHeader(detail.game),
				$author$project$Pages$GameDetail$viewMoveSummary(detail.moves),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mt-6')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-lg font-medium text-gray-900 mb-4')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Move Analysis')
							])),
						$elm$core$List$isEmpty(detail.moves) ? A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-lg shadow-card p-6 text-center text-gray-500')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Move analysis not available yet.')
							])) : A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-lg shadow-card divide-y divide-gray-100')
							]),
						A2($elm$core$List$map, $author$project$Pages$GameDetail$viewMoveRow, detail.moves))
					]))
			]));
};
var $author$project$Pages$GameDetail$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$author$project$Route$href($author$project$Route$Dashboard),
						$elm$html$Html$Attributes$class('inline-flex items-center gap-1 text-anthro-gray hover:text-anthro-dark mb-6')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('←')
							])),
						$elm$html$Html$text('Back')
					])),
				function () {
				var _v0 = model.gameDetail;
				switch (_v0.$) {
					case 'NotAsked':
						return $elm$html$Html$text('');
					case 'Loading':
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center py-12 text-gray-500')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Loading game analysis...')
								]));
					case 'Failure':
						var error = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('bg-red-50 border border-red-200 rounded-lg p-6 text-red-700')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(error)
								]));
					default:
						var detail = _v0.a;
						return $author$project$Pages$GameDetail$viewGameDetail(detail);
				}
			}()
			]));
};
var $author$project$Pages$Login$EmailChanged = function (a) {
	return {$: 'EmailChanged', a: a};
};
var $author$project$Pages$Login$PasswordChanged = function (a) {
	return {$: 'PasswordChanged', a: a};
};
var $author$project$Pages$Login$SubmitForm = {$: 'SubmitForm'};
var $author$project$Pages$Login$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen flex items-center justify-center bg-anthro-light')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-md w-full mx-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-2xl shadow-card p-8')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col items-center mb-8')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex items-center gap-3 mb-2')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-10 h-10 rounded grid grid-cols-2 grid-rows-2 overflow-hidden')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil)
													])),
												A2(
												$elm$html$Html$h1,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-2xl font-semibold text-anthro-dark tracking-tight')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Insights64')
													]))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-anthro-gray')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Chess coaching dashboard')
											]))
									])),
								A2(
								$elm$html$Html$form,
								_List_fromArray(
									[
										$elm$html$Html$Events$onSubmit($author$project$Pages$Login$SubmitForm)
									]),
								_List_fromArray(
									[
										function () {
										var _v0 = model.error;
										if (_v0.$ === 'Just') {
											var errorMsg = _v0.a;
											return A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(errorMsg)
													]));
										} else {
											return $elm$html$Html$text('');
										}
									}(),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-4')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$label,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1'),
														$elm$html$Html$Attributes$for('email')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Email')
													])),
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('email'),
														$elm$html$Html$Attributes$id('email'),
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('coach@example.com'),
														$elm$html$Html$Attributes$value(model.email),
														$elm$html$Html$Events$onInput($author$project$Pages$Login$EmailChanged),
														$elm$html$Html$Attributes$disabled(model.isLoading)
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-4')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$label,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1'),
														$elm$html$Html$Attributes$for('password')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Password')
													])),
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('password'),
														$elm$html$Html$Attributes$id('password'),
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('Enter your password'),
														$elm$html$Html$Attributes$value(model.password),
														$elm$html$Html$Events$onInput($author$project$Pages$Login$PasswordChanged),
														$elm$html$Html$Attributes$disabled(model.isLoading)
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-6 text-right')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$author$project$Route$href($author$project$Route$ForgotPassword),
														$elm$html$Html$Attributes$class('text-sm text-anthro-dark hover:underline')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Forgot password?')
													]))
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('submit'),
												$elm$html$Html$Attributes$class('w-full bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'),
												$elm$html$Html$Attributes$disabled(model.isLoading)
											]),
										_List_fromArray(
											[
												model.isLoading ? $elm$html$Html$text('Signing in...') : $elm$html$Html$text('Sign in')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mt-6 text-center text-sm text-gray-600')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Don\'t have an account? '),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$author$project$Route$href($author$project$Route$Register),
												$elm$html$Html$Attributes$class('text-anthro-dark hover:underline font-medium')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Register')
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Pages$Register$ConfirmPasswordChanged = function (a) {
	return {$: 'ConfirmPasswordChanged', a: a};
};
var $author$project$Pages$Register$EmailChanged = function (a) {
	return {$: 'EmailChanged', a: a};
};
var $author$project$Pages$Register$PasswordChanged = function (a) {
	return {$: 'PasswordChanged', a: a};
};
var $author$project$Pages$Register$SubmitForm = {$: 'SubmitForm'};
var $author$project$Pages$Register$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen flex items-center justify-center bg-anthro-light')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-md w-full mx-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-2xl shadow-card p-8')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col items-center mb-8')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex items-center gap-3 mb-2')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-10 h-10 rounded grid grid-cols-2 grid-rows-2 overflow-hidden')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil)
													])),
												A2(
												$elm$html$Html$h1,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-2xl font-semibold text-anthro-dark tracking-tight')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Insights64')
													]))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-anthro-gray')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Create your account')
											]))
									])),
								A2(
								$elm$html$Html$form,
								_List_fromArray(
									[
										$elm$html$Html$Events$onSubmit($author$project$Pages$Register$SubmitForm)
									]),
								_List_fromArray(
									[
										function () {
										var _v0 = model.error;
										if (_v0.$ === 'Just') {
											var errorMsg = _v0.a;
											return A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(errorMsg)
													]));
										} else {
											return $elm$html$Html$text('');
										}
									}(),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-4')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$label,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1'),
														$elm$html$Html$Attributes$for('email')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Email')
													])),
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('email'),
														$elm$html$Html$Attributes$id('email'),
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('coach@example.com'),
														$elm$html$Html$Attributes$value(model.email),
														$elm$html$Html$Events$onInput($author$project$Pages$Register$EmailChanged),
														$elm$html$Html$Attributes$disabled(model.isLoading)
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-4')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$label,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1'),
														$elm$html$Html$Attributes$for('password')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Password')
													])),
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('password'),
														$elm$html$Html$Attributes$id('password'),
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('At least 8 characters'),
														$elm$html$Html$Attributes$value(model.password),
														$elm$html$Html$Events$onInput($author$project$Pages$Register$PasswordChanged),
														$elm$html$Html$Attributes$disabled(model.isLoading)
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-6')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$label,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1'),
														$elm$html$Html$Attributes$for('confirmPassword')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Confirm Password')
													])),
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('password'),
														$elm$html$Html$Attributes$id('confirmPassword'),
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('Confirm your password'),
														$elm$html$Html$Attributes$value(model.confirmPassword),
														$elm$html$Html$Events$onInput($author$project$Pages$Register$ConfirmPasswordChanged),
														$elm$html$Html$Attributes$disabled(model.isLoading)
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('submit'),
												$elm$html$Html$Attributes$class('w-full bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'),
												$elm$html$Html$Attributes$disabled(model.isLoading)
											]),
										_List_fromArray(
											[
												model.isLoading ? $elm$html$Html$text('Creating account...') : $elm$html$Html$text('Create account')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mt-6 text-center text-sm text-gray-600')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Already have an account? '),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$author$project$Route$href($author$project$Route$Login),
												$elm$html$Html$Attributes$class('text-anthro-dark hover:underline font-medium')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Sign in')
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Pages$ResetPassword$ConfirmPasswordChanged = function (a) {
	return {$: 'ConfirmPasswordChanged', a: a};
};
var $author$project$Pages$ResetPassword$PasswordChanged = function (a) {
	return {$: 'PasswordChanged', a: a};
};
var $author$project$Pages$ResetPassword$SubmitForm = {$: 'SubmitForm'};
var $author$project$Pages$ResetPassword$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen flex items-center justify-center bg-anthro-light')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-md w-full mx-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-2xl shadow-card p-8')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col items-center mb-8')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex items-center gap-3 mb-2')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-10 h-10 rounded grid grid-cols-2 grid-rows-2 overflow-hidden')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil)
													])),
												A2(
												$elm$html$Html$h1,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-2xl font-semibold text-anthro-dark tracking-tight')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Insights64')
													]))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-anthro-gray')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Set a new password')
											]))
									])),
								model.success ? A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('font-medium mb-2')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Password reset successfully!')
													])),
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-sm')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('You can now sign in with your new password.')
													]))
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$author$project$Route$href($author$project$Route$Login),
												$elm$html$Html$Attributes$class('w-full block text-center bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Sign in')
											]))
									])) : A2(
								$elm$html$Html$form,
								_List_fromArray(
									[
										$elm$html$Html$Events$onSubmit($author$project$Pages$ResetPassword$SubmitForm)
									]),
								_List_fromArray(
									[
										function () {
										var _v0 = model.error;
										if (_v0.$ === 'Just') {
											var errorMsg = _v0.a;
											return A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(errorMsg)
													]));
										} else {
											return $elm$html$Html$text('');
										}
									}(),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-4')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$label,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1'),
														$elm$html$Html$Attributes$for('password')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('New Password')
													])),
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('password'),
														$elm$html$Html$Attributes$id('password'),
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('Enter your new password'),
														$elm$html$Html$Attributes$value(model.password),
														$elm$html$Html$Events$onInput($author$project$Pages$ResetPassword$PasswordChanged),
														$elm$html$Html$Attributes$disabled(model.isLoading)
													]),
												_List_Nil),
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-xs text-gray-500 mt-1')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('At least 8 characters')
													]))
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-6')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$label,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1'),
														$elm$html$Html$Attributes$for('confirmPassword')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Confirm Password')
													])),
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('password'),
														$elm$html$Html$Attributes$id('confirmPassword'),
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('Confirm your new password'),
														$elm$html$Html$Attributes$value(model.confirmPassword),
														$elm$html$Html$Events$onInput($author$project$Pages$ResetPassword$ConfirmPasswordChanged),
														$elm$html$Html$Attributes$disabled(model.isLoading)
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('submit'),
												$elm$html$Html$Attributes$class('w-full bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'),
												$elm$html$Html$Attributes$disabled(model.isLoading)
											]),
										_List_fromArray(
											[
												model.isLoading ? $elm$html$Html$text('Resetting...') : $elm$html$Html$text('Reset Password')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mt-6 text-center text-sm text-gray-600')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$author$project$Route$href($author$project$Route$Login),
														$elm$html$Html$Attributes$class('text-anthro-dark hover:underline font-medium')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Back to Sign in')
													]))
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Pages$StudentDetail$ToggleSidebar = {$: 'ToggleSidebar'};
var $author$project$Pages$StudentDetail$countActiveFilters = function (model) {
	return $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					!_Utils_eq(model.timeControlFilter, $author$project$Types$AllTimeControls),
					!_Utils_eq(model.resultFilter, $author$project$Types$AllResults),
					!_Utils_eq(model.colorFilter, $author$project$Types$AllColors),
					!$elm$core$List$isEmpty(model.selectedTags),
					(!_Utils_eq(model.minAccuracy, $elm$core$Maybe$Nothing)) || (!_Utils_eq(model.maxAccuracy, $elm$core$Maybe$Nothing)),
					!_Utils_eq(model.maxBlunders, $elm$core$Maybe$Nothing),
					model.opponentRatingFilter !== 'all',
					model.opponentSearch !== ''
				])));
};
var $author$project$Pages$StudentDetail$ClearAllFilters = {$: 'ClearAllFilters'};
var $elm$core$String$toLower = _String_toLower;
var $author$project$Pages$StudentDetail$filterByOpponentName = F3(
	function (searchStr, student, games) {
		if ($elm$core$String$isEmpty(searchStr)) {
			return games;
		} else {
			var studentUsernames = A2(
				$elm$core$List$map,
				$elm$core$String$toLower,
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[student.chessComUsername])));
			var search = $elm$core$String$toLower(searchStr);
			return A2(
				$elm$core$List$filter,
				function (g) {
					var isWhite = A2(
						$elm$core$List$member,
						$elm$core$String$toLower(g.game.whiteUsername),
						studentUsernames);
					var opponent = $elm$core$String$toLower(
						isWhite ? g.game.blackUsername : g.game.whiteUsername);
					return A2($elm$core$String$contains, search, opponent);
				},
				games);
		}
	});
var $author$project$Pages$StudentDetail$groupGamesByDate = function (games) {
	return $elm$core$List$reverse(
		A3(
			$elm$core$List$foldl,
			F2(
				function (game, acc) {
					var dateStr = A2($elm$core$String$left, 10, game.game.playedAt);
					if (!acc.b) {
						return _List_fromArray(
							[
								_Utils_Tuple2(
								dateStr,
								_List_fromArray(
									[game]))
							]);
					} else {
						var _v1 = acc.a;
						var currentDate = _v1.a;
						var currentGames = _v1.b;
						var rest = acc.b;
						return _Utils_eq(currentDate, dateStr) ? A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								currentDate,
								_Utils_ap(
									currentGames,
									_List_fromArray(
										[game]))),
							rest) : A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								dateStr,
								_List_fromArray(
									[game])),
							acc);
					}
				}),
			_List_Nil,
			games));
};
var $author$project$Pages$StudentDetail$hasActiveFilters = function (model) {
	return (!_Utils_eq(model.timeControlFilter, $author$project$Types$AllTimeControls)) || ((!_Utils_eq(model.resultFilter, $author$project$Types$AllResults)) || ((!_Utils_eq(model.colorFilter, $author$project$Types$AllColors)) || ((!$elm$core$List$isEmpty(model.selectedTags)) || ((!_Utils_eq(model.minAccuracy, $elm$core$Maybe$Nothing)) || ((!_Utils_eq(model.maxAccuracy, $elm$core$Maybe$Nothing)) || ((!_Utils_eq(model.maxBlunders, $elm$core$Maybe$Nothing)) || ((model.opponentRatingFilter !== 'all') || (model.opponentSearch !== ''))))))));
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Pages$StudentDetail$sortGames = F3(
	function (order, student, games) {
		var studentUsernames = A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[student.chessComUsername]));
		var getOpponentRating = function (g) {
			var isWhite = A2(
				$elm$core$List$member,
				$elm$core$String$toLower(g.game.whiteUsername),
				A2($elm$core$List$map, $elm$core$String$toLower, studentUsernames));
			return isWhite ? A2($elm$core$Maybe$withDefault, 0, g.game.blackElo) : A2($elm$core$Maybe$withDefault, 0, g.game.whiteElo);
		};
		var getAccuracy = function (g) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				A2(
					$elm$core$Maybe$andThen,
					function ($) {
						return $.accuracyOverall;
					},
					g.insight));
		};
		switch (order.$) {
			case 'DateNewest':
				return games;
			case 'DateOldest':
				return $elm$core$List$reverse(games);
			case 'AccuracyHigh':
				return A2(
					$elm$core$List$sortBy,
					function (g) {
						return -getAccuracy(g);
					},
					games);
			case 'AccuracyLow':
				return A2($elm$core$List$sortBy, getAccuracy, games);
			case 'OpponentRatingHigh':
				return A2(
					$elm$core$List$sortBy,
					function (g) {
						return -getOpponentRating(g);
					},
					games);
			default:
				return A2($elm$core$List$sortBy, getOpponentRating, games);
		}
	});
var $author$project$Pages$StudentDetail$formatDateLabel = function (dateStr) {
	var parts = A2($elm$core$String$split, '-', dateStr);
	if (((parts.b && parts.b.b) && parts.b.b.b) && (!parts.b.b.b.b)) {
		var year = parts.a;
		var _v1 = parts.b;
		var month = _v1.a;
		var _v2 = _v1.b;
		var day = _v2.a;
		var monthName = function () {
			switch (month) {
				case '01':
					return 'Jan';
				case '02':
					return 'Feb';
				case '03':
					return 'Mar';
				case '04':
					return 'Apr';
				case '05':
					return 'May';
				case '06':
					return 'Jun';
				case '07':
					return 'Jul';
				case '08':
					return 'Aug';
				case '09':
					return 'Sep';
				case '10':
					return 'Oct';
				case '11':
					return 'Nov';
				case '12':
					return 'Dec';
				default:
					return month;
			}
		}();
		var dayNum = $elm$core$String$fromInt(
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(day)));
		return monthName + (' ' + (dayNum + (', ' + year)));
	} else {
		return dateStr;
	}
};
var $author$project$Pages$StudentDetail$HoverGame = function (a) {
	return {$: 'HoverGame', a: a};
};
var $author$project$Pages$StudentDetail$ToggleGameExpanded = function (a) {
	return {$: 'ToggleGameExpanded', a: a};
};
var $author$project$Pages$StudentDetail$getPriorityTags = function (tags) {
	return A2($elm$core$List$take, 3, tags);
};
var $author$project$Pages$StudentDetail$getResultInfo = F2(
	function (isStudentWhite, result) {
		switch (result) {
			case '1-0':
				return isStudentWhite ? {barColor: 'bg-green-500', label: 'Win', pillBg: 'bg-green-100', pillText: 'text-green-700'} : {barColor: 'bg-red-500', label: 'Loss', pillBg: 'bg-red-100', pillText: 'text-red-700'};
			case '0-1':
				return isStudentWhite ? {barColor: 'bg-red-500', label: 'Loss', pillBg: 'bg-red-100', pillText: 'text-red-700'} : {barColor: 'bg-green-500', label: 'Win', pillBg: 'bg-green-100', pillText: 'text-green-700'};
			case '1/2-1/2':
				return {barColor: 'bg-gray-400', label: 'Draw', pillBg: 'bg-gray-100', pillText: 'text-gray-700'};
			default:
				return {barColor: 'bg-gray-400', label: result, pillBg: 'bg-gray-100', pillText: 'text-gray-700'};
		}
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm$html$Html$Events$onMouseEnter = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseenter',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseLeave = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseleave',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Pages$StudentDetail$accuracyColors = function (accuracy) {
	return (accuracy <= 40) ? {bar: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700'} : ((accuracy <= 60) ? {bar: 'bg-orange-500', bg: 'bg-orange-50', text: 'text-orange-700'} : ((accuracy <= 80) ? {bar: 'bg-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-700'} : {bar: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700'}));
};
var $author$project$Pages$StudentDetail$viewAccuracyBadge = function (maybeInsight) {
	if (maybeInsight.$ === 'Just') {
		var ins = maybeInsight.a;
		var _v1 = ins.accuracyOverall;
		if (_v1.$ === 'Just') {
			var acc = _v1.a;
			var colors = $author$project$Pages$StudentDetail$accuracyColors(acc);
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('px-2 py-0.5 rounded text-xs font-semibold ' + (colors.bg + (' ' + colors.text)))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$fromInt(
							$elm$core$Basics$round(acc)) + '% accuracy')
					]));
		} else {
			return $elm$html$Html$text('');
		}
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Pages$StudentDetail$unique = function (list) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (item, acc) {
				return A2($elm$core$List$member, item, acc) ? acc : _Utils_ap(
					acc,
					_List_fromArray(
						[item]));
			}),
		_List_Nil,
		list);
};
var $author$project$Pages$StudentDetail$groupTagsByCategory = function (tags) {
	var categories = $author$project$Pages$StudentDetail$unique(
		A2(
			$elm$core$List$map,
			function (gt) {
				return gt.tag.category;
			},
			tags));
	return A2(
		$elm$core$List$filter,
		function (_v0) {
			var tagList = _v0.b;
			return !$elm$core$List$isEmpty(tagList);
		},
		A2(
			$elm$core$List$map,
			function (cat) {
				return _Utils_Tuple2(
					cat,
					A2(
						$elm$core$List$filter,
						function (gt) {
							return _Utils_eq(gt.tag.category, cat);
						},
						tags));
			},
			categories));
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Pages$StudentDetail$viewAccuracyBar = function (ins) {
	var _v0 = ins.accuracyOverall;
	if (_v0.$ === 'Just') {
		var acc = _v0.a;
		var colors = $author$project$Pages$StudentDetail$accuracyColors(acc);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center gap-3')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('h-full rounded-full ' + colors.bar),
											A2(
											$elm$html$Html$Attributes$style,
											'width',
											$elm$core$String$fromFloat(acc) + '%')
										]),
									_List_Nil)
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm font-bold ' + colors.text)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromInt(
										$elm$core$Basics$round(acc)) + '%')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex gap-4 mt-2 text-xs text-gray-500')
						]),
					_List_fromArray(
						[
							function () {
							var _v1 = ins.accuracyOpening;
							if (_v1.$ === 'Just') {
								var a = _v1.a;
								return A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											'Opening: ' + ($elm$core$String$fromInt(
												$elm$core$Basics$round(a)) + '%'))
										]));
							} else {
								return $elm$html$Html$text('');
							}
						}(),
							function () {
							var _v2 = ins.accuracyMiddlegame;
							if (_v2.$ === 'Just') {
								var a = _v2.a;
								return A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											'Middle: ' + ($elm$core$String$fromInt(
												$elm$core$Basics$round(a)) + '%'))
										]));
							} else {
								return $elm$html$Html$text('');
							}
						}(),
							function () {
							var _v3 = ins.accuracyEndgame;
							if (_v3.$ === 'Just') {
								var a = _v3.a;
								return A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											'End: ' + ($elm$core$String$fromInt(
												$elm$core$Basics$round(a)) + '%'))
										]));
							} else {
								return $elm$html$Html$text('');
							}
						}()
						]))
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Pages$StudentDetail$pluralize = function (count) {
	return (count === 1) ? '' : 's';
};
var $author$project$Pages$StudentDetail$viewErrorSummary = function (ins) {
	var items = A2(
		$elm$core$List$filter,
		function (_v1) {
			var count = _v1.a;
			return count > 0;
		},
		_List_fromArray(
			[
				_Utils_Tuple3(ins.blundersCount, 'Blunder', 'bg-red-500'),
				_Utils_Tuple3(ins.mistakesCount, 'Mistake', 'bg-orange-500'),
				_Utils_Tuple3(ins.inaccuraciesCount, 'Inaccuracy', 'bg-yellow-500')
			]));
	return $elm$core$List$isEmpty(items) ? A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex items-center gap-2 text-sm text-green-600 font-medium')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-lg')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('✓')
					])),
				$elm$html$Html$text('Clean game - no major errors')
			])) : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex items-center gap-4 text-sm')
			]),
		A2(
			$elm$core$List$map,
			function (_v0) {
				var count = _v0.a;
				var label = _v0.b;
				var color = _v0.c;
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center gap-1.5')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-2.5 h-2.5 rounded-full ' + color)
								]),
							_List_Nil),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-gray-600 font-medium')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromInt(count) + (' ' + (label + $author$project$Pages$StudentDetail$pluralize(count))))
								]))
						]));
			},
			items));
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $author$project$Pages$StudentDetail$tagClasses = function (_v0) {
	return 'px-2.5 py-1 text-xs rounded-full font-medium bg-anthro-gray-light text-anthro-gray';
};
var $author$project$Pages$StudentDetail$viewTagBadge = function (gameTag) {
	var hasTooltipContent = (!_Utils_eq(gameTag.tag.description, $elm$core$Maybe$Nothing)) || (!_Utils_eq(gameTag.primaryMove, $elm$core$Maybe$Nothing));
	var tooltipContent = hasTooltipContent ? A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('tag-tooltip'),
				A2($elm$html$Html$Attributes$attribute, 'role', 'tooltip')
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('tag-tooltip-title')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(gameTag.tag.name)
						]))
				]),
			_Utils_ap(
				function () {
					var _v0 = gameTag.tag.description;
					if (_v0.$ === 'Just') {
						var desc = _v0.a;
						return _List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('tag-tooltip-desc')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(desc)
									]))
							]);
					} else {
						return _List_Nil;
					}
				}(),
				function () {
					var _v1 = gameTag.primaryMove;
					if (_v1.$ === 'Just') {
						var moveNum = _v1.a;
						return _List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('tag-tooltip-move')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										'Move ' + $elm$core$String$fromInt(moveNum))
									]))
							]);
					} else {
						return _List_Nil;
					}
				}()))) : $elm$html$Html$text('');
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('tag-tooltip-wrapper'),
				$elm$html$Html$Attributes$tabindex(0),
				A2($elm$html$Html$Attributes$attribute, 'aria-describedby', 'tooltip')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						$author$project$Pages$StudentDetail$tagClasses(gameTag.tag))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(gameTag.tag.name)
					])),
				tooltipContent
			]));
};
var $author$project$Pages$StudentDetail$viewTagGroup = function (_v0) {
	var category = _v0.a;
	var tags = _v0.b;
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						A3($elm$core$String$replace, '_', ' ', category))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex flex-wrap gap-1.5')
					]),
				A2($elm$core$List$map, $author$project$Pages$StudentDetail$viewTagBadge, tags))
			]));
};
var $author$project$Pages$StudentDetail$viewExpandedContent = F4(
	function (isAnalyzed, maybeInsight, tags, chessComUrl) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 pt-4 border-t border-gray-100 space-y-4')
				]),
			_List_fromArray(
				[
					function () {
					if (!isAnalyzed) {
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('bg-amber-50 border border-amber-200 rounded-lg p-4')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex items-center gap-2 text-amber-800')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('font-medium')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Analysis pending')
												]))
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-sm text-amber-700 mt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('This game is queued for analysis. Performance metrics and tags will appear once processing is complete.')
										]))
								]));
					} else {
						if (maybeInsight.$ === 'Just') {
							var ins = maybeInsight.a;
							return A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Performance')
											])),
										$author$project$Pages$StudentDetail$viewAccuracyBar(ins),
										$author$project$Pages$StudentDetail$viewErrorSummary(ins)
									]));
						} else {
							return $elm$html$Html$text('');
						}
					}
				}(),
					function () {
					if (!$elm$core$List$isEmpty(tags)) {
						var grouped = $author$project$Pages$StudentDetail$groupTagsByCategory(tags);
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('space-y-3')
								]),
							A2($elm$core$List$map, $author$project$Pages$StudentDetail$viewTagGroup, grouped));
					} else {
						return $elm$html$Html$text('');
					}
				}(),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center gap-4 pt-2')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href(chessComUrl),
									$elm$html$Html$Attributes$target('_blank'),
									$elm$html$Html$Attributes$class('inline-flex items-center gap-1.5 text-sm bg-anthro-dark text-white px-4 py-2 rounded-lg shadow-subtle hover:shadow-card hover:bg-gray-800 font-medium transition-all'),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'click',
									$elm$json$Json$Decode$succeed(
										_Utils_Tuple2(
											$author$project$Pages$StudentDetail$HoverGame($elm$core$Maybe$Nothing),
											true)))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('View Analysis'),
									A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('→')
										]))
								]))
						]))
				]));
	});
var $author$project$Pages$StudentDetail$viewGameCard = F3(
	function (model, student, gameWithInsights) {
		var tags = gameWithInsights.tags;
		var studentUsernames = A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[student.chessComUsername]));
		var priorityTags = $author$project$Pages$StudentDetail$getPriorityTags(tags);
		var insight = gameWithInsights.insight;
		var game = gameWithInsights.game;
		var isExpanded = A2($elm$core$Set$member, game.id, model.expandedGames);
		var isHovered = _Utils_eq(
			model.hoveredGameId,
			$elm$core$Maybe$Just(game.id));
		var isStudentWhite = A2(
			$elm$core$List$member,
			$elm$core$String$toLower(game.whiteUsername),
			A2($elm$core$List$map, $elm$core$String$toLower, studentUsernames));
		var opponent = isStudentWhite ? game.blackUsername : game.whiteUsername;
		var opponentRating = isStudentWhite ? game.blackElo : game.whiteElo;
		var result = A2($author$project$Pages$StudentDetail$getResultInfo, isStudentWhite, game.result);
		var studentRating = isStudentWhite ? game.whiteElo : game.blackElo;
		var ratingDiff = A3($elm$core$Maybe$map2, $elm$core$Basics$sub, opponentRating, studentRating);
		var chessComUrl = 'https://www.chess.com/analysis/game/live/' + game.platformGameId;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'bg-white rounded-xl transition-all duration-200 cursor-pointer flex shadow-card ' + (isExpanded ? 'shadow-elevated' : (isHovered ? 'shadow-elevated' : 'hover:shadow-elevated'))),
					$elm$html$Html$Events$onClick(
					$author$project$Pages$StudentDetail$ToggleGameExpanded(game.id)),
					$elm$html$Html$Events$onMouseEnter(
					$author$project$Pages$StudentDetail$HoverGame(
						$elm$core$Maybe$Just(game.id))),
					$elm$html$Html$Events$onMouseLeave(
					$author$project$Pages$StudentDetail$HoverGame($elm$core$Maybe$Nothing))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('w-1 flex-shrink-0 rounded-l-xl ' + result.barColor)
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex-1 p-5')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-start gap-4')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex-1 min-w-0')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('flex items-center gap-2 flex-wrap')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('font-semibold text-gray-900')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(opponent)
														])),
													function () {
													if (opponentRating.$ === 'Just') {
														var rating = opponentRating.a;
														return A2(
															$elm$html$Html$span,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('text-gray-500 text-sm')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	'(' + ($elm$core$String$fromInt(rating) + ')'))
																]));
													} else {
														return $elm$html$Html$text('');
													}
												}(),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('px-2 py-0.5 rounded-full text-xs font-semibold ' + (result.pillBg + (' ' + result.pillText)))
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(result.label)
														])),
													function () {
													if (ratingDiff.$ === 'Just') {
														var diff = ratingDiff.a;
														return (diff > 0) ? A2(
															$elm$html$Html$span,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('text-xs px-2 py-0.5 rounded bg-anthro-gray-light text-anthro-gray font-medium border-l-2 border-anthro-green')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	'+' + $elm$core$String$fromInt(diff))
																])) : ((diff < 0) ? A2(
															$elm$html$Html$span,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('text-xs px-2 py-0.5 rounded bg-anthro-gray-light text-anthro-gray font-medium border-l-2 border-red-500')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	$elm$core$String$fromInt(diff))
																])) : $elm$html$Html$text(''));
													} else {
														return $elm$html$Html$text('');
													}
												}(),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('w-4 h-4 rounded border border-gray-300 flex-shrink-0'),
															A2(
															$elm$html$Html$Attributes$style,
															'background',
															isStudentWhite ? '#fff' : '#374151'),
															$elm$html$Html$Attributes$title(
															isStudentWhite ? 'Played as White' : 'Played as Black')
														]),
													_List_Nil)
												])),
											function () {
											var _v2 = game.openingName;
											if (_v2.$ === 'Just') {
												var opening = _v2.a;
												return A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-sm text-gray-500 mt-1 truncate')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(opening)
														]));
											} else {
												return $elm$html$Html$text('');
											}
										}(),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('flex items-center gap-3 mt-2 text-sm')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-gray-400')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															A2($elm$core$String$left, 10, game.playedAt))
														])),
													(!game.analyzed) ? A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 flex items-center gap-1')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$span,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse')
																]),
															_List_Nil),
															$elm$html$Html$text('Pending analysis')
														])) : $author$project$Pages$StudentDetail$viewAccuracyBadge(insight)
												])),
											isExpanded ? A4($author$project$Pages$StudentDetail$viewExpandedContent, game.analyzed, insight, tags, chessComUrl) : ((!$elm$core$List$isEmpty(priorityTags)) ? A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('flex items-center gap-2 mt-3')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('flex flex-wrap gap-1.5')
														]),
													A2($elm$core$List$map, $author$project$Pages$StudentDetail$viewTagBadge, priorityTags)),
													($elm$core$List$length(tags) > 3) ? A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-xs text-gray-400 font-medium')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															'+' + ($elm$core$String$fromInt(
																$elm$core$List$length(tags) - 3) + ' more'))
														])) : $elm$html$Html$text('')
												])) : $elm$html$Html$text(''))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex flex-col items-end gap-2')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-gray-400 text-sm')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													isExpanded ? '▲' : '▼')
												])),
											(isHovered && (!isExpanded)) ? A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href(chessComUrl),
													$elm$html$Html$Attributes$target('_blank'),
													$elm$html$Html$Attributes$class('text-xs text-gray-500 hover:text-gray-700 font-medium'),
													A2(
													$elm$html$Html$Events$stopPropagationOn,
													'click',
													$elm$json$Json$Decode$succeed(
														_Utils_Tuple2(
															$author$project$Pages$StudentDetail$HoverGame($elm$core$Maybe$Nothing),
															true)))
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Analyze →')
												])) : $elm$html$Html$text('')
										]))
								]))
						]))
				]));
	});
var $author$project$Pages$StudentDetail$viewDateGroup = F3(
	function (model, student, _v0) {
		var dateStr = _v0.a;
		var games = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('sticky top-0 z-10 py-3')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center gap-3')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('h-px flex-1 bg-gray-200')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-xs font-medium text-gray-400 px-2')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$author$project$Pages$StudentDetail$formatDateLabel(dateStr)),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('ml-1 text-gray-300')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													'· ' + ($elm$core$String$fromInt(
														$elm$core$List$length(games)) + ' games'))
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('h-px flex-1 bg-gray-200')
										]),
									_List_Nil)
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('space-y-2')
						]),
					A2(
						$elm$core$List$map,
						A2($author$project$Pages$StudentDetail$viewGameCard, model, student),
						games))
				]));
	});
var $author$project$Pages$StudentDetail$GoToPage = function (a) {
	return {$: 'GoToPage', a: a};
};
var $author$project$Pages$StudentDetail$viewPagination = F2(
	function (currentPage, totalPages) {
		var pages = (totalPages <= 7) ? A2($elm$core$List$range, 0, totalPages - 1) : ((currentPage < 3) ? A2($elm$core$List$range, 0, 6) : ((_Utils_cmp(currentPage, totalPages - 4) > 0) ? A2($elm$core$List$range, totalPages - 7, totalPages - 1) : A2($elm$core$List$range, currentPage - 3, currentPage + 3)));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-6 flex items-center justify-center gap-1')
				]),
			_Utils_ap(
				_List_fromArray(
					[
						(currentPage > 0) ? A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Pages$StudentDetail$GoToPage(currentPage - 1)),
								$elm$html$Html$Attributes$class('px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('← Prev')
							])) : $elm$html$Html$text('')
					]),
				_Utils_ap(
					A2(
						$elm$core$List$map,
						function (page) {
							return A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick(
										$author$project$Pages$StudentDetail$GoToPage(page)),
										$elm$html$Html$Attributes$class(
										_Utils_eq(page, currentPage) ? 'px-3 py-2 text-sm bg-gray-900 text-white rounded-lg font-medium' : 'px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(page + 1))
									]));
						},
						pages),
					_List_fromArray(
						[
							(_Utils_cmp(currentPage, totalPages - 1) < 0) ? A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick(
									$author$project$Pages$StudentDetail$GoToPage(currentPage + 1)),
									$elm$html$Html$Attributes$class('px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Next →')
								])) : $elm$html$Html$text('')
						]))));
	});
var $author$project$Pages$StudentDetail$viewGamesList = function (model) {
	var _v0 = model.games;
	switch (_v0.$) {
		case 'NotAsked':
			return $elm$html$Html$text('');
		case 'Loading':
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('space-y-3')
					]),
				A2(
					$elm$core$List$repeat,
					5,
					A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-xl border border-gray-200 p-4 animate-pulse')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center gap-4')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-16 h-8 bg-gray-200 rounded-lg')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex-1 space-y-2')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-48 h-4 bg-gray-200 rounded')
													]),
												_List_Nil),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-32 h-3 bg-gray-200 rounded')
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-16 h-6 bg-gray-200 rounded')
											]),
										_List_Nil)
									]))
							]))));
		case 'Failure':
			var error = _v0.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('bg-red-50 border border-red-200 rounded-xl p-6 text-red-600')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(error)
					]));
		default:
			var gamesData = _v0.a;
			var _v1 = model.student;
			if (_v1.$ === 'Success') {
				var student = _v1.a;
				var totalPages = $elm$core$Basics$ceiling(gamesData.total / model.limit);
				var filteredGames = A3(
					$author$project$Pages$StudentDetail$sortGames,
					model.sortOrder,
					student,
					A3($author$project$Pages$StudentDetail$filterByOpponentName, model.opponentSearch, student, gamesData.games));
				var groupedGames = $author$project$Pages$StudentDetail$groupGamesByDate(filteredGames);
				var currentPage = (model.offset / model.limit) | 0;
				return $elm$core$List$isEmpty(filteredGames) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-white rounded-xl border border-gray-200 p-12 text-center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-6xl mb-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('♟')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-gray-600 mb-2 font-medium')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('No games found')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm text-gray-400 mb-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Try adjusting your filters')
								])),
							$author$project$Pages$StudentDetail$hasActiveFilters(model) ? A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ClearAllFilters),
									$elm$html$Html$Attributes$class('text-sm text-gray-700 hover:text-gray-900 font-medium underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Clear all filters')
								])) : $elm$html$Html$text('')
						])) : A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mb-4')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-sm text-gray-500')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											'Showing ' + ($elm$core$String$fromInt(model.offset + 1) + ('-' + ($elm$core$String$fromInt(
												model.offset + $elm$core$List$length(filteredGames)) + (' of ' + ($elm$core$String$fromInt(gamesData.total) + ' games'))))))
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('space-y-6')
								]),
							A2(
								$elm$core$List$map,
								A2($author$project$Pages$StudentDetail$viewDateGroup, model, student),
								groupedGames)),
							(totalPages > 1) ? A2($author$project$Pages$StudentDetail$viewPagination, currentPage, totalPages) : $elm$html$Html$text('')
						]));
			} else {
				return $elm$html$Html$text('');
			}
	}
};
var $author$project$Pages$StudentDetail$AccuracyHigh = {$: 'AccuracyHigh'};
var $author$project$Pages$StudentDetail$AccuracyLow = {$: 'AccuracyLow'};
var $author$project$Pages$StudentDetail$DateOldest = {$: 'DateOldest'};
var $author$project$Pages$StudentDetail$OpponentRatingHigh = {$: 'OpponentRatingHigh'};
var $author$project$Pages$StudentDetail$OpponentRatingLow = {$: 'OpponentRatingLow'};
var $author$project$Pages$StudentDetail$SetSortOrder = function (a) {
	return {$: 'SetSortOrder', a: a};
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$Pages$StudentDetail$ClearAccuracy = {$: 'ClearAccuracy'};
var $author$project$Pages$StudentDetail$SetMaxAccuracy = function (a) {
	return {$: 'SetMaxAccuracy', a: a};
};
var $author$project$Pages$StudentDetail$SetMinAccuracy = function (a) {
	return {$: 'SetMinAccuracy', a: a};
};
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $author$project$Pages$StudentDetail$viewAccuracyFilter = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex items-center gap-2')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$input,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('number'),
						$elm$html$Html$Attributes$class('w-16 px-2 py-1.5 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark'),
						$elm$html$Html$Attributes$placeholder('Min'),
						$elm$html$Html$Attributes$min('0'),
						$elm$html$Html$Attributes$max('100'),
						$elm$html$Html$Attributes$value(
						A2(
							$elm$core$Maybe$withDefault,
							'',
							A2($elm$core$Maybe$map, $elm$core$String$fromInt, model.minAccuracy))),
						$elm$html$Html$Events$onInput($author$project$Pages$StudentDetail$SetMinAccuracy)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-gray-400 text-sm')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('–')
					])),
				A2(
				$elm$html$Html$input,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('number'),
						$elm$html$Html$Attributes$class('w-16 px-2 py-1.5 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark'),
						$elm$html$Html$Attributes$placeholder('Max'),
						$elm$html$Html$Attributes$min('0'),
						$elm$html$Html$Attributes$max('100'),
						$elm$html$Html$Attributes$value(
						A2(
							$elm$core$Maybe$withDefault,
							'',
							A2($elm$core$Maybe$map, $elm$core$String$fromInt, model.maxAccuracy))),
						$elm$html$Html$Events$onInput($author$project$Pages$StudentDetail$SetMaxAccuracy)
					]),
				_List_Nil),
				((!_Utils_eq(model.minAccuracy, $elm$core$Maybe$Nothing)) || (!_Utils_eq(model.maxAccuracy, $elm$core$Maybe$Nothing))) ? A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ClearAccuracy),
						$elm$html$Html$Attributes$class('text-xs text-gray-400 hover:text-gray-600')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Clear')
					])) : $elm$html$Html$text('')
			]));
};
var $author$project$Types$BlackOnly = {$: 'BlackOnly'};
var $author$project$Pages$StudentDetail$SetColorFilter = function (a) {
	return {$: 'SetColorFilter', a: a};
};
var $author$project$Types$WhiteOnly = {$: 'WhiteOnly'};
var $author$project$Pages$StudentDetail$viewRadioOption = F3(
	function (label, isSelected, msg) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(msg),
					$elm$html$Html$Attributes$class('w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-50')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							isSelected ? 'w-4 h-4 rounded-full border-2 border-gray-900 flex items-center justify-center' : 'w-4 h-4 rounded-full border-2 border-gray-300')
						]),
					_List_fromArray(
						[
							isSelected ? A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-2 h-2 rounded-full bg-gray-900')
								]),
							_List_Nil) : $elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							isSelected ? 'text-gray-900 font-medium' : 'text-gray-600')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $author$project$Pages$StudentDetail$viewColorFilter = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('space-y-1')
			]),
		_List_fromArray(
			[
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'All',
				_Utils_eq(model.colorFilter, $author$project$Types$AllColors),
				$author$project$Pages$StudentDetail$SetColorFilter($author$project$Types$AllColors)),
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'White',
				_Utils_eq(model.colorFilter, $author$project$Types$WhiteOnly),
				$author$project$Pages$StudentDetail$SetColorFilter($author$project$Types$WhiteOnly)),
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'Black',
				_Utils_eq(model.colorFilter, $author$project$Types$BlackOnly),
				$author$project$Pages$StudentDetail$SetColorFilter($author$project$Types$BlackOnly))
			]));
};
var $author$project$Pages$StudentDetail$ToggleFilterSection = function (a) {
	return {$: 'ToggleFilterSection', a: a};
};
var $author$project$Pages$StudentDetail$viewFilterSection = F5(
	function (model, sectionId, label, hasActiveFilter, content) {
		var isExpanded = A2($elm$core$Set$member, sectionId, model.expandedFilterSections);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('border-b border-gray-100 last:border-0')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick(
							$author$project$Pages$StudentDetail$ToggleFilterSection(sectionId)),
							$elm$html$Html$Attributes$class('w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 -mx-2 px-2 rounded')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center gap-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(label)
										])),
									hasActiveFilter ? A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('w-2 h-2 rounded-full bg-green-500')
										]),
									_List_Nil) : $elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-gray-400 text-xs')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									isExpanded ? '▼' : '▶')
								]))
						])),
					isExpanded ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('pb-3')
						]),
					_List_fromArray(
						[content])) : $elm$html$Html$text('')
				]));
	});
var $author$project$Pages$StudentDetail$SetOpponentRatingFilter = function (a) {
	return {$: 'SetOpponentRatingFilter', a: a};
};
var $author$project$Pages$StudentDetail$SetOpponentSearch = function (a) {
	return {$: 'SetOpponentSearch', a: a};
};
var $author$project$Pages$StudentDetail$viewOpponentFilter = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('space-y-3')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$input,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('text'),
						$elm$html$Html$Attributes$class('w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark'),
						$elm$html$Html$Attributes$placeholder('Search opponent...'),
						$elm$html$Html$Attributes$value(model.opponentSearch),
						$elm$html$Html$Events$onInput($author$project$Pages$StudentDetail$SetOpponentSearch)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('space-y-1')
					]),
				_List_fromArray(
					[
						A3(
						$author$project$Pages$StudentDetail$viewRadioOption,
						'Any rating',
						model.opponentRatingFilter === 'all',
						$author$project$Pages$StudentDetail$SetOpponentRatingFilter('all')),
						A3(
						$author$project$Pages$StudentDetail$viewRadioOption,
						'Higher rated',
						model.opponentRatingFilter === 'higher',
						$author$project$Pages$StudentDetail$SetOpponentRatingFilter('higher')),
						A3(
						$author$project$Pages$StudentDetail$viewRadioOption,
						'Lower rated',
						model.opponentRatingFilter === 'lower',
						$author$project$Pages$StudentDetail$SetOpponentRatingFilter('lower'))
					]))
			]));
};
var $author$project$Types$DrawsOnly = {$: 'DrawsOnly'};
var $author$project$Types$LossesOnly = {$: 'LossesOnly'};
var $author$project$Pages$StudentDetail$SetResultFilter = function (a) {
	return {$: 'SetResultFilter', a: a};
};
var $author$project$Types$WinsOnly = {$: 'WinsOnly'};
var $author$project$Pages$StudentDetail$viewResultFilter = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('space-y-1')
			]),
		_List_fromArray(
			[
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'All',
				_Utils_eq(model.resultFilter, $author$project$Types$AllResults),
				$author$project$Pages$StudentDetail$SetResultFilter($author$project$Types$AllResults)),
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'Wins',
				_Utils_eq(model.resultFilter, $author$project$Types$WinsOnly),
				$author$project$Pages$StudentDetail$SetResultFilter($author$project$Types$WinsOnly)),
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'Losses',
				_Utils_eq(model.resultFilter, $author$project$Types$LossesOnly),
				$author$project$Pages$StudentDetail$SetResultFilter($author$project$Types$LossesOnly)),
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'Draws',
				_Utils_eq(model.resultFilter, $author$project$Types$DrawsOnly),
				$author$project$Pages$StudentDetail$SetResultFilter($author$project$Types$DrawsOnly))
			]));
};
var $author$project$Pages$StudentDetail$ClearTags = {$: 'ClearTags'};
var $author$project$Pages$StudentDetail$groupTagsWithCountByCategory = function (tags) {
	var categories = $author$project$Pages$StudentDetail$unique(
		A2(
			$elm$core$List$map,
			function (tc) {
				return tc.tag.category;
			},
			tags));
	return A2(
		$elm$core$List$filter,
		function (_v0) {
			var tagList = _v0.b;
			return !$elm$core$List$isEmpty(tagList);
		},
		A2(
			$elm$core$List$map,
			function (cat) {
				return _Utils_Tuple2(
					cat,
					A2(
						$elm$core$List$filter,
						function (tc) {
							return _Utils_eq(tc.tag.category, cat);
						},
						tags));
			},
			categories));
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Char$toUpper = _Char_toUpper;
var $author$project$Pages$StudentDetail$capitalizeFirst = function (str) {
	var _v0 = $elm$core$String$uncons(str);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var first = _v1.a;
		var rest = _v1.b;
		return _Utils_ap(
			$elm$core$String$fromChar(
				$elm$core$Char$toUpper(first)),
			rest);
	} else {
		return str;
	}
};
var $author$project$Pages$StudentDetail$formatCategoryName = function (category) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$map,
			$author$project$Pages$StudentDetail$capitalizeFirst,
			$elm$core$String$words(
				A3($elm$core$String$replace, '_', ' ', category))));
};
var $author$project$Pages$StudentDetail$ToggleTag = function (a) {
	return {$: 'ToggleTag', a: a};
};
var $author$project$Pages$StudentDetail$viewFilterTagChip = F2(
	function (selectedTags, tc) {
		var isSelected = A2($elm$core$List$member, tc.tag.slug, selectedTags);
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(
					$author$project$Pages$StudentDetail$ToggleTag(tc.tag.slug)),
					$elm$html$Html$Attributes$class(
					isSelected ? 'px-2 py-1 text-xs rounded-full bg-gray-900 text-white transition-colors' : 'px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors'),
					$elm$html$Html$Attributes$title(
					A2($elm$core$Maybe$withDefault, tc.tag.name, tc.tag.description))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					tc.tag.name + (' (' + ($elm$core$String$fromInt(tc.count) + ')')))
				]));
	});
var $author$project$Pages$StudentDetail$viewFilterTagGroup = F2(
	function (selectedTags, _v0) {
		var category = _v0.a;
		var tags = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-xs font-medium text-gray-400 mb-1.5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$author$project$Pages$StudentDetail$formatCategoryName(category))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-wrap gap-1')
						]),
					A2(
						$elm$core$List$map,
						$author$project$Pages$StudentDetail$viewFilterTagChip(selectedTags),
						tags))
				]));
	});
var $author$project$Pages$StudentDetail$viewTagFilters = function (model) {
	var _v0 = model.tags;
	switch (_v0.$) {
		case 'Loading':
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-sm text-gray-400')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Loading...')
					]));
		case 'Failure':
			return $elm$html$Html$text('');
		case 'NotAsked':
			return $elm$html$Html$text('');
		default:
			var tagsWithCounts = _v0.a;
			var groupedTags = $author$project$Pages$StudentDetail$groupTagsWithCountByCategory(
				A2(
					$elm$core$List$sortBy,
					function (tc) {
						return -tc.count;
					},
					tagsWithCounts));
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						(!$elm$core$List$isEmpty(model.selectedTags)) ? A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex items-center justify-between mb-3')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-xs text-gray-500')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(
											$elm$core$List$length(model.selectedTags)) + ' selected')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ClearTags),
										$elm$html$Html$Attributes$class('text-xs text-red-600 hover:text-red-700')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Clear')
									]))
							])) : $elm$html$Html$text(''),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('space-y-3')
							]),
						A2(
							$elm$core$List$map,
							$author$project$Pages$StudentDetail$viewFilterTagGroup(model.selectedTags),
							groupedTags))
					]));
	}
};
var $author$project$Types$Blitz = {$: 'Blitz'};
var $author$project$Types$Bullet = {$: 'Bullet'};
var $author$project$Types$Rapid = {$: 'Rapid'};
var $author$project$Pages$StudentDetail$SetTimeControlFilter = function (a) {
	return {$: 'SetTimeControlFilter', a: a};
};
var $author$project$Pages$StudentDetail$viewTimeControlFilter = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('space-y-1')
			]),
		_List_fromArray(
			[
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'All',
				_Utils_eq(model.timeControlFilter, $author$project$Types$AllTimeControls),
				$author$project$Pages$StudentDetail$SetTimeControlFilter($author$project$Types$AllTimeControls)),
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'Bullet',
				_Utils_eq(model.timeControlFilter, $author$project$Types$Bullet),
				$author$project$Pages$StudentDetail$SetTimeControlFilter($author$project$Types$Bullet)),
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'Blitz',
				_Utils_eq(model.timeControlFilter, $author$project$Types$Blitz),
				$author$project$Pages$StudentDetail$SetTimeControlFilter($author$project$Types$Blitz)),
				A3(
				$author$project$Pages$StudentDetail$viewRadioOption,
				'Rapid',
				_Utils_eq(model.timeControlFilter, $author$project$Types$Rapid),
				$author$project$Pages$StudentDetail$SetTimeControlFilter($author$project$Types$Rapid))
			]));
};
var $author$project$Pages$StudentDetail$viewSidebar = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class(
				model.sidebarVisible ? 'fixed lg:sticky inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 lg:top-0 lg:h-screen shadow-lg lg:shadow-none' : 'fixed lg:sticky inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform -translate-x-full lg:translate-x-0 transition-transform duration-200 lg:top-0 lg:h-screen')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('h-full overflow-y-auto p-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('lg:hidden flex justify-between items-center mb-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('font-semibold text-gray-900')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Filters')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ToggleSidebar),
										$elm$html$Html$Attributes$class('text-gray-400 hover:text-gray-600 p-1')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('✕')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex items-center justify-between mb-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-xs font-semibold text-gray-400 uppercase tracking-wide')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Filters')
											])),
										($author$project$Pages$StudentDetail$countActiveFilters(model) > 0) ? A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded-full font-medium')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$elm$core$String$fromInt(
													$author$project$Pages$StudentDetail$countActiveFilters(model)))
											])) : $elm$html$Html$text('')
									])),
								$author$project$Pages$StudentDetail$hasActiveFilters(model) ? A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ClearAllFilters),
										$elm$html$Html$Attributes$class('text-xs text-red-600 hover:text-red-700 font-medium')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Clear all')
									])) : $elm$html$Html$text('')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('space-y-1')
							]),
						_List_fromArray(
							[
								A5(
								$author$project$Pages$StudentDetail$viewFilterSection,
								model,
								'result',
								'Result',
								!_Utils_eq(model.resultFilter, $author$project$Types$AllResults),
								$author$project$Pages$StudentDetail$viewResultFilter(model)),
								A5(
								$author$project$Pages$StudentDetail$viewFilterSection,
								model,
								'timeControl',
								'Time Control',
								!_Utils_eq(model.timeControlFilter, $author$project$Types$AllTimeControls),
								$author$project$Pages$StudentDetail$viewTimeControlFilter(model)),
								A5(
								$author$project$Pages$StudentDetail$viewFilterSection,
								model,
								'color',
								'Played As',
								!_Utils_eq(model.colorFilter, $author$project$Types$AllColors),
								$author$project$Pages$StudentDetail$viewColorFilter(model)),
								A5(
								$author$project$Pages$StudentDetail$viewFilterSection,
								model,
								'accuracy',
								'Accuracy',
								(!_Utils_eq(model.minAccuracy, $elm$core$Maybe$Nothing)) || (!_Utils_eq(model.maxAccuracy, $elm$core$Maybe$Nothing)),
								$author$project$Pages$StudentDetail$viewAccuracyFilter(model)),
								A5(
								$author$project$Pages$StudentDetail$viewFilterSection,
								model,
								'opponent',
								'Opponent',
								(model.opponentRatingFilter !== 'all') || (model.opponentSearch !== ''),
								$author$project$Pages$StudentDetail$viewOpponentFilter(model)),
								A5(
								$author$project$Pages$StudentDetail$viewFilterSection,
								model,
								'tags',
								'Tags',
								!$elm$core$List$isEmpty(model.selectedTags),
								$author$project$Pages$StudentDetail$viewTagFilters(model))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mt-6 pt-4 border-t border-gray-100')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Sort By')
									])),
								A2(
								$elm$html$Html$select,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark'),
										$elm$html$Html$Events$onInput(
										function (str) {
											switch (str) {
												case 'date-newest':
													return $author$project$Pages$StudentDetail$SetSortOrder($author$project$Pages$StudentDetail$DateNewest);
												case 'date-oldest':
													return $author$project$Pages$StudentDetail$SetSortOrder($author$project$Pages$StudentDetail$DateOldest);
												case 'accuracy-high':
													return $author$project$Pages$StudentDetail$SetSortOrder($author$project$Pages$StudentDetail$AccuracyHigh);
												case 'accuracy-low':
													return $author$project$Pages$StudentDetail$SetSortOrder($author$project$Pages$StudentDetail$AccuracyLow);
												case 'rating-high':
													return $author$project$Pages$StudentDetail$SetSortOrder($author$project$Pages$StudentDetail$OpponentRatingHigh);
												case 'rating-low':
													return $author$project$Pages$StudentDetail$SetSortOrder($author$project$Pages$StudentDetail$OpponentRatingLow);
												default:
													return $author$project$Pages$StudentDetail$SetSortOrder($author$project$Pages$StudentDetail$DateNewest);
											}
										})
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('date-newest'),
												$elm$html$Html$Attributes$selected(
												_Utils_eq(model.sortOrder, $author$project$Pages$StudentDetail$DateNewest))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Date (Newest)')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('date-oldest'),
												$elm$html$Html$Attributes$selected(
												_Utils_eq(model.sortOrder, $author$project$Pages$StudentDetail$DateOldest))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Date (Oldest)')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('accuracy-high'),
												$elm$html$Html$Attributes$selected(
												_Utils_eq(model.sortOrder, $author$project$Pages$StudentDetail$AccuracyHigh))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Accuracy (High)')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('accuracy-low'),
												$elm$html$Html$Attributes$selected(
												_Utils_eq(model.sortOrder, $author$project$Pages$StudentDetail$AccuracyLow))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Accuracy (Low)')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('rating-high'),
												$elm$html$Html$Attributes$selected(
												_Utils_eq(model.sortOrder, $author$project$Pages$StudentDetail$OpponentRatingHigh))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Opp. Rating (High)')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('rating-low'),
												$elm$html$Html$Attributes$selected(
												_Utils_eq(model.sortOrder, $author$project$Pages$StudentDetail$OpponentRatingLow))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Opp. Rating (Low)')
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Pages$StudentDetail$calculateStats = F2(
	function (student, games) {
		var studentUsernames = A2(
			$elm$core$List$map,
			$elm$core$String$toLower,
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[student.chessComUsername])));
		var isWin = function (g) {
			var isWhite = A2(
				$elm$core$List$member,
				$elm$core$String$toLower(g.game.whiteUsername),
				studentUsernames);
			return (isWhite && (g.game.result === '1-0')) || ((!isWhite) && (g.game.result === '0-1'));
		};
		var isLoss = function (g) {
			var isWhite = A2(
				$elm$core$List$member,
				$elm$core$String$toLower(g.game.whiteUsername),
				studentUsernames);
			return (isWhite && (g.game.result === '0-1')) || ((!isWhite) && (g.game.result === '1-0'));
		};
		var accuracies = A2(
			$elm$core$List$filterMap,
			function (g) {
				return A2(
					$elm$core$Maybe$andThen,
					function ($) {
						return $.accuracyOverall;
					},
					g.insight);
			},
			games);
		var avgAcc = $elm$core$List$isEmpty(accuracies) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			$elm$core$List$sum(accuracies) / $elm$core$List$length(accuracies));
		return {
			avgAccuracy: avgAcc,
			draws: $elm$core$List$length(
				A2(
					$elm$core$List$filter,
					function (g) {
						return g.game.result === '1/2-1/2';
					},
					games)),
			losses: $elm$core$List$length(
				A2($elm$core$List$filter, isLoss, games)),
			total: $elm$core$List$length(games),
			wins: $elm$core$List$length(
				A2($elm$core$List$filter, isWin, games))
		};
	});
var $author$project$Pages$StudentDetail$viewStatsHeader = function (model) {
	var _v0 = _Utils_Tuple2(model.student, model.games);
	if ((_v0.a.$ === 'Success') && (_v0.b.$ === 'Success')) {
		var student = _v0.a.a;
		var gamesData = _v0.b.a;
		var stats = A2($author$project$Pages$StudentDetail$calculateStats, student, gamesData.games);
		var totalGames = (stats.wins + stats.losses) + stats.draws;
		var winPercent = (totalGames > 0) ? ((stats.wins / totalGames) * 100) : 0;
		var lossPercent = (totalGames > 0) ? ((stats.losses / totalGames) * 100) : 0;
		var drawPercent = (totalGames > 0) ? ((stats.draws / totalGames) * 100) : 0;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-6 bg-white rounded-xl shadow-card p-5')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('grid grid-cols-3 gap-6')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-2xl font-bold text-gray-900')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$fromInt(gamesData.total))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-xs text-gray-500 mt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Games')
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center')
								]),
							_List_fromArray(
								[
									function () {
									var _v1 = stats.avgAccuracy;
									if (_v1.$ === 'Just') {
										var acc = _v1.a;
										var colors = $author$project$Pages$StudentDetail$accuracyColors(acc);
										return A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-2xl font-bold ' + colors.text)
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromInt(
																$elm$core$Basics$round(acc)) + '%')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-xs text-gray-500 mt-1')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Accuracy')
														]))
												]));
									} else {
										return A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-2xl font-bold text-gray-300')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('—')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-xs text-gray-500 mt-1')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Accuracy')
														]))
												]));
									}
								}()
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-2xl font-bold text-gray-900')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											(totalGames > 0) ? ($elm$core$String$fromInt(
												$elm$core$Basics$round(winPercent)) + '%') : '—')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-xs text-gray-500 mt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Win Rate')
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-5 pt-4 border-t border-gray-100')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('h-3 rounded-full overflow-hidden bg-gray-100 flex')
								]),
							_List_fromArray(
								[
									(winPercent > 0) ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('bg-green-500 transition-all'),
											A2(
											$elm$html$Html$Attributes$style,
											'width',
											$elm$core$String$fromFloat(winPercent) + '%'),
											$elm$html$Html$Attributes$title(
											$elm$core$String$fromInt(
												$elm$core$Basics$round(winPercent)) + '% wins')
										]),
									_List_Nil) : $elm$html$Html$text(''),
									(drawPercent > 0) ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('bg-gray-400 transition-all'),
											A2(
											$elm$html$Html$Attributes$style,
											'width',
											$elm$core$String$fromFloat(drawPercent) + '%'),
											$elm$html$Html$Attributes$title(
											$elm$core$String$fromInt(
												$elm$core$Basics$round(drawPercent)) + '% draws')
										]),
									_List_Nil) : $elm$html$Html$text(''),
									(lossPercent > 0) ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('bg-red-500 transition-all'),
											A2(
											$elm$html$Html$Attributes$style,
											'width',
											$elm$core$String$fromFloat(lossPercent) + '%'),
											$elm$html$Html$Attributes$title(
											$elm$core$String$fromInt(
												$elm$core$Basics$round(lossPercent)) + '% losses')
										]),
									_List_Nil) : $elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex justify-between text-xs mt-2 font-medium')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-green-600')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$fromInt(stats.wins) + ' wins')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-gray-500')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$fromInt(stats.draws) + ' draws')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-red-600')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$fromInt(stats.losses) + ' losses')
										]))
								]))
						]))
				]));
	} else {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-6 bg-white rounded-xl shadow-card p-5 animate-pulse')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('grid grid-cols-3 gap-6')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('h-8 w-12 bg-gray-200 rounded mx-auto mb-2')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('h-3 w-16 bg-gray-200 rounded mx-auto')
										]),
									_List_Nil)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('h-8 w-12 bg-gray-200 rounded mx-auto mb-2')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('h-3 w-16 bg-gray-200 rounded mx-auto')
										]),
									_List_Nil)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('h-8 w-12 bg-gray-200 rounded mx-auto mb-2')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('h-3 w-16 bg-gray-200 rounded mx-auto')
										]),
									_List_Nil)
								]))
						]))
				]));
	}
};
var $author$project$Pages$StudentDetail$UnarchiveStudent = {$: 'UnarchiveStudent'};
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $author$project$Pages$StudentDetail$SetTimeRangeFilter = function (a) {
	return {$: 'SetTimeRangeFilter', a: a};
};
var $author$project$Pages$StudentDetail$viewTimeRangeFilter = function (currentFilter) {
	var pillButton = F2(
		function (filter, label) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$Pages$StudentDetail$SetTimeRangeFilter(filter)),
						$elm$html$Html$Attributes$class(
						_Utils_eq(currentFilter, filter) ? 'px-4 py-2 text-sm font-medium rounded-full bg-gray-900 text-white transition-colors' : 'px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(label)
					]));
		});
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex items-center gap-2')
			]),
		_List_fromArray(
			[
				A2(pillButton, $author$project$Types$Last7Days, 'Last 7 days'),
				A2(pillButton, $author$project$Types$Last30Days, 'Last 30 days')
			]));
};
var $author$project$Pages$StudentDetail$viewStudentHeader = F2(
	function (model, studentData) {
		switch (studentData.$) {
			case 'Loading':
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-6 animate-pulse')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center gap-4')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('w-16 h-16 bg-gray-200 rounded-full')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('space-y-2')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('w-40 h-6 bg-gray-200 rounded')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('w-28 h-4 bg-gray-200 rounded')
												]),
											_List_Nil)
										]))
								]))
						]));
			case 'Failure':
				var error = studentData.a;
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-6 bg-red-50 border border-red-200 rounded-lg p-4')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-red-600')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(error)
								]))
						]));
			case 'NotAsked':
				return $elm$html$Html$text('');
			default:
				var student = studentData.a;
				var isArchived = !_Utils_eq(student.archivedAt, $elm$core$Maybe$Nothing);
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-6')
						]),
					_List_fromArray(
						[
							isArchived ? A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mb-4 bg-gray-100 border border-gray-200 rounded-lg p-4 flex items-center justify-between')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex items-center gap-2')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-gray-600')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('This student is archived. Games are not being imported or analyzed.')
												]))
										])),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$UnarchiveStudent),
											$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors'),
											$elm$html$Html$Attributes$disabled(model.archivingStudent)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											model.archivingStudent ? 'Unarchiving...' : 'Unarchive Student')
										]))
								])) : $elm$html$Html$text(''),
							A2(
							$elm$html$Html$nav,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center gap-2 text-sm mb-4')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$author$project$Route$href($author$project$Route$Dashboard),
											$elm$html$Html$Attributes$class('text-anthro-gray hover:text-anthro-dark')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Dashboard')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-anthro-gray-light')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('/')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-anthro-dark font-medium')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(student.displayName)
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center justify-between')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex items-center gap-4')
										]),
									_List_fromArray(
										[
											function () {
											var _v1 = student.avatarUrl;
											if (_v1.$ === 'Just') {
												var url = _v1.a;
												return A2(
													$elm$html$Html$img,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$src(url),
															$elm$html$Html$Attributes$class(
															'w-16 h-16 rounded-full border-2 border-gray-200 shadow-sm' + (isArchived ? ' grayscale opacity-75' : '')),
															$elm$html$Html$Attributes$alt(student.displayName)
														]),
													_List_Nil);
											} else {
												return A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl text-gray-600 font-semibold shadow-sm')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$toUpper(
																A2($elm$core$String$left, 1, student.displayName)))
														]));
											}
										}(),
											A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('flex items-center gap-2')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$h1,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('text-2xl font-bold text-gray-900')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(student.displayName)
																])),
															isArchived ? A2(
															$elm$html$Html$span,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('px-2 py-0.5 text-xs font-medium rounded bg-gray-200 text-gray-600')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Archived')
																])) : $elm$html$Html$text('')
														])),
													function () {
													var _v2 = student.chessComUsername;
													if (_v2.$ === 'Just') {
														var username = _v2.a;
														return A2(
															$elm$html$Html$a,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$href('https://www.chess.com/member/' + username),
																	$elm$html$Html$Attributes$target('_blank'),
																	$elm$html$Html$Attributes$class('text-sm text-gray-500 hover:text-gray-700')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('@' + username)
																]));
													} else {
														return $elm$html$Html$text('');
													}
												}()
												]))
										])),
									$author$project$Pages$StudentDetail$viewTimeRangeFilter(model.timeRangeFilter)
								]))
						]));
		}
	});
var $author$project$Pages$StudentDetail$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lg:hidden fixed bottom-4 left-4 z-40')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ToggleSidebar),
								$elm$html$Html$Attributes$class('bg-gray-900 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Filters'),
								($author$project$Pages$StudentDetail$countActiveFilters(model) > 0) ? A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bg-white text-gray-900 text-xs px-2 py-0.5 rounded-full font-medium')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(
											$author$project$Pages$StudentDetail$countActiveFilters(model)))
									])) : $elm$html$Html$text('')
							]))
					])),
				model.sidebarVisible ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lg:hidden fixed inset-0 bg-black/50 z-30'),
						$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ToggleSidebar)
					]),
				_List_Nil) : $elm$html$Html$text(''),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex')
					]),
				_List_fromArray(
					[
						$author$project$Pages$StudentDetail$viewSidebar(model),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex-1 min-w-0 p-4 lg:p-6')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('max-w-4xl mx-auto')
									]),
								_List_fromArray(
									[
										A2($author$project$Pages$StudentDetail$viewStudentHeader, model, model.student),
										$author$project$Pages$StudentDetail$viewStatsHeader(model),
										$author$project$Pages$StudentDetail$viewGamesList(model)
									]))
							]))
					]))
			]));
};
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Pages$Subscription$viewPlanFeatures = function (plan) {
	var features = function () {
		var _v0 = plan.name;
		switch (_v0) {
			case 'coach':
				return _List_fromArray(
					[
						'Up to ' + ($elm$core$String$fromInt(plan.studentLimit) + ' students'),
						'Game import from Chess.com',
						'AI-powered game analysis',
						'Student progress tracking'
					]);
			case 'academy':
				return _List_fromArray(
					[
						'Up to ' + ($elm$core$String$fromInt(plan.studentLimit) + ' students'),
						'Everything in Coach plan',
						'Priority support'
					]);
			default:
				return _List_fromArray(
					[
						'Up to ' + ($elm$core$String$fromInt(plan.studentLimit) + ' students')
					]);
		}
	}();
	return A2(
		$elm$html$Html$ul,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mt-3 space-y-1')
			]),
		A2(
			$elm$core$List$map,
			function (feature) {
				return A2(
					$elm$html$Html$li,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-sm text-anthro-gray flex items-center gap-2')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-green-500')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('✓')
								])),
							$elm$html$Html$text(feature)
						]));
			},
			features));
};
var $author$project$Pages$Subscription$viewPlanPricing = function (plan) {
	if (plan.monthlyPriceCents > 0) {
		var monthlyPrice = (plan.monthlyPriceCents / 100) | 0;
		var annualPrice = (plan.annualPriceCents / 100) | 0;
		var savings = (monthlyPrice * 12) - annualPrice;
		var annualMonthly = (annualPrice / 12) | 0;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-3 space-y-1')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-baseline gap-2')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-lg font-semibold text-anthro-dark')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'$' + $elm$core$String$fromInt(monthlyPrice))
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm text-anthro-gray')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('/month')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-baseline gap-2')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-lg font-semibold text-anthro-dark')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'$' + $elm$core$String$fromInt(annualPrice))
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm text-anthro-gray')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('/year')
								])),
							(savings > 0) ? A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'Save $' + $elm$core$String$fromInt(savings))
								])) : $elm$html$Html$text('')
						]))
				]));
	} else {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-sm text-green-600 mt-2')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Free')
				]));
	}
};
var $author$project$Pages$Subscription$viewPlanCard = F2(
	function (maybeCurrentPlan, plan) {
		var isCurrentPlan = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				function (current) {
					return _Utils_eq(plan.name, current.name);
				},
				maybeCurrentPlan));
		var borderClass = isCurrentPlan ? 'border-2 border-anthro-orange' : 'border border-gray-200';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('rounded-lg p-4 ' + borderClass)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex justify-between items-start')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h4,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('font-semibold text-anthro-dark')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(plan.displayName)
								])),
							isCurrentPlan ? A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-xs bg-anthro-orange text-white px-2 py-0.5 rounded-full')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Current')
								])) : $elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-2xl font-bold text-anthro-dark mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(plan.studentLimit)),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm font-normal text-anthro-gray')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(' students')
								]))
						])),
					$author$project$Pages$Subscription$viewPlanPricing(plan),
					$author$project$Pages$Subscription$viewPlanFeatures(plan)
				]));
	});
var $author$project$Pages$Subscription$viewAvailablePlans = F2(
	function (model, maybeCurrentPlan) {
		var _v0 = model.plans;
		switch (_v0.$) {
			case 'Success':
				var plans = _v0.a;
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-white rounded-lg shadow-sm border border-gray-200 p-6')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h3,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-lg font-semibold text-anthro-dark mb-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Available Plans')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('grid grid-cols-1 md:grid-cols-2 gap-4')
								]),
							A2(
								$elm$core$List$map,
								$author$project$Pages$Subscription$viewPlanCard(maybeCurrentPlan),
								plans))
						]));
			case 'Loading':
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-white rounded-lg shadow-sm border border-gray-200 p-6')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h3,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-lg font-semibold text-anthro-dark mb-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Available Plans')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-anthro-gray text-center py-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Loading plans...')
								]))
						]));
			default:
				return $elm$html$Html$text('');
		}
	});
var $author$project$Pages$Subscription$capitalize = function (str) {
	return _Utils_ap(
		$elm$core$String$toUpper(
			A2($elm$core$String$left, 1, str)),
		A2($elm$core$String$dropLeft, 1, str));
};
var $author$project$Pages$Subscription$formatInterval = function (interval) {
	switch (interval) {
		case 'month':
			return 'Monthly';
		case 'year':
			return 'Annual';
		default:
			return $author$project$Pages$Subscription$capitalize(interval);
	}
};
var $author$project$Pages$Subscription$formatDate = function (isoDate) {
	return A2($elm$core$String$left, 10, isoDate);
};
var $author$project$Pages$Subscription$viewBillingInfo = function (maybeDetails) {
	if (maybeDetails.$ === 'Just') {
		var details = maybeDetails.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 text-sm text-anthro-gray')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex justify-between')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Billing period')
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('font-medium text-anthro-dark')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$Pages$Subscription$capitalize(
										A2($elm$core$Maybe$withDefault, 'monthly', details.planInterval)))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex justify-between mt-2')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Current period ends')
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('font-medium text-anthro-dark')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$Pages$Subscription$formatDate(details.currentPeriodEnd))
								]))
						])),
					details.cancelAtPeriodEnd ? A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-3 text-yellow-700 bg-yellow-50 p-2 rounded')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Your subscription will end at the end of the current period.')
						])) : $elm$html$Html$text('')
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Pages$Subscription$viewStatusBadge = F2(
	function (status, maybeDetails) {
		var isCancelling = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.cancelAtPeriodEnd;
				},
				maybeDetails));
		var _v0 = function () {
			if (isCancelling) {
				return _Utils_Tuple2('bg-yellow-100 text-yellow-800', 'Cancelling');
			} else {
				switch (status.$) {
					case 'Trialing':
						return _Utils_Tuple2('bg-blue-100 text-blue-800', 'Trial');
					case 'Active':
						return _Utils_Tuple2('bg-green-100 text-green-800', 'Active');
					case 'PastDue':
						return _Utils_Tuple2('bg-yellow-100 text-yellow-800', 'Payment Due');
					case 'Cancelled':
						return _Utils_Tuple2('bg-gray-100 text-gray-800', 'Cancelled');
					default:
						return _Utils_Tuple2('bg-red-100 text-red-800', 'Expired');
				}
			}
		}();
		var badgeClass = _v0.a;
		var badgeText = _v0.b;
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ' + badgeClass)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(badgeText)
				]));
	});
var $author$project$Pages$Subscription$viewTrialInfo = function (maybeDetails) {
	if (maybeDetails.$ === 'Just') {
		var details = maybeDetails.a;
		return details.cancelAtPeriodEnd ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 p-4 bg-yellow-50 rounded-lg')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-yellow-800 font-medium')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Cancellation Scheduled')
								]))
						])),
					function () {
					var _v1 = details.trialEnd;
					if (_v1.$ === 'Just') {
						var endsAt = _v1.a;
						return A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm text-yellow-700 mt-1')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'Your subscription will end on ' + $author$project$Pages$Subscription$formatDate(endsAt))
								]));
					} else {
						var _v2 = details.currentPeriodEnd;
						if (_v2 === '') {
							return $elm$html$Html$text('');
						} else {
							var periodEnd = _v2;
							return A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm text-yellow-700 mt-1')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										'Your subscription will end on ' + $author$project$Pages$Subscription$formatDate(periodEnd))
									]));
						}
					}
				}()
				])) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 p-4 bg-blue-50 rounded-lg')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-blue-800 font-medium')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Free Trial')
								]))
						])),
					function () {
					var _v3 = details.trialEnd;
					if (_v3.$ === 'Just') {
						var endsAt = _v3.a;
						return A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm text-blue-700 mt-1')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'Trial ends: ' + $author$project$Pages$Subscription$formatDate(endsAt))
								]));
					} else {
						return $elm$html$Html$text('');
					}
				}(),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-sm text-blue-600 mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Add a payment method to continue after your trial ends.')
						]))
				]));
	} else {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 p-4 bg-blue-50 rounded-lg')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-blue-800 font-medium')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Free Trial')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-sm text-blue-600 mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Add a payment method to continue after your trial ends.')
						]))
				]));
	}
};
var $author$project$Pages$Subscription$viewCurrentPlan = function (userInfo) {
	var sub = userInfo.subscription;
	var studentLimit = A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.studentLimit;
			},
			userInfo.plan));
	var planName = A2(
		$elm$core$Maybe$withDefault,
		'Free',
		A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.displayName;
			},
			userInfo.plan));
	var billingPeriod = A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$author$project$Pages$Subscription$formatInterval,
			A2(
				$elm$core$Maybe$andThen,
				function ($) {
					return $.planInterval;
				},
				userInfo.details)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-white rounded-lg shadow-sm border border-gray-200 p-6')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex justify-between items-start mb-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h2,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-lg font-semibold text-anthro-dark')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Current Plan')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center gap-3 mt-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-2xl font-bold text-anthro-dark')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(planName)
											])),
										A2($author$project$Pages$Subscription$viewStatusBadge, sub.status, userInfo.details),
										(billingPeriod !== '') ? A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-sm text-anthro-gray bg-gray-100 px-2 py-0.5 rounded')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(billingPeriod)
											])) : $elm$html$Html$text('')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-right')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm text-anthro-gray')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Student limit')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-2xl font-bold text-anthro-dark')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(studentLimit))
									]))
							]))
					])),
				function () {
				var _v0 = sub.status;
				if (_v0.$ === 'Trialing') {
					return $author$project$Pages$Subscription$viewTrialInfo(userInfo.details);
				} else {
					return $author$project$Pages$Subscription$viewBillingInfo(userInfo.details);
				}
			}()
			]));
};
var $author$project$Pages$Subscription$OpenBillingPortal = {$: 'OpenBillingPortal'};
var $author$project$Pages$Subscription$viewManageButton = F2(
	function (model, sub) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('bg-white rounded-lg shadow-sm border border-gray-200 p-6')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h3,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-lg font-semibold text-anthro-dark mb-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Manage Your Subscription')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-sm text-anthro-gray mb-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Change your plan, update payment methods, view invoices, or cancel your subscription.')
						])),
					(sub.stripeCustomerId !== 'local_dev') ? A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('w-full px-4 py-3 bg-anthro-dark text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 font-medium'),
							$elm$html$Html$Events$onClick($author$project$Pages$Subscription$OpenBillingPortal),
							$elm$html$Html$Attributes$disabled(model.isLoading)
						]),
					_List_fromArray(
						[
							model.isLoading ? $elm$html$Html$text('Opening...') : $elm$html$Html$text('Manage Subscription')
						])) : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-sm text-anthro-gray bg-gray-50 p-3 rounded-lg')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Billing portal not available in development mode.')
						]))
				]));
	});
var $author$project$Pages$Subscription$viewContent = F2(
	function (model, userInfo) {
		var sub = userInfo.subscription;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('space-y-6')
				]),
			_List_fromArray(
				[
					$author$project$Pages$Subscription$viewCurrentPlan(userInfo),
					A2($author$project$Pages$Subscription$viewAvailablePlans, model, userInfo.plan),
					A2($author$project$Pages$Subscription$viewManageButton, model, sub)
				]));
	});
var $author$project$Pages$Subscription$DismissError = {$: 'DismissError'};
var $author$project$Pages$Subscription$viewError = function (model) {
	var _v0 = model.error;
	if (_v0.$ === 'Just') {
		var err = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-red-800')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(err)
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-red-600 hover:text-red-800'),
							$elm$html$Html$Events$onClick($author$project$Pages$Subscription$DismissError)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Dismiss')
						]))
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Pages$Subscription$viewHeader = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mb-8')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-2xl font-bold text-anthro-dark')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Subscription')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-anthro-gray mt-2')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('View your plan and manage your subscription')
				]))
		]));
var $author$project$Pages$Subscription$viewLoadError = function (err) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-red-50 border border-red-200 rounded-lg p-6 text-center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-red-800')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(err)
					]))
			]));
};
var $author$project$Pages$Subscription$viewLoading = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('flex justify-center items-center py-12')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-anthro-gray')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Loading subscription...')
				]))
		]));
var $author$project$Pages$Subscription$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('max-w-4xl mx-auto')
			]),
		_List_fromArray(
			[
				$author$project$Pages$Subscription$viewHeader,
				$author$project$Pages$Subscription$viewError(model),
				function () {
				var _v0 = model.subscription;
				switch (_v0.$) {
					case 'NotAsked':
						return $elm$html$Html$text('');
					case 'Loading':
						return $author$project$Pages$Subscription$viewLoading;
					case 'Failure':
						var err = _v0.a;
						return $author$project$Pages$Subscription$viewLoadError(err);
					default:
						var sub = _v0.a;
						return A2($author$project$Pages$Subscription$viewContent, model, sub);
				}
			}()
			]));
};
var $author$project$Pages$VerifyEmail$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen flex items-center justify-center bg-anthro-light')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-md w-full mx-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-2xl shadow-card p-8')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col items-center mb-8')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex items-center gap-3 mb-2')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-10 h-10 rounded grid grid-cols-2 grid-rows-2 overflow-hidden')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-dark')
															]),
														_List_Nil),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('bg-anthro-orange')
															]),
														_List_Nil)
													])),
												A2(
												$elm$html$Html$h1,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-2xl font-semibold text-anthro-dark tracking-tight')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Insights64')
													]))
											]))
									])),
								function () {
								var _v0 = model.status;
								switch (_v0.$) {
									case 'Verifying':
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-center')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('mb-4')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('animate-spin rounded-full h-12 w-12 border-b-2 border-anthro-dark mx-auto')
																]),
															_List_Nil)
														])),
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-gray-600')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Verifying your email...')
														]))
												]));
									case 'Verified':
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-center')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$span,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('text-3xl')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('\u2705')
																]))
														])),
													A2(
													$elm$html$Html$h2,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-xl font-semibold text-gray-900 mb-2')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Email Verified!')
														])),
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-gray-600 mb-6')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Your email has been successfully verified.')
														])),
													A2(
													$elm$html$Html$a,
													_List_fromArray(
														[
															$author$project$Route$href($author$project$Route$Dashboard),
															$elm$html$Html$Attributes$class('inline-block bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Go to Dashboard')
														]))
												]));
									default:
										var errorMsg = _v0.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-center')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$span,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('text-3xl')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('\u274C')
																]))
														])),
													A2(
													$elm$html$Html$h2,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-xl font-semibold text-gray-900 mb-2')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Verification Failed')
														])),
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-gray-600 mb-6')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(errorMsg)
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('space-y-3')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$a,
															_List_fromArray(
																[
																	$author$project$Route$href($author$project$Route$Login),
																	$elm$html$Html$Attributes$class('block bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Go to Login')
																])),
															A2(
															$elm$html$Html$p,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('text-sm text-gray-500')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('You can request a new verification email after logging in.')
																]))
														]))
												]));
								}
							}()
							]))
					]))
			]));
};
var $author$project$Main$viewNotFound = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('min-h-screen flex items-center justify-center bg-cream')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-6xl text-gray-300 mb-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('N')
						])),
					A2(
					$elm$html$Html$h1,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-2xl font-bold text-gray-900 mb-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Page Not Found')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-gray-600 mb-6')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('The page you\'re looking for doesn\'t exist.')
						])),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$author$project$Route$href($author$project$Route$Dashboard),
							$elm$html$Html$Attributes$class('inline-block bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-subtle hover:shadow-card')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Go to Dashboard')
						]))
				]))
		]));
var $author$project$Main$view = function (model) {
	return {
		body: _List_fromArray(
			[
				function () {
				var _v0 = model.page;
				switch (_v0.$) {
					case 'LoginPage':
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$LoginMsg,
							$author$project$Pages$Login$view(subModel));
					case 'RegisterPage':
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$RegisterMsg,
							$author$project$Pages$Register$view(subModel));
					case 'DashboardPage':
						var subModel = _v0.a;
						var _v1 = model.session;
						if (_v1.$ === 'LoggedIn') {
							var token = _v1.a;
							var coach = _v1.b;
							return $author$project$View$Layout$layout(
								{
									coach: coach,
									content: A2(
										$elm$html$Html$map,
										$author$project$Main$DashboardMsg,
										A3($author$project$Pages$Dashboard$view, model.apiUrl, token, subModel)),
									onLogout: $author$project$Main$Logout
								});
						} else {
							return $elm$html$Html$text('');
						}
					case 'StudentDetailPage':
						var subModel = _v0.a;
						var _v2 = model.session;
						if (_v2.$ === 'LoggedIn') {
							var coach = _v2.b;
							return $author$project$View$Layout$layout(
								{
									coach: coach,
									content: A2(
										$elm$html$Html$map,
										$author$project$Main$StudentDetailMsg,
										$author$project$Pages$StudentDetail$view(subModel)),
									onLogout: $author$project$Main$Logout
								});
						} else {
							return $elm$html$Html$text('');
						}
					case 'GameDetailPage':
						var subModel = _v0.a;
						var _v3 = model.session;
						if (_v3.$ === 'LoggedIn') {
							var coach = _v3.b;
							return $author$project$View$Layout$layout(
								{
									coach: coach,
									content: A2(
										$elm$html$Html$map,
										$author$project$Main$GameDetailMsg,
										$author$project$Pages$GameDetail$view(subModel)),
									onLogout: $author$project$Main$Logout
								});
						} else {
							return $elm$html$Html$text('');
						}
					case 'SubscriptionPage':
						var subModel = _v0.a;
						var _v4 = model.session;
						if (_v4.$ === 'LoggedIn') {
							var coach = _v4.b;
							return $author$project$View$Layout$layout(
								{
									coach: coach,
									content: A2(
										$elm$html$Html$map,
										$author$project$Main$SubscriptionMsg,
										$author$project$Pages$Subscription$view(subModel)),
									onLogout: $author$project$Main$Logout
								});
						} else {
							return $elm$html$Html$text('');
						}
					case 'ForgotPasswordPage':
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForgotPasswordMsg,
							$author$project$Pages$ForgotPassword$view(subModel));
					case 'ResetPasswordPage':
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ResetPasswordMsg,
							$author$project$Pages$ResetPassword$view(subModel));
					case 'VerifyEmailPage':
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VerifyEmailMsg,
							$author$project$Pages$VerifyEmail$view(subModel));
					case 'EmailPreferencesPage':
						var subModel = _v0.a;
						var _v5 = model.session;
						if (_v5.$ === 'LoggedIn') {
							var coach = _v5.b;
							return $author$project$View$Layout$layout(
								{
									coach: coach,
									content: A2(
										$elm$html$Html$map,
										$author$project$Main$EmailPreferencesMsg,
										$author$project$Pages$EmailPreferences$view(subModel)),
									onLogout: $author$project$Main$Logout
								});
						} else {
							return $elm$html$Html$text('');
						}
					default:
						return $author$project$Main$viewNotFound;
				}
			}()
			]),
		title: 'Insights64'
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Main$init, onUrlChange: $author$project$Main$UrlChanged, onUrlRequest: $author$project$Main$UrlRequested, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (token) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (timeRangeFilter) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (coach) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (apiUrl) {
									return $elm$json$Json$Decode$succeed(
										{apiUrl: apiUrl, coach: coach, timeRangeFilter: timeRangeFilter, token: token});
								},
								A2($elm$json$Json$Decode$field, 'apiUrl', $elm$json$Json$Decode$string));
						},
						A2(
							$elm$json$Json$Decode$field,
							'coach',
							$elm$json$Json$Decode$oneOf(
								_List_fromArray(
									[
										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
										A2(
										$elm$json$Json$Decode$map,
										$elm$core$Maybe$Just,
										A2(
											$elm$json$Json$Decode$andThen,
											function (id) {
												return A2(
													$elm$json$Json$Decode$andThen,
													function (email) {
														return $elm$json$Json$Decode$succeed(
															{email: email, id: id});
													},
													A2($elm$json$Json$Decode$field, 'email', $elm$json$Json$Decode$string));
											},
											A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string)))
									]))));
				},
				A2(
					$elm$json$Json$Decode$field,
					'timeRangeFilter',
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
								A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
							]))));
		},
		A2(
			$elm$json$Json$Decode$field,
			'token',
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
						A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
					])))))(0)}});}(this));