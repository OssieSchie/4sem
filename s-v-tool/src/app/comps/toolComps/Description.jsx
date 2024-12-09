export default function Description({
  ventureDescription,
  setVentureDescription,
  setUpdateTrigger,
}) {
  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-center">Description</h2>
      <p className="text-center">
        Describe your Venture in general terms, so plaayers know what to expect!
      </p>
      <textarea
        name="desc"
        id="desc"
        placeholder="Explore the beautiful city of..."
        onBlur={(e) => {
          setVentureDescription(e.target.value);
          setUpdateTrigger((prev) => !prev);
        }}
        defaultValue={ventureDescription ? ventureDescription : ""}
        className="w-full mx-auto border-[3px] border-darkerOrange p-2 rounded-lg mt-2 focus:outline-none min-h-[180px]"
      ></textarea>
    </div>
  );
}
