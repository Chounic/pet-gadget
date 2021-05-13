const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://' + 'HakimChouioukh:Boulogne92i' + '@newcluster.dpw3j.mongodb.net/tajineProject', 
{
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
    useCreateIndex: true,  
    useFindAndModify: false   
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log("Failed to connect to MongoDB", err));

