var chai = require('chai'), chaiHttp = require('chai-http');
var should = require('chai').should()

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check if all courses are being returned", function(done){
    chai.request('http://127.0.0.1:8000')
    .get('/api/getAllCourses')
    .end(function(err, res) {
        should.not.exist(err)
        should.exist(res.body);
        done();
    });
})

it("Should check if profile is being returned", function(done){
    chai.request('http://127.0.0.1:8000')
    .get('/api/getProfile/0987')
    .end(function(err, res) {
        should.not.exist(err)
        should.exist(res.body);
        done();
    });
})

it("Should check if all user courses are being returned", function(done){
    chai.request('http://127.0.0.1:8000')
    .get('/api/getCourseDetails/0987')
    .end(function(err, res) {
        should.not.exist(err)
        should.exist(res.body);
        done();
    });
})

it("Should check if signup for new user is successful", function(done){
    chai.request('http://127.0.0.1:8000')
    .post('/api/signup')
    .send({user_id: "0789", name: "Rachel Greene", email: "r.greene@gmail.com", password: "Iambeautiful"})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should check if signup for existing user is unsuccessful", function(done){
    chai.request('http://127.0.0.1:8000')
    .post('/api/signup')
    .send({user_id: "0789", name: "Rachel Greene", email: "r.greene@gmail.com", password: "Iambeautiful"})
    .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
    });
})