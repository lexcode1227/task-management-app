import { Button } from '@headlessui/react'
import DashboardIcon from "../../assets/icons/menu-square.svg?react";
import TasksIcon from "../../assets/icons/menu-hamburguer.svg?react";
import PlusIcon from "../../assets/icons/plus-icon.svg?react";

const Topbar = () => {
  return (
    <div className='flex justify-between items-center mt-9'>
        <div className='flex'>
            <Button className='p-2'>
                <TasksIcon width={24} height={24} color="#94979A" />
            </Button>
            <Button className='p-2'>
                <DashboardIcon height={24} width={24} color="#94979A" />
            </Button>
        </div>
        <Button className='bg-color_primary_4 p-2 rounded-lg'>
            <PlusIcon width={24} height={24} color="#94979A" />
        </Button>
    </div>
  )
}

export default Topbar