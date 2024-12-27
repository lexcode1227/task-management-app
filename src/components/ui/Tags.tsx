interface TagsProps {
    titleTag: string;
}

const Tags = ({ titleTag }: TagsProps) => {
  return (
    <>
      <span className="rounded bg-color_tertiary_4/10 px-4 py-1 text-color_tertiary_4">
        {titleTag}
      </span>
    </>
  );
}

export default Tags