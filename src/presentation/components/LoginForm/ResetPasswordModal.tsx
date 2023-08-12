import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

type Props = {
  resetPasswordModal: boolean;
  closeModals: Function;
};

type ResetPassword = {
  userName: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const ResetPasswordModal: React.FC<Props> = ({
  resetPasswordModal,
  closeModals,
}) => {
  const { handleSubmit, control, setValue } = useForm<ResetPassword>({
    mode: "onChange",
  });
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    bgcolor: "background.paper",
    borderRadius: "22px",
    boxShadow: 24,
    p: 4,
  };

  const confirmResetPassword = (data: ResetPassword) => {
    console.log(data);
  };

  return (
    <>
      <Modal open={resetPasswordModal}>
        <Box sx={style}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Reset Password
          </Typography>
          <Stack spacing={2} marginTop={2}>
            <Controller
              name="userName"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="Username"
                  value={value}
                  onChange={onChange}
                  size="small"
                  error={error && true}
                  helperText={error?.message}
                />
              )}
              rules={{
                required: { value: true, message: "Field Required" },
              }}
            />
            <Controller
              name="oldPassword"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="Old Password"
                  value={value}
                  onChange={onChange}
                  size="small"
                  error={error && true}
                  helperText={error?.message}
                />
              )}
              rules={{
                required: { value: true, message: "Field Required" },
              }}
            />

            <Controller
              name="newPassword"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="New Password"
                  value={value}
                  onChange={onChange}
                  size="small"
                  error={error && true}
                  helperText={error?.message}
                />
              )}
              rules={{
                required: { value: true, message: "Field Required" },
              }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            marginTop={3}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(confirmResetPassword)}
            >
              Reset
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => closeModals(false)}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ResetPasswordModal;
