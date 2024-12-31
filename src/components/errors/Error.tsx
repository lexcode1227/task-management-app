interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

const Error = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-red-100 text-red-700 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Error</h2>
      <p className="mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;