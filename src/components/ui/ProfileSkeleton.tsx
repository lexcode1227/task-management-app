const ProfileSkeleton = () => {
  return (
    <article className="flex h-auto w-full animate-pulse flex-col items-center gap-4 rounded-lg bg-color_neutral_4 p-4 text-color_neutral_1">
      <div className="flex w-full items-center justify-between">
        <div className="h-10 w-10 rounded-full bg-color_neutral_4"></div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="h-6 w-1/2 rounded bg-color_neutral_4"></div>
        <div className="h-4 w-1/3 rounded bg-color_neutral_4"></div>
        <div className="h-4 w-1/4 rounded bg-color_neutral_4"></div>
        <div className="h-4 w-1/4 rounded bg-color_neutral_4"></div>
        <div className="h-4 w-1/4 rounded bg-color_neutral_4"></div>
      </div>
    </article>
  );
}

export default ProfileSkeleton