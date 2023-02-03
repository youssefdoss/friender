import "./Loading.scss";
/**
 * Shows loading spinner
 */
function Loading() {
  return (
    <div className="Loading">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
