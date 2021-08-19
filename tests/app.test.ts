import { beforeEach } from "mocha";
import Category from "../src/models/Category";
import Product from "../src/models/Product";
import User from "../src/models/User";
import chai, { app, expect } from "./common";

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

function withUserLoggedIn(
  callback: (
    agent: ChaiHttp.Agent,
    user?: { username: string; password: string }
  ) => void
) {
  const agent = chai.request.agent(app);
  const user = { username: "Hussein", password: "Hussein12345" };

  User.create(user).then(() => {
    agent
      .post("/api/auth/login/")
      .send(user)
      .end((err, res) => {
        res.should.have.cookie("jwt");
        res.should.have.status(201);
        return callback(agent);
      });
  });
}

describe("/api/auth/", function () {
  beforeEach((done) => {
    User.deleteMany({}, done);
  });

  describe("POST /signup", function () {
    const route = "/api/auth/signup";

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
              "Password must contain at least one uppercase, one lowercase, and one number"
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
    const route = "/api/auth/login";
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
            .property("message")
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
        appPost("/api/auth/login", user, (err, res) => {
          if (err) return done(err);
          return chai
            .request(app)
            .post("/api/auth/logout")
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
    const route = "/api/auth/";
    it("should be logged in", function (done) {
      withUserLoggedIn((agent) => {
        agent.post(route).end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object").have.property("user");
          expect(res.body.user).to.have.property("username");
          done();
        });
      });
    });

    it("should not be signed in", function (done) {
      appPost(route, {}, (err, res) => {
        if (err) return done(err);
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("user").eql(null);
        done();
      });
    });
  });
});

describe("/api/categories/", function () {
  const route = "/api/categories/";

  beforeEach((done) => {
    User.deleteMany({}).then(()=>{
      Category.deleteMany({},done)
    })
  });

  describe("POST /", function () {
    it("should add a category", function (done) {
      withUserLoggedIn((agent) => {
        agent
          .post(route)
          .send({ name: "Fruits and vegetables" })
          .end((err, res) => {
            if (err) return done(err);
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.have.property("category");
            expect(res.body.category)
              .to.have.property("name")
              .eql("Fruits and vegetables");
            expect(res.body.category).to.have.property("userId");
            done();
          });
      });
    });
  });

  describe("GET /", function () {
    it("should get all categories", function (done) {
      withUserLoggedIn((agent) => {
        agent
          .post(route)
          .send({ name: "Fruits and vegetables" })
          .end((err, res) => {
            if (err) return done(err);
            agent.get(route).end((err, res) => {
              if (err) return done(err);
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("categories").to.be.an("array");
              expect(res.body.categories.length).to.be.eql(1);
              done();
            });
          });
      });
    });
  });

  describe("GET /:id", function () {
    it("should get one category by id", function (done) {
      withUserLoggedIn((agent) => {
        agent
          .post(route)
          .send({ name: "Fruits and vegetables" })
          .end((err, res) => {
            if (err) return done(err);
            agent.get(route + res.body.category._id).end((err, res) => {
              if (err) return done(err);
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("category").to.be.an("object");
              expect(res.body.category)
                .to.have.property("name")
                .eql("Fruits and vegetables");
              done();
            });
          });
      });
    });
  });

});


describe("/api/products/", function () {
  const route = "/api/products/";

  beforeEach((done) => {
    User.deleteMany({}).then(()=>{
      Category.deleteMany({}).then(()=>{
        Product.deleteMany({},done);
      });
    })
    });

  describe("POST /", function () {
    it("should add a product", function (done) {
      withUserLoggedIn((agent) => {
        agent
          .post("/api/categories/")
          .send({ name: "Fruits and vegetables" })
          .end((err, res) => {
            expect(res.body).to.have.property("category")
            const categoryId=res.body.category._id
            agent.post(route).send({
              name:"Avocado",
              imageUrl:"https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2Fkb3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              description:"This is an avodaco",
              category:categoryId
            }).end((err,res)=>{
              if(err)done(err)
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object").to.have.property("product");
              expect(res.body.product).to.be.an("object").to.have.property("name").equal("Avocado");
              expect(res.body.product).to.have.property("description").equal("This is an avocado")
             expect(res.body.product).to.have.property('imageUrl');
             expect(res.body.product).to.have.property("category").to.have.property("_id").eql(categoryId) 
            })
          });
      });
    });
  });

  describe("GET /", function () {
    it("should get all categories", function (done) {
      withUserLoggedIn((agent) => {
        agent
          .post(route)
          .send({ name: "Fruits and vegetables" })
          .end((err, res) => {
            if (err) return done(err);
            agent.get(route).end((err, res) => {
              if (err) return done(err);
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("categories").to.be.an("array");
              expect(res.body.categories.length).to.be.eql(1);
              done();
            });
          });
      });
    });
  });

  describe("GET /:id", function () {
    it("should get all categories", function (done) {
      withUserLoggedIn((agent) => {
        agent
          .post(route)
          .send({ name: "Fruits and vegetables" })
          .end((err, res) => {
            if (err) return done(err);
            agent.get(route + res.body.category._id).end((err, res) => {
              if (err) return done(err);
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("category").to.be.an("object");
              expect(res.body.category)
                .to.have.property("name")
                .eql("Fruits and vegetables");
              done();
            });
          });
      });
    });
  });
  
});
