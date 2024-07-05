interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-sm h-1 mb-4">
      <div
        className="bg-blue-600 h-1 rounded-sm duration-300 transition-all ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
