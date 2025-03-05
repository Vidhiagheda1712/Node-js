const express = require('express');

const port = 9000;
const app = express();

const cors =require('cors');
app.use(cors());
app.get('/users',(req,res)=>{
    return res.status(200).send({
        Message :"My First API",
        success:true,
        users:[
            {
                ID:1,
                Name:"Vidhi",
                Email:"v123@gmail.com",
                Phone:"9856474578",
                City:"Surat",
                Country:"India",
                Role:"Full Stack Developer",
              

            },
            {
                ID:2,
                Name:"Ayushi",
                Email:"a123@gmail.com",
                Phone:"5654897562",
                City:"Surat",
                Country:"India",
                Role:"Full Stack Developer"

            },
            {
                ID:3,
                Name:"Krisha",
                Email:"k123@gmail.com",
                Phone:"5698745689",
                City:"Surat",
                Country:"India",
                Role:"Graphic Designer"

            },
            {
                ID:4,
                Name:"Janavi",
                Email:"j123@gmail.com",
                Phone:"5674123895",
                City:"Surat",
                Country:"India",
                Role:"ui/ux Designer"

            }
        ]
    })
    
})
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is Start on port :- ${port}`);
    

})