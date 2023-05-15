import { deleteTodolist } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function Card({ data }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id, title, description } = data;

  function form() {
    router.push({ pathname: "/lists/", query: { id: id } });
  }

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
          <button
            className="btn btn-primary"
            style={{
              float: "right",
              marginRight: "10px",
            }}
            onClick={() => form()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
