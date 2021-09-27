
var app = new Vue({
    el: "#app",
    data: {
        msg: "hejhej",
        maincontroller: 0,
        subcontroller: 0,
        cartlength: 0,
        selecteditem: 0,
        visa: true
    },
    mounted() {
        this.$nextTick(() => { this.loadedul(); });

    },
    watch: {

    },
    methods: {
        togglacontroller: function (newname) {
            this.msg = newname;
            this.maincontroller = newname;
            this.subcontroller = 0;
        },
        setsubcontroller: function (val) {
            this.subcontroller = val;

        },
        loadedul: function () {
            // updatecart()

        }
    },
})
// knappen som byter huvudmeny
function toggla(buttoninfo) {
    app.selecteditem = 0
    app.togglacontroller(buttoninfo.innerHTML)
    console.log(products)

}
//sätter undermenyer
function setsubcontroller(val) {
    console.log("hehe")

    app.setsubcontroller(val)
    createlistitems(val - 1)
}
async function firstpage() {
    await new Promise(r => setTimeout(r, 100))

    var see = document.getElementById("pul2")


    var listitem1 = createlistitem(products.type[0].products[0])
    var listitem2 = createlistitem(products.type[1].products[0])
    var listitem3 = createlistitem(products.type[2].products[0])

    see.appendChild(listitem1)
    see.appendChild(listitem2)
    see.appendChild(listitem3)
     getvisa(
         listitem1
     )
     getvisa(
         listitem2
     )
     getvisa(
         listitem3
     )

}
async function getvisa(listitem) {
    await new Promise(r => setTimeout(r, 100))
    var children = listitem.childNodes

    for (i = 0; i < children.length; i++) {
        console.log(children[i].innerHTML)
        if (children[i].innerHTML == "visa") {

           listitem.removeChild(children[i])
        }

    }
    
}
// skapar varje listitem
function createlistitem(json) {

    //    console.log(json)


    var url = json.src
    var name = json.name

    var listitem = document.createElement("li");
    listitem.className = " listitem";
    listitem.setAttribute("json", JSON.stringify(json))
    var image = document.createElement("img");
    var header = document.createElement("h1");

    var h2 = document.createElement("h2")
    var button = document.createElement("button")
    button.innerHTML = "Köp";
    var button2 = document.createElement("button")
    button2.innerHTML = "visa";
    // för att visa mer information
    button2.addEventListener("click", function () {
        var json = this.parentElement.getAttribute("json")
        var obj = JSON.parse(json)
        selecteditem(obj)


    })
    // knappen för att lägga till i varukorgen
    button.addEventListener("click", function () {
        var json = this.parentElement.getAttribute("json")
        var obj = JSON.parse(json)
        varukorg.totalprice += obj.price
        varukorg.products.push(obj)
        console.log(varukorg)
        app.cartlength += 1;

    });

    image.src = url;
    header.innerHTML = name;

    listitem.appendChild(header);
    listitem.appendChild(image);

    h2.innerHTML = json.price;
    listitem.appendChild(h2);
    listitem.appendChild(button);
    listitem.appendChild(button2)


    return listitem;


}

// skapar ul, kallar på createlistitem funktionen
async function createlistitems(index) {
    await new Promise(r => setTimeout(r, 100))
    console.log("kakak")
    jsonResponse = products;
    console.log(jsonResponse)
    var pd = jsonResponse.type[index].products;
    var ul = document.getElementById("pul")
    ul.innerHTML = "";
    for (i = 0; i < pd.length; i++) {
        ul.appendChild(createlistitem(pd[i]));

    }



}

// skapar upp varukorgen
var varukorg = {
    products: [],
    totalprice: 0
};
// skapar datastrukturen för att hålla i köpta föremål
let products
fetch("products.json")
    .then(function (resp) {
        return resp.json()
    }).then(function (json) {
        products = json;
        console.log(json)
        console.log(products)
    })

function openNav() {
    document.getElementById("mysidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mysidenav").style.width = "0";
}

// funktionen för att lägga in objekt i kundvagnen
function addtocart(obj) {
    console.log(obj.parentElement)
    varukorg.products.push(obj.parentElement.getAttribute("json"))
    console.log(varukorg)


}
// skapar html elemnten för att visas i kundvagnen
function createcartitem(json) {
    var url = json.src
    var name = json.name

    var listitem = document.createElement("li");
    listitem.className = " listitem";
    listitem.setAttribute("json", JSON.stringify(json))
    var image = document.createElement("img");
    var header = document.createElement("h1");

    var h2 = document.createElement("h2")
    var button = document.createElement("button")
    button.innerHTML = "ta bort från varukorgen";
    // för att ta bort från varukorgen
    button.addEventListener("click", function () {
        var json = this.parentElement.getAttribute("json")
        var obj = JSON.parse(json)
        removefromcart(obj)
        updatecart()


    });

    image.src = url;
    header.innerHTML = name;

    listitem.appendChild(header);
    listitem.appendChild(image);

    h2.innerHTML = json.price;
    listitem.appendChild(h2);
    listitem.appendChild(button);



    return listitem;
}
// funktionen för att  uppdatera kundvagnens ul
async function updatecart(object) {
    await new Promise(r => setTimeout(r, 100))

    // var ul = document.getElementById("varu");
    var ul = document.getElementById("varuk")
    console.log(ul)
    ul.innerHTML = "";

    for (i = 0; i < varukorg.products.length; i++) {
        var li = createcartitem(varukorg.products[i])

        ul.appendChild(li)
    }


}
// ta bort från kundvagnen
function removefromcart(name) {
    var ind
    for (i = 0; i < varukorg.products.length; i++) {

        var product = varukorg.products[i]
        console.log(product.name + "," + name)
        if (product.name == name.name) {
            ind = i
            break

        }
    }
    if (ind != null) {
        varukorg.totalprice -= varukorg.products[ind].price
        varukorg.products.splice(ind, 1)
        app.cartlength -= 1;
    }
    console.log(varukorg)
}
// uppdaterar så att priserna slås ihop
function updateprice() {
    var shiping = document.getElementById("select")
    var total = varukorg.totalprice + parseInt(shiping.options[shiping.selectedIndex].value)
    var tot = document.getElementById("total")
    tot.innerHTML = total + " kr";
}

// skickar min skapade listitems till sin egen div med lite extra info
async function selecteditem(obj) {
    app.selecteditem = 1;
    await new Promise(r => setTimeout(r, 100))
    console.log(JSON.stringify(obj))

    var div = document.getElementById("productinfo")
    var info = document.getElementById("info")
    div.appendChild(info)
    info.value = JSON.stringify(obj)
    var image = document.createElement("img");
    var header = document.createElement("h1");
    var p = document.createElement("p");
    var h2 = document.createElement("h2")
    var button = document.createElement("button")
    var button2 = document.createElement("button")
    button2.innerHTML = "Köp";
    button.innerHTML = "go back"
    button.addEventListener("click", function () {
        unselectitem()

    })
    image.src = obj.src;

    header.innerHTML = obj.name;
    p.innerHTML = obj.desc
    h2.innerHTML = obj.price;
    button2.addEventListener("click", function () {

        var json = document.getElementById("info").getAttribute("value")
        var obj = JSON.parse(json)
        varukorg.totalprice += obj.price
        varukorg.products.push(obj)
        console.log(varukorg)
        app.cartlength += 1;

    });
    div.appendChild(header);
    div.appendChild(image);
    div.appendChild(p);
    h2.innerHTML = obj.price;
    div.appendChild(h2);
    div.appendChild(button);
    div.appendChild(button2)
}
// unselectar ett item, annars blir jag låst i viewn
function unselectitem() {
    app.selecteditem = 0;
}
// skapar upp nya items i admin sidan
function createnewitem() {
    console.log(products)

    var shiping = document.getElementById("val");

    var total = parseInt(shiping.options[shiping.selectedIndex].value)

    var besk = document.getElementById("besk").value
    var namn = document.getElementById("namn").value
    var pris = document.getElementById("pris").value
    var bild = document.getElementById("bild").value


    var item = {
        desc: besk,
        name: namn,
        price: pris,
        src: bild


    }
    console.log(typeof products.type[total])
    console.log(products.type[total].products)

    products.type[total].products.push(item)

}
















