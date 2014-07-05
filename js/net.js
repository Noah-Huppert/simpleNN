function neuron(inputSource, testCase, testOutput){
  var self = this;

  /* Check for input existance */
  if(inputSource == undefined){
    throw Error('\'inputSource\' not defined, terminating');
    return;
  }

  if(testCase == undefined){
    throw Error('\'testCase\' not defined, terminating');
    return;
  }

  if(testOutput == undefined){
    throw Error('\'testOutput\' not defined, terminating');
    return;
  }

  self.inputSource = inputSource;//Set Value at bottom
  self.value = 0;

  self.test = {};
  self.test.case = testCase;
  self.test.output = testOutput;


  /* Getters */
  self.getInputSource = function(){
    return self.inputSource;
  };

  self.getValue = function(){
    return self.value;
  };

  self.getTest = function(){
    return self.test;
  };

  self.getTestCase = function(){
    return self.test.case;
  };

  self.getTestOutput = function(){
    return self.test.output;
  };


  /* Setters */
  self.setInputSource = function(sInputSource){
    self.inputSource = sInputSource;
    self.updateValue();
  };

  self.setValue = function(sValue){
    self.value = sValue;
  };

  self.setTest = function(sTest){
    self.test = sTest;
  };

  self.setTestCase = function(sTestCase){
    self.test.case = sTestCase;
  };

  self.setTestOutput = function(sTestOutput){
    self.test.output = sTestOutput;
  };


  /* Actions */
  self.updateValue = function(){
    self.value = parseInt($(self.inputSource).val());
  };

  self.numRev = function(num){//Reverse numbers, does !true but with 1 and 0
    return num === 0 ? 1 : 0;
  };

  self.check = function(){
    var output = self.getValue() === self.getTestCase() ? self.getTestOutput() : self.numRev(self.getTestOutput());
    return output;
  };


  /* After Def Actions */
  self.updateValue();
}


function network(threshold, neurons){
  var self = this;

  /* Check for input existance */
  if(threshold === undefined){
    throw Error('\'threshold\' not defined, terminating');
    return;
  }

  self.threshold = threshold;
  self.neurons = !!neurons ? neurons : [];


  /* Getters */
  self.getNeurons = function(){
    return self.neurons;
  };

  self.getThreshold = function(){
    return self.threshold;
  };


  /* Setters */
  self.setNeurons = function(sNeurons){
    self.neurons = sNeurons;
  };

  self.addNeuron = function(aNeuron){
    self.neurons.push(aNeuron);
  };

  self.setThreshold = function(sThreshold){
    self.threshold = sThreshold;
  };


  /* Actions */
  self.createNeuron = function(inputSource, testCase, testOutput){
    var neuron = new neuron(inputSource, testCase, testOutput);

    self.addNeuron(neuron);
  };

  self.check = function(returnComplex){//returnComplex => gives more information about the decision
    returnComplex = returnComplex !== undefined ? returnComplex : false;

    var result = 0.0;
    var state = 0;
    var weight = 1 / self.getNeurons().length;

    var i = 0;
    while(i <= self.getNeurons().length - 1){
      if(self.getNeurons()[i].check() === 1){
        result += weight;
      }

      i++;
    }

    if(result >= threshold){
      state = 1;
    }

    if(returnComplex){
      return {
        "result": result,
        "state": state,
        "weight": weight
      };
    } else{
      return state;
    }
  };
}

run = function(){
  var n1 = new neuron('#i1', 0, 1);
  var n2 = new neuron('#i2', 0, 1);
  var n3 = new neuron('#i3', 0, 1);
  var net = new network(0.5, [n1, n2, n3]);
  console.log(net.check(true));
};
