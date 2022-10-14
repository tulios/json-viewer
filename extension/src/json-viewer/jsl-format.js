/*jslint white: true, devel: true, onevar: true, browser: true, undef: true, nomen: true, regexp: true, plusplus: false, bitwise: true, newcap: true, maxerr: 50, indent: 4 */
var jsl = typeof jsl === 'undefined' ? {} : jsl;

/**
 * jsl.format - Provide json reformatting in a character-by-character approach, so that even invalid JSON may be reformatted (to the best of its ability).
**/
jsl.format = (function () {
    function repeat(s, count) {
        return new Array(count + 1).join(s);
    }
    function getSizeOfArray(jsonString, startingPosition){
        return countSizeBy(jsonString, startingPosition, '[', ']');

    }
    function getSizeOfObject(jsonString, startingPosition){
        return countSizeBy(jsonString, startingPosition, '{', '}');
    }
    function countSizeBy(jsonString, startingPosition, openChar, closeChar) {
        var currentPosition = startingPosition + 1;
        var inString = false;
        var numOpened = 1;
        try{
            while (numOpened > 0 && currentPosition < jsonString.length) {
                var currentChar = jsonString.charAt(currentPosition);
                switch (currentChar) {
                    case openChar:
                        if(!inString){
                            numOpened++;
                        }
                        break;
                    case closeChar:
                        if(!inString){
                            numOpened--;
                        }
                        break;
                    case '"':
                        inString = !inString;
                        break;
                }
                currentPosition++;
            }
            return Object.keys(JSON.parse(jsonString.substring(startingPosition,currentPosition))).length;
        }
        catch(err){
            return null;
        }
    }
    function getSize(currentChar, json, i, options) {
        var target;
        var isShow;
        var arraySize;

        switch (currentChar) {
            case '[': target = 'Array'; break;
            case '{': target = 'Object'; break;
            default: return null;
        }

        isShow = (typeof options['show'+target+'Size'] !== "undefined" ? Boolean(options['show'+target+'Size']) : false);
        if(!isShow) {
            return null;
        }

        arraySize = jsl.format['getSizeOf'+target](json, i);
        return arraySize == null ? null : target + "[" + arraySize + "]";
    }
    function formatJson(json, options) {
        options = options || {};
        var tabSize = options.tabSize || 2;
        var indentCStyle = options.indentCStyle || false;
        var tab = "";
        for (var ts = 0; ts < tabSize; ts++) {
          tab += " ";
        }

        var i           = 0,
            il          = 0,
            newJson     = "",
            indentLevel = 0,
            inString    = false,
            currentChar = null;
        for (i = 0, il = json.length; i < il; i += 1) {
            currentChar = json.charAt(i);

            switch (currentChar) {
            case '{':
            case '[':
                if (!inString) {
                    if (indentCStyle) newJson += "\n" + repeat(tab, indentLevel);

                    var size = getSize(currentChar, json, i, options);
                    if(size) newJson += size;

                    newJson += currentChar;
                    newJson +=  "\n" + repeat(tab, indentLevel + 1);
                    indentLevel += 1;
                } else {
                    newJson += currentChar;
                }
                break;
            case '}':
            case ']':
                if (!inString) {
                    indentLevel -= 1;
                    newJson += "\n" + repeat(tab, indentLevel) + currentChar;
                } else {
                    newJson += currentChar;
                }
                break;
            case ',':
                if (!inString) {
                    newJson += ",\n" + repeat(tab, indentLevel);
                } else {
                    newJson += currentChar;
                }
                break;
            case ':':
                if (!inString) {
                    newJson += ": ";
                } else {
                    newJson += currentChar;
                }
                break;
            case ' ':
            case "\n":
            case "\t":
                if (inString) {
                    newJson += currentChar;
                }
                break;
            case '"':
                if (i === 0) {
                    inString = true;
                }
                else if (json.charAt(i - 1) !== '\\' ||
                    (json.charAt(i - 1) === '\\' && json.charAt(i - 2) === '\\')) {
                    inString = !inString;
                }
                newJson += currentChar;
                break;
            default:
                newJson += currentChar;
                break;
            }
        }

        return newJson;
    }

    return {
        "formatJson": formatJson,
        "getSizeOfArray": getSizeOfArray,
        "getSizeOfObject": getSizeOfObject,
    };
}());

module.exports = jsl.format.formatJson;
