const Button = ({ children, onClick, varient = 'primary', className = '', type = 'button' }) => {
    const classes = [`btn`, varient == "primary"? 'btn--primary' : 'btn--secondary', className].join(' ').trim();
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}

export default Button;