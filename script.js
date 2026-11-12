const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

const saveBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const saveTab = document.getElementById("save-tab");

const errorMessage = document.getElementById("err-msg");

let myLeads = [];

const render = function () {
  let listItems = "";

  for (let i = 0; i < myLeads.length; i++) {
    listItems =
      listItems +
      `<li>
      <a target="_blank" href="${myLeads[i]}">${myLeads[i]}</a>
      <span data-index="${i}">${"\u00d7"}</span>
      <i class="far fa-copy copy-btn" data-index="${i}"></i>
      </li>`;
  }
  ulEl.innerHTML = listItems;
};

const leadsFromlocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromlocalStorage) {
  myLeads = leadsFromlocalStorage; //loads the saved URLs back into my array
  render();
}

saveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render();
  });
});

saveBtn.addEventListener("click", function () {
  if (inputEl.value == "") {
    errorMessage.textContent = "No leads to save";
    return;
  } else if (!inputEl.value.startsWith("https:")) {
    errorMessage.textContent = "Invalid URL";
    inputEl.value = "";
    return;
  } else {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // here we saved 'myLeads' as a string to the localStorage
    render();
  }
});

ulEl.addEventListener("click", function (event) {
  if (event.target.tagName == "SPAN") {
    const index = event.target.dataset.index; //this reads the label on the × i clicked.
    myLeads.splice(index, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render();
  } else if (event.target.classList.contains("copy-btn")) {
    const index = event.target.dataset.index;

    navigator.clipboard.writeText(myLeads[index]);
  }
});

deleteBtn.addEventListener("dblclick", (event) => {
  localStorage.clear();
  ulEl.textContent = "";
  myLeads = [];
});

//  `data-index` -  on the span tells us which lead was clicked, dataset.index reads that label
