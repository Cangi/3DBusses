const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
let Bus = require('../models/busses');

router.get('/getBusStops',(req,res) =>{
    console.log(req.param('busNumber'));
    Bus.find({number:req.param('busNumber')}, (err,stops) =>{
      if(err) throw err;
      if(stops){
        res.json(stops);
      }
    });
});

router.post('/addBusStop',(req,res) =>{
    console.log(req.param('busNumber'));
    Bus.find({number:req.param('busNumber')}, (err,stops) =>{
      if(err) throw err;
      if(stops){
        res.json(stops);
      }
    });
});

module.exports = router;