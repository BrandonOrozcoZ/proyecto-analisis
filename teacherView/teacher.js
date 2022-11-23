import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZRPGtD-zXfKYRy-98FwmFlD3WEZisKno",
  authDomain: "logicalfunnyquiz.firebaseapp.com",
  projectId: "logicalfunnyquiz",
  storageBucket: "logicalfunnyquiz.appspot.com",
  messagingSenderId: "109271917334",
  appId: "1:109271917334:web:92a74c465c489e78816637",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const table = document.getElementById("table");
let html = `<ul class="list-group list-group-horizontal list-group-flush">
<li class="list-group-item col"><span style="font-family: 'Lucida Sans Unicode'; font-weight: bold;">Nombre</span></li>
<li class="list-group-item col"><span style="font-family: 'Lucida Sans Unicode'; font-weight: bold;">Tiempo (seg)</span></li>
<li class="list-group-item col"><span style="font-family: 'Lucida Sans Unicode'; font-weight: bold;">Puntaje</span></li>
<li></li>
</ul><br />`;

window.addEventListener("DOMContentLoaded", () => {
  loadTable();
});

async function loadTable() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    addTable(doc.data())
  });

  table.innerHTML += html;
}

const addTable = (data) => {
  html += `
  <ul class="list-group list-group-horizontal">
    <li class="list-group-item col" ><span style="font-family: 'Segoe UI'">${data.name}</span></li>
    <li class="list-group-item col"><span style="font-family: 'Segoe UI'">${data.time}</span></li>
    <li class="list-group-item col"><span style="font-family: 'Segoe UI'">${data.score}</span></li>
  </ul>  `;
};

const index = document.getElementById('index')

index.addEventListener('click', (e) => {
  e.preventDefault();
  window.open("../index.html", "_self");  
});
