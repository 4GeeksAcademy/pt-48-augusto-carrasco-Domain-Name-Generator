function clearInputs() {
  document.getElementById("pronouns").value = "";
  document.getElementById("adjectives").value = "";
  document.getElementById("nouns").value = "";
  document.getElementById("doms").value = "";
}

function domainGenerator() {
  const defaultValues = getDefaultValues();
  const inputValues = getInputValues();
  const generatorValues = checkIfDataProvided(inputValues, defaultValues);
  const dataToRender = prepareDataToRender(generatorValues);
  renderData(dataToRender);
}

function getDefaultValues() {
  return [
    ["the", "our"],
    ["great", "big"],
    ["jogger", "racoon"],
    [".com", ".es"],
  ];
}
function getInputValues() {
  let inputsArray = [];
  const pronounsArray = document.getElementById("pronouns").value.split(",");
  const adjectivesArray = document
    .getElementById("adjectives")
    .value.split(",");
  const nounsArray = document.getElementById("nouns").value.split(",");
  const domsArray = document.getElementById("doms").value.split(",");
  inputsArray.push(pronounsArray, adjectivesArray, nounsArray, domsArray);
  // console.log(inputsArray);
  return inputsArray;
}

function checkIfDataProvided(inputValues, defaultValues) {
  let generatorValues = [];
  inputValues.map((e, i) => {
    e[0] != ""
      ? generatorValues.push(e)
      : generatorValues.push(defaultValues[i]);
  });
  console.log(generatorValues);
  return generatorValues;
}

function prepareDataToRender(generatorValues) {
  const combinations = getCombinations(generatorValues);
  console.log(combinations);
  const combinationsList = formatCombinationsForHTML(combinations);
  console.log(combinationsList);
  return combinationsList;
}

function getCombinations(generatorValues) {
  let combinations = generatorValues
    .reduce((a, b) =>
      a.reduce((c, d) => [...c,...(b.map((e) => [...d,...e]))], [])
    )
    .map((e) => e.join(""));
  console.log(combinations);
  return combinations;
}

function formatCombinationsForHTML(combinations) {
  return `<ol>${combinations.map((e) => `<li>${e}</li>`).join("")}</ol>`;
}

function renderData(dataToRender) {
  const containerHTML = getContainer();
  containerHTML.innerHTML = dataToRender;
}

function getContainer() {
  return document.getElementById("domains");
}
