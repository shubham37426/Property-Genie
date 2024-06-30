import mongoose from "mongoose";
let connected = false
const connectDb = async() => {
mongoose.set('strictQuery', true);
if(connected){
    console.log('MongoDb already Connected');
    return;
}
try{
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true
    console.log('MongoDb connected',connected)
}catch (error){
    console.log(error)
}
}
export default connectDb