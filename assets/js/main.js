// * Vat Calculator

// -1: Retrieve data from all input fields
// - Define variables to store input values

// -1.A: Save the direction of the function (OptionA: Net to Gross (Default)) or (OptionB: Gross to Net).
// -(OptionA: Net to Gross (Default)) (OptionB: Gross to Net)

// -2: Define output
// - Define a variable to store the calculated result

// -2.A: Save the labels of the output to change if Option B is selected (Default A).
// - Outside the main function: with an onclick event on radio-direction inputs

// -3: Create the function to calculate VAT.
// - Retrieve values from inputs and round only in the output.

// -4: Error handling: Check if inputs are valid & Do all the inputs have data? Add outputs if not.

// -5: Calculate VAT

// -6: Reset the input when it has focus

// # ------------------- Main FUNCTION-----------------------

const calculateVat = () => {
  // * -------------------------- inputs----------------------

  const directionInput = document.querySelector(
    'input[name="radio-direction"]:checked'
  ); // default net->gross

  const direction = directionInput.value;

  const vatInput = document.querySelector('input[name="vat"]:checked'); // default 19

  const vat = Number(vatInput.value);

  const numberInput = document.querySelector('[data-js="inputNumber"]');

  const numberValue = numberInput.value;

  // use text type to accept float numbers, we transform here as float number if need it

  const number = parseFloat(numberValue.replace(",", "."));

  // * -------------------------OUTPUTS------------------

  const outputAInput = document.querySelector('[data-js="outputA"]');
  const outputBInput = document.querySelector('[data-js="outputB"]');
  const alert = document.querySelector('[data-js="alert"]');

  // # -----------------------Error Handling-------------------------------------

  if (numberValue <= 0) {
    return (alert.innerHTML = `<p class="redBG">Bitte, geben Sie ein gültige Wert<p>`);
  }

  // # -----------------------Calculation-----------------------------------------

  // ---------Vat calculation

  const calculateVat = (net, vat) => net * (vat / 100);

  // ---------gross calculation

  const calculateGross = (net, vatAmount) => net + vatAmount;

  // ---------net calculation

  const calculateNet = (gross, vat) => gross / (1 + vat / 100);

  // ? ----declarate work Variables

  // strings

  let valueVat = "";
  let grossValue = "";
  let netValue = "";

  // numbers

  let valueVatExact = 0;
  let grossValueExact = 0;
  let netValueExact = 0;

  // -(direction === "netgross") is default direction and checked at the beginning

  if (direction === "netgross") {
    // use exact number for calculation
    valueVatExact = calculateVat(number, vat);
    grossValueExact = calculateGross(number, valueVatExact);
    // round the number for output
    valueVat = valueVatExact.toFixed(2);
    grossValue = grossValueExact.toFixed(2);
    // Add outputs
    outputAInput.innerHTML = valueVat;
    outputBInput.innerHTML = grossValue;
  } else {
    // use exact number for calculation
    netValueExact = calculateNet(number, vat);
    valueVatExact = calculateVat(netValueExact, vat);
    // round the number for output
    valueVat = valueVatExact.toFixed(2);
    netValue = netValueExact.toFixed(2);
    //Add outputs
    outputAInput.innerHTML = valueVat;
    outputBInput.innerHTML = netValue;
  }

  // #Empty the numberInput if they have the focus inside
  numberInput.addEventListener("focus", function () {
    numberInput.value = ""; // Set the value of the input field to empty when the focus is set on it
  });
};

// #END MAIN FUNCTION

// #LABEL NAME CHANGE with ONCLICK

// * -------------------- label that will change the name wenn optionA(default netgross)/optionB(grossnet) ist checked

const changeLabel = () => {
  // ---------save variables

  const directionInput = document.querySelector(
    'input[name="radio-direction"]:checked'
  ); // default net->gross

  const numberInputLabel = document.querySelector(
    '[data-js="inputNumberLabel"]'
  );
  const outputBLabel = document.querySelector('[data-js="outputB-label"]');
  const direction = directionInput.value;

  // ----------function

  if (direction === "netgross") {
    numberInputLabel.innerHTML = `Nettobetrag (Preis inklusive Mehrwertsteuer) in Euro
        <span class="red">*</span>`;
    outputBLabel.innerHTML = `Bruttobetrag(Endpreis)`;
  } else {
    // change the names for grossnet
    numberInputLabel.innerHTML = `Bruttobetrag (Preis inklusive Mehrwersteuer) in Euro <span class="red">*</span>`;
    outputBLabel.innerHTML = `Nettobetrag(Endpreis)`;
  }
};
