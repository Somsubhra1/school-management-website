function buildHtmlRow(data) {
  return `
    <tr>
      <td>
        <input type="checkbox" value="" id="${data._id}" name="" checked>
      </td>
      <td>${data.name}</td>
      <td>${data.guardian.name}</td>
      <td>${data.class_name}</td>
      <td><button class="btn btn-warning btn-block" 
      onclick="openPaymentModal('${data._id}')"
      ${data.outstandingBill === 0 ? "disabled" : ""}>Make Payment</button></td>
    </tr>
  `;
}

function openPaymentModal(id) {
  console.log(id);
  fetch("/admin/payment/" + id)
    .then((response) => response.json())
    .then((students) => {
      console.log(students);
      document.querySelector("#payment_student_id").value = students._id;
      document.querySelector("#payment_name").value = students.name;
      document.querySelector("#payment_amount").value = students.outstandingBill;
    })
    .catch((err) => console.log(err));
  $("#paymentModal").modal("show");

  $("#paymentModal").on("hide.bs.modal", (e) => {
    getData().then((data) => {
      document.getElementById("table-body").innerHTML = buildHtmlTable(data);
    });
  });
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

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("inputName").value;

  fetch("/admin/search?guardian=" + input)
    .then((response) => response.json())
    .then((data) => {
      if (data.length <= 0) {
        document.getElementById("table-body").innerHTML = `
          <tr>
            <td colspan="4">
              No results found...!
            </td>
          </tr>
        `;
      } else {
        // document.getElementById("table-body").innerHTML = buildHtmlTable(data);
        document.querySelectorAll("#table-body tr").forEach((row) => {
          const id = row.firstElementChild.firstElementChild.id;
          if (data.filter((d) => d._id === id).length > 0) {
            row.style.display = "table-row";
          } else {
            row.style.display = "none";
          }
        });
      }
    });
});

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("admin-panel-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

document.getElementById("selectAll").addEventListener("click", () => {
  document.querySelectorAll("#table-body tr").forEach((row) => {
    const checkb = row.firstElementChild.firstElementChild;
    checkb.checked = true;
  });
});

document.getElementById("unselectAll").addEventListener("click", () => {
  document.querySelectorAll("#table-body tr").forEach((row) => {
    const checkb = row.firstElementChild.firstElementChild;
    checkb.checked = false;
  });
});

function postDashboardToggle(e) {
  if (!e.checked) {
    document.getElementById("postDashboard").style.display = "none";
  } else {
    document.getElementById("postDashboard").style.display = "block";
  }
}

document.getElementById("postNotice").addEventListener("click", () => {
  const dashboardCheck = document.getElementById("dashboardCheck");
  const noticeBoardCheck = document.getElementById("noticeBoardCheck");

  const notices = [];
  document.querySelectorAll("#notice-row textarea").forEach((notice) => {
    notices.push(notice.value);
  });

  if (dashboardCheck.checked) {
    const students = [];
    document.querySelectorAll("#table-body input[type=checkbox]").forEach((student) => {
      if (student.checked) {
        students.push(student.id);
      }
    });

    fetch("/admin/notice/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        students,
        notices,
      }),
    })
      .then((response) => response.json)
      .then((data) => {
        console.log("Success:", data);
      });
  }

  if (noticeBoardCheck.checked) {
    fetch("/admin/notice/global", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notices,
      }),
    })
      .then((response) => response.json)
      .then((data) => {
        console.log("Success:", data);
      });
  }

  location.reload();
});

let noticeCount = 1;
document.getElementById("addMore").addEventListener("click", (e) => {
  noticeCount++;
  const newNoticeDiv = document.createElement("div");
  newNoticeDiv.classList = "input-group mb-2 mr-sm-2";
  newNoticeDiv.innerHTML = `
    <div class="input-group-prepend">
      <div class="input-group-text">${noticeCount}.</div>
    </div>
    <textarea class="form-control" name="notice_${noticeCount}" id="notice_${noticeCount}" rows="2"></textarea>
    <div class="input-group-append">
      <span class="input-group-text bg-danger text-white" onclick="deleteNoticeRow(this)"><i class="fas fa-times"></i></span>
    </div>
  `;

  document.getElementById("notice-row").insertBefore(newNoticeDiv, e.target);
});

function deleteNoticeRow(e) {
  const noticeRows = document.querySelectorAll("#notice-row .input-group");
  if (noticeRows.length == 1) {
    return;
  } else {
    e.parentNode.parentNode.remove();
    const newNoticeRows = document.querySelectorAll("#notice-row .input-group");
    let newNoticeCount = 0;
    newNoticeRows.forEach((row) => {
      newNoticeCount++;
      const rowText = row.querySelector(".input-group-prepend .input-group-text");
      rowText.innerHTML = `${newNoticeCount}.`;
    });
    noticeCount = newNoticeCount;
  }
}
