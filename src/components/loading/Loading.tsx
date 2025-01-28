import "./loading.css";

interface ILoading {
  isLoading: boolean;
}

const Loading: React.FC<ILoading> = ({ isLoading }) => {
  return (
    <div className={`loading ${isLoading ? "" : "d-none"}`}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loading;
