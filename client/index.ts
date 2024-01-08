import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/app";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDQ1MjM0MzksImV4cCI6MTcwNDUyNzAzOX0.j7mfEzEEPiSvXrA0kwNSl3UseZ3Ycy4aNGWwRKHCLDI";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  ],
});

async function main() {
  console.log("client start");

  let createRes = await trpc.createTodo.mutate({
    description: "desc",
    title: "titilele",
  });
  console.log(createRes);

  let response = await trpc.getTodo.query();
  console.log(response);
  console.log("client end");
}

main();
