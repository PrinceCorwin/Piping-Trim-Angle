const pipeData = {
  0.5: {
    od: 0.84,
  },
  0.75: {
    od: 1.05,
  },
  1: {
    od: 1.315,
  },
  1.25: {
    od: 1.66,
  },
  1.5: {
    od: 1.9,
  },
  2: {
    od: 2.375,
  },
  2.5: {
    od: 2.875,
  },
  3: {
    od: 3.5,
  },
  3.5: {
    od: 4.0,
  },
  4: {
    od: 4.5,
  },
  4.5: {
    od: 5.0,
  },
  5: {
    od: 5.563,
  },
  6: {
    od: 6.625,
  },
  7: {
    od: 7.625,
  },
  8: {
    od: 8.625,
  },
  9: {
    od: 9.625,
  },
  10: {
    od: 10.75,
  },
  11: {
    od: 11.75,
  },
  12: {
    od: 12.75,
  },
  14: {
    od: 14.0,
  },
  16: {
    od: 16.0,
  },
  18: {
    od: 18.0,
  },
  20: {
    od: 20.0,
  },
  22: {
    od: 22.0,
  },
  24: {
    od: 24.0,
  },
  26: {
    od: 26.0,
  },
  28: {
    od: 28.0,
  },
  30: {
    od: 30.0,
  },
  32: {
    od: 32.0,
  },
  34: {
    od: 34.0,
  },
  36: {
    od: 36.0,
  },
  42: {
    od: 42.0,
  },
  48: {
    od: 48.0,
  },
};
// console.log(typeof pipeData[3].od);
function trimData() {
  // clear error warnings
  let psizeInvalid = document.getElementById("psizeInvalid");
  let angleInvalid = document.getElementById("angleInvalid");
  psizeInvalid.textContent = "";
  angleInvalid.textContent = "";

  // validating correct input type
  let psize = Number(document.getElementById("psize").value);
  let trimAngle = Number(document.getElementById("trim-angle").value);
  if (pipeData[psize] === undefined) {
    psizeInvalid.textContent = "INVALID";
    // console.log(psizeInvalid);
    // console.log(typeof psize);
    // console.log(pipeData[0.5]);
    return;
  }
  if (trimAngle < 0 || trimAngle > 90) {
    angleInvalid.textContent = "INVALID";
    // console.log(angleInvalid);
    return;
  }
  console.log(trimAngle);
  insideArc(1, trimAngle);
  insideArc(1.5, trimAngle);
  insideArc(3, trimAngle);
  insideArc(5, trimAngle);
  outsideArc(1, trimAngle);
  outsideArc(1.5, trimAngle);
  outsideArc(3, trimAngle);
  outsideArc(5, trimAngle);
  layingLength(1, trimAngle);
  layingLength(1.5, trimAngle);
  layingLength(3, trimAngle);
  layingLength(5, trimAngle);

  // console.log(rad);

  // CALCULATE INSIDE ARC LENGTH
  function insideArc(ratio, angle) {
    console.log(angle);
    let elbowOD = pipeData[psize].od;
    console.log(elbowOD);
    let rad = ratio * psize;
    if (psize === 0.5 && ratio === 1.5) {
      rad = 1.5;
    }
    let insideArcLength = (angle / 360) * (Math.PI * (rad - 0.5 * elbowOD));
    console.log(insideArcLength);
    return amerStand(insideArcLength);
  }
  // CALCULATE OUTSIDE ARC LENGTH
  function outsideArc(ratio, angle) {
    console.log(angle);
    let elbowOD = pipeData[psize].od;
    console.log(elbowOD);
    let rad = ratio * psize;
    if (psize === 0.5 && ratio === 1.5) {
      rad = 1.5;
    }
    let outsideArcLength = (angle / 360) * (Math.PI * (rad + 0.5 * elbowOD));
    console.log(outsideArcLength);
    return amerStand(outsideArcLength);
  }

  // CALCULATE LAYING LENGTH
  function layingLength(ratio, angle) {}
  // convert to american standard
  function amerStand(L) {
    var tempL = L;
    var fraction;
    var inches;
    var feet;
    var standardL;
    funcFraction();
    feetAndInches();
    function funcFraction() {
      L = L - parseInt(L);
      fraction = Math.round(parseInt(L * 16)) + "/" + "16";
      if (fraction === "2/16") {
        fraction = "1/8";
      } else if (fraction === "4/16") {
        fraction = "1/4";
      } else if (fraction === "6/16") {
        fraction = "3/8";
      } else if (fraction === "8/16") {
        fraction = "1/2";
      } else if (fraction === "10/16") {
        fraction = "5/8";
      } else if (fraction === "12/16") {
        fraction = "3/4";
      } else if (fraction === "14/16") {
        fraction = "7/8";
      } else if (fraction === "0/16") {
        fraction = "0";
      }
    }
    function feetAndInches() {
      if (parseInt(tempL) === 0) {
        feet = 0;
        inches = 0;
      } else if (parseInt(tempL) < 12) {
        feet = 0;
        inches = parseInt(tempL);
      } else {
        inches = Number.parseInt(tempL) % 12;
        feet = Number.parseInt(tempL / 12);
      }
    }

    if (feet === 0 && inches === 0) {
      standardL = fraction + '"';
    } else if (feet === 0 && fraction === 0) {
      standardL === parseInt(inches) + '"';
    } else if (fraction === "0" || Number(fraction) <= 0) {
      standardL = parseInt(feet) + "'-" + parseInt(inches) + '"';
    } else if (feet === 0) {
      standardL = parseInt(inches) + "." + fraction + '"';
    } else {
      standardL =
        parseInt(feet) + "'-" + parseInt(inches) + "." + fraction + '"';
    }
    console.log(feet, inches, fraction);
    console.log(standardL);
    return standardL;
  }
}
