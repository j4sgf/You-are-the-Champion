const publishBtn = document.getElementById("publish-btn");
const endorsementInput = document.getElementById("endorsement-text");
const endorsementSender = document.getElementById("input-from");
const endorsementReceiver = document.getElementById("input-to");
const endorsementBoxes = document.getElementById("endorsement-boxes");

publishBtn.addEventListener("click", function () {
  let endorsementValue = endorsementInput.value;
  let endSender = endorsementSender.value;
  let endReceiver = endorsementReceiver.value;
  console.log(endorsementValue);
  renderText(endorsementValue, endSender, endReceiver);
  endorsementInput.value = null;
  endorsementReceiver.value = null;
  endorsementSender.value = null;
});

function renderText(text, sender, receiver) {
  const endorsementBox = document.createElement("div");
  const detailWrapper = document.createElement("div");
  const loveWrapper = document.createElement("div");
  const endorsementText = document.createElement("p");
  const receivDetail = document.createElement("span");
  const sendDetail = document.createElement("span");
  let loveCounter = document.createElement("span");
  const loveIcon = document.createElement("i");

  sendDetail.innerText = "from: " + sender;
  receivDetail.innerText = "To: " + receiver;
  endorsementText.innerText = text;
  loveCounter.innerText = "23";

  loveIcon.classList.add("fa-regular");
  loveIcon.classList.add("fa-heart");
  loveWrapper.classList.add("love-wrapper");
  endorsementBox.classList.add("endorsement-box");
  detailWrapper.classList.add("detail-wrapper");

  detailWrapper.appendChild(receivDetail);
  detailWrapper.appendChild(sendDetail);
  loveWrapper.appendChild(loveIcon);
  loveWrapper.appendChild(loveCounter);
  endorsementBox.appendChild(detailWrapper);
  endorsementBox.appendChild(endorsementText);
  endorsementBox.appendChild(loveWrapper);

  endorsementBoxes.appendChild(endorsementBox);
}
