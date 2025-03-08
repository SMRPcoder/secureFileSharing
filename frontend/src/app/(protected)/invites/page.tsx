"use server";
import { viewAllInvites } from '@/actions/invites.actions';
import NoData from '@/components/common/NoData';
import InvitesCard from '@/components/Invites/Card';
import InvitesTab from '@/components/Invites/invitesTab';
import React from 'react';

interface InviteType {
    id: string;
    sender?: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
    }
    receiver?: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
    }
}

const Invites = async ({ searchParams }: { searchParams: Promise<{ inviteType: string }> }) => {
    const query = await searchParams;
    const Response = await viewAllInvites(query.inviteType);
    const AllInvites: InviteType[] = Response.data;

    return (
        <>
            <InvitesTab />
            {(AllInvites && AllInvites.length > 0) ? (
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-8 m-2' >
                    <>
                        {AllInvites.map((invite, index) => (
                            <div key={index}>
                            {invite.sender?
                            (
                                <InvitesCard key={index} name={invite.sender.firstName + invite.sender.lastName} email={invite.sender.username} id={invite.id} inviteTab="received" />
                            ):(
                                <InvitesCard key={index} name={invite.receiver!.firstName + invite.receiver!.lastName} email={invite.receiver!.username} id={invite.id} inviteTab='sent' />
                            )}
                            </div>
                        ))}
                    </>
                </div>
            ) : (
                <>
                    <NoData message="Sorry there is no Invites you're looking for" mainMessage='No Invites' />
                </>
            )}

        </>


    );
}

export default Invites;
