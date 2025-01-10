const UserNavlinkSkeleton = () => {
  return (
    <article className="flex w-full h-14 animate-pulse items-center gap-4 pb-3">
      <div className="ml-4 size-9 rounded-lg bg-color_neutral_2/10 border border-color_neutral_3"></div>
      <div className="flex flex-col items-start gap-1">
        <div className="h-5 w-24 rounded-lg bg-color_neutral_2/10 border border-color_neutral_3"></div>
        <div className="h-4 w-32 rounded-lg bg-color_neutral_2/10 border border-color_neutral_3"></div>
      </div>
    </article>
  );
}

export default UserNavlinkSkeleton