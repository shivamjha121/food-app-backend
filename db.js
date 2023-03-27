const mongoose = require('mongoose');
const uri = "mongodb+srv://foodapp:foodapp%40123@cluster0.r8driyc.mongodb.net/foodapp?retryWrites=true&w=majority"

async function db() {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((result) => {
        console.log('MongoDB Connected');

    })
        .catch((err) => {
            console.log('MongoDB Connection Error: ' + err);
        });

    //Read The Collection Data//
    const food_Items = mongoose.connection.collection('food_items');

    food_Items.find({}).toArray((err, food) => {
    }).then((data) => {
       
        global.food_items=data;
        // console.log( global.food_Items)


    }).catch((err) => {
        console.log(err);

    });

    const foodcategory = await mongoose.connection.collection('foodCategory');
    foodcategory.find({}).toArray((err, data) => {
        // if (err) {
        //     console.log(err)
            
        // } else {
        //     console.log(data)
            
        // }
    }).then((data)=>{
    //   console.log(data)
      global.foodcategory=data;
    })
} 


module.exports = db;