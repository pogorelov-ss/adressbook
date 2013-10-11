/**
 * Created by xxx on 9/24/13.
 */

var ADRBOOK = ADRBOOK || {};


ADRBOOK.persons = {
    store: [],
    findPersons: function (where, what) {
        var persons = [];
        for (var i = 0; i < this.store.length; i++) {
            if (~this.store[i][where].indexOf(what)) {
                persons.push(this.store[i]);
            }
        }
        return persons;
    },
    addPerson:function(){
        alert('add')
    },
    delPerson:function(personId){
        alert('del')
    },
    replacePerson:function(person){
        alert('edit')
    }

};

ADRBOOK.output = {
    persons:function (personsArray){
        //alert(personsArray[0]);
        //d3.select("select").append("option").attr("value",10).text("ddddd");
        d3.select("#pers").
            selectAll("option").
            data(personsArray).
            enter()
            .append("option").
            attr("value",function(d) { return d.pid; }).
            on("click",function(d){ADRBOOK.output.contact(d)}).
            text(function(d) { return d.fio; });


    },
    groups:function (groupsArray){},
    contact:function (contact){

        d3.select("#contact")
            .append("select")
            .attr("size",Object.keys(contact).length).selectAll("option").data(contact).enter().append("option").text(function(d){return d});
    }

};


/**
 * отладочная часть
 */
ADRBOOK.persons.store.push({
    pid:"1",
    fio: 'Mike Gray',
    email: 'grey@in.ua',
    mobile: '5755',
    group:'a'
}, {
    pid:"2",
    fio: 'Mike Gray2',
    email: 'grey@in.ua',
    mobile: '555',
    group:'b'
},{
    pid:"3",
    fio: 'Mike Gray3',
    email: 'grey@in.ua',
    mobile: '555',
    group:'b'
},{
    pid:"4",
    fio: 'Mike Gray4',
    email: 'grey@in.ua',
    mobile: '555',
    group:'b'
},{
    pid:"5",
    fio: 'Mike Gray5',
    email: 'grey@in.ua',
    mobile: '555',
    group:'b'
});


ADRBOOK.output.persons(ADRBOOK.persons.store);


//alert(ADRBOOK.persons.findPersons('mobile', '5')[0].fio);