const button = document.getElementById("testButton") as HTMLButtonElement;
const output = document.getElementById("output") as HTMLDivElement;

button.addEventListener("click", () => {
  output.textContent = "Hello!";
});