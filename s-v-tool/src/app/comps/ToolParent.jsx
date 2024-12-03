export default function ToolParent({ setShowPreview }) {
  return (
    <div className="bg-svBg">
      <div className="w-full flex bg-svBg p-4 justify-between">
        <img
          src="./icons/backArrow.svg"
          alt="Back Arrow"
          className="w-[35px] h-[35px] mt-auto"
        />
        <h1 className="text-center">Venture Editor</h1>
        <img
          src="./icons/togglePreview.svg"
          alt="Toggle preview"
          className="w-[35px] h-[35px] mt-auto"
          onClick={() => {
            setShowPreview((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
}
