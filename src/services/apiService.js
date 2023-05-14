import axios from "axios";

export async function fetchTodolist() {
  const data = await axios
    .get("http://localhost:3000/api/list")
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {
      throw new Error(e.response.data.error);
    });
  return data;
}

export async function deleteTodolist(id) {
  const data = await axios({
    method: "DELETE",
    url: "http://localhost:3000/api/list/" + `${id}`,
  }).then((response) => {
    return response.data.data;
  });
  return data;
}
