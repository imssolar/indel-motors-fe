import { Snackbar } from "@mui/material";

interface Props {
  messageToShow: string;
  hideDuration: number;
}

export const SnackBar = ({ messageToShow, hideDuration }: Props) => {

    

  return <Snackbar message={messageToShow} autoHideDuration={hideDuration} />;
};
