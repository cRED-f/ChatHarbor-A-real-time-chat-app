import { withAuth } from "next-auth/middleware";

export default withAuth;

//we will check if the user is authenticated or not
//if not then redirect to login page
export const config = {
  matcher: ["/chat", "/chat/:id*", "/register"],
};
