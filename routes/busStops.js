const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
let Bus = require('../models/busses');
let busRoute = [];

router.get('/createRoute',(req,res) => {
  res.sendFile(path.join(__dirname + '/../src/mapAddRoutes.html'));
});

router.get('/getBusStops',(req,res) =>{
    console.log(req.param('busNumber'));
    Bus.find({number:req.param('busNumber')}, (err,stops) =>{
      if(err) throw err;
      if(stops){
        res.json(stops);
      }
    });
});
router.post('/createRoute',(req,res) =>{
  console.log(req.body);
  busRoute.push([JSON.parse(req.body.position).lat,JSON.parse(req.body.position).lng]);
  console.log(busRoute);
});
router.post('/generateRoute',(req,res) =>{
  console.log(busRoute);
  Bus.findOne({number:req.param('busNumber')}, function (err,bus){
    if(err) throw err;
    if(bus){
      Bus.findOneAndUpdate({number:req.param('busNumber')}, {$set:{route: busRoute}}, (err) => {
        if(err) throw err;
     })
    }else{
      var bus = new Bus({
        number: req.param('busNumber'),
        route : busRoute
      });
      bus.save(function (err) {
        if (err) return handleError(err);
      });
      console.log("new one added");
    }
    busRoute = [];
    res.send('Route Added');
  });
});

router.get('/resetRoute', (req,res) => {
  busRoute = [];
  res.send("reseted");
})

router.get('/addBusStop',(req,res) =>{
    console.log(req.param('busNumber'));
    var bus = new Bus({
      number: req.param('busNumber')
    });
    bus.save(function (err) {
      if (err) return handleError(err);
      res.send('it works');
    });
});

module.exports = router;