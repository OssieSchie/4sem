export default function SelectImage({ selectedImage, setSelectedImage }) {
  return (
    <div className="flex justify-center gap-4 mt-[20px] h-[140px]">
      <div className="flex flex-col max-w-[20ch]">
        <h2 className="text-center">Image</h2>
        <p className="text-center">Give your Venture some visual flair</p>
        <div className="bg-darkerOrange inline-block mx-auto px-4 py-2 rounded-lg mt-auto">
          <h2 className="text-svBg text-center inline-block">Select Image</h2>
        </div>
      </div>
      <div className="w-[121px] h-full flex flex-col justify-end">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Your selected image"
            className="min-w-full border-2 border-darkerOrange rounded-lg h-[121px] w-[121px]"
          />
        )}
        {!selectedImage && (
          <img
            src="./icons/missingImage.svg"
            alt="no image selected"
            className="min-w-full border-2 border-darkerOrange rounded-lg h-[121px] w-[121px]"
          />
        )}
      </div>
    </div>
  );
}
