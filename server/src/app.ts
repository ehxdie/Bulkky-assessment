import express, { NextFunction, urlencoded } from "express";
import type { Request, Response } from "express";
import router from "./routes";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import * as prometheus from "prom-client";
import { swaggerDocs } from "./utils/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import { BaseError, HttpStatusCode } from "./exceptions";



const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_AUDIENCE: process.env.JWT_AUDIENCE,
    JWT_ISSUER: process.env.JWT_ISSUER,
    PORT: process.env.PORT,
};

const app = express();
const port = config.PORT || 3000;

app.enable("trust proxy");
app.use(helmet());

// list of allowed origins
const allowedOrigins = [
  "https://ajarra.vercel.app", // production frontend
  "http://localhost:3000", // local dev (React/Next.js)
  "http://127.0.0.1:3000",
  "http://localhost:3002", // alternative localhost
];

app.use(
  cors({
    origin: function (origin:any, callback:any) {
      // allow requests with no origin (like curl or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true, // allow cookies/auth headers
  })
);

app.use(morgan("dev"));


app.use(express.json({ limit: "10mb" }));
app.use(urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));

app.get("/", (req: Request, res: Response) => {
    res.redirect("/docs");
});

prometheus.collectDefaultMetrics();
app.get("/metrics", (req: Request, res: Response) => {
    res.set("Content-Type", prometheus.register.contentType);
    res.end(prometheus.register.metrics());          
});


// Docs in JSON format

swaggerDocs(app, port);

console.log(`Docs available at http://localhost:${port}/docs`);
app.use("/api", router);

// ─── 404 CATCH-ALL ─────
app.use((req, res) => {
    if (!res.headersSent) {
        return res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ status: "error", message: "Route not found" });
    }
});

// ─── CENTRAL ERROR HANDLER ───
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    errorHandler.handleError(err, res);

    if (!(err instanceof BaseError)) {
        res
            .status(HttpStatusCode.INTERNAL_SERVER)
            .json({ status: "error", message: "Internal server error" });
    }
});



export default app;