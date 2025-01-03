import * as Dialog from "@radix-ui/react-dialog";
import PlusIcon from "../../assets/icons/plus-icon.svg?react";
import Form from "./Form";
import { useState } from "react";

const DialogModal = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="rounded-lg bg-color_primary_4 p-2">
          <PlusIcon width={24} height={24} color="#94979A" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[572px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-color_neutral_3 p-4 text-color_neutral_1 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 hidden text-[17px] font-medium"></Dialog.Title>
          <Dialog.Description className="text-mauve11 mb-5 mt-2.5 hidden text-[15px] leading-normal"></Dialog.Description>
          <Form handleClose={handleClose} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogModal