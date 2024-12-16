export default function SelectImage({
  selectedImage,
  setSelectedImage,
  setShowImageModal,
}) {
  return (
    <div className="flex justify-center gap-4 mt-[20px] h-[140px]">
      <div className="flex flex-col max-w-[20ch]">
        <h2 className="text-center">Image</h2>
        <p className="text-center">Give your Venture some visual flair</p>
        <div className="bg-darkerOrange inline-block mx-auto px-4 py-2 rounded-lg mt-auto">
          <h2
            className="text-svBg text-center inline-block"
            onClick={() => {
              setShowImageModal(true);
            }}
          >
            Select Image
          </h2>
        </div>
      </div>
      <div className="w-[121px] h-[121px] mt-auto overflow-clip border-2 border-darkerOrange rounded-lg">
        {selectedImage && (
          <img
            src={selectedImage || "./icons/missingImage.svg"}
            alt="Your selected image"
            className=" min-w-full min-h-full"
          />
        )}
        {!selectedImage && (
          <img
            src="./icons/missingImage.svg"
            alt="no image selected"
            className=" min-w-full min-h-full"
          />
        )}
      </div>
    </div>
  );
}
