import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";
import DialogModal from "./DialogModal";

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
        <DialogModal />
    </div>
  )
}

export default Topbar