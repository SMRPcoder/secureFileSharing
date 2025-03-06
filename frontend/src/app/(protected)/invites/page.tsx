import InvitesCard from '@/components/Invites/Card';
import React from 'react';

const Invites = () => {
    return (
        <div className='grid grid-cols-4 gap-4 p-8 m-2' >
            <InvitesCard name='John Doe' email='johndoe@email.com' />
        </div>

    );
}

export default Invites;
