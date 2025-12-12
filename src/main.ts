import express from "express"
import { PORT } from "./util/env-util";
import { publicRouter } from "./route/publicRouter";
import { errorMiddleware } from "./middleware/error-middleware"
import { jobtagRouter } from "./route/jobTagRoute/job-tag-route";
import { jobRouter } from "./route/jobRoute/job-route";
import { appRouter } from "./route/appRoute/application-route";

console.log("hai aku jece");

const app = express()

app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
});

app.use(express.json())

//Just JSON output pretty
app.set('json spaces', 2);

app.use("/api", publicRouter)
app.use("/api", jobtagRouter)
app.use("/api", jobRouter)
app.use("/api", appRouter)

app.use(errorMiddleware)

app.listen(PORT || 3000, () => {
    console.log(`Connected to port ${PORT}`)
})
console.log("Server did not crash right after listen()")