type FormMessageProps = {
  message: string;
}

const FormMessage = ({ message }: FormMessageProps) => {
  return <p className="mt-1 ml-1 text-sm text-red-600">{message}</p>
}

export default FormMessage;