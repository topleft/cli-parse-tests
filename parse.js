

(function() {

    'use strict';

    module.exports = {

    transformAttributes: function (flag) {


        /*
        possible flag formats:
          - 'first_name:string last_name:string bio:text'
          - 'first_name:string, last_name:string, bio:text'
        */

        /*
        new flag format:
          - name:[type:string,required:true] email:[type:string,required:true]
          - name:string email:[type:string,required:true], first_name:string, last_name:string
        */

        /*  
        deprecated flag format:
          - first_name:string,last_name:string,bio:text
        */

        var self = this;
        var copy = flag.slice();
        var arr = copy.split(' ');
        
        var stringObj = arr.map(function(str){
            var newStr = str.replace(/\[/g, '{');
            result = newStr.replace(/\]/g, '}'); 
            if (result[result.length-1] === ',') {
                var tempArr = result.split('');
                tempArr.splice(result.length-1, 1);
                result = tempArr.join('');
            }
            return result;
        });  

        var result = stringObj.reduce(function(prev, curr) {
            var obj = self.objectifyString(curr);
            prev[obj[0]] = obj[1];
            return prev;
        }, {});

        return result;

    },

    objectifyString: function(str) {
            
        // grab field name
        var splitPoint = str.indexOf(':');
        var field = str.slice(0, splitPoint);

        // grab attributes as string
        if (str.indexOf('{') !== -1) {
            var start = str.indexOf('{');
            var end = str.indexOf('}');
            var preObj = str.slice(start+1, end);
        }
        else {
            var typeValue = str.split(':')[1];
            return [field, {type: typeValue}];
        }

        // create arr of arrays, [key, value]
        var attrArr = preObj.split(',');
        var pairs = attrArr.map(function(str){
            return str.split(':');
        });

        // create attribute object
        var attrObj = pairs.reduce(function(prev, curr){
            prev[curr[0]] = curr[1];
            return prev;
        }, {});
        // create final pair, [field, { attributes, ...}] 
        this.convertValueToType(attrObj);
        return [field, attrObj];

        },

    convertValueToType: function(obj) {
        return Object.keys(obj).forEach(function(attr) {
            var value = obj[attr]; 
            console.log(value)
            if (value === 'true' || value === 'false') {
            return obj[attr] = Boolean(value);
            }            
            else if (parseInt(value)) {
            return obj[attr] = parseInt(value);
            }
        });
        }
    };

        })();