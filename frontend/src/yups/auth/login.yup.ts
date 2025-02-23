import * as yup from "yup";

const LoginFormSchema=yup.object({
    username:yup.string().email().required(),
    password:yup.string().required()
});

export type LoginFormType=yup.InferType<typeof LoginFormSchema>;
export default LoginFormSchema;