// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};



//my code starts at this point

const pAequorFactory = (number, dnaArray) => {
	return {
    	specimenNum: number,
        dna: dnaArray,
        mutate(){
        	let dnaIndex = Math.floor(Math.random() * 14);
        	let newBase = this.dna[dnaIndex];
        	do{
        		newBase = returnRandBase();
        	}while(newBase == this.dna[dnaIndex])
        	this.dna[dnaIndex] = newBase;
        	//console.log(`gene ${dnaIndex} has been modified`); // log mutate dna gene number to track it easier
        	return this.dna;	
        },
        getSpecimenNum() {
			return this.specimenNum;
        },
        getDNA() {
			return this.dna;
        },
        compareDNA(otherPAequor){
        	let numOfbases = 0;
        	for (var i = 0; i < this.dna.length; i++) {
        		if(this.dna[i]==otherPAequor.dna[i]){
        			numOfbases += 1;
        		}
        	}
        	let percentage = Math.floor((numOfbases*100)/15);
        	return percentage;
        },
        willLikelySurvive(){
        	let numOfbase = 0;
        	this.dna.forEach(function(base){
        		if (base =='C' || base =='G') {
        			numOfbase += 1;
        		}
        	});
        	let percentage = Math.floor((numOfbase*100)/15);
			if (percentage >= 60){
				return true;
        	}else
        		return false;
        }
    }
}


const createInstances = (number) => {
	let arrayOfPaequor = [];
	while(arrayOfPaequor.length < 30){
		const lastIndex = arrayOfPaequor.length;
		const newPaequor = pAequorFactory(lastIndex+1, mockUpStrand());
		if(newPaequor.willLikelySurvive()){
			arrayOfPaequor.push(newPaequor);	
		}
	}
	return arrayOfPaequor;
}

const complementStrand = (dna) => {
	let complementaryDna = [];
	for (let i = 0; i < dna.length - 1 ; i++) {
		switch(dna[i]){
			case 'A':
				complementaryDna[i] = 'T';
				break;
			case 'T':
				complementaryDna[i] = 'A';
				break;
			case 'C':
				complementaryDna[i] = 'G';
				break;
			case 'G':
				complementaryDna[i] = 'C';
				break;
		}
	}
	return complementaryDna;
}


const mostRelated = (arrayOfpaequor) => {
	let arrayOfRelevance = [];
	let percentage = 0;
	let mostRelatedPaequor = [];
	for (var i = 0; i < arrayOfpaequor.length; i++) {
		for (var j = arrayOfpaequor.length-1; j >= 0; j--) {
			if (i != j) {
				const percentageOfRelevance = arrayOfpaequor[i].compareDNA(arrayOfpaequor[j]);
				arrayOfRelevance.push([i,j,percentageOfRelevance]);
			}
		}
	}
	for (var i = 0; i < arrayOfRelevance.length; i++) {
		if (arrayOfRelevance[i][2] > percentage) {
			percentage = arrayOfRelevance[i][2];
			mostRelatedPaequor = arrayOfRelevance[i];
		}
	}
	console.log('The two specimen with most related instances are numbers ' + arrayOfpaequor[mostRelatedPaequor[0]].getSpecimenNum() + ' with DNA ' + arrayOfpaequor[mostRelatedPaequor[0]].getDNA() + ' and ' + arrayOfpaequor[mostRelatedPaequor[1]].getSpecimenNum() + ' with DNA ' + arrayOfpaequor[mostRelatedPaequor[1]].getDNA());
}


// Here are every test function i created

//const pAequor1 = pAequorFactory(1, mockUpStrand());
//const pAequor2 = pAequorFactory(2, mockUpStrand()); 
//console.log(pAequor.getDNA());
//console.log(pAequor.mutate());

//console.log(pAequor1.compareDNA(pAequor2));
//console.log(pAequor1.willLikelySurvive());

const arrayOfpaequor = createInstances(30);


mostRelated(arrayOfpaequor);


//console.log(complementStrand(pAequor1.dna));








































