import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import Button from "../../ga-components/buttons/button";
import ButtonColor from "../../ga-components/buttons/button-color";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TypographyColor,
  TypographySize,
} from "../../ga-components/Typography";
import { LoggedInUser } from "../../../domain/usages/auth/logged-in-user";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserLogin } from "../../../domain/usages/auth/user-login";
import { pageRoutes } from "../../../routes";
import { CircularProgress } from "@mui/material";

type OtpLoginFormInput = {
  user_name: string;
  password: string;
  terms_is_agreed: boolean;
};

type Props = {
  remoteUserLogin: UserLogin;
  loggedInUser: LoggedInUser;
};
const LoginForm: React.FC<Props> = ({
  remoteUserLogin,
  loggedInUser,
}) => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<OtpLoginFormInput>();

  const onSubmit: SubmitHandler<OtpLoginFormInput> = async (data) => {
    setLoadingLogin(true);
    let result = await remoteUserLogin.login(data);

    if (result.status == 200) {
      setLoadingLogin(false);
      loggedInUser.setToken(result.data.token);
      navigate(pageRoutes.dashboard);
    } else if (result.status == 400) {
      setLoadingLogin(false);
      Swal.fire(
        "Invalid Credentials",
        "Please enter correct credentials and try again",
        "error"
      );
    } else {
      Swal.fire("Error", "Some Error occured Please try again Later", "error");
    }
  };
  return (
    <>
      {errorMessages && (
        <div className="p-2 text-red-600 mb-4 text-center">
          <>{errorMessages}</>
        </div>
      )}

      <div>
        <Typography
          color={TypographyColor.BLACK_MEDIUM}
          size={TypographySize.BASE}
          className="font-medium mb-2"
        >
          Username:
        </Typography>
        <input
          placeholder="Enter Username"
          className="xl:w-80 lg:w-60 border border-gray-300 rounded-lg h-10 indent-5"
          {...register("user_name", {
            required: "Username required",
          })}
        />
        {errors.user_name && errors.user_name.type === "required" && (
          <p className="p-2 text-red-400">{errors.user_name?.message}</p>
        )}
      </div>
      <div className="mt-5">
        <Typography
          color={TypographyColor.BLACK_MEDIUM}
          size={TypographySize.BASE}
          className="font-medium mb-2"
        >
          Password:
        </Typography>
        <input
          placeholder="Enter Password"
          type="password"
          className="xl:w-80 lg:w-60 border border-gray-300 rounded-lg h-10 indent-5"
          {...register("password", {
            required: "Password required",
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <p className="p-2 text-red-400">{errors.password?.message}</p>
        )}
      </div>
      <Button
        text={
          loadingLogin ? <CircularProgress sx={{ color: "white" }} /> : "LOGIN"
        }
        color={ButtonColor.PRIMARY}
        onClick={handleSubmit(onSubmit)}
        className="h-[40px] mt-10 w-full rounded-lg"
      />
    </>
  );
};

export default LoginForm;
