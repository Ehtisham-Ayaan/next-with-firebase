type Props = {
  button: String;
};

const Button = (props: Props) => {
  return (
    <button className='h-12 rounded-lg bg-white px-5 font-bold text-black'>
      {props.button}
    </button>
  );
};

export default Button;
