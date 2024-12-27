import MenuDotsIcon from "../../assets/icons/menu-dots.svg?react";
import ClockIcon from "../../assets/icons/clock-icon.svg?react";
import MessageIcon from "../../assets/icons/message-icon.svg?react";
import SchemaIcon from "../../assets/icons/schema-icon.svg?react";
import FileIcon from "../../assets/icons/file-icon.svg?react";
import Tags from "./Tags";

const Card = () => {
  return (
    <article className="flex h-52 w-[348px] flex-col items-center gap-4 rounded-lg bg-color_primary_4/10 p-4 text-white">
      <div className="flex w-full items-center justify-between">
        <h2 className="py-[2.5px] text-body-L font-bold">Twitter</h2>
        <MenuDotsIcon width={24} height={24} />
      </div>
      <div className="flex w-full items-center justify-between px-4 py-1">
        <h3>3 Pts</h3>
        <span className="flex items-center justify-between gap-2">
          <ClockIcon width={24} height={24} />
          Today
        </span>
      </div>
      <div className="flex w-full items-center justify-between">
        <Tags titleTag="IOS APP" />
      </div>
      <div className="flex w-full items-center justify-between">
        <img
          src="https://eu.ui-avatars.com/api/?name=HA&size=250"
          alt="user avatar"
          className="w-8 rounded-full"
        />
        <div className="flex items-center justify-between gap-4">
          <FileIcon width={24} height={24} />
          <div className="flex items-center justify-between gap-1">
            <span>5</span>
            <SchemaIcon width={24} height={24} />
          </div>
          <div className="flex items-center justify-between gap-1">
            <span>3</span>
            <MessageIcon width={24} height={24} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card