window.addEventListener("load", (e) => {
  fetch("/admin/search")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      let html = "";
      data.forEach((studData) => {
        console.log(studData);
        html += `
          <tr>
            <td>
              <input type="checkbox" value="" id="defaultCheck1" checked>
            </td>
            <td>${studData.name}</td>
            <td>${studData.guardian.name}</td>
            <td>${studData.class_name}</td>
          </tr>
          `;
      });

      document.getElementById("table-body").innerHTML = html;
    });
});
