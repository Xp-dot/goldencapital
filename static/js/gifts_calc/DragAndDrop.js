var PRICE_TITLE = 'price';
var NAME_TITLE = 'name';
var SquareDict = {};
var GIFT_ORDER_PREFIX_ID = "gift_name";
var TOTAL_PRICE_ID = "total_price";
var total_price = 0;

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
    var price = get_value(PRICE_TITLE,data);
    var name = get_value(NAME_TITLE, data);
    var indexes = [];
    nodeCopy.id = "newId"+randID; /* We cannot use the same ID */
    var target;
    if (ev.target.tagName == "DIV")
        {
            target = ev.target;
            update_UI(nodeCopy, target, '', name, price);
        }
        else
        {
            target = ev.target.parentNode;
            update_UI(nodeCopy, target, 'replace', name, price);
        }
    console.log("data id : " + data + "; price : "+ price + "; name :" + name);
}

function get_indexes(target)
{
  var indexes = target.split("_");
  indexes.shift();
  return indexes;
}

function get_value(base, target)
{
    var _val;
    //Checking if image was taken from bottom table
    var elem = document.getElementById(target+"_" + base);
    if(elem)
    {
      _val = document.getElementById(target+"_"+ base).getAttribute(base);
    }
    else// was taken from square grid
    {
        var grid_id = document.getElementById(target).parentElement.id;
        var indexes = get_indexes(grid_id);
        _val = get_val_from_DOM(base,indexes);
    }
    return _val;
}

function set_val_to_DOM(id_prefix, indexes, newValue)
{
    var elem_id = [id_prefix].concat(indexes).join("_");
    document.getElementById(elem_id).setAttribute(id_prefix, newValue);
    console.log('value was setted for ' + id_prefix + indexes + " as " + newValue);
}

function get_val_from_DOM(id_prefix, indexes)
{
    var elem_id = [id_prefix].concat(indexes).join("_");
    console.log('get value element id is ' + elem_id);
    var ret_val = document.getElementById(elem_id).getAttribute(id_prefix);
    console.log('ret_val for ' + id_prefix + indexes + " is " + ret_val);
    return ret_val;
}

function update_UI(nodeCopy, target, mode, name, price)
{
    indexes = get_indexes(target.getAttribute('id'));
    if(mode == 'replace')
    {
        total_price -= parseInt(get_val_from_DOM(PRICE_TITLE,indexes));
        target.replaceChild(nodeCopy, target.childNodes[0]);
    }
    else
    {
        target.appendChild(nodeCopy);
    }
    set_val_to_DOM(PRICE_TITLE, indexes, price);
    set_val_to_DOM(NAME_TITLE, indexes, name);
    total_price += parseInt(price);

    document.getElementById(TOTAL_PRICE_ID).innerHTML = total_price + " маф.";

    var transpose_indexes = transpose(indexes);

    var elem_id = [GIFT_ORDER_PREFIX_ID].concat(transpose_indexes).join("_");
	console.log(elem_id);
    document.getElementById(elem_id).innerHTML = name;
}


function transpose(indx)
{
    if(indx[0] == 1)
        indx[0] = 3;
    else if(indx[0] == 3)
        indx[0] = 1;
    if(indx[1] == 1)
        indx[1] = 3;
    else if(indx[1] == 3)
        indx[1] = 1;
    return indx;
}

