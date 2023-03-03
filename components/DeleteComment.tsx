import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function DeleteComment({ id }: { id: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async () => {
    console.log("delete", id);
    const res = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Comment Deleted");
      console.log("success", data);
      router.replace(pathname);
    } else {
      console.log("error", data);
      toast.error("Something went wrong");
    }
  };

  return (
    <button className="text-red-500 hover:text-red-700" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteComment;
