import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

chai.use(chaiHttp);

chai.should();
const expect = chai.expect;

export default chai;
export { app, expect };
