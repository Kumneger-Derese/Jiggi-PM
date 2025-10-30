import React from 'react';

const TeamList = ({member, setIsRemoveTeamModalOpen, setIsRoleModalOpen, setSelectedMember}) => {
    return (
        <div className={'grid sm:grid-cols-5 gap-y-4 rounded-md bg-neutral-700 sm:items-center px-2'}>
            <p className={'capitalize font-bold'}>{member?.user?.username}</p>
            <p>{member?.project?.name}</p>
            <p>{member?.role}</p>

            {/* action button */}
            <div
                className={'flex items-center space-x-4 p-2 col-span-2'}
            >
                <button
                    className={
                        'bg-yellow-600 text-sm px-2 py-2 rounded-md font-medium'
                    }
                    onClick={() => {
                        setIsRoleModalOpen(true)
                        setSelectedMember(member)
                    }}
                >
                    Change Role
                </button>

                <button
                    className={
                        'bg-rose-600 hover:bg-rose-800 text-sm px-2 py-2 rounded-md font-medium'
                    }
                    onClick={() => {
                        setIsRemoveTeamModalOpen(true)
                        setSelectedMember(member)
                    }}
                >
                    Delete Member
                </button>
            </div>
        </div>
    );
};

export default TeamList;