interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

const ErrorLayout = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-color_neutral_5 text-color_neutral_2 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Error</h2>
      <p className="mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-color_neutral_4 text-color_neutral_2 rounded hover:bg-color_neutral_3"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorLayout;