const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index");
const query = require("../db/customers");
const should = chai.should();
const expect = chai.expect;

chai.use(chaihttp);

const testCustomer = {
  firstname: "Jackie",
  lastname: "Chan",
  email: "jackychan@mail.fi",
  phone: "0451234567",
};

describe("/POST customers", () => {
  beforeEach((done) => {
    query.deleteAllCustomers();
    done();
  });

  it("Add new customer", (done) => {
    chai
      .request(app)
      .post("/api/customers")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(testCustomer))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("firstname");
        res.body.should.have.property("lastname");
        res.body.should.have.property("email");
        res.body.should.have.property("phone");
        done();
      });
  });
});

describe("/GET customers", () => {
    it("Fetch all customers", (done) => {
      chai
        .request(app)
        .post("/api/customers")
        .set("Content-Type", "application/json")
        .send(JSON.stringify(testCustomer))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("firstname").with.equal("Jackie");
          res.body.should.have.property("lastname").with.equal("Chan");
          res.body.should.have.property("email").with.equal("jackychan@mail.fi");
          res.body.should.have.property("phone").with.equal("0451234567");
          done();
        });
    });
  });