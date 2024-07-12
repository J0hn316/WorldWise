import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const BackButton = () => {
  const nav = useNavigate();
  return (
    <Button
      type="back"
      onClick={(event) => {
        event.preventDefault();
        nav(-1);
      }}
    >
      Back
    </Button>
  );
};
export default BackButton;
