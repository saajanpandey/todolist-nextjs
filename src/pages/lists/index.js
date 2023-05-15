import {
  createTodolist,
  getListById,
  updateTodolist,
} from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Lists() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;

  const isAddMode = !id;

  const createMutation = useMutation({
    mutationFn: (data) => createTodolist(data, session),
    onSuccess: () => {
      router.push("http://localhost:3000");
      toast.success("List Created Successfully!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateTodolist(data, session, id),
    onSuccess: () => {
      router.push("http://localhost:3000");
      toast.success("List Updated Successfully!");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
    if (!isAddMode) {
      getListById(id).then((data) => {
        reset({
          title: data.title,
          description: data.description,
        });
      });
    }
  }, [session, router, reset, isAddMode, id]);

  const onSubmit = (data) => {
    return isAddMode
      ? createMutation.mutateAsync(data)
      : updateMutation.mutateAsync(data);
  };

  return (
    <>
      <Head>
        <title>{isAddMode ? "Create TodList" : "Update TodList"}</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{isAddMode ? "Add User" : "Edit User"}</h1>
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
          {isAddMode
            ? createMutation.isLoading
              ? "Saving..."
              : "Save"
            : updateMutation.isLoading
            ? "Updating..."
            : "Update"}
        </button>
      </form>
    </>
  );
}
