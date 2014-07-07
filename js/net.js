function input(inputSource, weight){
  var self = this;

  if(inputSource == undefined){
    throw Error('\'inputSource\' is not defined');
    return;
  }

  if(weight == undefined){
    throw Error('\'weight\' is not defined');
    return;
  }

  self.inputSource = inputSource;
  self.inputValue = 0;
  self.weight = typeof weight == 'boolean' ? Math.random() / 100 : weight;


  /* Getters */
  self.getInputSource = function(){
    return self.inputSource;
  };

  self.getInputValue = function(){
    return self.inputValue;
  }

  self.getValue = function(){
    self.updateInputValue();
    return self.calcValue();
  };

  self.getWeight = function(){
    return self.weight;
  };


  /*Setters */
  self.setInputSource = function(sInputSource){
    self.inputSource = sInputSource;
    self.updateValue();
  };

  self.setInputValue = function(sInputValue){
    self.inputValue = sInputValue;
  };

  self.setWeight = function(sWeight){
    self.weight = sWeight;
  };


  /* Actions */
  self.updateInputValue = function(){
    var inputValue = parseInt($(self.inputSource).val());

    self.setInputValue(inputValue);
  };

  self.calcValue = function(){
    return self.getInputValue() * self.getWeight();
  };

  self.updateInputValue();
}

function inputManager(inputPrefix, inputAmount, inputs){
  var self = this;

  self.inputs = inputs == undefined ? [] : inputs;
  self.inputPrefix = inputPrefix;
  self.inputAmount = inputAmount;


  /* Getters */
  self.getInputs = function(){
    return self.inputs;
  };

  self.getInput = function(index){
    return self.getInputs()[index];
  };

  self.getValues = function(){
    var inputValues = [];

    var i = 0;
    while(i <= self.getInputs().length - 1){
      inputValues.push(self.getInputs()[i].getValue());
      i++;
    }

    return inputValues;
  };

  self.getWeights = function(){
    var inputWeights = [];

    var i = 0;
    while(i <= self.getInputs().length){
      inputWeights.push(self.getInputs()[i].getWeight());
      i++;
    }
    return inputWeigths;
  };


  /* Setters */
  self.setInputs = function(sInputs){
    self.inputs = sInputs;
  };

  self.addInput = function(aInput){
    self.getInputs().push(aInput);
  };

  self.createInput = function(value, weight){
    var input = new input(value, weight);
    self.addInput(input);
  };

  self.addInputs = function(){
    var i = 1;
    var inputs = [];

    while(i <= self.inputAmount){
      var tempInput = new input(self.inputPrefix + i, true);
      inputs.push(tempInput);
      i++;
    }

    self.setInputs(inputs);
  };

  self.addInputs();
}

function neuron(weight, processor){
  var self = this;

  if(processor == undefined){
    throw Error('\'processor\' is undefined');
    return;
  }

  self.weight = typeof weight == 'boolean' ? Math.random() / 100 : weight;
  self.processor = processor;


  /* Getters */
  self.getWeight = function(){
    return self.weight;
  };

  self.getProcessor = function(){
    return self.processor;
  };


  /* Setters */
  self.setWeight = function(sWeight){
    self.weight = sWeight;
  };

  self.setProcessor = function(sProcessor){
    self.processor = sProcessor;
  };


  /* Actions */
  self.process = function(inputs){
    var processor = self.getProcessor();
    return processor(inputs);
  };
}

function run(){
  var inputs = new inputManager('#i', 9);

  function nP(inputs){
    var values = inputs.getValues();

    var total = 0;

    $.each(values, function(key, value){
      total = total + value;
    });

    return total;
  }

  var n1 = new neuron(true, nP);

  console.log(n1.process(inputs));
}
