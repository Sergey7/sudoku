module.exports = function solveSudoku(matrix) {
  let m = startMatrix(matrix);
  m = goRaund(m);
  if (checkM(m)) {
    return m
  }
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m.length; j++) { 
      if (typeof(m[i][j]) === 'number') {continue} 
      else {
        for (let k = 0; k < m[i][j].length; k++) {
          let asM = makeAssumption(m, i, j, k);
          
          if (checkM(asM)) {
          return asM;
          } 
          else  {
            continue
          }
        }
      }
    }
  }
  return m
}

const makeAssumption = function (m, i , j , k) {
  let newM = JSON.parse(JSON.stringify(m));
    newM[i][j] = newM[i][j][k];
    newM = goRaund(newM);
    return newM
}

const checkM = function(m) {
  let ans = true
  let newArr = matrixToOneArray(m)
  if (newArr.includes([])) {
    ans = false;
  }
  for (let i = 0; i < newArr.length; i++) {
    if(typeof(newArr[i]) === 'object') {
      ans = false
    } 
  }
  for (let i = 0; i < m.length; i++) {
    let mySet = new Set(m[i])
    if (mySet.size !== 9) {
      ans = false;
      break
    }  
  }
  for (let j = 0; j < m.length; j++) {
    let colArr = []
    for (let i = 0; i < m.length; i++) { 
      colArr.push(m[i][j])
    }
    let mySet = new Set(colArr)
    if (mySet.size !== 9) {
          ans = false;
          break
    }  
  }  
  return ans
}


const matrixToOneArray = function (m) {
  let newArr = [];
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m.length; j++)
    newArr.push(m[i][j]) 
  }
  return newArr
}


const goRaund = function(m) {
  let cheked = true;
  let k = 0;
  while (k < 81) {
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[0].length; j++) {
        if (typeof(m[i][j]) === 'object') {
          [m[i][j], cheked] = checkSquare(m[i][j], m, i, j);
          [m[i][j], cheked] = checkValueCol(m[i][j], m, j);
          [m[i][j], cheked] = checkValueStr(m[i][j], m, i);
          [m[i][j], cheked] = checkValueStrInviz(m[i][j], m, i, j);
          [m[i][j], cheked] = checkValueColInviz(m[i][j], m, i, j);
          [m[i][j], cheked] = checkSquareInviz(m[i][j], m, i, j);
        }
      }
    }
    k++
  }
  return m
}


const checkSquareInviz = function(elem, matrix, str, col) {
  if (typeof(elem) === 'number') return [elem, true];
  let newArr = [];
  if (str <= 2 && col <= 2) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (str === i && col === j) {continue};
        if (typeof(matrix[i][j]) === 'object') {
          newArr = newArr.concat(matrix[i][j]);
        }
      }
    }
  }
  if (str <= 2 && col >= 3 && col <= 5) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (str === i && col === j+3) {continue};
        if (typeof(matrix[i][j+3]) === 'object') {
          newArr = newArr.concat(matrix[i][j+3]);
        }
      }
    }
  }
  if (str <= 2 && col >= 6) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (str === i && col === j+6) {continue};
        if (typeof(matrix[i][j+6]) === 'object') {
          newArr = newArr.concat(matrix[i][j+6]);
        }
      }
    }
  }
  if (str >= 3 && str <= 5 && col <= 2) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (str === i+3 && col === j) {continue};
        if (typeof(matrix[i+3][j]) === 'object') {
          newArr = newArr.concat(matrix[i+3][j]);
        }
      }
    }
  }
  if (str >= 3 && str <= 5 && col >= 3 && col <= 5) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (str === i+3 && col === j+3) {continue};
        if (typeof(matrix[i+3][j+3]) === 'object') {
          newArr = newArr.concat(matrix[i+3][j+3]);
        }
      }
    }
  }
  if (str >= 3 && str <= 5 && col >= 6) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (str === i+3 && col === j+6) {continue};
        if (typeof(matrix[i+3][j+6]) === 'object') {
          newArr = newArr.concat(matrix[i+3][j+6]);
        }
      }
    }
  }
  if (str >= 6 && col <= 2) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (str === i+6 && col === j) {continue};
        if (typeof(matrix[i+6][j]) === 'object') {
          newArr = newArr.concat(matrix[i+6][j]);
        }
      }
    }
  }
  if (str >= 6 && col >= 3 && col <= 5) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (str === i+6 && col === j+3) {continue};
        if (typeof(matrix[i+6][j+3]) === 'object') {
          newArr = newArr.concat(matrix[i+6][j+3]);
        }
      }
    }
  }
  if (str >= 6 && col >= 6) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (str === i+6 && col === j+6) {continue};
        if (typeof(matrix[i+6][j+6]) === 'object') {
          newArr = newArr.concat(matrix[i+6][j+6]);
        }
      }
    }
  }
  for (let j = 0; j < elem.length; j++) {
    if (newArr.includes(elem[j])) {
      continue
    } else {
      return [elem[j], true]
    }
  }
  return [elem, false]
}


const checkValueStrInviz = function (elem, matrix, str, col) {
  if (typeof(elem) === 'number') return [elem, true];
  let newArr = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i === col) {
      continue
    }
    if (typeof(matrix[str][i]) === 'object') {
      newArr = newArr.concat(matrix[str][i]);
    }
  }
  for (let j = 0; j < elem.length; j++) {
    if (newArr.includes(elem[j])) {
      continue
    } else {
      return [elem[j], true]
    }
  }
  return [elem, false]
}

const checkValueColInviz = function (elem, matrix, str, col) {
  if (typeof(elem) === 'number') return [elem, true];
  let newArr = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i === str) {
      continue
    }
    if (typeof(matrix[i][col]) === 'object') {
      newArr = newArr.concat(matrix[i][col]);
    }
  }
  for (let j = 0; j < elem.length; j++) {
    if (newArr.includes(elem[j])) {
      continue
    } else {
      return [elem[j], true]
    }
  }
  return [elem, false]
}

const checkSquare = function(elem, matrix, str, col) {
  if (typeof(elem) === 'number') return [elem, true];
  let newArr = [];
  let squareArr = [];
  if (str <= 2 && col <= 2) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squareArr.push(matrix[i][j])
      }
    }
  }
  if (str <= 2 && col >= 3 && col <= 5) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squareArr.push(matrix[i][j+3])
      }
    }
  }
  if (str <= 2 && col >= 6) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squareArr.push(matrix[i][j+6])
      }
    }
  }
  if (str >= 3 && str <= 5 && col <= 2) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squareArr.push(matrix[i+3][j])
      }
    }
  }
  if (str >= 3 && str <= 5 && col >= 3 && col <= 5) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squareArr.push(matrix[i+3][j+3])
      }
    }
  }
  if (str >= 3 && str <= 5 && col >= 6) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squareArr.push(matrix[i+3][j+6])
      }
    }
  }
  if (str >= 6 && col <= 2) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squareArr.push(matrix[i+6][j])
      }
    }
  }
  if (str >= 6 && col >= 3 && col <= 5) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squareArr.push(matrix[i+6][j+3])
      }
    }
  }
  if (str >= 6 && col >= 6) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squareArr.push(matrix[i+6][j+6])
      }
    }
  }
  for (let i = 0; i < elem.length; i++) {
    if (squareArr.includes(elem[i])) {
      continue
    } else {
      newArr.push(elem[i])
    }
  }
  if (newArr.length === 1) return [newArr[0],true]
  return (newArr.length === elem.length)?[newArr,false]:[newArr,true];
}


const checkValueCol = function(elem, matrix, col) {
  if (typeof(elem) === 'number') return [elem, true];
  let newArr = [];
  let colArr = [];
  for (let i = 0; i < matrix.length; i++) {
    colArr.push(matrix[i][col])
  }
  for (let i = 0; i < elem.length; i++) {
    if (colArr.includes(elem[i])) {
      continue
    } else {
      newArr.push(elem[i])
    }
  }
  if (newArr.length === 1) return [newArr[0],true]
  return (newArr.length === elem.length)?[newArr,false]:[newArr,true];
}

const checkValueStr = function(elem, matrix, str) {
  if (typeof(elem) === 'number') return [elem, true];
  let newArr = []
  for (let i = 0; i < elem.length; i++) {
    if (matrix[str].includes(elem[i])) {
      continue
    } else {
      newArr.push(elem[i])
    }
  }
  if (newArr.length === 1) return [newArr[0],true]
  return (newArr.length === elem.length)?[newArr,false]:[newArr,true];
}

const startMatrix = function(matrix) {
  const num = [1,2,3,4,5,6,7,8,9]
  let m = matrix;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        m[i][j] = num;
      }
    }
  }
  return m
}

const printMatrix = function (m) {
  let rez = ''
  let pRez = ''
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m.length; j++) {
      pRez = `${m[i][j]}`
      if (pRez.length < 10) {
        for (let k = 0; pRez.length <= 12; k++) {
          pRez = ' ' + pRez
        }
      }
      rez += pRez
      pRez = ''
    }
    
    console.log(rez)
    rez = ''
  }
}
