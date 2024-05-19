import React from 'react';
import BlockInfoAccount from '../../components/blockprofile/BlockInfoAccount';
import AvatarAccount from '../../components/blockprofile/AvatarAccount';

const ProfilePage = () => {
    return (
        <div>
            <AvatarAccount className=""/>
            <BlockInfoAccount className=""/>
        </div>
    );
};

export default ProfilePage;