const publishBtn = document.getElementById("publish-btn");
const endorsementInput = document.getElementById("endorsement-text");
const endorsementBoxes = document.getElementById("endorsement-boxes");

publishBtn.addEventListener("click", function () {
  let endorsementValue = endorsementInput.value;
  console.log(endorsementValue);
  renderText(endorsementValue, "w", "q");
  endorsementInput.value = null;
});

function renderText(text, sender, receiver) {
  const endorsementBox = document.createElement("div");
  const endorsementText = document.createElement("p");
  const receivDetail = document.createElement("span");
  const sendDetail = document.createElement("span");

  sendDetail.innerText = "from: " + sender;
  receivDetail.innerText = "To: " + receiver;
  endorsementText.innerText = text;

  endorsementBox.classList.add("endorsement-box");
  endorsementBox.appendChild(receivDetail);
  endorsementBox.appendChild(endorsementText);

  endorsementBoxes.appendChild(endorsementBox);
}
