interface ModalProps {
    children: React.ReactNode
    onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="absolute z-10 flex h-full w-full items-center justify-center backdrop-blur-md"
            onClick={handleClick}
        >
            <div className="rounded-xl bg-dark-3 p-6">{children}</div>
        </div>
    )
}
