const { error } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
// when use try to acess /files,,, i should retrurn the filesin it..

app.get('/files',(req,res)=>{
    let pathToFiles=path.join(__dirname,'./files/');
    fs.readdir(pathToFiles,(err,files)=>{
        if(err){
          return res.status(500).send("File not found");
        }
        else{
          res.status(200).json(files);
        }
    });
});

app.get('/file/:filename', (req, res) => {
  let filename = req.params.filename;
  let pathToFile = path.join(__dirname,'./files/', filename);

  fs.readFile(pathToFile, 'utf-8', (err, data) => {
      if (err) {
        return res.status(404).send("File not found");          
      }
      res.send(data);
  });
});

app.all('*', (req, res) => {
  res.status(404).send("Route not found");
});


app.listen(port, () => {
    //console.log(`Running on ${port}`);
});

module.exports = app;
