import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import User from "../src/models/User";

chai.should();

chai.use(chaiHttp);

const appPost = (
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
  beforeEach((done) => {
    User.deleteMany({}, done);
  });
  describe("POST /signup", function () {
    const route = "/auth/signup";

    it("should fail to signup no data is provided", function (done) {
      appPost(
        route,
        {
          username: "",
          password: "",
        },
        (err, res) => {
          if (err) return done(err);
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have
            .property("username")
            .eql("Please enter a username");
          res.body.errors.should.have
            .property("password")
            .eql("Please enter a password");
          done();
        }
      );
    });

    it("should fail to signup as password is too short", function (done) {
      appPost(
        route,
        {
          username: "Hussein",
          password: "a",
        },
        (err, res) => {
          if (err) return done(err);
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("username").eql("");
          res.body.errors.should.have
            .property("password")
            .eql("Minimum length is 8 characters");
          done();
        }
      );
    });

    it("should fail to signup as password does not contain a number and uppercase", function (done) {
      appPost(
        route,
        {
          username: "Hussein",
          password: "randompassword",
        },
        (err, res) => {
          if (err) return done(err);
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("username").eql("");
          res.body.errors.should.have
            .property("password")
            .eql(
              "Password must contain at least one uppercase, and one number"
            );
          done();
        }
      );
    });

    it("should signup successfully", function (done) {
      appPost(
        route,
        {
          username: "Hussein",
          password: "Hussein1234",
        },
        (err, res) => {
          if (err) return done(err);
          res.should.have.status(201);
          res.should.have.cookie("jwt");
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("username").eql("Hussein");
          done();
        }
      );
    });

    it("should fail to signup as user is already taken", function (done) {
      const user = {
        username: "Hussein",
        password: "Hussein1234",
      };
      User.create(user).then(() => {
        appPost(route, user, (err, res) => {
          if (err) return done(err);
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have
            .property("username")
            .eql("Username is already taken.");
          res.body.errors.should.have.property("password").eql("");
          done();
        });
      });
    });
  });

  describe("POST /login", function () {
    const route = "/auth/login";
    it("should login successfully", function (done) {
      const user = {
        username: "Hussein",
        password: "Hussein1234",
      };
      User.create(user).then(() => {
        appPost(route, user, (err, res) => {
          if (err) return done(err);
          res.should.have.status(201);
          res.should.have.cookie("jwt");
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("username").eql("Hussein");
          done();
        });
      });
    });

    it("should fail to login", function (done) {
      appPost(
        route,
        {
          username: "Hussein34",
          password: "Hussein124434",
        },
        (err, res) => {
          if (err) return done(err);
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have
            .property("error")
            .eql("Invalid username and/or password");
          done();
        }
      );
    });
  });

  describe("POST /logout", function () {
    it("should logout", function (done) {
      const user = {
        username: "Hussein",
        password: "Hussein1234",
      };
      User.create(user).then(() => {
        appPost("/auth/login", user, (err, res) => {
          if (err) return done(err);
          return chai
            .request(app)
            .post("/auth/logout")
            .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(200);
              res.should.not.have.cookie("jwt");
              res.body.should.be.eql("Logout successfully");
              done();
            });
        });
      });
    });
  });

  describe("POST /", function () {
    it("should be logged in");

    it("should not be signed in", function (done) {
      appPost("/auth/", {}, (err, res) => {
        if (err) return done(err);
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("user").eql(null);
        done();
      });
    });
  });
});
