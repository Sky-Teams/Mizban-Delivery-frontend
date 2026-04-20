export default function NotifCard ({message}) {
    return (
        <div className="bg-gray-100 rounded-md shadow-md p-4 ">
            <p className="text-gray-400">{message}</p>
        </div>
    )
}