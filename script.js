
function generateNewInput(id) {
    const input = document.createElement("input");
    input.setAttribute('type', 'number');
    input.setAttribute('id', id);
    input.setAttribute('class', 'input-style');
    input.setAttribute('onchange', 'inputProcessAction(event)');
    input.setAttribute('value', 0);
    return input;
  }
  
  function inputProcessAction(event) {
    const existingId = Number(event.target.id) + 1;
    const preExistingInput = document.getElementById(`${existingId}`);
    if (preExistingInput) {
      return;
    }
    const inputId = Number(event.target.id);
    if (event.target.value != 0 ) {
      const inputList = document.querySelector('.inputList');
      const newInput = generateNewInput(inputId + 1);
      inputList.appendChild(newInput);
    }
  }

  function masMethod() {
    const values = [];
   const listOfInputs = document.querySelectorAll('.input-style');
    listOfInputs.forEach(item => {
     let val = Number(item.value);
     if (val !== 0)  {
       values.push(val);
     }
    })
    console.log("values array is", values);
    const mas = [];
    const perioade = document.getElementById("nMass").value;
    n=Number(perioade);
    for (i=n; i<=values.length; i++){
      mas[i]=0;
      for(j=i-n;j<=i-1;j++)
        mas[i]=(mas[i]+values[j]);
      mas[i]=mas[i]/n;

    }
    console.log("n=", n);
    console.log('Mas array is', mas);
    const result = {
        resultVal: mas,
        length: values.length,
        initialValues: values,
        n: n
    }
    return result;
}

function addCoeficientNr(event) {
    const nr = Number(event.target.value);
    const btn = document.getElementById("mas");
    if (nr === 0 || nr === '') {
        console.log("reached 1")
        btn.classList.remove('valid');
        btn.classList.add('invalid');
    } else {
        console.log("reached 2")
        btn.classList.remove('invalid');
        btn.classList.add('valid');
    }
}

function submitValues() {
    const formulasArr = [];
    const list = document.querySelectorAll('.btn.valid');
    const results = document.querySelector('.results');
    results.style.display = 'flex';
    list.forEach(item => {
        formulasArr.push(item.id);
    });
    if (formulasArr.length) {
        formulasArr.forEach(item => {
            switch(item) {
                case 'mas':
                    this.generateResults(this.masMethod(), 'MAS');
                    break;
                    
                case 'maw':
                    this.generateResults(this.masMethod(), 'MAW');
                    break;
            }
        })
        
    }

}

function generateResults(results, formula) {
    const initialValuesList = document.querySelector('.initial-values');
    const formulaResult = document.querySelector('.formula-result');
    const formulaTitle = document.createElement("div");
    formulaTitle.innerHTML = formula;
    formulaResult.appendChild(formulaTitle);

    results.initialValues.map(item => {
        const newDiv = document.createElement("div");
        newDiv.innerText = item;
        initialValuesList.appendChild(newDiv);
    })

    for(i=0; i<n; i++)  {
        results.resultVal.unshift(0);
    }

    results.resultVal.map(item => {
        const newDiv = document.createElement("div");
        newDiv.innerText = item;
        formulaResult.appendChild(newDiv);
    })
}

function toggleBtnValidity(event) {
    const id = event.target.id;
    const btn = document.getElementById(`${id}`);
    const coeficientInput = document.querySelector(".coeficient");
    if (coeficientInput.style.display === 'block') {
        coeficientInput.style.display = 'none';
        btn.classList.remove('invalid');
        btn.classList.remove('valid');
        return;
    }
    coeficientInput.style.display = 'block';
    btn.classList.add('invalid');
}