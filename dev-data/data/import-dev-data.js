const dotenv = require('dotenv');
const app = require('../../app');
const Tour = require('../../models/tourModels');
const User= require('../')
const fs= require('fs')
const { default: mongoose } = require('mongoose');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((conn) => {
  console.log('Database Connected');
});

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'))


//import
const importData= async()=>{
    try{
        await Tour.create(tours)
        console.log('Data successfully loaded')
    }catch(err){
        console.log(err)
    }
    process.exit()
}
 //deleteAllData
 const deleteData=async()=>{
    try{
        await Tour.deleteMany({})
        console.log("Database Deleted")
        
    }catch(err){
        console.log(err)
    }
    process.exit()
 }

if(process.argv[2]=="--import"){
    importData()
}else if(process.argv[2]=="--delete"){
    deleteData()
}

console.log(process.argv)