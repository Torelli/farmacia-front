import { redirect } from "react-router-dom";
import { destroy } from "../../service/Service";

export async function action({ params }) {
  await destroy(`/categorias/${params.id}`);
  return redirect("/");
}
