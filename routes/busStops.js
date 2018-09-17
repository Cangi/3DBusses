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
    if(req.param('busNumber') === undefined){
      res.status(400);
      res.send("Bus number not specified");
    }else{
    Bus.find({number:req.param('busNumber')}, (err,stops) =>{
      if(err) throw err;
      if(stops){
        res.status(200);
        res.json(stops);
      }
    });
  }
});
router.post('/createRoute',(req,res) =>{
  busRoute.push([JSON.parse(req.body.position).lat,JSON.parse(req.body.position).lng]);
});
router.post('/generateRoute',(req,res) =>{
  if(req.param('busNumber') === undefined){
    res.status(400);
    res.send("Bus number not specified")
  }else{
    Bus.findOne({number:req.param('busNumber')}, function (err,bus){
      if(err) throw err;
      if(bus){
        Bus.findOneAndUpdate({number:req.param('busNumber')}, {$set:{route: busRoute}}, (err) => {
          if(err){
            throw err;
          }
         })
      }else{
        var bus = new Bus({
          number: req.param('busNumber'),
          route : busRoute
        });
        bus.save(function (err) {
          if (err){
            return handleError(err);
          }
        });
      }
      busRoute = [];
      res.status(200)
      res.send('Route Added');
    });
  }
});

router.get('/resetRoute', (req,res) => {
  busRoute = [];
  res.send("Reseted");
})

router.get('/addBusStop',(req,res) =>{
    if(req.param('busNumber') === undefined){
      res.status(400);
      res.send("Bus number not specified")
    }else{
      var bus = new Bus({
        number: req.param('busNumber')
      });
      bus.save(function (err) {
        if (err) return handleError(err);
        res.status(200);
        res.send('Bus added');
      });
    }
});

module.exports = router;