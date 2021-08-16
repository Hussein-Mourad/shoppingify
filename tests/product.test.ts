import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
// import Category from "../src/models/Category";
// import Product from "../src/models/Product";
import User from "../src/models/User";

chai.should();

chai.use(chaiHttp);

function withUserLoggedIn(
  route: string,
  data: Object,
  callback: (err: any, res: any) => void
) {
  const user = { username: "Hussein", password: "Hussein12345" };

  User.create(user).then(() => {
    chai
      .request(app)
      .post("/login/")
      .send(user)
      .end((err, res) => {
       chai
          .request(app)
          .post(route)
          .send(data)
          .end((err, res) => callback(err, res));
      });
  });
}

describe("/categories/", function () {
  describe("POST /logout", function () {
    it("should logout", function (done) {
      const user = {
        username: "Hussein",
        password: "Hussein1234",
      };
      User.create(user).then(() => {
        chai.request(app).post("/auth/login").send(user).end((err, res) => {
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
  })
  // beforeEach((done) => {
  //   User.deleteMany({}, done);
  //   Category.deleteMany({}, done);
  //   Product.deleteMany({}, done);
  // });

  // describe("POST /", function () {
  //   const route = "/categories/";

  //   it("should add a category", function (done) {
  //     chai.request(app).post("/categories/").send({name:"Fruits and vegetables"}).end((err,res)=>{
  //       if(err)return done(err);
  //       res.should.have.status(401);
  //       done();
  //     })
  //     // withUserLoggedIn(route, { name: "Fruits and vegetables" }, (err, res) => {
  //     //   if (err) return done(err);
  //     //   res.should.have.status(200);
  //     //   res.body.should.be.a("object");
  //     //   res.body.should.have.property("userId");
  //     //   res.body.should.have.property("name").eql("Fruits and vegetables");
  //     //   done();
  //     // });
  //   });

});
