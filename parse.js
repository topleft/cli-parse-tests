// args come in as a string, 
// think about adding more args if necessary -- validate

// sequelize model:create --name User --attributes "email:[type:string, unique:true, allowNull: false, {validate: { isEmail: true } }]"

// sequelize model:create --name User --attributes email:[type:string,unique:true,allowNull: false] name:[type:string,required:true]

// email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: { 
//         isEmail: true
//       }    
//     }

// parse(command) will take the attributes arrgument and turn it into an object of objects 

(function() {

    module.exports = parse;

    function parse(command) {
        // command = email:[type:string,unique:true,allowNull: false] name:[type:string,required:true]

        // find field
        var copy = command.slice();
        arr = copy.split(' ');

        // [email:[type:string,unique:true,allowNull: false], name:[type:string,required:true]]
        
        var stringObj = arr.map(function(str){
            var newStr = str.replace(/\[/g, '{');
            newStr = newStr.replace(/\]/g, '}');
            return newStr;
        });  

        //[ 'name:{type:string,required:true}','email:{type:string,required:true,validate:{isEmail:true}}' ]

        var result = stringObj.reduce(function(prev, curr) {
            var obj = objectify(curr);
            prev[obj[0]] = obj[1];
            return prev;
        }, {});

        return result;


        // [email:{type:string,unique:true,allowNull: false}, name:{type:string,required:true}]

        // create key value pairs inside an obj 
        // set obj to field
        // repeat
        // return object with all fields and their attributes 


    }

    // str = 'name:{type:string,required:true}'
    function objectify(str) {
        
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
        convertToType(attrObj);
        return [field, attrObj];

    };

    function convertToType(obj) {
        for(key in obj) {
            
            var copy = obj[key];
            if (copy === 'true' || copy === 'false') {
                obj[key] = Boolean(copy);
            }            
            else if (parseInt(copy)) {
                obj[key] = parseInt(copy);
            }
        };
        return obj;
    };

})();