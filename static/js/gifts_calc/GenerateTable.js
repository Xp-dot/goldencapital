var timer;
var img;
var path;
var imgArray = new Array();
var currentLenght, prevLenght;

function loadImage(Folder) {
	imgArray = new Array();
	var photoArray = get_Array(Folder);
	for(var i = 0; i<photoArray.length;i++)
	{
		img = new Image();
		path = '/media/Gift_Images/' + Folder +'/'+ photoArray[i];
		imgArray.push(path);
        img.src = path;
	}
	generate_table();
}
function get_Array(Folder)
{
	var photoArray;
	switch (Folder) 
	{
	  case "Autumn":
			photoArray = photoAutumn;
		break;
	  case "Byket":
			photoArray = photoByket;
		break;
	  case "Concurs":
			photoArray = photoConcurs;
		break;
	  case "Flowers":
			photoArray = photoFlowers;
		break;
	  case "FriendShip":
			photoArray = photoFriendship;
		break;
		case "Gift_Sets":
			photoArray = photoGiftSet;
		break;
		case "Happy_Birthday":
			photoArray = photoHappyBirthday;
		break;
		case "Jewelry":
			photoArray = photoJewerly;
		break;
		case "LevelUp":
			photoArray = photoLevelUp;
		break;
		case "Misc":
			photoArray = photoMisc;
		break;
		case "Ot_Sluchaya_K_Sluchay":
			photoArray = photoOtSluchaya;
		break;
		case "Pozdravitelnaya_Otrkritka":
			photoArray = photoPozdrOtrk;
		break;
		case "Raznoe":
			photoArray = photoRaznoe;
		break;
		case "RolePlay":
			photoArray = photoRolePlay;
		break;
		case "Romantic":
			photoArray = photoRomantic;
		break;
		case "Spring":
			photoArray = photoSpring;
		break;
		case "Summer":
			photoArray = photoSummer;
		break;
		case "Svadba":
			photoArray = photoSvadba;
		break;
		case "Sweets":
			photoArray = photoSweets;
		break;
		case "Toys":
			photoArray = photoToys;
		break;
		case "Winter":
			photoArray = photoWinter;
		break;
	  default:
		break;
}
	return photoArray;

}

function createImage(url, id)
{
    var imgEl = document.createElement("img");
	var attLink = document.createAttribute("src");
	var attID = document.createAttribute("id");
	var attDragable = document.createAttribute("draggable");
	var attAction = document.createAttribute("ondragstart");
	attLink.value = url;
	attID.value = "drag"+id;
	attDragable.value = "true";
	attAction.value = "drag(event)";
	imgEl.setAttributeNode(attLink);
	imgEl.setAttributeNode(attID);
	imgEl.setAttributeNode(attDragable);
	imgEl.setAttributeNode(attAction);
	return imgEl;
}
function createDiv()
{
    var imgEl = document.createElement("div");
	var attID = document.createAttribute("id");
	var attDragable = document.createAttribute("ondragover");
	var attAction = document.createAttribute("ondrop");
	attID.value = "ImageContainer";
	attDragable.value = "allowDrop(event)";
	attAction.value = "drop(event)";
	imgEl.setAttributeNode(attID);
	imgEl.setAttributeNode(attDragable);
	imgEl.setAttributeNode(attAction);
	return imgEl;
}
function generate_table() {
  // get the reference for the body
	var tblBody = document.getElementById("fcuk");
	while (tblBody.firstChild) {
    tblBody.removeChild(tblBody.firstChild);
}
    var row = document.createElement("tr");
	currentLenght == imgArray.length;
	if(prevLenght == currentLenght)
	{
		clearInterval(timer);
	}
	else
		prevLenght = currentLenght;
    for (var i = 0; i < imgArray.length; i++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
	  var newImg = createImage(imgArray[i], i);
	  var newDiv = createDiv();
      newDiv.appendChild(newImg);
      cell.appendChild(newDiv);
      row.appendChild(cell);
    }
 
    // add the row to the end of the table body
    tblBody.appendChild(row);
}