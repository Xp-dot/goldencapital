function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data=ev.dataTransfer.getData("text");
  var nodeCopy = document.getElementById(data).cloneNode(true);
  var randID = Math.random().toString(36).substr(2, 9);
  nodeCopy.id = "newId"+randID; /* We cannot use the same ID */
  if (ev.target.tagName == "DIV") 
	{
		ev.target.appendChild(nodeCopy);
	} 
	else 
	{
		ev.target.parentNode.replaceChild(nodeCopy, ev.target.parentNode.childNodes[0]);
	}
	
}