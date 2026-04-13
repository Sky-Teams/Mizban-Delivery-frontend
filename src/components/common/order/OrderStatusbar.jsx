export default function OrderStatusbar() {
  const baseButton = "px-4 pb-2 transition-colors duration-200 hover:text-orange-500 cursor-pointer";
  const activeButton = "text-orange-500 border-b-2 border-orange-500 font-semibold";

  return (
    <div className="p-4 w-full">
      <div className="flex text-[18px] justify-between items-center mb-[-2px] relative z-10">
        <button className={`${baseButton} ${activeButton}`}>All()</button>
        <button className={baseButton}>Completed()</button>
        <button className={baseButton}>Cancelled()</button>
        <button className={baseButton}>Rejected()</button>
        <button className={baseButton}>Expired()</button>
        <button className={baseButton}>Returned()</button>
      </div>
      <div className="bg-gray-200 w-full h-[2px]"></div>
    </div>
  );
}