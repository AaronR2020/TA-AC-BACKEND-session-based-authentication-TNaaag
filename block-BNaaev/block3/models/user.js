bcrypt=require('bcrypt');
mongoose=require('mongoose');
Schema=mongoose.Schema;
bcrypt=require('bcrypt');

userSchema=new Schema({
name:String,
email:String,
password:String,
age:Number,
phone:Number
});

userSchema.pre('save',function(next){
if(this.password)
{
bcrypt.hash(this.password,10,(err,hashValue)=>{
if(err) {
    console.log(err)
    return next(e);}
else{
this.password=hashValue;
console.log(this.name,"###=>",this.password);
return next();
}
});
}

else{ return next()}
});

module.exports=mongoose.model('User',userSchema)