export default function VentureTitle({ ventureTitle, setVentureTitle }) {
  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-center">Venture Title</h2>
      <input
        type="text"
        name="title"
        id="title"
        placeholder={`Give your Venture a name!`}
        onBlur={(e) => {
          setVentureTitle(e.target.value);
        }}
        defaultValue={ventureTitle ? ventureTitle : ""}
        className="w-[256px] mx-auto border-[3px] border-darkerOrange p-2 rounded-lg mt-2 focus:outline-none"
      />
    </div>
  );
}
