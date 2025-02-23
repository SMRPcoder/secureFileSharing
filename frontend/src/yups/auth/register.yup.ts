import * as yup from "yup";

const RegisterFormSchema=yup.object({
    firstName:yup.string().required(),
    lastName:yup.string().optional(),
    username:yup.string().email().required(),
    password:yup.string().required()
});

export type RegisterFormType=yup.InferType<typeof RegisterFormSchema>;
export default RegisterFormSchema;