import { useRouter } from "next/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { customerService } from "../../api";
import {
  ErrorText,
  Flex,
  Form,
  Input,
  Label,
  Seperator,
  Submit,
} from "../../components";
import { auth } from "../../pages/_app";
import { LoginFormValues } from "./types";

export const Login: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const client = useQueryClient();
  const router = useRouter();
  const onSubmit = async (data: LoginFormValues) => {
    const response = await customerService.login(data);

    if (response.accessToken) {
      auth.setAccessToken(response.accessToken);
      reset();
      client.invalidateQueries("user");
      router.push("/schedule");
    }
  };

  return (
    <Container>
      <Header>Login</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Email
          <Input {...register("email", { required: true })} />
          {errors.email && <ErrorText>This field is required</ErrorText>}
        </Label>

        <Seperator />

        <Label>
          Password
          <Input
            {...register("password", { required: true })}
            type="password"
          />
          {errors.password && <ErrorText>This field is required</ErrorText>}
        </Label>

        <Submit type="submit" text="Log in" />
      </Form>
    </Container>
  );
};

const Container = styled(Flex)`
  flex-direction: column;
`;

const Header = styled.h2`
  margin: 1rem;
`;
