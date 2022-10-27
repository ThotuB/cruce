interface TrumpProps {
    trump: string;
}

export default function Trump({ trump }: TrumpProps) {
    return (
        <div className='absolute h-full w-full flex items-center justify-center'>
            <div className={`w-36 h-36 rounded-full bg-dark-1 border-4 border-purple-300 flex items-center justify-center transition-opacity
                    ${trump ? '' : 'opacity-0'}`}
            >
                <img src={`/${trump}.png`} alt='trump' />
            </div>
        </div>
    )
}
