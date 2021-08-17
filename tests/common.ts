import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

chai.use(chaiHttp);

chai.should();

export default chai;
export { app };
