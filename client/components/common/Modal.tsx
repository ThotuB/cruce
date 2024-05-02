interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    
    return (
        <div className="absolute w-full h-full flex justify-center items-center backdrop-blur-md z-10"
            onClick={handleClick}
        >
            <div className="bg-dark-3 p-6 rounded-xl">
                {children}
            </div>
        </div>
    )
}