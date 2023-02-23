import mongoose from "mongoose";
const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model("Kitten",kittySchema);


const silence = new Kitten({name: "Silence"});
console.log(silence.name)





