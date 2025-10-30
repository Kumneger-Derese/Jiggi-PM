const Loading = () => {
    return (
        <section className='flex min-h-screen items-center justify-center'>
            <div className='p-6 rounded-md w-full max-w-2xl mx-auto transition-opacity duration-300'>
                <div className='animate-pulse flex flex-col space-y-6'>

                    {/* Header Section: Avatar and Title/Subtitle */}
                    <div className='flex items-center space-x-4'>
                        <div className='flex-1 space-y-2 py-1'>
                            <div className='h-6 shimmer-bg rounded w-full'></div>
                            <div className='h-6 shimmer-bg rounded w-3/6'></div>
                        </div>
                    </div>

                    {/* Detail Section: Three lines of text mimicking information */}
                    <div className='space-y-4 pt-4'>

                        <div className='flex items-center space-x-3'>
                            <div className='h-6 w-8 shimmer-bg rounded-sm'></div>
                            <div className='h-6 shimmer-bg rounded w-full'></div>
                        </div>

                        <div className='flex items-center space-x-3'>
                            <div className='h-6 w-8 shimmer-bg rounded-sm'></div>
                            <div className='h-6 shimmer-bg rounded w-full'></div>
                        </div>

                        <div className='flex items-center space-x-3'>
                            <div className='h-6 w-8 shimmer-bg rounded-sm'></div>
                            <div className='h-6 shimmer-bg rounded w-4/6'></div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='flex items-center justify-between'>
                        <div>
                            {' '}
                            Loading{' '}
                            <span className='animate-bounce text-3xl font-black text-sky-500'>
                ...
              </span>
                        </div>

                        <div className='text-sky-500 font-bold'>Jiggi PM</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Loading
