// `MenuEditor` is a global from ../../dist/menu-editor.min.js (SortableJS bundled).
const nestedData = [
  { text: "Home", href: "/home", tooltip: "Go to home page", icon: "fa-solid fa-house", children: [] },
  { text: "About Us", href: "/about", tooltip: "Learn more about our company", icon: "fa-solid fa-address-card", children: [] },
  {
    text: "Services", href: "/services", tooltip: "Discover the services we offer", icon: "fa-solid fa-gear",
    children: [
      { text: "Service 1", href: "/services/1", tooltip: "Details for Service 1", icon: "fa-solid fa-wrench", children: [] },
      { text: "Service 2", href: "/services/2", tooltip: "Details for Service 2", icon: "fa-solid fa-wrench", children: [] },
    ],
  },
  { text: "Contact", href: "/contact", tooltip: "Get in touch", icon: "fa-solid fa-envelope", children: [] },
];

const txtText = document.getElementById("txtText");
const txtHref = document.getElementById("txtHref");
const txtIcon = document.getElementById("txtIcon");
const txtTooltip = document.getElementById("txtTooltip");
const txtOutput = document.getElementById("txtOutput");
const btnUpdate = document.getElementById("btnUpdate");
const btnAdd = document.getElementById("btnAdd");
const btnOutput = document.getElementById("btnOutput");

const cleanForm = () => {
  txtHref.value = txtText.value = txtIcon.value = txtTooltip.value = "";
};

// Tailwind theme — load Tailwind's CSS yourself (CDN in index.html).
const menuEditor = new MenuEditor("element-id", { maxLevel: 3, theme: "tailwind" });

menuEditor.onClickDelete((event) => {
  if (confirm("Delete the item " + event.item.getDataset().text + "?")) {
    event.item.remove();
  }
});

menuEditor.onClickEdit((event) => {
  const a = event.item.getDataset();
  txtText.value = a.text;
  txtHref.value = a.href;
  txtIcon.value = a.icon;
  txtTooltip.value = a.tooltip;
  btnUpdate.removeAttribute("disabled");
  menuEditor.edit(event.item);
});

menuEditor.onDragEnd(() => console.log("Drag end!"));

btnAdd.addEventListener("click", () => {
  menuEditor.add({
    text: txtText.value,
    href: txtHref.value,
    icon: txtIcon.value,
    tooltip: txtTooltip.value,
  });
  btnUpdate.setAttribute("disabled", "true");
  cleanForm();
});

btnUpdate.addEventListener("click", () => {
  menuEditor.update({
    text: txtText.value,
    href: txtHref.value,
    icon: txtIcon.value,
    tooltip: txtTooltip.value,
  });
  btnUpdate.setAttribute("disabled", "true");
  cleanForm();
});

btnOutput.addEventListener("click", () => {
  txtOutput.value = menuEditor.getString();
});

menuEditor.setArray(nestedData);
menuEditor.mount();
