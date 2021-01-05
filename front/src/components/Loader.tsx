import loader from "../img/loader.gif";

export const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} className="loader-gif" alt="loading" />
    </div>
  );
};
