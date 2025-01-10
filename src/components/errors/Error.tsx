interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

const Error = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg bg-color_neutral_5 p-4 text-color_neutral_2">
      <h2 className="mb-2 text-xl font-bold">Error</h2>
      <p className="mb-4">{message}</p>
      {onRetry && (
        <button
          className="rounded bg-color_neutral_4 px-4 py-2 text-color_neutral_2 hover:bg-color_neutral_3"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
