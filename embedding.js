const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.log('Could not connect to MongoDB...'));

   const authorSchema = new mongoose.Schema({
    name:String,
    bio:String,
    website:String
   });
const Author = mongoose.model('Author',authorSchema);

const Course = mongoose.model('Course',new mongoose.Schema({
    name:String,
    authors:[authorSchema]
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

   async function createCourse(name,authors){
    const course = new Course({
        name,
        authors
    });
    const result = await course.save();
    console.log(result);
   }

   async function updateCourse(courseId){
    const course = await Course.update({_id:courseId},{
        $unset:{
            'author':''
        }
    });
   }

   async function addAuthor(courseId,author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
   }

   async function removeAuthor(courseId,authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
   }

   async function listCourses(){
    let courses = await Course
      .find()
      .select('name author')
      .populate('author','name');
    console.log(courses);
   }

 //updateCourse('632c11cd40d3951368da2d37');
  //createAuthor('Muturi','my bio','my website');

 //createCourse('Node course',[new Author({name:'Muturi'}),new Author({name:'John'})]);
 //listCourses();
 removeAuthor('632c3e6ee27c5f09a4cdee2d','632c3f0015d2f01cf829ea0b');