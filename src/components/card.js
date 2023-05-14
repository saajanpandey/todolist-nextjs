import { deleteTodolist } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function Card({ data }) {
  const queryClient = useQueryClient();
  const { id, title, description } = data;

  const mutation = useMutation({
    mutationFn: () => deleteTodolist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      toast.success("List Deleted Successfully");
    },
  });

  function deleteList(id) {
    mutation.mutateAsync(id);
  }

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-footer">
          <button
            disabled={mutation.isLoading}
            style={{
              float: "right",
            }}
            type="button"
            className="btn btn-danger"
            // onClick={() => console.log("asdasd")}
            onClick={() => deleteList(id)}
          >
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </button>
          <a
            className="btn btn-primary"
            href="#"
            style={{
              float: "right",
              marginRight: "10px",
            }}
          >
            Update
          </a>
        </div>
      </div>
    </div>
  );
}
