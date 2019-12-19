var builders = [],
    tools = [];

function ARModel(name, dialogue) {
    this.name = name;
    this.dialogue = dialogue;
}

ARModel.prototype.speak = function() {
    return this.dialogue;   
}

function Builder(name, dialogue, tool, successDialogue) {
    ARModel.call(this, name, dialogue);
    this.tool = tool;
    this.successDialogue = successDialogue;
}

Builder.prototype = Object.create(ARModel.prototype);

function Tool(name, dialogue) {
    ARModel.call(this, name, dialogue);
}

Tool.prototype = Object.create(ARModel.prototype);

function initiateModels() {
    var buildersArray = [
      {
        name: 'pewds',
        dialogue: 'Hi there, I\'m pewds...! I have lost my chicken. Can you help me find it',
        tool: new Tool('chicken', 'You have found pewds\'s chicken! Return it to pewds.'),
        successDialogue: 'Thanks for finding my chicken! I have added a coupon to your account'
      },
      {
        name: 'sbeve',
        dialogue: 'Hi there, I\'m sbeve...! I have lost my cow. Can you help me find it ',
        tool: new Tool('cow', 'You have found Biggie\'s blocks! Return it to Sbeve.'),
        successDialogue: 'Thanks for finding my cow! I have added a coupon to your account'
      },
      {
        name: 'merc',
        dialogue: 'Hi there, I\'m merc...! I have lost my horse. Can you help me find it ',
        tool: new Tool('horse', 'You have found Mercs\'s horse! Return it to Merc.'),
        successDialogue: 'Thanks for finding my horse! I have added a coupon to your account'
      },
      {
        name: 'sherrif',
        dialogue: 'Hi there, I\'m the sherrif of minecraft...! The witch in custody has escaped. Can you help us capture her ',
        tool: new Tool('witch', 'You have captured the witch! Return her to the sherrif.'),
        successDialogue: 'Thanks for helping us capture the witch! I have added a coupon to your account'
      },
      {
        name: 'meek',
        dialogue: 'Hi there, I\'m meek... I have lost my pig. Can you help me find it',
        tool: new Tool('pig', 'You have found Meek\'s pig!'),
        successDialogue: 'Thanks for finding my pig! I have added a coupon to your account!'
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
