document.getElementById("notice-board").addEventListener("click", () => {
  $("#noticeBoardModal").modal("show");
});

$(".main-carousel").flickity({
  // options
  cellAlign: "left",
  contain: true,
});
