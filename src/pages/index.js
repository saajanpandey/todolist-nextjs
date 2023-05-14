import Card from "@/components/card";
import LoadingSpinner from "@/components/loading";
import { fetchTodolist } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["lists"],
    queryFn: fetchTodolist,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 p-4">
      {data.map((list) => {
        return <Card key={list.id} data={list} />;
      })}
    </div>
  );
}
