"use server";
import { viewAllInvites } from '@/actions/invites.actions';
import InvitesCard from '@/components/Invites/Card';
import React from 'react';

interface InviteType {
    id: string;
    sender: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
    }
}

const Invites = async () => {
    const Response = await viewAllInvites();
    const AllInvites: InviteType[] = Response.data;

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-8 m-2' >
            {AllInvites && AllInvites.length > 0 ? (
                <>
                    {AllInvites.map((invite, index) => (
                        <InvitesCard key={index} name={invite.sender.firstName + invite.sender.lastName} email={invite.sender.username} id={invite.id} />
                    ))}
                </>
            ) : (
                <>
                    <p>There is No Inivites...</p>
                </>
            )}
        </div>

    );
}

export default Invites;
