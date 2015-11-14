var parse = require('./parse');

describe('tests', function(){   

    it('should parse arg', function() {
        var arg = 'name:[type:string]';
        var expected = {name: {type:'string'}};
        var parsed = parse.transformAttributes(arg);
        expect(parsed).toEqual(expected);
    });

    it('should parse arg with multiple fields', function() {
        var arg = 'name:[type:string] lastName:[type:string]';
        var expected = {name: {type:'string'}, lastName:{type:'string'}};
        var parsed = parse.transformAttributes(arg);
        expect(parsed).toEqual(expected);
    });

    it('should parse arg with multiple attributes', function() {
        var arg = 'name:[type:string,required:true]';
        var expected = {name: {type:'string', required:true}};
        var parsed = parse.transformAttributes(arg);
        expect(parsed).toEqual(expected);
    });

    it('should parse arg with multiple fields and attributes', function() {
        var arg = 'name:[type:string,required:true] email:[type:string,required:true]';
        var expected = {name: {type:'string', required:true}, email: {type:'string', required:true}};
        var parsed = parse.transformAttributes(arg);
        expect(parsed).toEqual(expected);
    });

    it('should parse arg with numbers', function() {
        var arg = 'name:[type:string,required:true] email:[type:string,required:true] quantity:[type:number,defaultValue:1]';
        var expected = {name: {type:'string', required:true}, email: {type:'string', required:true}, quantity: {type: 'number', defaultValue: 1} };
        var parsed = parse.transformAttributes(arg);
        expect(parsed).toEqual(expected);
    });


    xit('should parse arg with \'validate\' field', function() {
        var arg = 'name:[type:string,required:true] email:[type:string,required:true,validate:[isEmail:true]]';
        var expected = {name: {type:'string', required:true}, email: {type:'string', required:true, validate: {isEmail:true}}};
        var parsed = parse.transformAttributes(arg);;
        expect(parsed).toEqual(expected);
    });

});