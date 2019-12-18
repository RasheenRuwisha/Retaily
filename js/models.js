var builders = [],
    tools = [];

function ARModel(name, dialogue) {
    //we can make name link to the el id to find it on click?
    this.name = name;
    this.dialogue = dialogue;
    

}

ARModel.prototype.speak = function() {
    return this.dialogue;   
}

//Builder model
function Builder(name, dialogue, tool, successDialogue) {
    ARModel.call(this, name, dialogue);
    this.tool = tool;
    this.successDialogue = successDialogue;
}

Builder.prototype = Object.create(ARModel.prototype);

//Tool model
function Tool(name, dialogue) {
    ARModel.call(this, name, dialogue);
}

Tool.prototype = Object.create(ARModel.prototype);

function initiateModels() {
    var buildersArray = [
      {
        name: 'pyra',
        dialogue: 'Hi there, I\'m steve...! I have lost my chicken. Can you help me find it',
        tool: new Tool('hammer', 'You have found Steve\'s chicken! Return it to Steve.'),
        successDialogue: 'Thanks for finding my chicken! I have added a coupon to your account'
      },
      {
        name: 'biggie',
        dialogue: 'Hi there, I\'m sbeve...! I have lost my cow. Can you help me find it ',
        tool: new Tool('blocks', 'You have found Biggie\'s blocks! Return it to Sbeve.'),
        successDialogue: 'Thanks for finding my chicken! I have added a coupon to your account'
      },
      {
        name: 'frenchie',
        dialogue: 'Hi there, I\'m merc...! I have lost my horse. Can you help me find it ',
        tool: new Tool('hat', 'You have found Mercs\'s horse! Return it to Merc.'),
        successDialogue: 'Thanks for finding my horse! I have added a coupon to your account'
      },
      {
        name: 'lil',
        dialogue: 'Hi there, I\'m the sherrif of minecraft...! The witch in custody has escaped. Can you help us capture her ',
        tool: new Tool('screwdriver', 'You have captured the witch! Return her to the sherrif.'),
        successDialogue: 'Thanks for the screwdriver!'
      },
      {
        name: 'toob',
        dialogue: 'Pleased Toob meet you... haha... see what I did there? By the way, have you seen my wrench?',
        tool: new Tool('wrench', 'You have found Toob\'s wrench!'),
        successDialogue: 'Thanks for finding my wrench!'
      },
      {
        name: 'demo',
        dialogue: 'Meow! Welcome to CBRE Build.',
      }
    ];

    buildersArray.forEach(function(builder){
        builders.push(new Builder(builder.name, builder.dialogue, builder.tool, builder.successDialogue));
        if (builder.tool) tools.push(builder.tool);
    });

    console.log('builders', builders);
    console.log('tools', tools)
}

initiateModels();
