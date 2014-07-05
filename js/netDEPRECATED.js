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
