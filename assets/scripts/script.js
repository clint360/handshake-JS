let form = document.querySelector('form');
let displayResults = document.getElementById('displayHS');

const arrayOfCode = [
  { bin: 1, response: 'wink', deci: 1 },
  { bin: 10, response: 'double blink', deci: 2 },
  { bin: 11, response: 'wink, double blink', deci: 3 },
  { bin: 100, response: 'close your eyes', deci: 4 },
  { bin: 1000, response: 'jump', deci: 8 }
]

const reversedArray = [
  { bin: 1000, response: 'jump', deci: 1 },
  { bin: 100, response: 'close your eyes', deci: 2 },
  { bin: 11, response: 'double blink, wink', deci: 3 },
  { bin: 10, response: 'double blink', deci: 4 },
  { bin: 1, response: 'wink', deci: 8 }
]

let k = 0 // k counts the number of times findResponse is called and chooses to add a comma and space
let revert = false

const convertToBinary = (val) => {
  let remainder = 0
  let binary = 0
  let i = 1
  while (val !== 0) {
    remainder = val % 2
    val = parseInt(val / 2)
    binary += remainder * i
    i *= 10
  }
  return binary
}

const findResponse = (val, arr) => {
  const binVal = convertToBinary(val)
  console.log(binVal)
  for (let i = 0; i < arr.length; i++) {
    if (binVal === arr[i].bin) { // calling the fxn to convert to binary
      displayResults.textContent += `${k > 0 ? ', ' : ''}${arr[i].response}`
    }
  }
}

const checkRange = (valu, arre) => {
  if ((valu <= 4) || (valu === 8)) {
    findResponse(valu, arre)
  } else if ((valu > 4) && (valu < 8)) {
    if (revert === false) {
      findResponse(valu - 4, arre)
      k++
      findResponse(4, arre)
    } else {
      findResponse(4, arre)
      k++
      findResponse(valu - 4, arre)
    }
  } else if ((valu > 8) && (valu < 16)) {
    if (valu < 13) {
      if (revert === false) {
        findResponse(valu - 8, arre)
        k++
        findResponse(8, arre)
      } else {
        findResponse(8, arre)
        k++
        findResponse(valu - 8, arre)
      }
    } else {
      if (revert === false) {
        findResponse(valu - 12, arre)
        k++
        findResponse((valu - (valu - 12)) - 8, arre)
        k++
        findResponse(8, arre)
      } else {
        findResponse(8, arre)
        k++
        findResponse((valu - (valu - 12)) - 8, arre)
        k++
        findResponse(valu - 12, arre)
      }
    }
  }
  k = 0
}

form.addEventListener('submit', (e) => {
  alert('hi')
  e.preventDefault();
  let inputNumber = parseInt(e.target.num.value);
  if (inputNumber === '') {
    alert('Input a number')
  } else {
    displayResults.textContent = ''
    if (inputNumber < 16) {
      checkRange(inputNumber, arrayOfCode)
    } else {
      if (inputNumber % 16 === 0) {
        displayResults.textContent = '! secret Code reversed'
      }
      const results = Math.floor(inputNumber / 16)
      if (results % 2 === 0) {
        checkRange((inputNumber - (Math.floor(inputNumber / 16) * 16)), arrayOfCode)
      } else {
        revert = true
        checkRange((inputNumber - (Math.floor(inputNumber / 16) * 16)), reversedArray)
      }
    }
    revert = false
  }
})
