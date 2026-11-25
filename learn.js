const inputEl = document.getElementById("input-el");
const saveInput = document.getElementById("input-btn");
const saveTab = document.getElementById("save-tab");
const deleteBtn = document.getElementById("delete-btn");

const errorMsg = document.getElementById("err-msg");
const ulel = document.getElementById("ul-el");

let myLeads = [];

const render = function () {
  let listItems;

  for (let i = 0; i < myLeads.length; i++) {
    listItems =
      listItems +
      `<li>
      <a target="_blank" href="${myLeads[i]}">${myLeads[i]}</a>
      <span data-index="${i}">${"\u00d7"}</span>                         
      <i class="far fa-copy copy-btn" data-index="${i}"></i>
      </li>`;
  }
  ulel.innerHTML = listItems;
};

const 