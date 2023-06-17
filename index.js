import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
  set,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://you-are-the-champion-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const publishBtn = document.getElementById("publish-btn");
const endorsementEl = document.getElementById("endorsement-text");
const fromEl = document.getElementById("input-from");
const reqField = document.getElementById("required-endorsement");
const toEl = document.getElementById("input-to");
const endorsementBoxes = document.getElementById("endorsement-boxes");
const loveStatus = JSON.parse(localStorage.getItem("loveArr"));
const loveArr = [];

if (loveStatus) {
  loveArr.push(...loveStatus);
}

publishBtn.addEventListener("click", function () {
  const endorsementText = endorsementEl.value;
  const fromText = fromEl.value;
  const toText = toEl.value;
  const endorsementObj = {
    content: endorsementText,
    from: fromText,
    to: toText,
    love: 0,
  };
  if (endorsementEl.value.length == 0 || toEl.value.length == 0) {
    showAlert();
  } else {
    hideAlert();
    push(endorsementsInDB, endorsementObj);
    clearInputFields();
  }
});

onValue(endorsementsInDB, function (snapshot) {
  endorsementBoxes.innerHTML = "";

  if (snapshot.exists()) {
    const allEndorsement = Object.entries(snapshot.val());
    allEndorsement.forEach((el) => {
      renderText(el);
    });
  }
});

function renderText(endorsementArray) {
  const endorsementID = endorsementArray[0];
  const endorsement = endorsementArray[1];
  const endorsementText = endorsement.content;
  const fromText = endorsement.from;
  const toText = endorsement.to;
  const love = endorsement.love;
  const loveIds = loveArr.map((item) => item.loveId);
  const endorsementBox = document.createElement("div");

  if (loveIds.includes(endorsementID)) {
    console.log("haha");
    endorsementBox.classList.add("endorsement-box");
    endorsementBox.innerHTML = `
        <div class="detail-wrapper">
          <span>To: ${toText}</span>
          <span>From: ${fromText}</span>
        </div> 
        <p>${endorsementText}</p>
        <div class="love-wrapper">
          <button class="loved">❤</button>
          <span>${love}</span> 
        </div>
        `;
  } else {
    endorsementBox.classList.add("endorsement-box");
    endorsementBox.innerHTML = `
        <div class="detail-wrapper">
          <span>To: ${toText}</span>
          <span>From: ${fromText}</span>
        </div> 
        <p>${endorsementText}</p>
        <div class="love-wrapper">
          <button class="love-btn">❤</button>
          <span>${love}</span> 
        </div>
        `;
  }

  endorsementBoxes.append(endorsementBox);
  addLove(endorsementBox, love, endorsementID);
}

function addLove(parent, love, id) {
  parent.addEventListener("click", function (e) {
    const loveBtn = e.target.matches(".love-btn");
    const lovedBtn = e.target.matches(".loved");
    const loveIds = loveArr.map((item) => item.loveId);
    const loveIndex = loveIds.indexOf(id);
    if (e.target && loveBtn) {
      love += 1;
      loveArr.push({
        loveId: id,
        loveStatus: "loved",
      });
      console.log("WEE: " + loveArr.indexOf(id));
      localStorage.setItem("loveArr", JSON.stringify(loveArr));

      set(ref(database, `endorsements/${id}/love`), love);
    } else if (e.target && lovedBtn) {
      console.log(loveIndex);
      love -= 1;
      loveArr.splice(loveIndex, 1);
      localStorage.setItem("loveArr", JSON.stringify(loveArr));
      set(ref(database, `endorsements/${id}/love`), love);
    }
  });
}

function clearInputFields() {
  endorsementEl.value = null;
  toEl.value = null;
  fromEl.value = null;
}

function hideAlert() {
  endorsementEl.classList.remove("required-alert");
  toEl.classList.remove("required-alert");
  reqField.style.display = "none";
}

function showAlert() {
  endorsementEl.classList.add("required-alert");
  toEl.classList.add("required-alert");
  reqField.style.display = "block";
  reqField.innerHTML = `<span>
                        Please insert message and recepient
                        </span>`;

  return false;
}
