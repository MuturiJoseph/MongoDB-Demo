const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.log('Could not connect to MongoDB...',err));

   const courseSchema = new mongoose.Schema({
      name:{type:String,required:true},
      author:String,
      tags:{
        type:Array,
        validate:{
            validator:function(v){
             return v && v.length > 0;
            },
            message:'A course should atleast have one tag'
        }
      },
      price:Number,
      category:{
        type:String,
        required:true,
        enum:['web','mobile','network']
      },
      date:{type:Date,default:Date.now},
      isPublished:Boolean
   });

   const Course = mongoose.model('Course',courseSchema);
async function createCourse(){
    const course = new Course({
        name:'c# Course',
        author:'Muturi',
        tags:null,
        category:'-',
        price:20,
        isPublished:true
    });
    try{
       // await course.validate();
        const result = await course.save();
        console.log(result);
    }
    catch(ex){
        for(field in ex.errors)
        console.log(ex.errors[field].message);
    }
}
createCourse();

async function getCourses() {
    const course = await Course
      .find({price:{$gt:40,$lte:50}})
      .limit(10)
      .sort({name:1})
      .select({name:1,tags:1})
      .count();
    console.log(course);
}

async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author:'muturi',
            isPublished:false
        }},
        {new:true}
        );

    console.log(course);
}

async function removeCourse(id){
  //const result = await Course.deleteOne({_id:id});
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
//removeCourse('631ed8494e91c90378b5f9f3');
