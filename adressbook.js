/**
 * Created by xxx on 9/24/13.
 */

var ADRBOOK = ADRBOOK || {
    /**
     * создаем объекты связанные DOM, дальше работаем с ними
     * статичный функционал прописан прямо тут
     */
    groupsDom: d3.select("#groups")
        .append("select")
        .attr("size", 5),
    personsDom: d3.select("#persons")
        .append("select")
        .attr("size", 10),
    contactDom: d3.select("#contact"),
    searchDom: d3.select("#search")
        .append("input")
        .attr("type", "text")
        .on("change", function () {
            ADRBOOK.output.persons(ADRBOOK.findPersons("fio", this.value))
        }),
    store: [],//массив в который заружается адресная книга
    /**
     * поиск вхождения строки в свойство, возвращает масив объектов в которых было совпадение
     * ищем в общем хранилище контактов!
     * @param propName имя свойства в котором ищем
     * @param what строка которую ищем
     * @returns {Array}
     */
    findPersons: function (propName, what) {
        var persons = [];
        for (var i = 0; i < this.store.length; i++) {
            if (~this.store[i][propName].indexOf(what)) {
                persons.push(this.store[i]);
            }
        }
        return persons;
    },
    /**
     * получаем масив уникальных групп из масива объектов
     * @param persons входной массив объектов
     * @returns {Array} одномерный массив имен групп
     */
    getGroups: function (persons) {
        var groups = {All: true};
        for (var i = 0; i < persons.length; i++) {
            groups[persons[i].group] = true;
        }
        return Object.keys(groups);
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
        ADRBOOK.personsDom.selectAll("option").remove();
        ADRBOOK.personsDom
            .selectAll("option")
            .data(personsArray)
            .enter()
            .append("option").
            attr("value",function(d) { return d.pid; }).
            on("click",function(d){ADRBOOK.output.contact(d)}).
            text(function(d) { return d.fio; });
    },
    groups: function (groupsArray) {
        ADRBOOK.groupsDom.selectAll("option").remove();
        ADRBOOK.groupsDom
            .selectAll("option")
            .data(groupsArray)
            .enter()
            .append("option")
            .attr("value", function (d) {
                return d
            })
            .on("click", function (d) {
                if (d == "All") {
                    ADRBOOK.output.persons(ADRBOOK.store)
                }
                else {
                    ADRBOOK.output.persons(ADRBOOK.findPersons("group", d))
                }
            })
            .text(function (d) {
                return d
            });

    },
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
    fio: 'Иван Иванович',
    email: 'grey@in.ua',
    mobile: '5755',
    group: 'работа'
}, {
    pid:"2",
    fio: 'Алексей Петрович',
    email: 'grey@in.ua',
    mobile: '555',
    group: 'работа',
    заметка: 'да ну его "№ '
},{
    pid:"3",
    fio: 'Не помню кто это',
    email: 'grey@in.ua',
    mobile: '555',
    group: 'ХЗ'
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
ADRBOOK.output.groups(ADRBOOK.getGroups(ADRBOOK.store));


//alert(ADRBOOK.findPersons('mobile', '5')[0].fio);