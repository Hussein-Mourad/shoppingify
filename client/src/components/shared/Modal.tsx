import  CloseIcon from "@material-ui/icons/Close"
import Button from "./Button";

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClose: () => void;
  onConfirm: () => void;
};

function Modal({ children, className, onClose, onConfirm }: Props) {
  return (
    <div className={`flex flex-col px-4 py-2 bg-white rounded-xl ${className}`}>
      <div className="flex justify-end text-gray-500">
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </div>
      {children}
      <div className="flex justify-end my-2">
        <Button
          className="px-5 py-2 mr-2 rounded-lg"
          onClick={onClose}
          aria-label="modal cancel button"
          link
        >
          cancel
        </Button>
        <Button
          className="px-5 py-2 text-white rounded-lg"
          color="red"
          onClick={onConfirm}
          aria-label="modal confirm button"
        >
          Yes
        </Button>
      </div>
    </div>
  );
}

export default Modal;
