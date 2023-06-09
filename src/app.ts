import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction
} from "express";
import router from "./v1/routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.router();
  }

  private config(): void {
    this.app.use(
      cors({
        origin: "*"
      })
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(bodyParser.json());
  }

  private middlewares(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });
  }

  private router(): void {
    this.app.use("/api/v1/", router);
  }
}

export default new App().app;
