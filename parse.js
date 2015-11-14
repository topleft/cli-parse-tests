

(function() {

    'use strict';

    module.exports = {

    transformAttributes: function (flag) {

        /*
        new flag format:
          - name:[type:string,required:true] email:[type:string,required:true]
        */
        var self = this;
        var copy = flag.slice();
        var arr = copy.split(' ');
        
        var stringObj = arr.map(function(str){
            var newStr = str.replace(/\[/g, '{');
            newStr = newStr.replace(/\]/g, '}');
            return newStr;
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
        var start = str.indexOf('{');
        var end = str.indexOf('}');
        var preObj = str.slice(start+1, end);

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
        for(var key in obj) {
              
          var copy = obj[key];
          if (copy === 'true' || copy === 'false') {
              obj[key] = Boolean(copy);
          }            
          else if (parseInt(copy)) {
              obj[key] = parseInt(copy);
          }
        }
        return obj;
        },
    };

        })();