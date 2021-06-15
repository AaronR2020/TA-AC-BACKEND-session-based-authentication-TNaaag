bcrypt=require('bcrypt');
mongoose=require('mongoose');
Schema=mongoose.Schema;

userSchema=new Schema({
email:String,
password:String,
});

//hash password
userSchema.pre('save',function(next){
if(this.password)
{
bcrypt.hash(this.password,10,(err,hashValue)=>{
if(err) {
    console.log(err)
    return next(e);}
else{
this.password=hashValue;
console.log(this.email,"###=>",this.password);
return next();
}
});
}
else{ return next()}
});

//compare hashed password
userSchema.methods.verifyPassword=function(password,cb){
    bcrypt.compare(password,this.password,(err,result)=>{
        return cb(err,result);
    })
}
module.exports=mongoose.model('User',userSchema)