import mongoose from "mongoose";
mongoose.Promise = global.Promise ;
mongoose.set('strictQuery', false);

const uri = 'mongodb://127.0.0.1:27017/';
const url1 = 'mongodb+srv://moniskhan:8871668385@aviate.y788kqb.mongodb.net/'
export const connectDb = async () =>{
     const ans = await mongoose
     .connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected...' ))
     .catch(err => console.log( err ));
}