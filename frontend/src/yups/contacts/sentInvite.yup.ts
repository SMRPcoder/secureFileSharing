import * as yup from "yup";

const SendInviteFormSchema=yup.object({
    sentTo:yup.string().required()
});

export type SendInviteFormType=yup.InferType<typeof SendInviteFormSchema>;
export default SendInviteFormSchema;