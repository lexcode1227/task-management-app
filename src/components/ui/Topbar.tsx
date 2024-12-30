import * as Dialog from "@radix-ui/react-dialog";
import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";
import PlusIcon from "../../assets/icons/plus-icon.svg?react";

const Topbar = () => {
  return (
    <div className='flex justify-between items-center mt-9'>
        <div className='flex'>
            <button className='p-2'>
                <TasksIcon width={24} height={24} color="#94979A" />
            </button>
            <button className='p-2'>
                <DashboardIcon height={24} width={24} color="#94979A" />
            </button>
        </div>
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className='bg-color_primary_4 p-2 rounded-lg'>
                    <PlusIcon width={24} height={24} color="#94979A" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed left-1/2 top-1/2 p-4 max-h-[85vh] w-[90vw] max-w-[572px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-color_neutral_3 text-color_neutral_1 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                    <Dialog.Title className="hidden m-0 text-[17px] font-medium text-mauve12"></Dialog.Title>
                    <Dialog.Description className="hidden mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                    </Dialog.Description>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                        <input
                            className="inline-flex h-[35px] w-full flex-1 items-center justify-center bg-transparent rounded px-2.5 text-[15px] leading-none text-color_neutral_2 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                            id="name"
                            placeholder="Task title"
                        />
                    </fieldset>
                    <div className="mt-[25px] flex justify-end gap-6">
                        <Dialog.Close asChild>
                            <button
                                className="inline-flex w-16 p-2 bg-transparent appearance-none items-center justify-center rounded-lg text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                                aria-label="Close"
                            >
                                Cancel
                            </button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <button className="inline-flex w-16 items-center justify-center rounded-lg bg-color_primary_2 p-2 leading-none text-body-M font-normal text-color_neutral_1 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none">
                                Create
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
	    </Dialog.Root>
    </div>
  )
}

export default Topbar