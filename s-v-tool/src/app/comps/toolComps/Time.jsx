export default function ({ selectedTime, setSelectedTime }) {
  return (
    <div className="w-full flex flex-col justify-center mt-[20px] mb-[40px]">
      <h2 className="text-center">Estimated time</h2>
      <div className="w-[132px] h-[45px] flex gap-[4px] mx-auto">
        <div className="h-full w-full rounded-tl-lg rounded-bl-lg relative">
          <input
            type="text"
            placeholder="10"
            className="border-none w-full h-full text-center overflow-clip"
            defaultValue={selectedTime ? selectedTime : ""}
            onBlur={(e) => {
              setSelectedTime(e.target.value);
            }}
          />
          <div className="rounded-tl-lg rounded-bl-lg border-darkerOrange border-[3px] absolute top-0 left-0 w-full h-full pointer-events-none" />
        </div>
        <div className="h-full w-full rounded-tr-lg rounded-br-lg bg-darkerOrange flex flex-col justify-center">
          <h2 className="text-svBg text-center">min.</h2>
        </div>
      </div>
    </div>
  );
}
