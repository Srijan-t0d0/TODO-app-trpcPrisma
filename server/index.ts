import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./app";
import { todoService } from "../services/todoServices";
import { userServices } from "../services/userServices";
import { MyContext } from "./trpc";
import * as jwt from "jsonwebtoken";

const secret = "your-secret-key";

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    console.log(authHeader);

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log(token);
      return new Promise<MyContext>((resolve, reject) => {
        jwt.verify(token, secret, (err, user) => {
          if (user) {
            console.log(user);

            resolve({
              //@ts-ignore
              userId: user.userId as number,
              todoService,
              userServices,
            });
          }
        });
      });
    }
    console.log("hii without authheader");

    return {
      todoService,
      userServices,
    };
  },
});

console.log("Server is running on port 3000");

server.listen(3000);
