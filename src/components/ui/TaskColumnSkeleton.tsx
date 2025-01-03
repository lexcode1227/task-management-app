const TaskColumnSkeleton = () => {
  return (
    <div className="flex animate-pulse gap-8">
      {[...Array(3)].map((_, index) => (
        <section
          key={index}
          className="flex w-full flex-col gap-4 lg:w-[348px]"
        >
          <h2 className="animate-pulse text-body-L font-bold text-color_neutral_1">
            Loading...
          </h2>
          <div className="flex h-[calc(100vh-240px)] flex-col gap-4 overflow-y-auto">
            {[...Array(2)].map((_, index) => (
              <article
                key={index}
                className="flex h-52 w-full flex-col items-center gap-4 rounded-lg bg-color_neutral_4 p-4 text-white"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="h-6 w-3/4 rounded bg-color_neutral_3 py-[2.5px]"></div>
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-6 rounded bg-color_neutral_3"></div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="h-4 w-1/4 rounded bg-color_neutral_3"></div>
                  <div className="h-4 w-1/4 rounded bg-color_neutral_3"></div>
                </div>
                <div className="flex w-full items-center justify-start gap-2">
                  {[...Array(2)].map((_, index) => (
                    <div
                      key={index}
                      className="h-6 w-1/4 rounded bg-color_neutral_3"
                    ></div>
                  ))}
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-color_neutral_3"></div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-6 w-6 rounded bg-color_neutral_3"></div>
                    <div className="h-6 w-6 rounded bg-color_neutral_3"></div>
                    <div className="h-6 w-6 rounded bg-color_neutral_3"></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default TaskColumnSkeleton