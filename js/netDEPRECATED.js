var net = {};
net.test = {};

function runNet(){
  net.getInput();

  net.pushTestCase();

  net.process();

  console.log("Success", net.test.success);
  console.log("  Input", net.input);
  console.log(" Result",net.result);
}

size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function handleOutputColor(self){
  if($(self).val() === '1'){
    $(self).css({
      'background': '#000000',
      'color': '#FFFFFF'
    });
  } else{
    $(self).css({
      'background': '#FFFFFF',
      'color': '#000000'
    });
  }
}

net.getInput = function(){
  net.input = {};

  $('.input').each(function(key, value){
    var id = parseInt($(this).attr('id').substring(1));

    net.input[id] = parseInt($(this).val());
  });
};

net.pushTestCase = function(){
  net.test.success = {
    1: 0,
    2: 1,
    3: 0,
    4: 0,
    5: 1,
    6: 0,
    7: 1,
    8: 1,
    9: 1
  };
};

net.process = function(){
  net.result = {};

  var key = 1;

  $('.dif').val('0');
  $('.dif').css({
    'background': '#FFFFFF',
    'color': '#000000'
  });


  while(key <= size(net.input)){
    var value = net.input[key];
    net.result[key] = net.test.success[key] === value ? 1 : 0;

    $('#d' + key).val(net.result[key]);


    handleOutputColor('#d' + key);

    key ++;
  }

};



/* ----------------------- V2 ---------------------------- */
function neuron(inputSource, weight){
  var self = this;

  /* Check for input existance */
  if(inputSource == undefined){
    throw Error('\'inputSource\' not defined, terminating');
    return;
  }

  if(weight == undefined){
    throw Error('\'weight\' not defined, terminating');
    return;
  }

  self.inputSource = inputSource;//Set Value at bottom
  self.value = 0;

  self.test = {};
  self.weight = typeof weight === 'boolean' && weight ? Math.random() / 100 : weight;

  /* Getters */
  self.getInputSource = function(){
    return self.inputSource;
  };

  self.getValue = function(){
    return self.value;
  };

  self.getWeight = function(){
    return self.weight;
  };


  /* Setters */
  self.setInputSource = function(sInputSource){
    self.inputSource = sInputSource;
    self.updateValue();
  };

  self.setValue = function(sValue){
    self.value = sValue;
  };

  self.setWeight = function(sWeight){
    self.weight = sWeight;
  };


  /* Actions */
  self.updateValue = function(){
    self.value = parseInt($(self.inputSource).val());
  };

  self.numRev = function(num){//Reverse numbers, does !true but with 1 and 0
    return num === 0 ? 1 : 0;
  };

  self.check = function(){
    var output = self.getValue() * self.getWeight();

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
  self.createNeuron = function(inputSource, weight){
    var neuron = new neuron(inputSource, weight);

    self.addNeuron(neuron);
  };

  self.check = function(returnComplex){//returnComplex => gives more information about the decision
    returnComplex = returnComplex !== undefined ? returnComplex : false;

    var result = 0.0;
    var state = 0;

    var i = 0;
    while(i <= self.getNeurons().length - 1){
      result =+ self.getNeurons()[i].check();

      i++;
    }

    if(result >= threshold){
      state = 1;
    }

    if(returnComplex){
      return {
        "result": result,
        "state": state
      };
    } else{
      return state;
    }
  };
}

run = function(){
  var net = new network(0.5);

  var n1 = new neuron('#i1', true);

  net.addNeuron(n1);

  console.log(net.check(true));
};
