import Spinner from "react-bootstrap/Spinner";
import "./loading.css";

interface ILoading {
  isLoading: boolean;
}

const Loading: React.FC<ILoading> = ({ isLoading }) => {
  return (
    <div className={`loading ${isLoading ? "" : "d-none"}`}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
