import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFlow from "@/hooks/useFlow";

const PostFlow = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { createFlow } = useFlow();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const flowData = {
        name: input,
      };

      const createdFlow = await createFlow.mutateAsync(flowData);

      if (createdFlow && createdFlow.flow_id) {
        navigate(`/flow/${createdFlow.flow_id}`);
      }
      setInput("");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 text-white w-32 ">Create</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-6">Create a new flow</DialogTitle>
            <input
              type="text"
              placeholder="Enter title"
              className="my-5 block w-full pt-2 px-3 pb-3 text-black border border-gray-400 rounded-lg bg-white focus:outline-none "
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-blue-500 mt-4  text-white w-full "
              onClick={handleSubmit}
              loading={loading}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostFlow;
