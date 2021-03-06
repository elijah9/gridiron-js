export class MathUtils {
  static RadiansToDegrees : number = 180.0 / Math.PI;
  static DegreesToRadians : number = Math.PI / 180.0;

  static clampAngle(angle : number) : number {
    let cycle : number = 2 * Math.PI;
    if(angle < 0) {
      return this.clampAngle(angle + cycle);
    } else if(angle > cycle) {
      return this.clampAngle(angle - cycle);
    } else {
      return angle;
    }
  }

  static randInt(min : number, max : number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// adapted from https://rosettacode.org/wiki/Gaussian_elimination#JavaScript
// Lower Upper Solver
export function lusolve(A : Array<Array<number>>, b : Array<number>, update = false) : Array<number> {
	var lu = ludcmp(A, update)
	if (lu === undefined) return // Singular Matrix!
	return lubksb(lu, b, update)
}
 
// Lower Upper Decomposition
function ludcmp(A : Array<Array<number>>, update : boolean) {
	// A is a matrix that we want to decompose into Lower and Upper matrices.
	var d = true
	var n = A.length
	var idx = new Array(n) // Output vector with row permutations from partial pivoting
	var vv = new Array(n)  // Scaling information
 
	for (var i=0; i<n; i++) {
		var max = 0
		for (var j=0; j<n; j++) {
			var temp = Math.abs(A[i][j])
			if (temp > max) max = temp
		}
		if (max == 0) return // Singular Matrix!
		vv[i] = 1 / max // Scaling
	}
 
	if (!update) { // make a copy of A 
		var Acpy = new Array(n)
		for (var i=0; i<n; i++) {		
			var Ai = A[i] 
			let Acpyi = new Array(Ai.length)
			for (j=0; j<Ai.length; j+=1) Acpyi[j] = Ai[j]
			Acpy[i] = Acpyi
		}
		A = Acpy
	}
 
	var tiny = 1e-20 // in case pivot element is zero
	for (var i=0; ; i++) {
		for (var j=0; j<i; j++) {
			var sum = A[j][i]
			for (var k=0; k<j; k++) sum -= A[j][k] * A[k][i];
			A[j][i] = sum
		}
		var jmax = 0
		var max = 0;
		for (var j=i; j<n; j++) {
			var sum = A[j][i]
			for (var k=0; k<i; k++) sum -= A[j][k] * A[k][i];
			A[j][i] = sum
			var temp = vv[j] * Math.abs(sum)
			if (temp >= max) {
				max = temp
				jmax = j
			}
		}
		if (i <= jmax) {
			for (var j=0; j<n; j++) {
				var temp = A[jmax][j]
				A[jmax][j] = A[i][j]
				A[i][j] = temp
			}
			d = !d;
			vv[jmax] = vv[i]
		}
		idx[i] = jmax;
		if (i == n-1) break;
		var temp = A[i][i]
		if (temp == 0) A[i][i] = temp = tiny
		temp = 1 / temp
		for (var j=i+1; j<n; j++) A[j][i] *= temp
	}
	return {A:A, idx:idx, d:d}
}
 
// Lower Upper Back Substitution
function lubksb(lu, b : Array<number>, update : boolean) : Array<number> {
	// solves the set of n linear equations A*x = b.
	// lu is the object containing A, idx and d as determined by the routine ludcmp.
	var A = lu.A
	var idx = lu.idx
	var n = idx.length
 
	if (!update) { // make a copy of b
		var bcpy = new Array(n) 
		for (var i=0; i<b.length; i+=1) bcpy[i] = b[i]
		b = bcpy
	}
 
	for (var ii=-1, i=0; i<n; i++) {
		var ix = idx[i]
		var sum = b[ix]
		b[ix] = b[i]
		if (ii > -1)
			for (var j=ii; j<i; j++) sum -= A[i][j] * b[j]
		else if (sum)
			ii = i
		b[i] = sum
	}
	for (var i=n-1; i>=0; i--) {
		var sum = b[i]
		for (var j=i+1; j<n; j++) sum -= A[i][j] * b[j]
		b[i] = sum / A[i][i]
	}
	return b // solution vector x
}