export default function VentureLabel({ ventureType, ventureArray }) {
  return (
    <div className=" h-[20px] bg-svBg inline-block px-2 rounded-full">
      <p className="font-bold text-darkerTeal">{ventureArray[ventureType]}</p>
    </div>
  );
}
