import { UserController } from "./controllers/UserController";
import { ApiSync } from "./utils/ApiSync";
import { UserEdit } from "./views/UserEdit";

const apiUrl = import.meta.env.VITE_API_URL;

const userController = new UserController(new ApiSync(apiUrl));
await userController.init();

const user = userController.getOne(1);

const userEdit = new UserEdit(
  document.querySelector("#app")!,
  user!,
  userController
);
userEdit.render();
