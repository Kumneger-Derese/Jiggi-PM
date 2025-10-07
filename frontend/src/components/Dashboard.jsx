const Dashboard = () => {
    const data = [
        {
            id: 1,
            title: 'Projects',
            content: 'You have 34 projects to accomplish.'
        }, {
            id: 2,
            title: 'Lists',
            content: 'You have 256 projects to sort.'
        }, {
            id: 3,
            title: 'Cards',
            content: 'You have 789 Tasks to manage.'
        },
    ]

    return (
        <div className={'p-8'}>
            <div className={'mb-4'}>
                <h1 className={'font-bold text-xl'}>Dashboard</h1>
            </div>
            <section className={'grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3'}>
                {
                    data.map((item) => (
                        <div key={item.id} className="h-36 p-8 gap-2 flex flex-col justify-center rounded-md bg-linear-150 from-neutral-600 to-sky-900">
                            <h1 className={'font-bold text-xl'}>{item.title}</h1>
                            <p className={'text-neutral-400/90'}>{item.content}</p>
                        </div>
                    ))
                }
            </section>
        </div>
    );
};

export default Dashboard;