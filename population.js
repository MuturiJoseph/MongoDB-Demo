const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.log('Could not connect to MongoDB...'));

   const Author = mongoose.model('Author',new mongoose.Schema({
    name:String,
    bio:String,
    website:String
   }));

   const Course = mongoose.model('Course',new mongoose.Schema({
    name:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author'
    }
   }));


   async function createAuthor(name,bio,website){
    const author = new Author({
        name,
        bio,
        website
    });
    const result = await author.save();
    console.log(result);
   }

   async function createCourse(name,author){
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
    console.log(result);
   }

   async function listCourses(){
    let courses = await Course
      .find()
      .select('name author')
      .populate('author','name');
    console.log(courses);
   }

   //createAuthor('Muturi','my bio','my website');

   //createCourse('Node course','632af76c03439300fc866958');

   listCourses();