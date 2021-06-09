export default function Loader(props) {
  return (
    <div className="lds-ring" style={{ transform: "scale(3)" }}>
      <div className={props.white && " loading-light"}></div>
      <div className={props.white && " loading-light"}></div>
      <div className={props.white && " loading-light"}></div>
      <div className={props.white && " loading-light"}></div>
    </div>
  );
}
