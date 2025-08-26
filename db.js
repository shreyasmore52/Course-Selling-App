const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = Schema({
    email : { type: String , unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = Schema({
    email : { type: String , unique : true},
    password: String,
    firstName: String,
    lastName: String
})

const courseSchema = Schema({
    title: { type : String , unique : true },
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const purchaseSchema = Schema({
    courseId: ObjectId,
    userId: ObjectId
})

const userModel = mongoose.Model("users", userSchema);
const adminModel = mongoose.Model("admins", adminSchema);
const courseModel = mongoose.Model("courses", courseSchema);
const purchaseModel = mongoose.Model("purchases", purchaseSchema);

module.exports = {
    userModel : userModel,
    adminModel : adminModel,
    courseModel : courseModel, 
    purchaseModel : purchaseModel
}