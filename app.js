// npm init ,npm i body-parser express 
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")
// const date = require(__dirname+"/date.js")
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
//connecting to mongoose
mongoose.connect("mongodb+srv://bibin:mNwrsYFs6PCOmPQH@cluster0.sok5pnm.mongodb.net/?retryWrites=true&w=majority")
.then((data)=>{
    console.log(data);
    console.log("Connection success");
})
.catch((err)=>{
    console.log(err);
})

const itemSchema = {
    name:String
}

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
    name:"Welcome to todo list"
});

const item2 = new Item({
    name:"Hit the + button to add new item"
});

const item3 = new Item({
    name:"<-- Hit this to delete an item"
});

const defaultItems = [item1,item2,item3];

const listSchema = {
    name:String,
    items:[itemSchema]
};

const List = mongoose.model("List",listSchema);


//array for storing
let items = [];
let workItems = [];
//home page responses
app.get("/", function(req, res){
    // console.log(date.getDate());
    // let day=date.getDate();
    Item.find({})
    .then((foundItems)=>{
        console.log(foundItems);
        if(foundItems.length == 0){
            Item.insertMany(defaultItems)
            .then((check)=>{
                console.log("Addedd succesfully \n"+check);
            })
            .catch((err)=>{
                console.log(err);
            })
            res.redirect("/");
        }else{
        console.log(foundItems);
        res.render("list",{listTitle:"Today",listItem:foundItems});
    }})
    .catch((err)=>{
        console.log(err);
    }) 
    // res.render("list",{listTitle:"Today",listItem:items});
})
app.get("/:customListName", function (req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName })
        .then((data) => {
            if (data === null) {
                console.log("Not exist");
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                res.render("list", { listTitle: customListName, listItem: defaultItems})
                return list.save();
            }else{
                res.render("list", { listTitle: data.name, listItem: data.items });
            }
        })
        
        
        .catch((err) => {
            console.log(err);
            // res.status(500).send("Internal Server Error");
        });
});


//home page request
app.post("/",function(req,res){
    const itemName = req.body.newItem;
    const listName = req.body.list;
    console.log(listName);
    const item = new Item({
        name:itemName
    });
    if(listName === "Today"){
        item.save();
        res.redirect("/")
    }else{
        List.findOne({name:listName})
        .then((data)=>{
            if(data===null){
                console.log("data is"+data);
            }else{
                data.items.push(item);
                data.save();
            }
            console.log(data);
            // data.items.push(item);
            // data.save();
            res.redirect("/"+listName);
        })
        .catch((err)=>{
            console.log(err);
        }) 
    }

    

/*     if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item);
        console.log(req.body);

    console.log(item);
    res.redirect("/");
    } */
});

 app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    console.log(checkedItemId);
    console.log(listName);
    if(listName === "Today"){
    Item.findOneAndDelete({_id:checkedItemId})
    .then((data)=>{
       // console.log(data);
        console.log("Success");
        res.redirect("/");

    })
    .catch((err)=>{
        console.log(err);
    })}else{
        List.findOneAndUpdate({"name":listName},{$pull:{items:{"_id":checkedItemId}}})
        .then((data)=>{
        console.log(data);
        console.log("Success");
        res.redirect("/"+listName);
    })
        .catch((err)=>{
        console.log(err);
    })

    }
    
    
    
    
    

    
    
    
    
}) 
//ork page resopnse
/* app.get("/work",function(req,res){
    res.render("list",{listTitle:"work List",listItem:workItems});
})
//work page request
app.post("/work",function(req,res){
    let item = req.body.newItem;
    console.log(req.body);
    workItems.push(item);

    console.log(item);
    res.redirect("/");

    }) */

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000,function(){
    console.log("server is running in port 3000")
})
    /*let currentDay = today.getDay();
    let day = "";


    switch(currentDay){
        case 0:
            day="Sunday"
            break;
        case 1:
            day="Monday"
            break;
        case 2:
            day="Tuesday"
            break;
        case 3:
            day="Wednesday"
            break;
        case 4:
            day="Thursday"
            break;
        case 5:
            day="Friday"
            break;
        case 6:
            day="Saturday"
            break;
        default:
            console.log("Error");

        
    }
    res.render("list",{kindofDay: day});
    console.log(currentDay);
});*/



