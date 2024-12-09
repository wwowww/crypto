import { Button, ButtonProps } from "../ui/button";

const Submit = ({ children, ...others }: ButtonProps) => {
  return (
    <Button type="submit" {...others}>
      {children}
    </Button>
  );
}
export default Submit;