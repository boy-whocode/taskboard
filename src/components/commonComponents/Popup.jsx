const Popup = ({title,children}) => {
  return (
    <div className="popup__outer">
      <div className="popup__inner">
        <div className="popup-header">
          <h3 className="popup__title">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Popup;