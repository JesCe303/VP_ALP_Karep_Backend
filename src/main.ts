import express from "express"
import { PORT } from "./util/env-util"
import { publicRouter } from "./route/public-api"
import { apiRouter } from "./route/api"
import { errorMiddleware } from "./middleware/error-middleware"

console.log("hai aku jece");

const app = express()

app.use(express.json())

//Just JSON output pretty
app.set('json spaces', 2);

app.use("/api", publicRouter)
app.use("/api", apiRouter)

app.use(errorMiddleware)

app.listen(PORT || 3000, () => {
    console.log(`Connected to port ${PORT}`)
})
console.log("Server did not crash right after listen()")