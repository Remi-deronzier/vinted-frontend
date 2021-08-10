import "./Loader.css";

const Loader = ({ className }) => {
  return (
    <div className={className}>
      <div className="loader">
        <div className="back-loader">
          <div className="loader-content"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
