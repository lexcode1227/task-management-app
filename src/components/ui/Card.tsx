import MenuDotsIcon from "../../assets/icons/menu-dots.svg?react";
import ClockIcon from "../../assets/icons/clock-icon.svg?react";
import MessageIcon from "../../assets/icons/message-icon.svg?react";
import SchemaIcon from "../../assets/icons/schema-icon.svg?react";
import FileIcon from "../../assets/icons/file-icon.svg?react";

const Card = () => {
  return (
    <article className="bg-color_primary_4/10 text-white p-4 rounded-lg flex flex-col items-center gap-4 w-[348px] h-52">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-body-L font-bold py-[2.5px]">Twitter</h2>
        <MenuDotsIcon width={24} height={24} />
      </div>
      <div className="flex justify-between items-center w-full py-1 px-4">
        <h3>3 Pts</h3>
        <span className="flex justify-between items-center gap-2">
          <ClockIcon width={24} height={24} />
          Today
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="bg-color_tertiary_4/10 px-4 py-1 text-color_tertiary_4 rounded">
          IOS APP
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <img
          src="https://eu.ui-avatars.com/api/?name=HA&size=250"
          alt="user avatar"
          className="w-8 rounded-full"
        />
        <div className="flex justify-between items-center gap-4">
            <FileIcon width={24} height={24} />
            <div className="flex justify-between items-center gap-1">
              <span>5</span>
              <SchemaIcon width={24} height={24} />
            </div>
            <div className="flex justify-between items-center gap-1">
              <span>3</span>
              <MessageIcon width={24} height={24} />
            </div>
        </div>
      </div>
    </article>
  );
}

export default Card