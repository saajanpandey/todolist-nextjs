import LoadingSpinner from "@/components/loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Lists() {
  const router = useRouter();
  const { data: session } = useSession();
  // const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [description, setDescription] = useState("");

  useEffect(() => {
    if (!session) {
      router.push("http://localhost:3000/login");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      axios
        .post("http://localhost:3000/api/list/create", {
          title: data.title,
          description: data.description,
          userId: session.user.id,
        })
        .then((response) => {
          setIsLoading(false);
          toast.success(response.data.data);
          router.push("http://localhost:3000");
        });
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Create a Todo</title>
      </Head>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-control"
            type="text"
            placeholder="Title"
            {...register("title", { required: true, max: 50 })}
          />
          {errors.title && errors.title.type === "required" && (
            <p style={{ color: "red" }}>Title is required.</p>
          )}
          <textarea
            className="form-control"
            placeholder="Description"
            {...register("description", { required: true })}
          />
          {errors.title && errors.title.type === "required" && (
            <p style={{ color: "red" }}>Description is required.</p>
          )}

          <button type="submit" className="btn btn-primary">
            Create List
          </button>
        </form>
      )}
    </>
  );
}
