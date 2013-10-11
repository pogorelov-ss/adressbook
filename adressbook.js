/**
 * Created by xxx on 9/24/13.
 */

var ADRBOOK = ADRBOOK || {
    groupsDom: d3.select("#groups")
        .append("select")
        .attr("size", 5),
    personsDom: d3.select("#persons")
        .append("select")
        .attr("size", 10),
    contactDom: d3.select("#contact"),
    searchDom: d3.select("#search"),
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
        ADRBOOK.personsDom.select("select").remove();
        ADRBOOK.personsDom
            .selectAll("option")
            .data(personsArray)
            .enter()
            .append("option").
            attr("value",function(d) { return d.pid; }).
            on("click",function(d){ADRBOOK.output.contact(d)}).
            text(function(d) { return d.fio; });
    },
    groups:function (groupsArray){},
    contact:function (contact){
        ADRBOOK.contactDom.selectAll("p").remove();
        for (var prop in contact) {
            ADRBOOK.contactDom.append("p").text(prop + ": " + contact[prop]);
        }


    }

};


/**
 * отладочная часть
 */
ADRBOOK.store.push({
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

//ADRBOOK.searchDom.append("option").text("div");
ADRBOOK.output.persons(ADRBOOK.store);


//alert(ADRBOOK.findPersons('mobile', '5')[0].fio);