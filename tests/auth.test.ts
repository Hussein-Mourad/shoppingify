process.env.NODE_ENV = "test";
// process.env.DB_URI = process.env.DB_TEST_URI;

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

chai.should();

chai.use(chaiHttp);

const testApp = (
  route: string,
  data: Object,
  callback: (err: any, res: any) => void
) => {
  chai
    .request(app)
    .post(route)
    .send(data)
    .end((err, res) => callback(err, res));
};

describe("/auth/", function () {
  describe("/POST /signup", function () {
    const route = "/auth/signup";
    // before((done) => {
    //   User.deleteMany({}, (err) => {
    //     done();
    //   });
    // });

    it("should fail", function () {
      const a = true;
      a.should.be.equal(true);
      a.should.be.equal(false);
    });

    it("should fail to signup no data is provided", function (done) {
      testApp(
        route,
        {
          username: "",
          password: "",
        },
        (err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have
            .property("username")
            .eql("Please enter a username");
          res.body.errors.should.have
            .property("password")
            .eql("Please enter a password");
        }
      );
      done();
    });

    it("should fail to signup as password is too short", function (done) {
      testApp(
        route,
        {
          username: "Hussein",
          password: "a",
        },
        (err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("username").eql("");
          res.body.errors.should.have
            .property("password")
            .eql("Minimum length is 8 characters");
        }
      );
      done();
    });

    it("should fail to signup as password does not contain a number and uppercase", function (done) {
      testApp(
        route,
        {
          username: "Hussein",
          password: "randompassword",
        },
        (err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("username").eql("");
          res.body.errors.should.have
            .property("password")
            .eql(
              "Password must contain at least one uppercase, and one number"
            );
        }
      );
      done();
    });

    it("should signup successfully", function (done) {
      testApp(
        route,
        {
          username: "Hussein",
          password: "Hussein1234",
        },
        (err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("username").eql("Hussein");
        }
      );
      done();
    });

    it("should fail to signup as user is already taken", function (done) {
      testApp(
        route,
        {
          username: "Hussein",
          password: "Hussein1234",
        },
        (err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have
            .property("username")
            .eql("Username is already taken.");
          res.body.errors.should.have
            .property("error")
            .eql("Username is already taken.");
        }
      );
      done();
    });
  });

  describe("/POST /login", function () {
    const route = "/auth/login";
    it("should login successfully", function (done) {
      testApp(
        route,
        {
          username: "Hussein",
          password: "Hussein1234",
        },
        (err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("username").eql("Hussein");
        }
      );
      done();
    });

    it("should fail to login", function (done) {
      testApp(
        route,
        {
          username: "Hussein",
          password: "Hussein1234",
        },
        (err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have
            .property("error")
            .eql("Invalid username and/or password");
        }
      );
      done();
    });
  });
});
