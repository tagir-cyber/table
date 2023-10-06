const body = document.body;
const tbody = document.getElementById("tbody");
let dir = true;

const BUTTONS = Array.from(document.getElementsByClassName("thead__btn"));

let studentArray = [
  {
    name: "Илья",
    surname: "Трескин",
    birthday: new Date(1994, 5, 12),
    start: 2010,
    faculty: "Экономика",
  },
  {
    name: "Саша",
    surname: "Захаров",
    birthday: new Date(1997, 3, 10),
    start: 2011,
    faculty: "Юридический",
  },
  {
    name: "Татьяна",
    surname: "Зайцева",
    birthday: new Date(1989, 6, 9),
    start: 2012,
    faculty: "Бухгалтерия",
  },
  {
    name: "Ольга",
    surname: "Филипова",
    birthday: new Date(1998, 3, 7),
    start: 2011,
    faculty: "Юридический",
  },
  {
    name: "Игорь",
    surname: "Висяков",
    birthday: new Date(1997, 9, 10),
    start: 2014,
    faculty: "Экономика",
  },
  {
    name: "Артур",
    surname: "Пироженко",
    birthday: new Date(1994, 5, 12),
    start: 2010,
    faculty: "Аналитический",
  },
];

let filteredArray;

const INPUTS = Array.from(document.getElementsByClassName("search__input"));

console.log(typeof(studentArray[0].start))

function searchStudent(keyWord, column) {
    let filterArray = [];

    studentArray.forEach((e)=>{
        if(column == "birthday"){
            console.log(e[column]);
            let age = String(diffDates(new Date(), new Date(e[column])));
            if( age.substr(0, keyWord.length)==keyWord){
                filterArray.push(e);
            }
        }
        else if( String(e[column]).substr(0, keyWord.length)==keyWord){
            // console.log(e);
            filterArray.push(e);
            // console.log(filterArray);
        }
    })
    return filterArray
}


// console.log(BUTTONS);
BUTTONS.forEach(function (e) {
  e.addEventListener("click", function () {
    dir = !dir;
    console.log(this.dataset.column);

    render(sortArray(studentArray, this.dataset.column, dir));
  });
});

function sortArray(array, keyWord, dir) {
  let copy = [...array];
  if (dir) {
    copy.sort((a, b) => {
      return a[keyWord] > b[keyWord] ? 1 : -1;
    });
  } else {
    copy.sort((a, b) => {
      return a[keyWord] < b[keyWord] ? 1 : -1;
    });
  }

  return copy;
}

function diffDates(day_one, day_two) {
  return Math.trunc((day_one - day_two) / (60 * 60 * 24 * 1000 * 365));
}

function createElementTr(object, tbody) {
  let tr = document.createElement("tr"),
    td,
    trObj = {};

  (trObj.fi = `${object.name} ${object.surname}`),
    (trObj.age = `${diffDates(
      new Date(),
      object.birthday
    )} (${object.birthday.getFullYear()})`);
  (trObj.start = object.start), (trObj.faculty = object.faculty);
  //   console.log(trObj);
  for (const key in trObj) {
    td = document.createElement("td");
    td.textContent = trObj[key];
    tr.append(td);
  }
  tbody.append(tr);
}

function render(array) {
  tbody.innerHTML = "";
  array.forEach((element) => {
    // console.log(element);
    createElementTr(element, tbody);
  });
}

render(studentArray);

INPUTS.forEach(function (e) {
    e.addEventListener("input", function () {
      // console.log(e.dataset.column);
      filteredArray = searchStudent(e.value, e.dataset.column);
      render(filteredArray);
    });
  });