const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
    First_Name: String,
    Last_Name: String,
    Email: String,
    Department: { type: String, enum: ["Tech", "Marketing", "Operations"], default: "Tech" },
    Salary: Number
}, {
    versionKey: false
});

const PostModel=mongoose.model("employ",postSchema)

module.exports={
    PostModel
}