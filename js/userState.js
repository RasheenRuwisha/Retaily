function UserState() {
    this.lostitems = [];
}

UserState.prototype.addTool = function(lostitem) {
    this.lostitems.push(lostitem);
}

UserState.prototype.hasBuilderTool = function(citizen) {
    return citizen.lostitem && this.lostitems.includes(citizen.lostitem.name);
}

var userState = new UserState();
