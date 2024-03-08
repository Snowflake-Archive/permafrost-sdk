import { Permafrost } from "./src/index";

const permafrost = new Permafrost("http://localhost:1234");
permafrost.auth
  .password({
    email: "me@znepb.me",
    password: "1234",
  })
  .catch(({ error }) => {
    console.log("Could not request:", error.code, error.message);
  })
  .then(async (session) => {
    console.log("Session:", session);
    const applications = await permafrost.applications.list();
    console.log("Applications:", applications);
  });
