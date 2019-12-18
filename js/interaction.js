AFRAME.registerComponent('accepts-clicks', {
  init: function() {
    this.el.addEventListener('touchend', handleClickEvent);
    this.el.addEventListener('markerFound', handleClickEvent);
  },
  tick: function() {
    hideSpeechBubbleIfNoMarker();
  }
});

function hideSpeechBubbleIfNoMarker() {
  var speechBubble = document.querySelector(".speech-bubble");
  if (speechBubble.style.display === 'none' || !speechBubble.style.display) return;

  var shouldHide = true;
  builders.forEach(function(builder){
    var builderMarker = document.querySelector("#" + builder.name + "-marker");
    if (builderMarker && builderMarker.object3D.visible) shouldHide = false;
  });

  tools.forEach(function(tool){
    var toolMarker = document.querySelector("#" + tool.name + "-marker");
    if (toolMarker && toolMarker.object3D.visible) shouldHide = false;
  });

  if (shouldHide) speechBubble.style.display = 'none';
};

function handleClickEvent() {
  builders.forEach(function(builder) {
    var builderMarker = document.querySelector("#" + builder.name + "-marker");
    if (builderMarker && builderMarker.object3D.visible) {
      if (searchForBuilderTool(builder)){
          toggleSpeechBubble(builder.successDialogue);
          if(builder.name === "pyra"){
            updateProgress();
        }
      } else {
          toggleSpeechBubble(builder.dialogue);
      }
    }
  });

  tools.forEach(function(tool){
    var toolMarker = document.querySelector("#" + tool.name + "-marker");
    if (toolMarker && toolMarker.object3D.visible) {
        toggleSpeechBubble(tool.dialogue);
      if (!userState.hasBuilderTool(tool)) userState.addTool(tool);
    }
  });
}

function toggleSpeechBubble(dialogue) {
  var speechBubble = document.querySelector(".speech-bubble");
	if (speechBubble.style.display === 'none' || !speechBubble.style.display) {
		speechBubble.innerHTML = dialogue;
		speechBubble.style.display = 'block';
	} else {
		speechBubble.style.display = 'none';
	}
};

function searchForBuilderTool(builder) {
  return userState.tools.some(function(tool) {
    return tool.name === builder.tool.name;
  });
};



function updateProgress(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://retaily-api.herokuapp.com/updateTreasureHunt",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Postman-Token": "540e1b4c-027e-4ea4-b7f0-9d3769c7ad40"
    },
    "processData": false,
    "data": "{\n    \"email\": \""+localStorage.email+"\",\n    \"completion\": [\"true\",\"false\",\"false\",\"false\",\"false\",\"false\",\"false\"]\n}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}