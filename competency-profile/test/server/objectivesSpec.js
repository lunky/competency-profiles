var should = require('chai').should(),
    supertest = require('supertest');
	var assert = require('assert');
	var app = require('../../server');
	var server = supertest.agent(app);

describe("IntegrationTest: objectives", function(){
	beforeEach(function(){ app.set('env', 'development'); });
	before(function(done){ loginUser(done); });
	it("should run a test", function(){
		assert.ok(true);
		});
	it("should respond to /objectives/list", function(done){
		server 
			.get('/api/objectives')
			.expect('content-type', /application\/json/) 
			.expect(200)
			.end(function(err, res){
			if (err) return done(err);
 			return done(); 
		});
	});
	it("should spit out some nice json", function(done){
		server 
			.get('/api/objectives') 
			.expect(200)  
			.end(function(err, res){
				if (err) { 
					return done(err);
				} 
				res.body.should.have.property("data");
				res.body.data.should.have.length(49);
				done(); 
			});
	});
});

function loginUser(done) {
        server
            .post('/login')
            .send({ username: 'admin', password: 'admin' })
            .expect(302)
            .expect('Location', '/')
            .end(onResponse);

        function onResponse(err, res) {
			if (err) {
				throw err;
				return done(err);
			}
			return done();
		};
};
