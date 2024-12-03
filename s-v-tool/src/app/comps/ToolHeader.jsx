"use client";
export default function ToolHeader({ togglePreview, showPreview }) {
  return (
    <div className="w-full flex bg-svBg py-4 px-2 justify-between z-50 sticky top-0 left-0">
      <img
        src="./icons/backArrow.svg"
        alt="Back Arrow"
        className="w-[35px] h-[35px] mt-auto"
      />
      {showPreview ? (
        <h1 className="text-center">Venture Preview</h1>
      ) : (
        <h1 className="text-center">Venture Editor</h1>
      )}
      <img
        src="./icons/togglePreview.svg"
        alt="Toggle preview"
        className="w-[35px] h-[35px] mt-auto"
        onClick={togglePreview}
      />
    </div>
  );
}
