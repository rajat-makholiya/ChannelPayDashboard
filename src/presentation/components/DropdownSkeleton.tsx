import { Skeleton } from "@mui/material";

type Props = {};

const DropDownLoading = (props: Props) => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={30}
      sx={{
        width: "70%",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    />
  );
};

export default DropDownLoading;
