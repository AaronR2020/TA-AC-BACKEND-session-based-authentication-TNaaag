bcrypt=require('bcrypt');
mongoose=require('mongoose');
Schema=mongoose.Schema;

articleSchema=new Schema({
    content:String,
    articleId:{type:Schema.Types.ObjectId,ref:'Article'}
},{timestamps:true}); 



module.exports=mongoose.model('Comment',userSchema)