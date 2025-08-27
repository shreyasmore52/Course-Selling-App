const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.connect("mongodb+srv://Admin:HnOYcQYlUdcG5M8f@cluster0.ljyj4pf.mongodb.net/Course-App");

const userSchema = new Schema({
    email : { type: String , unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    email : { type: String , unique : true},
    password: String,
    firstName: String,
    lastName: String
})

const courseSchema = new Schema({
    title: { type : String , unique : true },
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const purchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
}) 

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel, 
    purchaseModel
}