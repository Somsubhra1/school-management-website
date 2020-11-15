function buildHtmlRow(data) {
  return `
    <tr>
      <td>
        <input type="checkbox" value="" id="defaultCheck1" checked>
      </td>
      <td>${data.name}</td>
      <td>${data.guardian.name}</td>
      <td>${data.class_name}</td>
    </tr>
  `;
}

function buildHtmlTable(data) {
  let html = "";
  data.forEach((studData) => {
    html += buildHtmlRow(studData);
  });

  return html;
}

function getData() {
  return fetch("/admin/search").then((response) => {
    return response.json();
  });
}

window.addEventListener("load", (e) => {
  getData().then((data) => {
    document.getElementById("table-body").innerHTML = buildHtmlTable(data);
  });
});

let currentStudentSort = null;
let currentGuardianSort = null;
let currentClassSort = null;

document.getElementById("student-col").addEventListener("click", () => {
  // re-setting
  currentGuardianSort = null;
  document.querySelector("#guardian-col i").classList = "float-right fas fa-sort";
  currentClassSort = null;
  document.querySelector("#class-col i").classList = "float-right fas fa-sort";

  if (currentStudentSort === null) {
    $("#student-col i").toggleClass("fa-sort fa-sort-up");
    currentStudentSort = 1;
  } else {
    $("#student-col i").toggleClass("fa-sort-up fa-sort-down");
    currentStudentSort *= -1;
  }
  getData().then((data) => {
    data.sort((a, b) => (a.name > b.name ? currentStudentSort : -currentStudentSort));
    document.getElementById("table-body").innerHTML = buildHtmlTable(data);
  });
});

document.getElementById("guardian-col").addEventListener("click", () => {
  // re-setting
  currentStudentSort = null;
  document.querySelector("#student-col i").classList = "float-right fas fa-sort";
  currentClassSort = null;
  document.querySelector("#class-col i").classList = "float-right fas fa-sort";

  if (currentGuardianSort === null) {
    $("#guardian-col i").toggleClass("fa-sort fa-sort-up");
    currentGuardianSort = 1;
  } else {
    $("#guardian-col i").toggleClass("fa-sort-up fa-sort-down");
    currentGuardianSort *= -1;
  }
  getData().then((data) => {
    data.sort((a, b) => (a.name > b.name ? currentGuardianSort : -currentGuardianSort));
    document.getElementById("table-body").innerHTML = buildHtmlTable(data);
  });
});

document.getElementById("class-col").addEventListener("click", () => {
  // re-setting
  currentGuardianSort = null;
  document.querySelector("#guardian-col i").classList = "float-right fas fa-sort";
  currentStudentSort = null;
  document.querySelector("#student-col i").classList = "float-right fas fa-sort";

  if (currentClassSort === null) {
    $("#class-col i").toggleClass("fa-sort fa-sort-up");
    currentClassSort = 1;
  } else {
    $("#class-col i").toggleClass("fa-sort-up fa-sort-down");
    currentClassSort *= -1;
  }
  getData().then((data) => {
    data.sort((a, b) => (a.name > b.name ? currentClassSort : -currentClassSort));
    document.getElementById("table-body").innerHTML = buildHtmlTable(data);
  });
});
