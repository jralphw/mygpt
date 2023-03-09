const resBody = document.getElementById("counter");

window.electronAPI.onAnswer((_event, value) => {
  resBody.innerText = value;
});
