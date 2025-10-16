import {Link} from "react-router-dom";

const InvitedProjectCard = ({p}) => {
    return (
        <div
            className={'w-80 h-48 border border-neutral-700 p-4 rounded-xl flex flex-col gap-y-4 bg-neutral-800'}
        >
            <h1 className={'text-3xl font-bold line-clamp-1'}>{p?.project?.name}</h1>
            <span className={'-mt-4 text-neutral-500 font-medium text-sm'}>{p?.role}</span>

            <h2 className={'flex flex-col text-neutral-400 flex-1 line-clamp-2'}>{p?.project?.description}</h2>

            <div>
                <Link
                    className='px-4 py-2 rounded-md hover:text-sky-400 w-fit bg-neutral-600 font-semibold'
                    to={`/projects/${p.projectId}`}
                >
                    Start Project
                </Link>
            </div>
        </div>
    );
};

export default InvitedProjectCard;