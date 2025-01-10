import * as Dialog from "@radix-ui/react-dialog";
import PlusIcon from "../../assets/icons/plus-icon.svg?react";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { useAppStore } from "../../store/store";

const DialogModal = () => {
  const isEditing = useAppStore((state) => state.isEditingMode);
  const taskToEdit = useAppStore((state) => state.taskToEdit);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    useAppStore.setState({ isEditingMode: false, taskToEdit: undefined });
  };

  return (
    <Dialog.Root onOpenChange={setOpen} open={isEditing ? true : open}>
      <Dialog.Trigger asChild>
        <button className="rounded-lg bg-color_primary_4 p-2" disabled={isEditing}>
          <PlusIcon color="#94979A" height={24} width={24} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50 z-20" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 z-20 max-h-[85vh] w-[90vw] max-w-[572px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-color_neutral_3 p-4 text-color_neutral_1 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 hidden text-[17px] font-medium" />
          <Dialog.Description className="text-mauve11 mb-5 mt-2.5 hidden text-[15px] leading-normal" />
          <TaskForm handleClose={handleClose} task={isEditing ? taskToEdit : undefined} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogModal;
