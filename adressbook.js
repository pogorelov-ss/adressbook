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
    personsAddDom: d3.select("#persons").append("button")
        .attr("value", "")
        .text("Add")
        .on("click", function () {
            ADRBOOK.addPerson()
        }),
    personsDom: d3.select("#persons")
        .append("select")
        .attr("size", 10),
    contactDom: d3.select("#contact"),
    searchDom: d3.select("#search")
        .append("input")
        .attr("type", "text")
        .on("keypress", function () {
            ADRBOOK.output.persons(ADRBOOK.findPersons("fio", this.value))
        }),
    editDom: d3.select("#edit"),
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
                persons[persons.length - 1].pid = i;//индекс в исходном массиве
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
        var storeTMP = {};
        for (prop in ADRBOOK.store[1]) {
            storeTMP[prop] = prop;
        }
        storeTMP.pid = ADRBOOK.store.length;
        ADRBOOK.output.new(storeTMP);
        alert('add')
    },
    new: function (contact) {
        ADRBOOK.store.push(contact);
        ADRBOOK.output.init();
    },
    delPerson:function(personId){
        var storeTMP = [];
        for (var i = 0; i < this.store.length; i++) {
            if (i != personId) {
                storeTMP.push(this.store[i]);
            }
        }
        this.store = storeTMP;
        ADRBOOK.output.init();
        alert('del')
    },
    replacePerson: function (contact) {
        for (var i = 0; i < this.store.length; i++) {
            if (i == contact.pid) {
                this.store[i] = contact;
            }
        }
        ADRBOOK.output.init();
        alert('edit')
    }

};

ADRBOOK.output = {
    init: function () {
        ADRBOOK.output.persons(ADRBOOK.findPersons("fio", ""));
        ADRBOOK.output.groups(ADRBOOK.getGroups(ADRBOOK.store));
        ADRBOOK.contactDom.selectAll("p").remove();
        ADRBOOK.editDom.selectAll("*[value]").remove();
    },
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
        ADRBOOK.contactDom.selectAll("p")
            .data(Object.keys(contact))
            .enter().append("p")
            .attr("value", function (d) {
                return d
            })
            .text(function (d) {
                return d + ":" + contact[d]
            });
        ADRBOOK.contactDom.append("p")
            .attr("id", "command")
            .append("a")
            .text(" Edit ")
            .on("click", function () {
                ADRBOOK.output.edit(contact)
            });
        ADRBOOK.contactDom.select("#command")
            .append("a")
            .text(" Remove ")
            .on("click", function () {
                ADRBOOK.delPerson(contact.pid)
            });
    },
    edit: function (contact) {
        ADRBOOK.editDom.selectAll("*[value]").remove();
        ADRBOOK.editDom.selectAll("input")
            .data(Object.keys(contact))
            .enter().append("input")
            .attr("type", "text")
            .attr("value", function (d) {
                return contact[d]
            })
            .attr("id", function (d) {
                return d
            })
            .on("change", function (d) {
                contact[d] = this.value
            });
        ADRBOOK.editDom.select("input[id='pid']").attr("readonly", "");
        ADRBOOK.editDom.append("button")
            .attr("value", "")
            .text("Save")
            .on("click", function () {
                ADRBOOK.replacePerson(contact)
            })
        ADRBOOK.editDom.append("button")
            .attr("value", "")
            .text("Cancel")
            .on("click", function () {
                ADRBOOK.output.init()
            })
    },
    new: function (contact) {
        ADRBOOK.editDom.selectAll("*[value]").remove();
        ADRBOOK.editDom.selectAll("input")
            .data(Object.keys(contact))
            .enter().append("input")
            .attr("type", "text")
            .attr("value", function (d) {
                return contact[d]
            })
            .attr("id", function (d) {
                return d
            })
            .on("change", function (d) {
                contact[d] = this.value
            });
        ADRBOOK.editDom.select("input[id='pid']").attr("readonly", "");
        ADRBOOK.editDom.append("button")
            .attr("value", "")
            .text("Save")
            .on("click", function () {
                ADRBOOK.new(contact)
            })
        ADRBOOK.editDom.append("button")
            .attr("value", "")
            .text("Cancel")
            .on("click", function () {
                ADRBOOK.output.init()
            })
    }

};


/**
 * отладочная часть
 */
ADRBOOK.store.push({
    fio: 'Иван Иванович',
    email: 'grey@in.ua',
    mobile: '5755',
    group: 'работа'
}, {
    fio: 'Алексей Петрович',
    email: 'grey@in.ua',
    mobile: '555',
    group: 'работа',
    заметка: 'да ну его "№ '
},{
    fio: 'Не помню кто это',
    email: 'grey@in.ua',
    mobile: '555',
    group: 'ХЗ'
},{
    fio: 'Mike Gray4',
    email: 'grey@in.ua',
    mobile: '555',
    group:'b'
},{
    fio: 'Mike Gray5',
    email: 'grey@in.ua',
    mobile: '555',
    group:'b'
});

//ADRBOOK.searchDom.append("option").text("div");
ADRBOOK.output.init();

//alert(ADRBOOK.findPersons('mobile', '5')[0].fio);