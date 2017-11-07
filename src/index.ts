/* tslint:disable:no-console max-func-body-length cyclomatic-complexity prefer-for-of */

import { inv } from 'mathjs';

const Y: number[][] = [[2], [4], [3], [5], [6]];
const X: number[][] = [[2], [5], [5], [7], [9]];

let temp: number;
const n: number = X.length;

// Dogrusal En Kucuk Kareler
function linearLeastSquareMethod(): number[][] {
  const mX: number[][] = Array(X.length).fill(0).map(() => Array(2).fill(0));
  const XX: number[][] = Array(2).fill(0).map(() => Array(2).fill(0));
  const XY: number[][] = Array(2).fill(0).map(() => Array(1).fill(0));
  const transposeX: number[][] = Array(2).fill(0).map(() => Array(X.length).fill(0));
  let inverseX: number[][] = Array(2).fill(0).map(() => Array(2).fill(0));

  const yGuess: number[][] = Array(X.length).fill(0).map(() => Array(1).fill(0));
  const lnyGuess: number[][] = Array(X.length).fill(0).map(() => Array(1).fill(0));
  const betaGuess: number[][] = Array(2).fill(0).map(() => Array(1).fill(0));

  // [ 1 X ] matrisi olusturulur
  for (let i = 0; i < X.length; i += 1) {
    mX[i][0] = 1;
    mX[i][1] = X[i][0];
  }

  // X'
  for (let i = 0; i < mX[0].length; i += 1) {
    for (let j = 0; j < mX.length; j += 1) {
      transposeX[i][j] = mX[j][i];
    }
  }

  // X'X
  for (let i = 0; i < transposeX.length; i += 1) {
    XX[i] = [];
    for (let j = 0; j < mX[0].length; j += 1) {
      temp = 0;
      for (let k = 0; k < transposeX[0].length; k += 1) {
        temp += transposeX[i][k] * mX[k][j];
      }
      XX[i][j] = parseFloat(temp.toFixed(4));
    }
  }

  // X'Y
  for (let i = 0; i < transposeX.length; i += 1) {
    XY[i] = [];
    for (let j = 0; j < Y[0].length; j += 1) {
      temp = 0;
      for (let k = 0; k < transposeX[0].length; k += 1) {
        temp += transposeX[i][k] * Y[k][j];
      }
      XY[i][j] = parseFloat(temp.toFixed(4));
    }
  }

  // (X'X)^-1
  inverseX = inv(XX);
  for (let i = 0; i < inverseX.length; i += 1) {
    for (let j = 0; j < inverseX.length; j += 1) {
      inverseX[i][j] = parseFloat(inverseX[i][j].toFixed(4));
    }
  }

  // betaSapka
  for (let i = 0; i < inverseX.length; i += 1) {
    temp = 0;
    for (let j = 0; j < XY.length; j += 1) {
      temp += inverseX[i][j] * XY[j][0];
    }
    betaGuess[i][0] = parseFloat(temp.toFixed(4));
  }

  // ySapka
  for (let i = 0; i < mX.length; i += 1) {
    temp = 0;
    for (let j = 0; j < betaGuess.length; j += 1) {
      temp += mX[i][j] * betaGuess[j][0];
    }
    yGuess[i][0] = parseFloat(temp.toFixed(4));
  }

  // lnySapka
  for (let i = 0; i < lnyGuess.length; i += 1) {
    lnyGuess[i][0] = parseFloat((Math.log(yGuess[i][0])).toFixed(4));
  }

  console.log('=== Linear Least Square Error Method ===');
  console.log('X:', X);
  console.log('transposeX', transposeX);
  console.log('Y:', Y);
  console.log('XY:', XY);
  console.log('XX:', XX);
  console.log('inverseX:', inverseX);
  console.log('mX:', mX);
  console.log('betaGuess:', betaGuess);
  console.log('yGuess:', yGuess);
  console.log('lnyGuess:', lnyGuess);
  console.log();

  return lnyGuess;
}

// Cift Logaritmik Regresyon Modeli
function doubleLogarithmicRegressionModel(): number[][] {
  const lnX: number[][] = Array(X.length).fill(0).map(() => Array(1).fill(0));
  const lnY: number[][] = Array(X.length).fill(0).map(() => Array(1).fill(0));
  const lnmX: number[][] = Array(X.length).fill(0).map(() => Array(2).fill(0));
  const XX: number[][] = Array(2).fill(0).map(() => Array(2).fill(0));
  const XY: number[][] = Array(2).fill(0).map(() => Array(1).fill(0));
  const transposeX: number[][] = Array(2).fill(0).map(() => Array(X.length).fill(0));
  let inverseX: number[][] = Array(2).fill(0).map(() => Array(2).fill(0));

  const lnyGuess: number[][] = Array(X.length).fill(0).map(() => Array(1).fill(0));
  const betaGuess: number[][] = Array(2).fill(0).map(() => Array(1).fill(0));

  // X ve Y degerlerinin logaritmalari alinir.
  for (let i = 0; i < X.length; i += 1) {
    lnX[i][0] = parseFloat(Math.log(X[i][0]).toFixed(4));
    lnY[i][0] = parseFloat(Math.log(Y[i][0]).toFixed(4));
  }

  // [ 1 lnX ] matrisi olusturulur
  for (let i = 0; i < X.length; i += 1) {
    lnmX[i][0] = 1;
    lnmX[i][1] = lnX[i][0];
  }

  // X'
  for (let i = 0; i < lnmX[0].length; i += 1) {
    for (let j = 0; j < lnmX.length; j += 1) {
      transposeX[i][j] = lnmX[j][i];
    }
  }

  // X'X
  for (let i = 0; i < transposeX.length; i += 1) {
    XX[i] = [];
    for (let j = 0; j < lnmX[0].length; j += 1) {
      temp = 0;
      for (let k = 0; k < transposeX[0].length; k += 1) {
        temp += transposeX[i][k] * lnmX[k][j];
      }
      XX[i][j] = parseFloat(temp.toFixed(4));
    }
  }

  // X'Y
  for (let i = 0; i < transposeX.length; i += 1) {
    XY[i] = [];
    for (let j = 0; j < lnY[0].length; j += 1) {
      temp = 0;
      for (let k = 0; k < transposeX[0].length; k += 1) {
        temp += transposeX[i][k] * lnY[k][j];
      }
      XY[i][j] = parseFloat(temp.toFixed(4));
    }
  }

  // (X'X)^-1
  inverseX = inv(XX);
  for (let i = 0; i < inverseX.length; i += 1) {
    for (let j = 0; j < inverseX.length; j += 1) {
      inverseX[i][j] = parseFloat(inverseX[i][j].toFixed(4));
    }
  }

  // betaSapka
  for (let i = 0; i < inverseX.length; i += 1) {
    temp = 0;
    for (let j = 0; j < XY.length; j += 1) {
      temp += inverseX[i][j] * XY[j][0];
    }
    betaGuess[i][0] = parseFloat(temp.toFixed(4));
  }

  // lnySapka
  for (let i = 0; i < lnmX.length; i += 1) {
    temp = 0;
    for (let j = 0; j < betaGuess.length; j += 1) {
      temp += lnmX[i][j] * betaGuess[j][0];
    }
    lnyGuess[i][0] = parseFloat(temp.toFixed(4));
  }

  console.log('=== Double Logarithmic Regression Model ===');
  console.log('X:', X);
  console.log('Y:', Y);
  console.log('logX:', lnX);
  console.log('logY:', lnY);
  console.log('XY:', XY);
  console.log('XX:', XX);
  console.log('inverseX:', inverseX);
  console.log('lnmX:', lnmX);
  console.log('betaGuess:', betaGuess);
  console.log('lnyGuess:', lnyGuess);
  console.log();

  return lnyGuess;
}

function beforeMWDTest(): number[][] {
  const lnyGuessLSE: number[][] = linearLeastSquareMethod();
  const lnyGuessDLR: number[][] = doubleLogarithmicRegressionModel();
  const W: number[][] = Array(X.length).fill(0).map(() => Array(1).fill(0));

  // W degeri hesaplanir
  for (let i = 0; i < W.length; i += 1) {
    W[i][0] = parseFloat((lnyGuessLSE[i][0] - lnyGuessDLR[i][0]).toFixed(4));
  }

  console.log('=== Before MWD Test ===');
  console.log('lnyGuessLSE:', lnyGuessLSE);
  console.log('lnyGuessDLR:', lnyGuessDLR);
  console.log('W:', W);
  console.log();

  return W;
}

function mwdTest(): {} {
  const mwX: number[][] = Array(X.length).fill(0).map(() => Array(3).fill(0));
  const XX: number[][] = Array(3).fill(0).map(() => Array(3).fill(0));
  const XY: number[][] = Array(3).fill(0).map(() => Array(1).fill(0));
  const transposeX: number[][] = Array(3).fill(0).map(() => Array(X.length).fill(0));
  const transposeY: number[][] = Array(3).fill(0).map(() => Array(X.length).fill(0));
  let inverseX: number[][] = Array(3).fill(0).map(() => Array(3).fill(0));

  let y: number = 0;
  let eps: number = 0;
  const transposeEps: number[][] = Array(1).fill(0).map(() => Array(X.length).fill(0));
  const epsGuess: number[][] = Array(X.length).fill(0).map(() => Array(1).fill(0));
  const lnyGuess: number[][] = Array(X.length).fill(0).map(() => Array(1).fill(0));
  const yGuess: number[][] = Array(X.length).fill(0).map(() => Array(1).fill(0));
  const betaGuess: number[][] = Array(3).fill(0).map(() => Array(1).fill(0));

  let varBeta: number;
  let epsSqrS: number;
  let rSqr: number;
  let tCalc: number;

  const W: number[][] = beforeMWDTest();

   // [ 1 X W ] matrisi olusturulur
  for (let i = 0; i < X.length; i += 1) {
    mwX[i][0] = 1;
    mwX[i][1] = X[i][0];
    mwX[i][2] = W[i][0];
  }

  // X'
  for (let i = 0; i < mwX[0].length; i += 1) {
    for (let j = 0; j < mwX.length; j += 1) {
      transposeX[i][j] = mwX[j][i];
    }
  }

  // Y'
  for (let i = 0; i < Y[0].length; i += 1) {
    for (let j = 0; j < Y.length; j += 1) {
      transposeY[i][j] = Y[j][i];
    }
  }

  // X'X
  for (let i = 0; i < transposeX.length; i += 1) {
    XX[i] = [];
    for (let j = 0; j < mwX[0].length; j += 1) {
      temp = 0;
      for (let k = 0; k < transposeX[0].length; k += 1) {
        temp += transposeX[i][k] * mwX[k][j];
      }
      XX[i][j] = parseFloat(temp.toFixed(4));
    }
  }

  // X'Y
  for (let i = 0; i < transposeX.length; i += 1) {
    XY[i] = [];
    for (let j = 0; j < Y[0].length; j += 1) {
      temp = 0;
      for (let k = 0; k < transposeX[0].length; k += 1) {
        temp += transposeX[i][k] * Y[k][j];
      }
      XY[i][j] = parseFloat(temp.toFixed(4));
    }
  }

  // Y'Y
  for (let i = 0; i < Y.length; i += 1) {
    y += transposeY[0][i] * Y[i][0];
    y = parseFloat(y.toFixed(4));
  }

  // (X'X)^-1
  inverseX = inv(XX);
  for (let i = 0; i < inverseX.length; i += 1) {
    for (let j = 0; j < inverseX.length; j += 1) {
      inverseX[i][j] = parseFloat(inverseX[i][j].toFixed(4));
    }
  }

  // betaSapka
  for (let i = 0; i < inverseX.length; i += 1) {
    temp = 0;
    for (let j = 0; j < XY.length; j += 1) {
      temp += inverseX[i][j] * XY[j][0];
    }
    betaGuess[i][0] = parseFloat(temp.toFixed(4));
  }

  // ySapka
  for (let i = 0; i < mwX.length; i += 1) {
    temp = 0;
    for (let j = 0; j < betaGuess.length; j += 1) {
      temp += mwX[i][j] * betaGuess[j][0];
    }
    yGuess[i][0] = parseFloat(temp.toFixed(4));
  }

  // lnySapka
  for (let i = 0; i < lnyGuess.length; i += 1) {
    lnyGuess[i][0] = parseFloat((Math.log(yGuess[i][0])).toFixed(4));
  }

  // epsSapka
  for (let i = 0; i < yGuess.length; i += 1) {
    epsGuess[i][0] = parseFloat((Y[i][0] - yGuess[i][0]).toFixed(4));
  }

  // epsSapka'
  for (let i = 0; i < epsGuess[0].length; i += 1) {
    for (let j = 0; j < epsGuess.length; j += 1) {
      transposeEps[i][j] = epsGuess[j][i];
    }
  }

  // epsSapka' * epsSapka
  for (let i = 0; i < epsGuess.length; i += 1) {
    eps += transposeEps[0][i] * epsGuess[i][0];
    eps = parseFloat(eps.toFixed(4));
  }

  // epsKare
  epsSqrS = parseFloat((eps / (n - mwX[0].length)).toFixed(4));

  rSqr = parseFloat((1 - (epsSqrS / y)).toFixed(4));

  // varyansBetaSapka
  varBeta = parseFloat((epsSqrS * inverseX[2][2]).toFixed(4));

  // tHesap
  tCalc = parseFloat(((betaGuess[2][0] - 0) / Math.sqrt(varBeta)).toFixed(4));

  console.log('=== MWD Test ===');
  console.log('X:', X);
  console.log('Y:', Y);
  console.log('XY:', XY);
  console.log('XX:', XX);
  console.log('inverseX:', inverseX);
  console.log('wX', mwX);
  console.log('betaGuess:', betaGuess);
  console.log('lnyGuess:', lnyGuess);
  console.log('yGuess:', yGuess);
  console.log('epsGuess:', epsGuess);
  console.log('eps:', eps);
  console.log('rSqr:', rSqr);
  console.log('epsSqrS:', epsSqrS);
  console.log('varBeta:', varBeta);
  console.log('tCalc:', tCalc);
  console.log();

  return lnyGuess;
}

export function main() {
  mwdTest();
}

main();
