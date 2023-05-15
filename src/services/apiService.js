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

export async function createTodolist(data, session) {
  const sendRes = await axios
    .post("http://localhost:3000/api/list/create", {
      title: data.title,
      description: data.description,
      userId: session.user.id,
    })
    .then((response) => {
      return response.data.data;
    });

  return sendRes;
}

export async function getListById(id) {
  const data = await axios({
    method: "GET",
    url: "http://localhost:3000/api/list/" + `${id}`,
  }).then((response) => {
    return response.data.data;
  });
  return data;
}

export async function updateTodolist(data, session, id) {
  const updatedData = await axios({
    method: "PUT",
    url: "http://localhost:3000/api/list/" + `${id}`,
    data: {
      title: data.title,
      description: data.description,
      userId: session.user.id,
    },
  }).then((response) => {
    return response.data.data;
  });
  return updatedData;
}
