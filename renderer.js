//@ts-check
const titleInput = document.getElementById("questInputArea");
const given = titleInput.value;
titleInput.addEventListener("keypress", function(event){
  if (event.key === "Enter") {
    // Cancel the default action, if needed
      event.preventDefault();
      const qn = titleInput.value
    window.electronAPI.sendQn(qn)
    }
});