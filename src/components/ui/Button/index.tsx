type Props = {
  button: String;
  onClick?: () => void;
};

const Button = (props: Props) => {
  return (
    <button
      className='h-12 rounded-lg bg-white px-5 font-bold text-black'
      onClick={props.onClick}
    >
      {props.button}
    </button>
  );
};

export default Button;
