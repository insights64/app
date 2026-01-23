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

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.b3.aY === region.cn.aY)
	{
		return 'on line ' + region.b3.aY;
	}
	return 'on lines ' + region.b3.aY + ' through ' + region.cn.aY;
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

	/**_UNUSED/
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

	/**/
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
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

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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



/**_UNUSED/
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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
		impl.d4,
		impl.e6,
		impl.eS,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
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
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
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
		aj: func(record.aj),
		b4: record.b4,
		bT: record.bT
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
		var message = !tag ? value : tag < 3 ? value.a : value.aj;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.b4;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bT) && event.preventDefault(),
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
		impl.d4,
		impl.e6,
		impl.eS,
		function(sendToApp, initialModel) {
			var view = impl.e7;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
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
		impl.d4,
		impl.e6,
		impl.eS,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.bX && impl.bX(sendToApp)
			var view = impl.e7;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.aT);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.eY) && (_VirtualDom_doc.title = title = doc.eY);
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
	var onUrlChange = impl.eq;
	var onUrlRequest = impl.er;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		bX: function(sendToApp)
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
							&& curr.cQ === next.cQ
							&& curr.cv === next.cv
							&& curr.cM.a === next.cM.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		d4: function(flags)
		{
			return A3(impl.d4, flags, _Browser_getUrl(), key);
		},
		e7: impl.e7,
		e6: impl.e6,
		eS: impl.eS
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
		? { dZ: 'hidden', dy: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dZ: 'mozHidden', dy: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dZ: 'msHidden', dy: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dZ: 'webkitHidden', dy: 'webkitvisibilitychange' }
		: { dZ: 'hidden', dy: 'visibilitychange' };
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
		c_: _Browser_getScene(),
		c9: {
			de: _Browser_window.pageXOffset,
			df: _Browser_window.pageYOffset,
			dd: _Browser_doc.documentElement.clientWidth,
			ct: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		dd: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		ct: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			c_: {
				dd: node.scrollWidth,
				ct: node.scrollHeight
			},
			c9: {
				de: node.scrollLeft,
				df: node.scrollTop,
				dd: node.clientWidth,
				ct: node.clientHeight
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
			c_: _Browser_getScene(),
			c9: {
				de: x,
				df: y,
				dd: _Browser_doc.documentElement.clientWidth,
				ct: _Browser_doc.documentElement.clientHeight
			},
			dN: {
				de: x + rect.left,
				df: y + rect.top,
				dd: rect.width,
				ct: rect.height
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
			callback(toTask(request.be.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.be.b, xhr)); });
		$elm$core$Maybe$isJust(request.bs) && _Http_track(router, xhr, request.bs.a);

		try {
			xhr.open(request.bi, request.bt, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.bt));
		}

		_Http_configureRequest(xhr, request);

		request.aT.a && xhr.setRequestHeader('Content-Type', request.aT.a);
		xhr.send(request.aT.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.bf; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.bp.a || 0;
	xhr.responseType = request.be.d;
	xhr.withCredentials = request.dm;
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
		bt: xhr.responseURL,
		eQ: xhr.status,
		eR: xhr.statusText,
		bf: _Http_parseHeaders(xhr.getAllResponseHeaders())
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
			eM: event.loaded,
			c1: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			eH: event.loaded,
			c1: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
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
}var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$UrlRequested = function (a) {
	return {$: 0, a: a};
};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
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
			if (t.$ === -2) {
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
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
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
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
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
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
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
		return {$: 0, a: a, b: b, c: c, d: d};
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
	return {$: 1, a: a};
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
	return {$: 0, a: a};
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
		if (!builder.n) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.u),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.u);
		} else {
			var treeLen = builder.n * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.v) : builder.v;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.n);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.u) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.u);
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
					{v: nodeList, n: (len / $elm$core$Array$branchFactor) | 0, u: tail});
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
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
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
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {cr: fragment, cv: host, cJ: path, cM: port_, cQ: protocol, cR: query};
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
					if (_v1.$ === 1) {
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
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
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
		var task = _v0;
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
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Main$Guest = {$: 0};
var $author$project$Main$LoggedIn = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Main$NotFoundPage = {$: 5};
var $author$project$Route$Dashboard = {$: 2};
var $author$project$Main$DashboardMsg = function (a) {
	return {$: 4, a: a};
};
var $author$project$Main$DashboardPage = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$GameDetailMsg = function (a) {
	return {$: 6, a: a};
};
var $author$project$Main$GameDetailPage = function (a) {
	return {$: 4, a: a};
};
var $author$project$Route$Login = {$: 0};
var $author$project$Main$LoginPage = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$RegisterPage = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$StudentDetailMsg = function (a) {
	return {$: 5, a: a};
};
var $author$project$Main$StudentDetailPage = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$Dashboard$GotStudents = function (a) {
	return {$: 0, a: a};
};
var $author$project$Types$Loading = {$: 1};
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $author$project$Api$authHeader = function (maybeToken) {
	if (!maybeToken.$) {
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
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
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
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
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
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
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
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
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
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
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
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
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
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
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
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
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
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
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
				if (_v4.$ === -1) {
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
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
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
						if (_v7.$ === -1) {
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
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
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
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$NetworkError = {$: 2};
var $elm$http$Http$Timeout = {$: 1};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 1:
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 2:
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.eQ));
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
var $elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {cV: reqs, c3: subs};
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
				if (!cmd.$) {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 1) {
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
							var _v4 = req.bs;
							if (_v4.$ === 1) {
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
			A3($elm$http$Http$updateReqs, router, cmds, state.cV));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
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
					state.c3)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					dm: r.dm,
					aT: r.aT,
					be: A2(_Http_mapExpect, func, r.be),
					bf: r.bf,
					bi: r.bi,
					bp: r.bp,
					bs: r.bs,
					bt: r.bt
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
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
			{dm: false, aT: r.aT, be: r.be, bf: r.bf, bi: r.bi, bp: r.bp, bs: r.bs, bt: r.bt}));
};
var $author$project$Api$unwrap = function (_v0) {
	var str = _v0;
	return str;
};
var $author$project$Api$get = function (config) {
	return $elm$http$Http$request(
		{
			aT: $elm$http$Http$emptyBody,
			be: A2($elm$http$Http$expectJson, config.bm, config.by),
			bf: $author$project$Api$authHeader(config.br),
			bi: 'GET',
			bp: $elm$core$Maybe$Nothing,
			bs: $elm$core$Maybe$Nothing,
			bt: $author$project$Api$unwrap(config.bb)
		});
};
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Types$Student = F8(
	function (id, coachId, displayName, chessComUsername, lastImportedAt, lastInsightAt, avatarUrl, createdAt) {
		return {dq: avatarUrl, dz: chessComUsername, dB: coachId, ch: createdAt, bA: displayName, d1: id, d8: lastImportedAt, d9: lastInsightAt};
	});
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
			if (!_v0.$) {
				var rawValue = _v0.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (!_v1.$) {
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
var $author$project$Types$studentDecoder = A3(
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
								$elm$json$Json$Decode$succeed($author$project$Types$Student)))))))));
var $author$project$Types$studentsDecoder = A2(
	$elm$json$Json$Decode$field,
	'students',
	$elm$json$Json$Decode$list($author$project$Types$studentDecoder));
var $author$project$Api$Endpoint = $elm$core$Basics$identity;
var $author$project$Api$url = F2(
	function (apiUrl, paths) {
		return apiUrl + ('/' + A2($elm$core$String$join, '/', paths));
	});
var $author$project$Api$Students$getStudents = function (config) {
	return $author$project$Api$get(
		{
			by: $author$project$Types$studentsDecoder,
			bb: A2(
				$author$project$Api$url,
				config.ca,
				_List_fromArray(
					['api', 'students'])),
			bm: config.bm,
			br: $elm$core$Maybe$Just(config.br)
		});
};
var $author$project$Pages$Dashboard$init = F2(
	function (apiUrl, token) {
		return _Utils_Tuple2(
			{ag: $elm$core$Maybe$Nothing, ac: false, ak: '', aJ: false, az: $author$project$Types$Loading},
			$author$project$Api$Students$getStudents(
				{ca: apiUrl, bm: $author$project$Pages$Dashboard$GotStudents, br: token}));
	});
var $author$project$Pages$GameDetail$GotGameDetail = $elm$core$Basics$identity;
var $author$project$Api$Games$GameDetail = F3(
	function (game, pgn, moves) {
		return {dW: game, en: moves, ev: pgn};
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
													return {dn: analyzed, cc: blackElo, dv: blackUsername, ch: createdAt, d1: id, et: openingName, ez: platform, cL: platformGameId, eA: playedAt, eI: result, bo: studentId, dc: whiteElo, e9: whiteUsername};
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
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$int = _Json_decodeInt;
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
												return {ds: bestMove, aE: classification, dC: color, dP: evalAfterCp, dQ: evalBeforeCp, dR: evalDiff, dU: fenBefore, dX: gameId, d1: id, em: moveNumber, cF: movePlayed, ew: phase};
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
			by: $author$project$Api$Games$gameDetailDecoder,
			bb: A2(
				$author$project$Api$url,
				config.ca,
				_List_fromArray(
					['api', 'games', config.dX])),
			bm: config.bm,
			br: $elm$core$Maybe$Just(config.br)
		});
};
var $author$project$Pages$GameDetail$init = F3(
	function (apiUrl, token, gameId) {
		return _Utils_Tuple2(
			{aX: $author$project$Types$Loading, dX: gameId},
			$author$project$Api$Games$getGame(
				{ca: apiUrl, dX: gameId, bm: $elm$core$Basics$identity, br: token}));
	});
var $author$project$Pages$Login$init = {cm: '', ai: $elm$core$Maybe$Nothing, ad: false, cI: ''};
var $author$project$Pages$Register$init = {aU: '', cm: '', ai: $elm$core$Maybe$Nothing, ad: false, cI: ''};
var $author$project$Types$AllColors = 0;
var $author$project$Types$AllResults = 0;
var $author$project$Types$AllTimeControls = 0;
var $author$project$Pages$StudentDetail$DateNewest = 0;
var $author$project$Pages$StudentDetail$GotGames = function (a) {
	return {$: 1, a: a};
};
var $author$project$Pages$StudentDetail$GotStudent = function (a) {
	return {$: 0, a: a};
};
var $author$project$Pages$StudentDetail$GotTags = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Api$Students$getStudent = function (config) {
	return $author$project$Api$get(
		{
			by: $author$project$Types$studentDecoder,
			bb: A2(
				$author$project$Api$url,
				config.ca,
				_List_fromArray(
					['api', 'students', config.bo])),
			bm: config.bm,
			br: $elm$core$Maybe$Just(config.br)
		});
};
var $author$project$Types$GameWithInsights = F3(
	function (game, insight, tags) {
		return {dW: game, bJ: insight, eT: tags};
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
																					return {dj: accuracyEndgame, dk: accuracyMiddlegame, dl: accuracyOpening, bu: accuracyOverall, dt: bestMovesCount, a6: blundersCount, dF: criticalMomentsCount, dJ: decisiveAdvantageReached, dK: decisiveAdvantageSquandered, dS: excellentMovesCount, dX: gameId, d1: id, bh: inaccuraciesCount, eg: maxAdvantage, ei: maxDisadvantage, bj: mistakesCount, eu: opponentRating, ex: phaseDecided, eB: playerColor, eG: ratingDiff, fa: worstMoveEvalLoss};
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
var $elm$json$Json$Decode$float = _Json_decodeFloat;
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
		return {dD: confidence, dX: gameId, d1: id, cE: moveNumbers, eE: primaryMove, aa: tag};
	});
var $author$project$Types$Tag = F7(
	function (id, slug, name, category, description, color, priority) {
		return {cd: category, dC: color, cl: description, d1: id, cG: name, eF: priority, bY: slug};
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
					return {f: games, a0: total};
				}))));
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Api$getWithQuery = function (config) {
	var queryString = $elm$core$List$isEmpty(config.cS) ? '' : ('?' + A2(
		$elm$core$String$join,
		'&',
		A2(
			$elm$core$List$map,
			function (_v0) {
				var k = _v0.a;
				var v = _v0.b;
				return k + ('=' + v);
			},
			config.cS)));
	var fullUrl = _Utils_ap(
		$author$project$Api$unwrap(config.bb),
		queryString);
	return $elm$http$Http$request(
		{
			aT: $elm$http$Http$emptyBody,
			be: A2($elm$http$Http$expectJson, config.bm, config.by),
			bf: $author$project$Api$authHeader(config.br),
			bi: 'GET',
			bp: $elm$core$Maybe$Nothing,
			bs: $elm$core$Maybe$Nothing,
			bt: fullUrl
		});
};
var $author$project$Api$Students$getStudentGames = function (config) {
	var tagParams = function () {
		var _v5 = config.eT;
		if (!_v5.$) {
			var t = _v5.a;
			return _List_fromArray(
				[
					_Utils_Tuple2('tags', t)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var minRatingDiffParams = function () {
		var _v4 = config.el;
		if (!_v4.$) {
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
		var _v3 = config.ek;
		if (!_v3.$) {
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
		var _v2 = config.ej;
		if (!_v2.$) {
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
		var _v1 = config.eh;
		if (!_v1.$) {
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
		var _v0 = config.ef;
		if (!_v0.$) {
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
			_Utils_Tuple2('time_control', config.eW),
			_Utils_Tuple2('result', config.eI),
			_Utils_Tuple2('color', config.dC),
			_Utils_Tuple2(
			'limit',
			$elm$core$String$fromInt(config.ea)),
			_Utils_Tuple2(
			'offset',
			$elm$core$String$fromInt(config.ep))
		]);
	var allParams = _Utils_ap(
		baseParams,
		_Utils_ap(
			tagParams,
			_Utils_ap(
				minAccuracyParams,
				_Utils_ap(
					maxAccuracyParams,
					_Utils_ap(
						maxBlundersParams,
						_Utils_ap(minRatingDiffParams, maxRatingDiffParams))))));
	return $author$project$Api$getWithQuery(
		{
			by: $author$project$Types$gamesWithInsightsDecoder,
			bb: A2(
				$author$project$Api$url,
				config.ca,
				_List_fromArray(
					['api', 'students', config.bo, 'games', 'insights'])),
			bm: config.bm,
			cS: allParams,
			br: $elm$core$Maybe$Just(config.br)
		});
};
var $author$project$Types$TagWithCount = F2(
	function (tag, count) {
		return {cg: count, aa: tag};
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
	return $author$project$Api$get(
		{
			by: $author$project$Types$tagsWithCountsDecoder,
			bb: A2(
				$author$project$Api$url,
				config.ca,
				_List_fromArray(
					['api', 'students', config.bo, 'tags'])),
			bm: config.bm,
			br: $elm$core$Maybe$Just(config.br)
		});
};
var $author$project$Pages$StudentDetail$init = F3(
	function (apiUrl, token, studentId) {
		return _Utils_Tuple2(
			{
				ca: apiUrl,
				S: 0,
				as: _List_fromArray(
					['accuracy', 'advantage', 'tactics']),
				f: $author$project$Types$Loading,
				ea: 25,
				ef: $elm$core$Maybe$Nothing,
				eh: $elm$core$Maybe$Nothing,
				ek: $elm$core$Maybe$Nothing,
				ep: 0,
				Y: 'all',
				al: '',
				M: 0,
				z: _List_Nil,
				aK: true,
				N: 0,
				ay: $author$project$Types$Loading,
				bo: studentId,
				eT: $author$project$Types$Loading,
				O: 0,
				br: token
			},
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Api$Students$getStudent(
						{ca: apiUrl, bm: $author$project$Pages$StudentDetail$GotStudent, bo: studentId, br: token}),
						$author$project$Api$Students$getStudentGames(
						{ca: apiUrl, dC: 'all', ea: 25, ef: $elm$core$Maybe$Nothing, eh: $elm$core$Maybe$Nothing, ej: $elm$core$Maybe$Nothing, ek: $elm$core$Maybe$Nothing, el: $elm$core$Maybe$Nothing, ep: 0, bm: $author$project$Pages$StudentDetail$GotGames, eI: 'all', bo: studentId, eT: $elm$core$Maybe$Nothing, eW: 'all', br: token}),
						$author$project$Api$Students$getStudentTags(
						{ca: apiUrl, bm: $author$project$Pages$StudentDetail$GotTags, bo: studentId, br: token})
					])));
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$browser$Browser$Navigation$replaceUrl = _Browser_replaceUrl;
var $author$project$Route$routeToPieces = function (route) {
	switch (route.$) {
		case 0:
			return _List_fromArray(
				['login']);
		case 1:
			return _List_fromArray(
				['register']);
		case 2:
			return _List_fromArray(
				['dashboard']);
		case 3:
			var id = route.a;
			return _List_fromArray(
				['students', id]);
		case 4:
			var id = route.a;
			return _List_fromArray(
				['games', id]);
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
			case 0:
				var _v1 = model.A;
				if (_v1.$ === 1) {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.I, $author$project$Route$Dashboard));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								y: $author$project$Main$LoginPage($author$project$Pages$Login$init)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 1:
				var _v2 = model.A;
				if (_v2.$ === 1) {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.I, $author$project$Route$Dashboard));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								y: $author$project$Main$RegisterPage($author$project$Pages$Register$init)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 2:
				var _v3 = model.A;
				if (_v3.$ === 1) {
					var token = _v3.a;
					var _v4 = A2($author$project$Pages$Dashboard$init, model.ca, token);
					var subModel = _v4.a;
					var subCmd = _v4.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								y: $author$project$Main$DashboardPage(subModel)
							}),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$DashboardMsg, subCmd));
				} else {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.I, $author$project$Route$Login));
				}
			case 3:
				var studentId = route.a;
				var _v5 = model.A;
				if (_v5.$ === 1) {
					var token = _v5.a;
					var _v6 = A3($author$project$Pages$StudentDetail$init, model.ca, token, studentId);
					var subModel = _v6.a;
					var subCmd = _v6.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								y: $author$project$Main$StudentDetailPage(subModel)
							}),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$StudentDetailMsg, subCmd));
				} else {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.I, $author$project$Route$Login));
				}
			case 4:
				var gameId = route.a;
				var _v7 = model.A;
				if (_v7.$ === 1) {
					var token = _v7.a;
					var _v8 = A3($author$project$Pages$GameDetail$init, model.ca, token, gameId);
					var subModel = _v8.a;
					var subCmd = _v8.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								y: $author$project$Main$GameDetailPage(subModel)
							}),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$GameDetailMsg, subCmd));
				} else {
					return _Utils_Tuple2(
						model,
						A2($author$project$Route$replaceUrl, model.I, $author$project$Route$Login));
				}
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{y: $author$project$Main$NotFoundPage}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Route$NotFound = {$: 5};
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {at: frag, av: params, an: unvisited, af: value, aB: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.an;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.af);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.af);
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
		if (maybeList.$ === 1) {
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
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
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
	if (maybeQuery.$ === 1) {
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
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.cJ),
					$elm$url$Url$Parser$prepareQuery(url.cR),
					url.cr,
					$elm$core$Basics$identity)));
	});
var $author$project$Route$GameDetail = function (a) {
	return {$: 4, a: a};
};
var $author$project$Route$Register = {$: 1};
var $author$project$Route$StudentDetail = function (a) {
	return {$: 3, a: a};
};
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.aB;
		var unvisited = _v0.an;
		var params = _v0.av;
		var frag = _v0.at;
		var value = _v0.af;
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
		var parseArg = _v0;
		return function (_v1) {
			var visited = _v1.aB;
			var unvisited = _v1.an;
			var params = _v1.av;
			var frag = _v1.at;
			var value = _v1.af;
			return A2(
				$elm$core$List$map,
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
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
	return function (state) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var parser = _v0;
				return parser(state);
			},
			parsers);
	};
};
var $elm$url$Url$Parser$s = function (str) {
	return function (_v0) {
		var visited = _v0.aB;
		var unvisited = _v0.an;
		var params = _v0.av;
		var frag = _v0.at;
		var value = _v0.af;
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
	};
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0;
		var parseAfter = _v1;
		return function (state) {
			return A2(
				$elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var $elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_v0) {
			var visited = _v0.aB;
			var unvisited = _v0.an;
			var params = _v0.av;
			var frag = _v0.at;
			var value = _v0.af;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _v2 = stringToSomething(next);
				if (!_v2.$) {
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
		};
	});
var $elm$url$Url$Parser$string = A2($elm$url$Url$Parser$custom, 'STRING', $elm$core$Maybe$Just);
var $elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
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
				$elm$url$Url$Parser$string))
		]));
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
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
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var session = function () {
			var _v1 = flags.br;
			if (!_v1.$) {
				var token = _v1.a;
				return A2(
					$author$project$Main$LoggedIn,
					token,
					{cm: '', d1: ''});
			} else {
				return $author$project$Main$Guest;
			}
		}();
		var _v0 = A2(
			$author$project$Main$changeRouteTo,
			$author$project$Route$fromUrl(url),
			{ca: flags.ca, I: key, y: $author$project$Main$NotFoundPage, A: session});
		var model = _v0.a;
		var cmd = _v0.b;
		return _Utils_Tuple2(model, cmd);
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Main$LoginMsg = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$RegisterMsg = function (a) {
	return {$: 3, a: a};
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Main$clearToken = _Platform_outgoingPort(
	'clearToken',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$saveToken = _Platform_outgoingPort('saveToken', $elm$json$Json$Encode$string);
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
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
		var _v0 = url.cQ;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.cr,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.cR,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.cM,
					_Utils_ap(http, url.cv)),
				url.cJ)));
};
var $author$project$Types$Failure = function (a) {
	return {$: 2, a: a};
};
var $author$project$Pages$Dashboard$GotNewStudent = function (a) {
	return {$: 5, a: a};
};
var $author$project$Types$Success = function (a) {
	return {$: 3, a: a};
};
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
			_Json_emptyObject(0),
			pairs));
};
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $author$project$Api$post = function (config) {
	return $elm$http$Http$request(
		{
			aT: $elm$http$Http$jsonBody(config.aT),
			be: A2($elm$http$Http$expectJson, config.bm, config.by),
			bf: $author$project$Api$authHeader(config.br),
			bi: 'POST',
			bp: $elm$core$Maybe$Nothing,
			bs: $elm$core$Maybe$Nothing,
			bt: $author$project$Api$unwrap(config.bb)
		});
};
var $author$project$Api$Students$createStudent = function (config) {
	return $author$project$Api$post(
		{
			aT: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'chess_com_username',
						$elm$json$Json$Encode$string(config.dz))
					])),
			by: $author$project$Types$studentDecoder,
			bb: A2(
				$author$project$Api$url,
				config.ca,
				_List_fromArray(
					['api', 'students'])),
			bm: config.bm,
			br: $elm$core$Maybe$Just(config.br)
		});
};
var $author$project$Pages$Dashboard$httpErrorToString = function (error) {
	switch (error.$) {
		case 0:
			return 'Invalid URL';
		case 1:
			return 'Request timed out';
		case 2:
			return 'Network error';
		case 3:
			var status = error.a;
			return 'Server error (status ' + ($elm$core$String$fromInt(status) + ')');
		default:
			var message = error.a;
			return 'Error: ' + message;
	}
};
var $author$project$Pages$Dashboard$update = F4(
	function (apiUrl, token, msg, model) {
		switch (msg.$) {
			case 0:
				var result = msg.a;
				if (!result.$) {
					var students = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								az: $author$project$Types$Success(students)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								az: $author$project$Types$Failure(
									$author$project$Pages$Dashboard$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 1:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ag: $elm$core$Maybe$Nothing, ak: '', aJ: true}),
					$elm$core$Platform$Cmd$none);
			case 2:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aJ: false}),
					$elm$core$Platform$Cmd$none);
			case 3:
				var username = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ag: $elm$core$Maybe$Nothing, ak: username}),
					$elm$core$Platform$Cmd$none);
			case 4:
				var config = msg.a;
				return $elm$core$String$isEmpty(model.ak) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ag: $elm$core$Maybe$Just('Please enter a Chess.com username')
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{ag: $elm$core$Maybe$Nothing, ac: true}),
					$author$project$Api$Students$createStudent(
						{ca: config.ca, dz: model.ak, bm: $author$project$Pages$Dashboard$GotNewStudent, br: config.br}));
			default:
				var result = msg.a;
				if (!result.$) {
					var newStudent = result.a;
					var updatedStudents = function () {
						var _v3 = model.az;
						if (_v3.$ === 3) {
							var students = _v3.a;
							return $author$project$Types$Success(
								_Utils_ap(
									students,
									_List_fromArray(
										[newStudent])));
						} else {
							return $author$project$Types$Success(
								_List_fromArray(
									[newStudent]));
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ac: false, ak: '', aJ: false, az: updatedStudents}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ag: $elm$core$Maybe$Just(
									$author$project$Pages$Dashboard$httpErrorToString(error)),
								ac: false
							}),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Pages$GameDetail$httpErrorToString = function (error) {
	switch (error.$) {
		case 0:
			return 'Invalid URL';
		case 1:
			return 'Request timed out';
		case 2:
			return 'Network error';
		case 3:
			var status = error.a;
			return (status === 404) ? 'Game not found' : ('Server error (status ' + ($elm$core$String$fromInt(status) + ')'));
		default:
			var message = error.a;
			return 'Error: ' + message;
	}
};
var $author$project$Pages$GameDetail$update = F2(
	function (msg, model) {
		var result = msg;
		if (!result.$) {
			var detail = result.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						aX: $author$project$Types$Success(detail)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var error = result.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						aX: $author$project$Types$Failure(
							$author$project$Pages$GameDetail$httpErrorToString(error))
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$Login$GotLoginResponse = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$Login$httpErrorToString = function (error) {
	switch (error.$) {
		case 0:
			return 'Invalid URL';
		case 1:
			return 'Request timed out';
		case 2:
			return 'Network error - please check your connection';
		case 3:
			var status = error.a;
			return (status === 401) ? 'Invalid email or password' : ((status === 400) ? 'Invalid request - please check your input' : ('Server error (status ' + ($elm$core$String$fromInt(status) + ')')));
		default:
			var message = error.a;
			return 'Error parsing response: ' + message;
	}
};
var $author$project$Api$Auth$AuthResponse = F2(
	function (token, coach) {
		return {dA: coach, br: token};
	});
var $author$project$Types$Coach = F2(
	function (id, email) {
		return {cm: email, d1: id};
	});
var $author$project$Types$coachDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'email',
	$elm$json$Json$Decode$string,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'id',
		$elm$json$Json$Decode$string,
		$elm$json$Json$Decode$succeed($author$project$Types$Coach)));
var $author$project$Api$Auth$authResponseDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Api$Auth$AuthResponse,
	A2($elm$json$Json$Decode$field, 'token', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'coach', $author$project$Types$coachDecoder));
var $author$project$Api$Auth$login = function (config) {
	return $author$project$Api$post(
		{
			aT: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'email',
						$elm$json$Json$Encode$string(config.cm)),
						_Utils_Tuple2(
						'password',
						$elm$json$Json$Encode$string(config.cI))
					])),
			by: $author$project$Api$Auth$authResponseDecoder,
			bb: A2(
				$author$project$Api$url,
				config.ca,
				_List_fromArray(
					['api', 'auth', 'login'])),
			bm: config.bm,
			br: $elm$core$Maybe$Nothing
		});
};
var $author$project$Pages$Login$update = F3(
	function (apiUrl, msg, model) {
		switch (msg.$) {
			case 0:
				var email = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{cm: email, ai: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 1:
				var password = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{ai: $elm$core$Maybe$Nothing, cI: password}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 2:
				return ($elm$core$String$isEmpty(model.cm) || $elm$core$String$isEmpty(model.cI)) ? _Utils_Tuple3(
					_Utils_update(
						model,
						{
							ai: $elm$core$Maybe$Just('Please fill in all fields')
						}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing) : _Utils_Tuple3(
					_Utils_update(
						model,
						{ai: $elm$core$Maybe$Nothing, ad: true}),
					$author$project$Api$Auth$login(
						{ca: apiUrl, cm: model.cm, bm: $author$project$Pages$Login$GotLoginResponse, cI: model.cI}),
					$elm$core$Maybe$Nothing);
			default:
				var result = msg.a;
				if (!result.$) {
					var authResponse = result.a;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{ad: false}),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Just(authResponse));
				} else {
					var error = result.a;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{
								ai: $elm$core$Maybe$Just(
									$author$project$Pages$Login$httpErrorToString(error)),
								ad: false
							}),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Nothing);
				}
		}
	});
var $author$project$Pages$Register$GotRegisterResponse = function (a) {
	return {$: 4, a: a};
};
var $author$project$Pages$Register$httpErrorToString = function (error) {
	switch (error.$) {
		case 0:
			return 'Invalid URL';
		case 1:
			return 'Request timed out';
		case 2:
			return 'Network error - please check your connection';
		case 3:
			var status = error.a;
			return (status === 409) ? 'An account with this email already exists' : ((status === 400) ? 'Invalid email format or password too short' : ('Server error (status ' + ($elm$core$String$fromInt(status) + ')')));
		default:
			var message = error.a;
			return 'Error parsing response: ' + message;
	}
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Api$Auth$register = function (config) {
	return $author$project$Api$post(
		{
			aT: $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'email',
						$elm$json$Json$Encode$string(config.cm)),
						_Utils_Tuple2(
						'password',
						$elm$json$Json$Encode$string(config.cI))
					])),
			by: $author$project$Api$Auth$authResponseDecoder,
			bb: A2(
				$author$project$Api$url,
				config.ca,
				_List_fromArray(
					['api', 'auth', 'register'])),
			bm: config.bm,
			br: $elm$core$Maybe$Nothing
		});
};
var $author$project$Pages$Register$update = F3(
	function (apiUrl, msg, model) {
		switch (msg.$) {
			case 0:
				var email = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{cm: email, ai: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 1:
				var password = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{ai: $elm$core$Maybe$Nothing, cI: password}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 2:
				var confirmPassword = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{aU: confirmPassword, ai: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing);
			case 3:
				return ($elm$core$String$isEmpty(model.cm) || $elm$core$String$isEmpty(model.cI)) ? _Utils_Tuple3(
					_Utils_update(
						model,
						{
							ai: $elm$core$Maybe$Just('Please fill in all fields')
						}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing) : (($elm$core$String$length(model.cI) < 8) ? _Utils_Tuple3(
					_Utils_update(
						model,
						{
							ai: $elm$core$Maybe$Just('Password must be at least 8 characters')
						}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing) : ((!_Utils_eq(model.cI, model.aU)) ? _Utils_Tuple3(
					_Utils_update(
						model,
						{
							ai: $elm$core$Maybe$Just('Passwords do not match')
						}),
					$elm$core$Platform$Cmd$none,
					$elm$core$Maybe$Nothing) : _Utils_Tuple3(
					_Utils_update(
						model,
						{ai: $elm$core$Maybe$Nothing, ad: true}),
					$author$project$Api$Auth$register(
						{ca: apiUrl, cm: model.cm, bm: $author$project$Pages$Register$GotRegisterResponse, cI: model.cI}),
					$elm$core$Maybe$Nothing)));
			default:
				var result = msg.a;
				if (!result.$) {
					var authResponse = result.a;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{ad: false}),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Just(authResponse));
				} else {
					var error = result.a;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{
								ai: $elm$core$Maybe$Just(
									$author$project$Pages$Register$httpErrorToString(error)),
								ad: false
							}),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Nothing);
				}
		}
	});
var $author$project$Types$colorFilterToString = function (cf) {
	switch (cf) {
		case 0:
			return 'all';
		case 1:
			return 'white';
		default:
			return 'black';
	}
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Types$resultFilterToString = function (rf) {
	switch (rf) {
		case 0:
			return 'all';
		case 1:
			return 'win';
		case 2:
			return 'loss';
		default:
			return 'draw';
	}
};
var $author$project$Types$timeControlToString = function (tc) {
	switch (tc) {
		case 0:
			return 'all';
		case 1:
			return 'bullet';
		case 2:
			return 'blitz';
		default:
			return 'rapid';
	}
};
var $author$project$Pages$StudentDetail$fetchFilteredGames = function (model) {
	var tagsParam = $elm$core$List$isEmpty(model.z) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
		A2($elm$core$String$join, ',', model.z));
	var _v0 = function () {
		var _v1 = model.Y;
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
			ca: model.ca,
			dC: $author$project$Types$colorFilterToString(model.S),
			ea: model.ea,
			ef: model.ef,
			eh: model.eh,
			ej: maxRatingDiff,
			ek: model.ek,
			el: minRatingDiff,
			ep: model.ep,
			bm: $author$project$Pages$StudentDetail$GotGames,
			eI: $author$project$Types$resultFilterToString(model.M),
			bo: model.bo,
			eT: tagsParam,
			eW: $author$project$Types$timeControlToString(model.O),
			br: model.br
		});
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
		case 0:
			return 'Invalid URL';
		case 1:
			return 'Request timed out';
		case 2:
			return 'Network error';
		case 3:
			var status = error.a;
			return 'Server error (status ' + ($elm$core$String$fromInt(status) + ')');
		default:
			var message = error.a;
			return 'Error: ' + message;
	}
};
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
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Pages$StudentDetail$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var result = msg.a;
				if (!result.$) {
					var student = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ay: $author$project$Types$Success(student)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ay: $author$project$Types$Failure(
									$author$project$Pages$StudentDetail$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 1:
				var result = msg.a;
				if (!result.$) {
					var gamesData = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								f: $author$project$Types$Success(gamesData)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								f: $author$project$Types$Failure(
									$author$project$Pages$StudentDetail$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 2:
				var result = msg.a;
				if (!result.$) {
					var tagsData = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								eT: $author$project$Types$Success(tagsData)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								eT: $author$project$Types$Failure(
									$author$project$Pages$StudentDetail$httpErrorToString(error))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 3:
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ep: 0, O: filter});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 4:
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ep: 0, M: filter});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 5:
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{S: filter, f: $author$project$Types$Loading, ep: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 6:
				var tagSlug = msg.a;
				var newTags = A2($elm$core$List$member, tagSlug, model.z) ? A2(
					$elm$core$List$filter,
					function (t) {
						return !_Utils_eq(t, tagSlug);
					},
					model.z) : A2($elm$core$List$cons, tagSlug, model.z);
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ep: 0, z: newTags});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 7:
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ep: 0, z: _List_Nil});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 8:
				var str = msg.a;
				var maybeAccuracy = $elm$core$String$toInt(str);
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ek: maybeAccuracy, ep: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 9:
				var str = msg.a;
				var maybeAccuracy = $elm$core$String$toInt(str);
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ef: maybeAccuracy, ep: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 10:
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ef: $elm$core$Maybe$Nothing, ek: $elm$core$Maybe$Nothing, ep: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 11:
				var str = msg.a;
				var maybeBlunders = $elm$core$String$toInt(str);
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, eh: maybeBlunders, ep: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 12:
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, eh: $elm$core$Maybe$Nothing, ep: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 13:
				var filter = msg.a;
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ep: 0, Y: filter});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 14:
				var searchStr = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{al: searchStr}),
					$elm$core$Platform$Cmd$none);
			case 15:
				var order = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{N: order}),
					$elm$core$Platform$Cmd$none);
			case 16:
				var newModel = _Utils_update(
					model,
					{S: 0, f: $author$project$Types$Loading, ef: $elm$core$Maybe$Nothing, eh: $elm$core$Maybe$Nothing, ek: $elm$core$Maybe$Nothing, ep: 0, Y: 'all', al: '', M: 0, z: _List_Nil, N: 0, O: 0});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			case 17:
				var category = msg.a;
				var newCategories = A2($elm$core$List$member, category, model.as) ? A2(
					$elm$core$List$filter,
					function (c) {
						return !_Utils_eq(c, category);
					},
					model.as) : A2($elm$core$List$cons, category, model.as);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{as: newCategories}),
					$elm$core$Platform$Cmd$none);
			case 18:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aK: !model.aK}),
					$elm$core$Platform$Cmd$none);
			case 19:
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ep: model.ep + model.ea});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
			default:
				var page = msg.a;
				var newOffset = page * model.ea;
				var newModel = _Utils_update(
					model,
					{f: $author$project$Types$Loading, ep: newOffset});
				return _Utils_Tuple2(
					newModel,
					$author$project$Pages$StudentDetail$fetchFilteredGames(newModel));
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		var _v0 = _Utils_Tuple2(msg, model.y);
		_v0$8:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					var urlRequest = _v0.a.a;
					if (!urlRequest.$) {
						var url = urlRequest.a;
						return _Utils_Tuple2(
							model,
							A2(
								$elm$browser$Browser$Navigation$pushUrl,
								model.I,
								$elm$url$Url$toString(url)));
					} else {
						var href = urlRequest.a;
						return _Utils_Tuple2(
							model,
							$elm$browser$Browser$Navigation$load(href));
					}
				case 1:
					var url = _v0.a.a;
					return A2(
						$author$project$Main$changeRouteTo,
						$author$project$Route$fromUrl(url),
						model);
				case 2:
					if (!_v0.b.$) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v2 = A3($author$project$Pages$Login$update, model.ca, subMsg, subModel);
						var newSubModel = _v2.a;
						var subCmd = _v2.b;
						var maybeAuth = _v2.c;
						if (!maybeAuth.$) {
							var token = maybeAuth.a.br;
							var coach = maybeAuth.a.dA;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										A: A2($author$project$Main$LoggedIn, token, coach)
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											$author$project$Main$saveToken(token),
											A2($author$project$Route$replaceUrl, model.I, $author$project$Route$Dashboard)
										])));
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										y: $author$project$Main$LoginPage(newSubModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$LoginMsg, subCmd));
						}
					} else {
						break _v0$8;
					}
				case 3:
					if (_v0.b.$ === 1) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v4 = A3($author$project$Pages$Register$update, model.ca, subMsg, subModel);
						var newSubModel = _v4.a;
						var subCmd = _v4.b;
						var maybeAuth = _v4.c;
						if (!maybeAuth.$) {
							var token = maybeAuth.a.br;
							var coach = maybeAuth.a.dA;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										A: A2($author$project$Main$LoggedIn, token, coach)
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											$author$project$Main$saveToken(token),
											A2($author$project$Route$replaceUrl, model.I, $author$project$Route$Dashboard)
										])));
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										y: $author$project$Main$RegisterPage(newSubModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$RegisterMsg, subCmd));
						}
					} else {
						break _v0$8;
					}
				case 4:
					if (_v0.b.$ === 2) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v6 = model.A;
						if (_v6.$ === 1) {
							var token = _v6.a;
							var _v7 = A4($author$project$Pages$Dashboard$update, model.ca, token, subMsg, subModel);
							var newSubModel = _v7.a;
							var subCmd = _v7.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										y: $author$project$Main$DashboardPage(newSubModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$DashboardMsg, subCmd));
						} else {
							return _Utils_Tuple2(
								model,
								A2($author$project$Route$replaceUrl, model.I, $author$project$Route$Login));
						}
					} else {
						break _v0$8;
					}
				case 5:
					if (_v0.b.$ === 3) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v8 = A2($author$project$Pages$StudentDetail$update, subMsg, subModel);
						var newSubModel = _v8.a;
						var subCmd = _v8.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									y: $author$project$Main$StudentDetailPage(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$StudentDetailMsg, subCmd));
					} else {
						break _v0$8;
					}
				case 6:
					if (_v0.b.$ === 4) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v9 = A2($author$project$Pages$GameDetail$update, subMsg, subModel);
						var newSubModel = _v9.a;
						var subCmd = _v9.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									y: $author$project$Main$GameDetailPage(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$GameDetailMsg, subCmd));
					} else {
						break _v0$8;
					}
				default:
					var _v10 = _v0.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{A: $author$project$Main$Guest}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$clearToken(0),
									A2($author$project$Route$replaceUrl, model.I, $author$project$Route$Login)
								])));
			}
		}
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Main$Logout = {$: 7};
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
	return {$: 0, a: a};
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
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-sm text-anthro-gray')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(coach.cm)
										])),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(onLogout),
											$elm$html$Html$Attributes$class('text-sm text-anthro-gray hover:text-anthro-dark transition')
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
				A2($author$project$View$Layout$viewHeader, config.dA, config.bR),
				A2(
				$elm$html$Html$main_,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-6xl mx-auto px-4 py-8')
					]),
				_List_fromArray(
					[config.bw]))
			]));
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $author$project$Pages$Dashboard$ShowAddModal = {$: 1};
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $author$project$Pages$Dashboard$HideAddModal = {$: 2};
var $author$project$Pages$Dashboard$NewStudentChessComChanged = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$Dashboard$SubmitNewStudent = function (a) {
	return {$: 4, a: a};
};
var $elm$json$Json$Encode$bool = _Json_wrap;
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
	return {$: 1, a: a};
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
	return {$: 2, a: a};
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
					$elm$html$Html$Attributes$class('fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-white rounded-lg shadow-lg max-w-md w-full mx-4')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center justify-between p-4 border-b border-gray-200')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-lg font-medium text-gray-900')
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
											$elm$html$Html$Attributes$class('text-gray-400 hover:text-gray-600')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('X')
										]))
								])),
							A2(
							$elm$html$Html$form,
							_List_fromArray(
								[
									$elm$html$Html$Events$onSubmit(
									$author$project$Pages$Dashboard$SubmitNewStudent(
										{ca: apiUrl, br: token})),
									$elm$html$Html$Attributes$class('p-4')
								]),
							_List_fromArray(
								[
									function () {
									var _v0 = model.ag;
									if (!_v0.$) {
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
													$elm$html$Html$Attributes$class('block text-sm font-medium text-gray-700 mb-1')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Chess.com username')
												])),
											A2(
											$elm$html$Html$input,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('text'),
													$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none'),
													$elm$html$Html$Attributes$placeholder('username'),
													$elm$html$Html$Attributes$value(model.ak),
													$elm$html$Html$Events$onInput($author$project$Pages$Dashboard$NewStudentChessComChanged),
													$elm$html$Html$Attributes$disabled(model.ac)
												]),
											_List_Nil)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mb-6 flex items-start gap-2 text-sm text-gray-500')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-blue-500')
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
													$elm$html$Html$Attributes$class('px-4 py-2 text-gray-700 hover:text-gray-900'),
													$elm$html$Html$Attributes$disabled(model.ac)
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
													$elm$html$Html$Attributes$class('bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50'),
													$elm$html$Html$Attributes$disabled(model.ac)
												]),
											_List_fromArray(
												[
													model.ac ? $elm$html$Html$text('Adding...') : $elm$html$Html$text('Add Student')
												]))
										]))
								]))
						]))
				]));
	});
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Pages$Dashboard$viewEmptyState = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('text-center py-12 bg-white rounded-lg border border-gray-200')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-gray-400 text-5xl mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('+')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-medium text-gray-900 mb-2')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('No students yet')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-gray-600 mb-6')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Add your first student to start tracking their progress')
				])),
			A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$ShowAddModal),
					$elm$html$Html$Attributes$class('bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Add Student')
				]))
		]));
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
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $author$project$Pages$Dashboard$viewStudentCard = function (student) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$author$project$Route$href(
				$author$project$Route$StudentDetail(student.d1)),
				$elm$html$Html$Attributes$class('block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-orange-300 hover:shadow-lg transition-all group')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('h-1 bg-gradient-to-r from-orange-400 to-orange-500')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('p-5')
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
								var _v0 = student.dq;
								if (!_v0.$) {
									var url = _v0.a;
									return A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$src(url),
												$elm$html$Html$Attributes$alt(student.bA),
												$elm$html$Html$Attributes$class('w-14 h-14 rounded-full object-cover')
											]),
										_List_Nil);
								} else {
									return A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-14 h-14 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-orange-600 font-semibold text-xl')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(
														$author$project$Pages$Dashboard$getInitials(student.bA))
													]))
											]));
								}
							}(),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex-1')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(student.bA)
											])),
										function () {
										var _v1 = student.dz;
										if (!_v1.$) {
											var username = _v1.a;
											return A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-sm text-gray-500')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(username)
													]));
										} else {
											return $elm$html$Html$text('');
										}
									}()
									])),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-gray-300 group-hover:text-orange-400 transition-colors text-2xl')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('>')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm')
							]),
						_List_fromArray(
							[
								function () {
								var _v2 = student.d8;
								if (!_v2.$) {
									return A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-green-600 flex items-center gap-1')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-2 h-2 bg-green-500 rounded-full')
													]),
												_List_Nil),
												$elm$html$Html$text('Games imported')
											]));
								} else {
									return A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-gray-400 flex items-center gap-1')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('w-2 h-2 bg-gray-300 rounded-full')
													]),
												_List_Nil),
												$elm$html$Html$text('Awaiting import')
											]));
								}
							}(),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-gray-400')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Click to view games')
									]))
							]))
					]))
			]));
};
var $author$project$Pages$Dashboard$view = F3(
	function (apiUrl, token, model) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center justify-between mb-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h1,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-2xl font-serif font-semibold text-anthro-dark')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Your Students')
								])),
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$Pages$Dashboard$ShowAddModal),
									$elm$html$Html$Attributes$class('bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2')
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
											$elm$html$Html$text('+')
										])),
									$elm$html$Html$text('Add Student')
								]))
						])),
					function () {
					var _v0 = model.az;
					switch (_v0.$) {
						case 0:
							return $elm$html$Html$text('');
						case 1:
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-center py-12 text-gray-500')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Loading students...')
									]));
						case 2:
							var error = _v0.a;
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-center py-12')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-red-600 mb-4')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(error)
											]))
									]));
						default:
							var students = _v0.a;
							return $elm$core$List$isEmpty(students) ? $author$project$Pages$Dashboard$viewEmptyState : A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6')
									]),
								A2($elm$core$List$map, $author$project$Pages$Dashboard$viewStudentCard, students));
					}
				}(),
					model.aJ ? A3($author$project$Pages$Dashboard$viewAddModal, apiUrl, token, model) : $elm$html$Html$text('')
				]));
	});
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
				$elm$html$Html$Attributes$class('bg-white rounded-lg border border-gray-200 p-6 mb-6')
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
								(game.ez === 'chess_com') ? '♞' : '♘')
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
										$elm$html$Html$text(game.e9 + (' vs ' + game.dv))
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
										$author$project$Pages$GameDetail$formatDate(game.eA))
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
								'px-3 py-1 rounded-full font-medium ' + function () {
									var _v0 = game.eI;
									switch (_v0) {
										case '1-0':
											return 'bg-green-100 text-green-700';
										case '0-1':
											return 'bg-red-100 text-red-700';
										default:
											return 'bg-gray-100 text-gray-700';
									}
								}())
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Pages$GameDetail$resultToText(game.eI))
							])),
						game.dn ? A2(
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
		var _v5 = move.ew;
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
		var _v1 = move.aE;
		_v1$5:
		while (true) {
			if (!_v1.$) {
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
										$elm$core$String$fromInt(move.em) + '.')
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
										(move.dC === 'white') ? move.cF : ('...' + move.cF))
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
								var _v2 = move.aE;
								if (!_v2.$) {
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
								var _v3 = move.dR;
								if (!_v3.$) {
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
				var _v4 = _Utils_Tuple2(move.aE, move.ds);
				if ((!_v4.a.$) && (!_v4.b.$)) {
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
					m.aE,
					$elm$core$Maybe$Just('mistake'));
			},
			moves));
	var inaccuracies = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (m) {
				return _Utils_eq(
					m.aE,
					$elm$core$Maybe$Just('inaccuracy'));
			},
			moves));
	var blunders = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (m) {
				return _Utils_eq(
					m.aE,
					$elm$core$Maybe$Just('blunder'));
			},
			moves));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-white rounded-lg border border-gray-200 p-6')
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
				$author$project$Pages$GameDetail$viewGameHeader(detail.dW),
				$author$project$Pages$GameDetail$viewMoveSummary(detail.en),
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
						$elm$core$List$isEmpty(detail.en) ? A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Move analysis not available yet.')
							])) : A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-lg border border-gray-200 divide-y divide-gray-100')
							]),
						A2($elm$core$List$map, $author$project$Pages$GameDetail$viewMoveRow, detail.en))
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
						$elm$html$Html$Attributes$class('inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6')
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
				var _v0 = model.aX;
				switch (_v0.$) {
					case 0:
						return $elm$html$Html$text('');
					case 1:
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
					case 2:
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
	return {$: 0, a: a};
};
var $author$project$Pages$Login$PasswordChanged = function (a) {
	return {$: 1, a: a};
};
var $author$project$Pages$Login$SubmitForm = {$: 2};
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
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
								$elm$html$Html$Attributes$class('bg-white rounded-2xl shadow-sm border border-anthro-gray-light p-8')
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
										var _v0 = model.ai;
										if (!_v0.$) {
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
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('coach@example.com'),
														$elm$html$Html$Attributes$value(model.cm),
														$elm$html$Html$Events$onInput($author$project$Pages$Login$EmailChanged),
														$elm$html$Html$Attributes$disabled(model.ad)
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
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('Enter your password'),
														$elm$html$Html$Attributes$value(model.cI),
														$elm$html$Html$Events$onInput($author$project$Pages$Login$PasswordChanged),
														$elm$html$Html$Attributes$disabled(model.ad)
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('submit'),
												$elm$html$Html$Attributes$class('w-full bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'),
												$elm$html$Html$Attributes$disabled(model.ad)
											]),
										_List_fromArray(
											[
												model.ad ? $elm$html$Html$text('Signing in...') : $elm$html$Html$text('Sign in')
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
												$elm$html$Html$Attributes$class('text-orange-600 hover:text-orange-700 font-medium')
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
	return {$: 2, a: a};
};
var $author$project$Pages$Register$EmailChanged = function (a) {
	return {$: 0, a: a};
};
var $author$project$Pages$Register$PasswordChanged = function (a) {
	return {$: 1, a: a};
};
var $author$project$Pages$Register$SubmitForm = {$: 3};
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
								$elm$html$Html$Attributes$class('bg-white rounded-2xl shadow-sm border border-anthro-gray-light p-8')
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
										var _v0 = model.ai;
										if (!_v0.$) {
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
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('coach@example.com'),
														$elm$html$Html$Attributes$value(model.cm),
														$elm$html$Html$Events$onInput($author$project$Pages$Register$EmailChanged),
														$elm$html$Html$Attributes$disabled(model.ad)
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
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('At least 8 characters'),
														$elm$html$Html$Attributes$value(model.cI),
														$elm$html$Html$Events$onInput($author$project$Pages$Register$PasswordChanged),
														$elm$html$Html$Attributes$disabled(model.ad)
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
														$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors'),
														$elm$html$Html$Attributes$placeholder('Confirm your password'),
														$elm$html$Html$Attributes$value(model.aU),
														$elm$html$Html$Events$onInput($author$project$Pages$Register$ConfirmPasswordChanged),
														$elm$html$Html$Attributes$disabled(model.ad)
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('submit'),
												$elm$html$Html$Attributes$class('w-full bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'),
												$elm$html$Html$Attributes$disabled(model.ad)
											]),
										_List_fromArray(
											[
												model.ad ? $elm$html$Html$text('Creating account...') : $elm$html$Html$text('Create account')
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
												$elm$html$Html$Attributes$class('text-orange-600 hover:text-orange-700 font-medium')
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
var $author$project$Pages$StudentDetail$ToggleSidebar = {$: 18};
var $author$project$Pages$StudentDetail$countActiveFilters = function (model) {
	return $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					!(!model.O),
					!(!model.M),
					!(!model.S),
					!$elm$core$List$isEmpty(model.z),
					(!_Utils_eq(model.ek, $elm$core$Maybe$Nothing)) || (!_Utils_eq(model.ef, $elm$core$Maybe$Nothing)),
					!_Utils_eq(model.eh, $elm$core$Maybe$Nothing),
					model.Y !== 'all',
					model.al !== ''
				])));
};
var $author$project$Pages$StudentDetail$AccuracyHigh = 2;
var $author$project$Pages$StudentDetail$AccuracyLow = 3;
var $author$project$Types$BlackOnly = 2;
var $author$project$Types$Blitz = 2;
var $author$project$Types$Bullet = 1;
var $author$project$Pages$StudentDetail$ClearAccuracy = {$: 10};
var $author$project$Pages$StudentDetail$ClearAllFilters = {$: 16};
var $author$project$Pages$StudentDetail$ClearBlunders = {$: 12};
var $author$project$Pages$StudentDetail$DateOldest = 1;
var $author$project$Types$DrawsOnly = 3;
var $author$project$Types$LossesOnly = 2;
var $author$project$Pages$StudentDetail$OpponentRatingHigh = 4;
var $author$project$Pages$StudentDetail$OpponentRatingLow = 5;
var $author$project$Types$Rapid = 3;
var $author$project$Pages$StudentDetail$SetMaxAccuracy = function (a) {
	return {$: 9, a: a};
};
var $author$project$Pages$StudentDetail$SetMaxBlunders = function (a) {
	return {$: 11, a: a};
};
var $author$project$Pages$StudentDetail$SetMinAccuracy = function (a) {
	return {$: 8, a: a};
};
var $author$project$Pages$StudentDetail$SetOpponentSearch = function (a) {
	return {$: 14, a: a};
};
var $author$project$Pages$StudentDetail$SetSortOrder = function (a) {
	return {$: 15, a: a};
};
var $author$project$Types$WhiteOnly = 1;
var $author$project$Types$WinsOnly = 1;
var $author$project$Pages$StudentDetail$SetColorFilter = function (a) {
	return {$: 5, a: a};
};
var $author$project$Pages$StudentDetail$colorButton = F3(
	function (label, color, current) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(
					$author$project$Pages$StudentDetail$SetColorFilter(color)),
					$elm$html$Html$Attributes$class(
					_Utils_eq(color, current) ? 'px-3 py-1.5 rounded-lg bg-gray-800 text-white text-sm font-medium' : 'px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-sm hover:border-gray-300')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(label)
				]));
	});
var $author$project$Pages$StudentDetail$hasActiveFilters = function (model) {
	return (!(!model.O)) || ((!(!model.M)) || ((!(!model.S)) || ((!$elm$core$List$isEmpty(model.z)) || ((!_Utils_eq(model.ek, $elm$core$Maybe$Nothing)) || ((!_Utils_eq(model.ef, $elm$core$Maybe$Nothing)) || ((!_Utils_eq(model.eh, $elm$core$Maybe$Nothing)) || ((model.Y !== 'all') || (model.al !== ''))))))));
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $author$project$Pages$StudentDetail$SetOpponentRatingFilter = function (a) {
	return {$: 13, a: a};
};
var $author$project$Pages$StudentDetail$opponentRatingButton = F3(
	function (label, filterValue, currentFilter) {
		var isActive = _Utils_eq(filterValue, currentFilter);
		var baseClasses = 'px-3 py-1 text-sm rounded-full border transition-colors';
		var activeClasses = isActive ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300 text-gray-600 hover:border-gray-400';
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(
					$author$project$Pages$StudentDetail$SetOpponentRatingFilter(filterValue)),
					$elm$html$Html$Attributes$class(baseClasses + (' ' + activeClasses))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(label)
				]));
	});
var $elm$html$Html$option = _VirtualDom_node('option');
var $author$project$Pages$StudentDetail$SetResultFilter = function (a) {
	return {$: 4, a: a};
};
var $author$project$Pages$StudentDetail$resultButton = F3(
	function (label, result, current) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(
					$author$project$Pages$StudentDetail$SetResultFilter(result)),
					$elm$html$Html$Attributes$class(
					_Utils_eq(result, current) ? 'px-3 py-1.5 rounded-lg bg-gray-800 text-white text-sm font-medium' : 'px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-sm hover:border-gray-300')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(label)
				]));
	});
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$Pages$StudentDetail$SetTimeControlFilter = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$StudentDetail$timeControlButton = F3(
	function (label, tc, current) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(
					$author$project$Pages$StudentDetail$SetTimeControlFilter(tc)),
					$elm$html$Html$Attributes$class(
					_Utils_eq(tc, current) ? 'px-3 py-1.5 rounded-lg bg-orange-500 text-white text-sm font-medium' : 'px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm hover:border-gray-300')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(label)
				]));
	});
var $author$project$Pages$StudentDetail$ClearTags = {$: 7};
var $author$project$Pages$StudentDetail$indexOfHelper = F3(
	function (index, item, list) {
		indexOfHelper:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (_Utils_eq(x, item)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$item = item,
						$temp$list = xs;
					index = $temp$index;
					item = $temp$item;
					list = $temp$list;
					continue indexOfHelper;
				}
			}
		}
	});
var $author$project$Pages$StudentDetail$indexOf = F2(
	function (item, list) {
		return A3($author$project$Pages$StudentDetail$indexOfHelper, 0, item, list);
	});
var $elm$core$List$sortBy = _List_sortBy;
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
var $author$project$Pages$StudentDetail$ToggleCategory = function (a) {
	return {$: 17, a: a};
};
var $elm$core$String$cons = _String_cons;
var $elm$core$Char$toUpper = _Char_toUpper;
var $author$project$Pages$StudentDetail$capitalizeFirst = function (str) {
	var _v0 = $elm$core$String$uncons(str);
	if (_v0.$ === 1) {
		return '';
	} else {
		var _v1 = _v0.a;
		var first = _v1.a;
		var rest = _v1.b;
		return A2(
			$elm$core$String$cons,
			$elm$core$Char$toUpper(first),
			rest);
	}
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Pages$StudentDetail$ToggleTag = function (a) {
	return {$: 6, a: a};
};
var $author$project$Pages$StudentDetail$Negative = 1;
var $author$project$Pages$StudentDetail$Neutral = 2;
var $author$project$Pages$StudentDetail$Positive = 0;
var $elm$core$String$toLower = _String_toLower;
var $author$project$Pages$StudentDetail$getTagSentiment = function (tag) {
	var slug = $elm$core$String$toLower(tag.bY);
	return A2(
		$elm$core$List$member,
		slug,
		_List_fromArray(
			['fork-executed', 'pin-created', 'discovered-attack', 'winning-converted', 'clean-game', 'high-accuracy', 'delivered-checkmate', 'comeback', 'upset-victory', 'well-prepared', 'castled-kingside', 'castled-queenside', 'back-rank-threat'])) ? 0 : (A2(
		$elm$core$List$member,
		slug,
		_List_fromArray(
			['fork-missed', 'pin-missed', 'opening-blunder', 'got-checkmated', 'winning-squandered', 'low-accuracy', 'collapsed-after-blunder', 'flagged', 'upset-loss', 'back-rank-victim', 'did-not-castle'])) ? 1 : 2);
};
var $author$project$Pages$StudentDetail$getTagSentimentClasses = function (tag) {
	var _v0 = $author$project$Pages$StudentDetail$getTagSentiment(tag);
	switch (_v0) {
		case 0:
			return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
		case 1:
			return 'bg-red-100 text-red-700 hover:bg-red-200';
		default:
			return 'bg-slate-100 text-slate-700 hover:bg-slate-200';
	}
};
var $author$project$Pages$StudentDetail$viewTagChip = F2(
	function (selectedTags, tc) {
		var isSelected = A2($elm$core$List$member, tc.aa.bY, selectedTags);
		var description = A2($elm$core$Maybe$withDefault, '', tc.aa.cl);
		var hasTooltip = !$elm$core$String$isEmpty(description);
		var colorClasses = isSelected ? 'bg-orange-500 text-white' : $author$project$Pages$StudentDetail$getTagSentimentClasses(tc.aa);
		var baseClasses = 'inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full cursor-pointer transition-colors';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('group relative inline-block')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick(
							$author$project$Pages$StudentDetail$ToggleTag(tc.aa.bY)),
							$elm$html$Html$Attributes$class(baseClasses + (' ' + colorClasses))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(tc.aa.cG),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('opacity-75')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'(' + ($elm$core$String$fromInt(tc.cg) + ')'))
								]))
						])),
					hasTooltip ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none max-w-xs text-center')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(description),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900')
								]),
							_List_Nil)
						])) : $elm$html$Html$text('')
				]));
	});
var $author$project$Pages$StudentDetail$viewTagCategory = F3(
	function (model, tagsWithCounts, category) {
		var isExpanded = A2($elm$core$List$member, category, model.as);
		var categoryTags = A2(
			$elm$core$List$sortBy,
			function (tc) {
				return -tc.cg;
			},
			A2(
				$elm$core$List$filter,
				function (tc) {
					return _Utils_eq(tc.aa.cd, category);
				},
				tagsWithCounts));
		var categoryLabel = $author$project$Pages$StudentDetail$capitalizeFirst(
			A3($elm$core$String$replace, '_', ' ', category));
		return $elm$core$List$isEmpty(categoryTags) ? $elm$html$Html$text('') : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('border border-gray-100 rounded')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick(
							$author$project$Pages$StudentDetail$ToggleCategory(category)),
							$elm$html$Html$Attributes$class('w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(categoryLabel)
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-gray-400')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									isExpanded ? '−' : '+')
								]))
						])),
					isExpanded ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('px-3 pb-2 flex flex-wrap gap-1')
						]),
					A2(
						$elm$core$List$map,
						$author$project$Pages$StudentDetail$viewTagChip(model.z),
						categoryTags)) : $elm$html$Html$text('')
				]));
	});
var $author$project$Pages$StudentDetail$viewTagFilters = function (model) {
	var _v0 = model.eT;
	switch (_v0.$) {
		case 1:
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-sm text-gray-500')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Loading tags...')
					]));
		case 2:
			return $elm$html$Html$text('');
		case 0:
			return $elm$html$Html$text('');
		default:
			var tagsWithCounts = _v0.a;
			var categoryOrder = _List_fromArray(
				['accuracy', 'advantage', 'tactics', 'opening', 'endgame', 'checkmate', 'character', 'opponent', 'time', 'teaching']);
			var categories = $author$project$Pages$StudentDetail$unique(
				A2(
					$elm$core$List$map,
					function (tc) {
						return tc.aa.cd;
					},
					tagsWithCounts));
			var sortedCategories = A2(
				$elm$core$List$sortBy,
				function (cat) {
					var _v1 = A2($author$project$Pages$StudentDetail$indexOf, cat, categoryOrder);
					if (!_v1.$) {
						var i = _v1.a;
						return i;
					} else {
						return 999;
					}
				},
				categories);
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex items-center justify-between mb-2')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Tags')
									])),
								(!$elm$core$List$isEmpty(model.z)) ? A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ClearTags),
										$elm$html$Html$Attributes$class('text-xs text-orange-600 hover:text-orange-700')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										'Clear ' + $elm$core$String$fromInt(
											$elm$core$List$length(model.z)))
									])) : $elm$html$Html$text('')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('space-y-2')
							]),
						A2(
							$elm$core$List$map,
							A2($author$project$Pages$StudentDetail$viewTagCategory, model, tagsWithCounts),
							sortedCategories))
					]));
	}
};
var $author$project$Pages$StudentDetail$viewFilterPanel = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-white rounded-lg border border-gray-200 p-4 space-y-6')
			]),
		_List_fromArray(
			[
				$author$project$Pages$StudentDetail$hasActiveFilters(model) ? A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ClearAllFilters),
						$elm$html$Html$Attributes$class('w-full px-3 py-2 text-sm text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors flex items-center justify-center gap-2')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Clear All Filters'),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-xs bg-orange-200 text-orange-700 px-2 py-0.5 rounded-full')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromInt(
									$author$project$Pages$StudentDetail$countActiveFilters(model)))
							]))
					])) : $elm$html$Html$text(''),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700 mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Search Opponent')
							])),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500'),
								$elm$html$Html$Attributes$placeholder('Type opponent name...'),
								$elm$html$Html$Attributes$value(model.al),
								$elm$html$Html$Events$onInput($author$project$Pages$StudentDetail$SetOpponentSearch)
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700 mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Sort By')
							])),
						A2(
						$elm$html$Html$select,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500'),
								$elm$html$Html$Events$onInput(
								function (str) {
									switch (str) {
										case 'date-newest':
											return $author$project$Pages$StudentDetail$SetSortOrder(0);
										case 'date-oldest':
											return $author$project$Pages$StudentDetail$SetSortOrder(1);
										case 'accuracy-high':
											return $author$project$Pages$StudentDetail$SetSortOrder(2);
										case 'accuracy-low':
											return $author$project$Pages$StudentDetail$SetSortOrder(3);
										case 'rating-high':
											return $author$project$Pages$StudentDetail$SetSortOrder(4);
										case 'rating-low':
											return $author$project$Pages$StudentDetail$SetSortOrder(5);
										default:
											return $author$project$Pages$StudentDetail$SetSortOrder(0);
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
										$elm$html$Html$Attributes$selected(!model.N)
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
										$elm$html$Html$Attributes$selected(model.N === 1)
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
										$elm$html$Html$Attributes$selected(model.N === 2)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Accuracy (High → Low)')
									])),
								A2(
								$elm$html$Html$option,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$value('accuracy-low'),
										$elm$html$Html$Attributes$selected(model.N === 3)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Accuracy (Low → High)')
									])),
								A2(
								$elm$html$Html$option,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$value('rating-high'),
										$elm$html$Html$Attributes$selected(model.N === 4)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Opponent Rating (High)')
									])),
								A2(
								$elm$html$Html$option,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$value('rating-low'),
										$elm$html$Html$Attributes$selected(model.N === 5)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Opponent Rating (Low)')
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700 mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Time Control')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex flex-wrap gap-2')
							]),
						_List_fromArray(
							[
								A3($author$project$Pages$StudentDetail$timeControlButton, 'All', 0, model.O),
								A3($author$project$Pages$StudentDetail$timeControlButton, 'Bullet', 1, model.O),
								A3($author$project$Pages$StudentDetail$timeControlButton, 'Blitz', 2, model.O),
								A3($author$project$Pages$StudentDetail$timeControlButton, 'Rapid', 3, model.O)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700 mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Result')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex flex-wrap gap-2')
							]),
						_List_fromArray(
							[
								A3($author$project$Pages$StudentDetail$resultButton, 'All', 0, model.M),
								A3($author$project$Pages$StudentDetail$resultButton, 'Wins', 1, model.M),
								A3($author$project$Pages$StudentDetail$resultButton, 'Losses', 2, model.M),
								A3($author$project$Pages$StudentDetail$resultButton, 'Draws', 3, model.M)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700 mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Played As')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex flex-wrap gap-2')
							]),
						_List_fromArray(
							[
								A3($author$project$Pages$StudentDetail$colorButton, 'All', 0, model.S),
								A3($author$project$Pages$StudentDetail$colorButton, 'White', 1, model.S),
								A3($author$project$Pages$StudentDetail$colorButton, 'Black', 2, model.S)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700 mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Accuracy Range')
							])),
						A2(
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
										$elm$html$Html$Attributes$class('w-16 px-2 py-1 border border-gray-300 rounded text-sm'),
										$elm$html$Html$Attributes$placeholder('Min'),
										$elm$html$Html$Attributes$min('0'),
										$elm$html$Html$Attributes$max('100'),
										$elm$html$Html$Attributes$value(
										A2(
											$elm$core$Maybe$withDefault,
											'',
											A2($elm$core$Maybe$map, $elm$core$String$fromInt, model.ek))),
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
										$elm$html$Html$text('to')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('number'),
										$elm$html$Html$Attributes$class('w-16 px-2 py-1 border border-gray-300 rounded text-sm'),
										$elm$html$Html$Attributes$placeholder('Max'),
										$elm$html$Html$Attributes$min('0'),
										$elm$html$Html$Attributes$max('100'),
										$elm$html$Html$Attributes$value(
										A2(
											$elm$core$Maybe$withDefault,
											'',
											A2($elm$core$Maybe$map, $elm$core$String$fromInt, model.ef))),
										$elm$html$Html$Events$onInput($author$project$Pages$StudentDetail$SetMaxAccuracy)
									]),
								_List_Nil),
								((!_Utils_eq(model.ek, $elm$core$Maybe$Nothing)) || (!_Utils_eq(model.ef, $elm$core$Maybe$Nothing))) ? A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ClearAccuracy),
										$elm$html$Html$Attributes$class('text-gray-400 hover:text-gray-600 text-sm')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Clear')
									])) : $elm$html$Html$text('')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700 mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Max Blunders')
							])),
						A2(
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
										$elm$html$Html$Attributes$class('w-16 px-2 py-1 border border-gray-300 rounded text-sm'),
										$elm$html$Html$Attributes$placeholder('Any'),
										$elm$html$Html$Attributes$min('0'),
										$elm$html$Html$Attributes$max('20'),
										$elm$html$Html$Attributes$value(
										A2(
											$elm$core$Maybe$withDefault,
											'',
											A2($elm$core$Maybe$map, $elm$core$String$fromInt, model.eh))),
										$elm$html$Html$Events$onInput($author$project$Pages$StudentDetail$SetMaxBlunders)
									]),
								_List_Nil),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-gray-500 text-xs')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('or fewer')
									])),
								(!_Utils_eq(model.eh, $elm$core$Maybe$Nothing)) ? A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ClearBlunders),
										$elm$html$Html$Attributes$class('text-gray-400 hover:text-gray-600 text-sm')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Clear')
									])) : $elm$html$Html$text('')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-sm font-medium text-gray-700 mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Opponent Rating')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex flex-wrap gap-2')
							]),
						_List_fromArray(
							[
								A3($author$project$Pages$StudentDetail$opponentRatingButton, 'All', 'all', model.Y),
								A3($author$project$Pages$StudentDetail$opponentRatingButton, 'Higher Rated', 'higher', model.Y),
								A3($author$project$Pages$StudentDetail$opponentRatingButton, 'Lower Rated', 'lower', model.Y)
							]))
					])),
				$author$project$Pages$StudentDetail$viewTagFilters(model)
			]));
};
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
						[student.dz])));
			var search = $elm$core$String$toLower(searchStr);
			return A2(
				$elm$core$List$filter,
				function (g) {
					var isStudentWhite = A2(
						$elm$core$List$member,
						$elm$core$String$toLower(g.dW.e9),
						studentUsernames);
					var opponent = isStudentWhite ? $elm$core$String$toLower(g.dW.dv) : $elm$core$String$toLower(g.dW.e9);
					return A2($elm$core$String$contains, search, opponent);
				},
				games);
		}
	});
var $author$project$Pages$StudentDetail$formatDateFriendly = function (dateStr) {
	return A2($elm$core$String$left, 10, dateStr);
};
var $author$project$Pages$StudentDetail$groupGamesByDate = function (games) {
	return $elm$core$List$reverse(
		A3(
			$elm$core$List$foldl,
			F2(
				function (game, acc) {
					var dateStr = $author$project$Pages$StudentDetail$formatDateFriendly(game.dW.eA);
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
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Pages$StudentDetail$sortGames = F3(
	function (order, student, games) {
		var studentUsernames = A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[student.dz]));
		var getOpponentRating = function (g) {
			var isStudentWhite = A2(
				$elm$core$List$member,
				$elm$core$String$toLower(g.dW.e9),
				A2($elm$core$List$map, $elm$core$String$toLower, studentUsernames));
			return isStudentWhite ? A2($elm$core$Maybe$withDefault, 0, g.dW.cc) : A2($elm$core$Maybe$withDefault, 0, g.dW.dc);
		};
		var getAccuracy = function (g) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				A2(
					$elm$core$Maybe$andThen,
					function ($) {
						return $.bu;
					},
					g.bJ));
		};
		switch (order) {
			case 0:
				return games;
			case 1:
				return $elm$core$List$reverse(games);
			case 2:
				return A2(
					$elm$core$List$sortBy,
					function (g) {
						return -getAccuracy(g);
					},
					games);
			case 3:
				return A2(
					$elm$core$List$sortBy,
					function (g) {
						return getAccuracy(g);
					},
					games);
			case 4:
				return A2(
					$elm$core$List$sortBy,
					function (g) {
						return -getOpponentRating(g);
					},
					games);
			default:
				return A2(
					$elm$core$List$sortBy,
					function (g) {
						return getOpponentRating(g);
					},
					games);
		}
	});
var $author$project$Pages$StudentDetail$formatDate = function (dateStr) {
	return A2($elm$core$String$left, 10, dateStr);
};
var $author$project$Pages$StudentDetail$resultToTextWithColor = F2(
	function (isStudentWhite, game) {
		var _v0 = game.eI;
		switch (_v0) {
			case '1-0':
				return isStudentWhite ? {ar: 'font-semibold text-green-600', au: 'Win'} : {ar: 'font-semibold text-red-600', au: 'Loss'};
			case '0-1':
				return isStudentWhite ? {ar: 'font-semibold text-red-600', au: 'Loss'} : {ar: 'font-semibold text-green-600', au: 'Win'};
			case '1/2-1/2':
				return {ar: 'font-semibold text-gray-600', au: 'Draw'};
			default:
				return {ar: 'font-medium text-gray-900', au: game.eI};
		}
	});
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Pages$StudentDetail$accuracyColorClasses = function (accuracy) {
	return (accuracy <= 40) ? {aS: 'bg-red-100', a7: 'border-red-200', aM: 'text-red-700'} : ((accuracy <= 60) ? {aS: 'bg-orange-100', a7: 'border-orange-200', aM: 'text-orange-700'} : ((accuracy <= 80) ? {aS: 'bg-yellow-100', a7: 'border-yellow-200', aM: 'text-yellow-700'} : {aS: 'bg-green-100', a7: 'border-green-200', aM: 'text-green-700'}));
};
var $elm$core$Basics$round = _Basics_round;
var $author$project$Pages$StudentDetail$formatAccuracy = function (acc) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(acc));
};
var $author$project$Pages$StudentDetail$viewAccuracyBadge = function (maybeInsight) {
	if (!maybeInsight.$) {
		var ins = maybeInsight.a;
		var _v1 = ins.bu;
		if (!_v1.$) {
			var acc = _v1.a;
			var phaseTooltip = A2(
				$elm$core$String$join,
				' | ',
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							A2(
							$elm$core$Maybe$map,
							function (a) {
								return 'Opening: ' + ($author$project$Pages$StudentDetail$formatAccuracy(a) + '%');
							},
							ins.dl),
							A2(
							$elm$core$Maybe$map,
							function (a) {
								return 'Middlegame: ' + ($author$project$Pages$StudentDetail$formatAccuracy(a) + '%');
							},
							ins.dk),
							A2(
							$elm$core$Maybe$map,
							function (a) {
								return 'Endgame: ' + ($author$project$Pages$StudentDetail$formatAccuracy(a) + '%');
							},
							ins.dj)
						])));
			var colors = $author$project$Pages$StudentDetail$accuracyColorClasses(acc);
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-xs px-2 py-0.5 rounded-full cursor-help ' + (colors.aS + (' ' + colors.aM))),
						$elm$html$Html$Attributes$title(phaseTooltip)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$author$project$Pages$StudentDetail$formatAccuracy(acc) + '% acc')
					]));
		} else {
			return $elm$html$Html$text('');
		}
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Pages$StudentDetail$pluralize = function (count) {
	return (count === 1) ? '' : 's';
};
var $author$project$Pages$StudentDetail$pluralizeIrregular = function (count) {
	return (count === 1) ? '' : ' (ies)';
};
var $author$project$Pages$StudentDetail$viewErrorCounts = function (maybeInsight) {
	if (!maybeInsight.$) {
		var ins = maybeInsight.a;
		return ((ins.a6 > 0) || ((ins.bj > 0) || (ins.bh > 0))) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex items-center gap-2 text-xs')
				]),
			_List_fromArray(
				[
					(ins.a6 > 0) ? A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center gap-1'),
							$elm$html$Html$Attributes$title('Blunders: moves losing significant material or position')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-2 h-2 rounded-full bg-red-500')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-red-600 font-medium')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromInt(ins.a6) + (' Blunder' + $author$project$Pages$StudentDetail$pluralize(ins.a6)))
								]))
						])) : $elm$html$Html$text(''),
					(ins.bj > 0) ? A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center gap-1'),
							$elm$html$Html$Attributes$title('Mistakes: moves losing small material or positional advantage')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-2 h-2 rounded-full bg-orange-500')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-orange-600 font-medium')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromInt(ins.bj) + (' Mistake' + $author$project$Pages$StudentDetail$pluralize(ins.bj)))
								]))
						])) : $elm$html$Html$text(''),
					(ins.bh > 0) ? A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center gap-1'),
							$elm$html$Html$Attributes$title('Inaccuracies: slight imprecisions')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-2 h-2 rounded-full bg-yellow-500')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-yellow-600 font-medium')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromInt(ins.bh) + (' Inaccuracy' + $author$project$Pages$StudentDetail$pluralizeIrregular(ins.bh)))
								]))
						])) : $elm$html$Html$text('')
				])) : A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-green-600 text-xs font-medium')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Clean game')
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Pages$StudentDetail$viewGameTagBadge = function (gameTag) {
	var moveInfo = function () {
		var _v0 = gameTag.eE;
		if (!_v0.$) {
			var move = _v0.a;
			return 'Move ' + $elm$core$String$fromInt(move);
		} else {
			return (!$elm$core$List$isEmpty(gameTag.cE)) ? ('Moves: ' + A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $elm$core$String$fromInt, gameTag.cE))) : '';
		}
	}();
	var description = A2($elm$core$Maybe$withDefault, '', gameTag.aa.cl);
	var hasTooltip = (!$elm$core$String$isEmpty(description)) || (!$elm$core$String$isEmpty(moveInfo));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('group relative inline-block')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						'text-xs px-2 py-0.5 rounded-full ' + $author$project$Pages$StudentDetail$getTagSentimentClasses(gameTag.aa))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(gameTag.aa.cG)
					])),
				hasTooltip ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(description),
						((!$elm$core$String$isEmpty(description)) && (!$elm$core$String$isEmpty(moveInfo))) ? A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mx-1 text-gray-400')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('|')
							])) : $elm$html$Html$text(''),
						(!$elm$core$String$isEmpty(moveInfo)) ? A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-orange-300')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(moveInfo)
							])) : $elm$html$Html$text(''),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900')
							]),
						_List_Nil)
					])) : $elm$html$Html$text('')
			]));
};
var $author$project$Pages$StudentDetail$viewGameRow = F2(
	function (student, gameWithInsights) {
		var tags = gameWithInsights.eT;
		var studentUsernames = A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[student.dz]));
		var insight = gameWithInsights.bJ;
		var game = gameWithInsights.dW;
		var isStudentWhite = A2(
			$elm$core$List$member,
			$elm$core$String$toLower(game.e9),
			A2($elm$core$List$map, $elm$core$String$toLower, studentUsernames));
		var opponent = isStudentWhite ? game.dv : game.e9;
		var opponentRating = isStudentWhite ? game.cc : game.dc;
		var resultText = A2($author$project$Pages$StudentDetail$resultToTextWithColor, isStudentWhite, game);
		var chessComAnalyzeUrl = 'https://www.chess.com/analysis/game/live/' + game.cL;
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href(chessComAnalyzeUrl),
					$elm$html$Html$Attributes$target('_blank'),
					$elm$html$Html$Attributes$class('block p-4 hover:bg-orange-50 transition-colors group')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-start justify-between gap-4')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									'w-4 h-4 rounded-full flex-shrink-0 mt-1 border ' + (isStudentWhite ? 'bg-white border-gray-400' : 'bg-gray-800 border-gray-800')),
									$elm$html$Html$Attributes$title(
									isStudentWhite ? 'Played as White' : 'Played as Black')
								]),
							_List_Nil),
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
													$elm$html$Html$Attributes$class(resultText.ar)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(resultText.au)
												])),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-gray-700')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('vs ' + opponent)
												])),
											function () {
											if (!opponentRating.$) {
												var rating = opponentRating.a;
												return A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-gray-600 font-semibold')
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
											$author$project$Pages$StudentDetail$viewAccuracyBadge(insight)
										])),
									function () {
									var _v1 = game.et;
									if (!_v1.$) {
										var opening = _v1.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-sm text-blue-600 mt-1')
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
											$elm$html$Html$Attributes$class('text-sm text-gray-500 mt-1 flex items-center gap-3')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$author$project$Pages$StudentDetail$formatDate(game.eA)),
											$author$project$Pages$StudentDetail$viewErrorCounts(insight)
										])),
									(!$elm$core$List$isEmpty(tags)) ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mt-2 flex flex-wrap gap-1')
										]),
									A2($elm$core$List$map, $author$project$Pages$StudentDetail$viewGameTagBadge, tags)) : $elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-orange-500 font-medium flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Open →')
								]))
						]))
				]));
	});
var $author$project$Pages$StudentDetail$viewDateGroup = F2(
	function (student, _v0) {
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
							$elm$html$Html$Attributes$class('sticky top-0 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 border-b border-gray-200 z-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(dateStr)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-white rounded-lg border border-gray-200 divide-y divide-gray-100')
						]),
					A2(
						$elm$core$List$map,
						$author$project$Pages$StudentDetail$viewGameRow(student),
						games))
				]));
	});
var $author$project$Pages$StudentDetail$viewGameRowSimple = function (gameWithInsights) {
	var game = gameWithInsights.dW;
	var chessComAnalyzeUrl = 'https://www.chess.com/analysis/game/live/' + game.cL;
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$href(chessComAnalyzeUrl),
				$elm$html$Html$Attributes$target('_blank'),
				$elm$html$Html$Attributes$class('block p-4 hover:bg-orange-50 transition-colors group')
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
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('font-medium text-gray-900')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(game.e9 + (' vs ' + game.dv))
													]))
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
												$author$project$Pages$StudentDetail$formatDate(game.eA))
											]))
									]))
							])),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Open →')
							]))
					]))
			]));
};
var $author$project$Pages$StudentDetail$GoToPage = function (a) {
	return {$: 20, a: a};
};
var $author$project$Pages$StudentDetail$viewPagination = F2(
	function (currentPage, totalPages) {
		var maxVisiblePages = 7;
		var pages = (_Utils_cmp(totalPages, maxVisiblePages) < 1) ? A2($elm$core$List$range, 0, totalPages - 1) : ((currentPage < 3) ? A2($elm$core$List$range, 0, maxVisiblePages - 1) : ((_Utils_cmp(currentPage, totalPages - 4) > 0) ? A2($elm$core$List$range, totalPages - maxVisiblePages, totalPages - 1) : A2($elm$core$List$range, currentPage - 3, currentPage + 3)));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 flex items-center justify-center gap-1')
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
								$elm$html$Html$Attributes$class('px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Prev')
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
										_Utils_eq(page, currentPage) ? 'px-3 py-1 text-sm bg-orange-500 text-white rounded' : 'px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded')
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
									$elm$html$Html$Attributes$class('px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Next')
								])) : $elm$html$Html$text('')
						]))));
	});
var $author$project$Pages$StudentDetail$viewGamesList = function (model) {
	var _v0 = model.f;
	switch (_v0.$) {
		case 0:
			return $elm$html$Html$text('');
		case 1:
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('space-y-2')
					]),
				A2(
					$elm$core$List$repeat,
					5,
					A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bg-white rounded-lg border border-gray-200 p-4 animate-pulse')
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
												$elm$html$Html$Attributes$class('w-16 h-4 bg-gray-200 rounded')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-32 h-4 bg-gray-200 rounded')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex-1')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-20 h-4 bg-gray-200 rounded')
											]),
										_List_Nil)
									]))
							]))));
		case 2:
			var error = _v0.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('bg-red-50 border border-red-200 rounded-lg p-4 text-red-600')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(error)
					]));
		default:
			var gamesData = _v0.a;
			var _v1 = model.ay;
			if (_v1.$ === 3) {
				var student = _v1.a;
				var totalPages = $elm$core$Basics$ceiling(gamesData.a0 / model.ea);
				var filteredGames = A3(
					$author$project$Pages$StudentDetail$sortGames,
					model.N,
					student,
					A3($author$project$Pages$StudentDetail$filterByOpponentName, model.al, student, gamesData.f));
				var groupedGames = $author$project$Pages$StudentDetail$groupGamesByDate(filteredGames);
				var currentPage = (model.ep / model.ea) | 0;
				return $elm$core$List$isEmpty(filteredGames) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('No games found matching the filters.')
						])) : A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mb-3 text-sm text-gray-500')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'Showing ' + ($elm$core$String$fromInt(
										$elm$core$List$length(filteredGames)) + (' of ' + ($elm$core$String$fromInt(gamesData.a0) + ' games'))))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('space-y-4')
								]),
							A2(
								$elm$core$List$map,
								$author$project$Pages$StudentDetail$viewDateGroup(student),
								groupedGames)),
							(totalPages > 1) ? A2($author$project$Pages$StudentDetail$viewPagination, currentPage, totalPages) : $elm$html$Html$text('')
						]));
			} else {
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-white rounded-lg border border-gray-200 divide-y divide-gray-100')
						]),
					A2($elm$core$List$map, $author$project$Pages$StudentDetail$viewGameRowSimple, gamesData.f));
			}
	}
};
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
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
					[student.dz])));
		var isWin = function (g) {
			var isStudentWhite = A2(
				$elm$core$List$member,
				$elm$core$String$toLower(g.dW.e9),
				studentUsernames);
			return (isStudentWhite && (g.dW.eI === '1-0')) || ((!isStudentWhite) && (g.dW.eI === '0-1'));
		};
		var isLoss = function (g) {
			var isStudentWhite = A2(
				$elm$core$List$member,
				$elm$core$String$toLower(g.dW.e9),
				studentUsernames);
			return (isStudentWhite && (g.dW.eI === '0-1')) || ((!isStudentWhite) && (g.dW.eI === '1-0'));
		};
		var isDraw = function (g) {
			return g.dW.eI === '1/2-1/2';
		};
		var accuracies = A2(
			$elm$core$List$filterMap,
			function (g) {
				return A2(
					$elm$core$Maybe$andThen,
					function ($) {
						return $.bu;
					},
					g.bJ);
			},
			games);
		var avgAcc = $elm$core$List$isEmpty(accuracies) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			$elm$core$List$sum(accuracies) / $elm$core$List$length(accuracies));
		return {
			bv: avgAcc,
			aF: $elm$core$List$length(
				A2($elm$core$List$filter, isDraw, games)),
			aH: $elm$core$List$length(
				A2($elm$core$List$filter, isLoss, games)),
			a0: $elm$core$List$length(games),
			aP: $elm$core$List$length(
				A2($elm$core$List$filter, isWin, games))
		};
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Pages$StudentDetail$viewStatsHeader = function (model) {
	var _v0 = _Utils_Tuple2(model.ay, model.f);
	if ((_v0.a.$ === 3) && (_v0.b.$ === 3)) {
		var student = _v0.a.a;
		var gamesData = _v0.b.a;
		var stats = A2($author$project$Pages$StudentDetail$calculateStats, student, gamesData.f);
		var totalGames = (stats.aP + stats.aH) + stats.aF;
		var winPercent = (totalGames > 0) ? ((stats.aP / totalGames) * 100) : 0;
		var lossPercent = (totalGames > 0) ? ((stats.aH / totalGames) * 100) : 0;
		var drawPercent = (totalGames > 0) ? ((stats.aF / totalGames) * 100) : 0;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-6 bg-white rounded-lg border border-gray-200 p-4')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('grid grid-cols-2 md:grid-cols-4 gap-4')
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
											$elm$core$String$fromInt(gamesData.a0))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-sm text-gray-500')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Total Games')
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('col-span-2 md:col-span-1')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-sm text-gray-500 mb-2 text-center')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Results')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex h-4 rounded-full overflow-hidden bg-gray-100')
										]),
									_List_fromArray(
										[
											(winPercent > 0) ? A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('bg-green-500 transition-all duration-300'),
													A2(
													$elm$html$Html$Attributes$style,
													'width',
													$elm$core$String$fromFloat(winPercent) + '%'),
													$elm$html$Html$Attributes$title(
													'Wins: ' + $elm$core$String$fromInt(stats.aP))
												]),
											_List_Nil) : $elm$html$Html$text(''),
											(drawPercent > 0) ? A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('bg-gray-400 transition-all duration-300'),
													A2(
													$elm$html$Html$Attributes$style,
													'width',
													$elm$core$String$fromFloat(drawPercent) + '%'),
													$elm$html$Html$Attributes$title(
													'Draws: ' + $elm$core$String$fromInt(stats.aF))
												]),
											_List_Nil) : $elm$html$Html$text(''),
											(lossPercent > 0) ? A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('bg-red-500 transition-all duration-300'),
													A2(
													$elm$html$Html$Attributes$style,
													'width',
													$elm$core$String$fromFloat(lossPercent) + '%'),
													$elm$html$Html$Attributes$title(
													'Losses: ' + $elm$core$String$fromInt(stats.aH))
												]),
											_List_Nil) : $elm$html$Html$text('')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex justify-between text-xs mt-1')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-green-600 font-medium')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													$elm$core$String$fromInt(stats.aP) + 'W')
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
													$elm$core$String$fromInt(stats.aF) + 'D')
												])),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-red-600 font-medium')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													$elm$core$String$fromInt(stats.aH) + 'L')
												]))
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
									var _v1 = stats.bv;
									if (!_v1.$) {
										var acc = _v1.a;
										var colors = $author$project$Pages$StudentDetail$accuracyColorClasses(acc);
										return A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-2xl font-bold ' + colors.aM)
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$author$project$Pages$StudentDetail$formatAccuracy(acc) + '%')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-sm text-gray-500')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Avg Accuracy')
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
															$elm$html$Html$Attributes$class('text-2xl font-bold text-gray-400')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('—')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-sm text-gray-500')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Avg Accuracy')
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
											$elm$html$Html$Attributes$class('text-sm text-gray-500')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Win Rate')
										]))
								]))
						]))
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Pages$StudentDetail$viewStudentHeader = function (studentData) {
	switch (studentData.$) {
		case 1:
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-6')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('animate-pulse')
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
												$elm$html$Html$Attributes$class('w-14 h-14 bg-gray-200 rounded-full')
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
							]))
					]));
		case 2:
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
		case 0:
			return $elm$html$Html$text('');
		default:
			var student = studentData.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-6')
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
								var _v1 = student.dq;
								if (!_v1.$) {
									var url = _v1.a;
									return A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$src(url),
												$elm$html$Html$Attributes$class('w-14 h-14 rounded-full border-2 border-gray-200'),
												$elm$html$Html$Attributes$alt(student.bA + '\'s avatar')
											]),
										_List_Nil);
								} else {
									return A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-14 h-14 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-xl text-orange-600 font-semibold')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$elm$core$String$toUpper(
													A2($elm$core$String$left, 1, student.bA)))
											]));
								}
							}(),
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
												$elm$html$Html$text(student.bA)
											])),
										function () {
										var _v2 = student.dz;
										if (!_v2.$) {
											var username = _v2.a;
											return A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://www.chess.com/member/' + username),
														$elm$html$Html$Attributes$target('_blank'),
														$elm$html$Html$Attributes$class('text-sm text-orange-500 hover:text-orange-600 hover:underline')
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
							]))
					]));
	}
};
var $author$project$Pages$StudentDetail$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('relative')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('md:hidden fixed bottom-4 right-4 z-40')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ToggleSidebar),
								$elm$html$Html$Attributes$class('bg-orange-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-orange-600 transition-colors')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Filters'),
								($author$project$Pages$StudentDetail$countActiveFilters(model) > 0) ? A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bg-white text-orange-500 text-xs px-2 py-0.5 rounded-full')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(
											$author$project$Pages$StudentDetail$countActiveFilters(model)))
									])) : $elm$html$Html$text('')
							]))
					])),
				model.aK ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('md:hidden fixed inset-0 bg-black bg-opacity-50 z-30'),
						$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ToggleSidebar)
					]),
				_List_Nil) : $elm$html$Html$text(''),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex gap-6')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								model.aK ? 'fixed md:relative inset-y-0 left-0 z-40 w-80 md:w-72 flex-shrink-0 bg-white md:bg-transparent overflow-y-auto transform transition-transform duration-300 ease-in-out' : 'fixed md:relative inset-y-0 left-0 z-40 w-80 md:w-72 flex-shrink-0 bg-white md:bg-transparent overflow-y-auto transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('p-4 md:p-0')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('md:hidden flex justify-end mb-4')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick($author$project$Pages$StudentDetail$ToggleSidebar),
														$elm$html$Html$Attributes$class('text-gray-500 hover:text-gray-700 p-2')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('✕')
													]))
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$author$project$Route$href($author$project$Route$Dashboard),
												$elm$html$Html$Attributes$class('inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6')
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
												$elm$html$Html$text('Back to Dashboard')
											])),
										$author$project$Pages$StudentDetail$viewFilterPanel(model)
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex-1 min-w-0')
							]),
						_List_fromArray(
							[
								$author$project$Pages$StudentDetail$viewStudentHeader(model.ay),
								$author$project$Pages$StudentDetail$viewStatsHeader(model),
								$author$project$Pages$StudentDetail$viewGamesList(model)
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
							$elm$html$Html$Attributes$class('inline-block bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Go to Dashboard')
						]))
				]))
		]));
var $author$project$Main$view = function (model) {
	return {
		aT: _List_fromArray(
			[
				function () {
				var _v0 = model.y;
				switch (_v0.$) {
					case 0:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$LoginMsg,
							$author$project$Pages$Login$view(subModel));
					case 1:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$RegisterMsg,
							$author$project$Pages$Register$view(subModel));
					case 2:
						var subModel = _v0.a;
						var _v1 = model.A;
						if (_v1.$ === 1) {
							var token = _v1.a;
							var coach = _v1.b;
							return $author$project$View$Layout$layout(
								{
									dA: coach,
									bw: A2(
										$elm$html$Html$map,
										$author$project$Main$DashboardMsg,
										A3($author$project$Pages$Dashboard$view, model.ca, token, subModel)),
									bR: $author$project$Main$Logout
								});
						} else {
							return $elm$html$Html$text('');
						}
					case 3:
						var subModel = _v0.a;
						var _v2 = model.A;
						if (_v2.$ === 1) {
							var coach = _v2.b;
							return $author$project$View$Layout$layout(
								{
									dA: coach,
									bw: A2(
										$elm$html$Html$map,
										$author$project$Main$StudentDetailMsg,
										$author$project$Pages$StudentDetail$view(subModel)),
									bR: $author$project$Main$Logout
								});
						} else {
							return $elm$html$Html$text('');
						}
					case 4:
						var subModel = _v0.a;
						var _v3 = model.A;
						if (_v3.$ === 1) {
							var coach = _v3.b;
							return $author$project$View$Layout$layout(
								{
									dA: coach,
									bw: A2(
										$elm$html$Html$map,
										$author$project$Main$GameDetailMsg,
										$author$project$Pages$GameDetail$view(subModel)),
									bR: $author$project$Main$Logout
								});
						} else {
							return $elm$html$Html$text('');
						}
					default:
						return $author$project$Main$viewNotFound;
				}
			}()
			]),
		eY: 'Insights64'
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{d4: $author$project$Main$init, eq: $author$project$Main$UrlChanged, er: $author$project$Main$UrlRequested, eS: $author$project$Main$subscriptions, e6: $author$project$Main$update, e7: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (token) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (apiUrl) {
					return $elm$json$Json$Decode$succeed(
						{ca: apiUrl, br: token});
				},
				A2($elm$json$Json$Decode$field, 'apiUrl', $elm$json$Json$Decode$string));
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