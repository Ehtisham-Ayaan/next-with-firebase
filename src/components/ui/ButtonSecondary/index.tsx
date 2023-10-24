type Props = {
  button: String;
};

const Button = (props: Props) => {
  return (
    <button className='h-12 w-full rounded-full bg-emerald-800 px-5 font-bold text-white'>
      {props.button}
    </button>
  );
};

export default Button;
