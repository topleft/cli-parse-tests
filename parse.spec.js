var parse = require('./parse');

describe('Parse tests', function(){   

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

});

describe('allows for previous command format', function(){

    it('should parse arg with only key value', function() {
        var arg = 'name:string';
        var expected = {name: {type:'string'}};
        var parsed = parse.transformAttributes(arg);
        expect(parsed).toEqual(expected);
    });
    
    it('should parse arg with only key value, and comas', function() {
        var arg = 'name:string, email:string';
        var expected = {name: {type:'string'}, email: {type:'string'}};
        var parsed = parse.transformAttributes(arg);
        expect(parsed).toEqual(expected);
    });



    it('should parse args with both key value and array of attributes', function() {
        var arg = 'name:string email:[type:string,required:true] age:integer';
        var expected = {name: {type:'string'}, email: {type:'string', required:true}, age: {type:'integer' } };
        var parsed = parse.transformAttributes(arg);
        expect(parsed).toEqual(expected);
    });
});

describe('validate type values', function(){
    it('should parse arg', function() {
        var arg = 'name:[type:string]';
        var expected = {name: {type:'string'}};
        var parsed = parse.transformAttributes(arg);
        expect(parsed).toEqual(expected);
    });
});
