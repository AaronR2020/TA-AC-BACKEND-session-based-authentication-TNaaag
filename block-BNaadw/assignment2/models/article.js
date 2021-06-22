const { Schema } = require('mongoose');
bcrypt=require('bcrypt');


articleSchema=new Schema({
    title:String,
    description:String,
    likes:{type:Number},
    commemnts:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }],
    author:String, 
},{timestamps:true}); 



module.exports=mongoose.model('Article',userSchema)