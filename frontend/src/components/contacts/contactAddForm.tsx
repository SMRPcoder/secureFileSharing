import { sendInvite } from '@/actions/contact.actions';
import SendInviteFormSchema, { SendInviteFormType } from '@/yups/contacts/sentInvite.yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Notify } from 'notiflix';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function ContactAddForm({ userList }: { userList: { id: string; username: string; }[] }) {

    const { handleSubmit, reset, formState: { errors }, setValue, control } = useForm<SendInviteFormType>({
        resolver: yupResolver(SendInviteFormSchema)
    });

    const submitInvite = async (values: SendInviteFormType) => {
        console.log(values);
        const submitResponse=await sendInvite(values);
        if(submitResponse.status){
            Notify.success(submitResponse.message);
            reset();
            location.reload();
        }else{
            Notify.failure(submitResponse.message);
        }
    }

    return (
        <>
            <form className="space-y-4" onSubmit={handleSubmit(submitInvite)} >
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <Controller
                        control={control}
                        name='sentTo'
                        render={() => (
                            <select onChange={(e)=>setValue("sentTo",e.currentTarget.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >
                                <option value={""} >Select One</option>
                                {userList.map((user, index) => (
                                    <option key={index} value={user.id} >{user.username}</option>
                                ))}
                            </select>
                        )}
                    />
                    <span className='text-sm font-light text-red-500 italic' >{errors.sentTo?errors.sentTo.message:""}</span>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Send Invite
                </button>
                {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                </div> */}
            </form>
        </>
    )
}
