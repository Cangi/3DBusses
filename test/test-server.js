var expect  = require('chai').expect;
var request = require('request');


it('Main page front end', function(done) {
    request('http://localhost:3000/' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Main page content front end', function(done) {
    request('http://localhost:3000/' , function(error, response, body) {
        expect(body).to.exist;
        done();
    });
});

it('Add route front end', function(done) {
    request('http://localhost:3000/createRoute' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Add route content front end', function(done) {
    request('http://localhost:3000/createRoute' , function(error, response, body) {
        expect(body).to.exist;
        done();
    });
});

it('Get bus stop route for no bus', function(done) {
    request('http://localhost:3000/getBusStops' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
        done();
    });
});

it('Get bus stop route for bus 1', function(done) {
    request('http://localhost:3000/getBusStops?busNumber=1' , function(error, response, body) {
        expect(response.statusCode).equal(200);
        done();
    });
});

it('Reset bus route', function(done) {
    request('http://localhost:3000/resetRoute' , function(error, response, body) {
        expect(response.statusCode).equal(200);
        done();
    });
});
