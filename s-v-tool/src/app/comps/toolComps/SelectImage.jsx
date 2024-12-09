export default function SelectImage({
  selectedImage,
  setSelectedImage,
  setUpdateTrigger,
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
              setSelectedImage(
                "https://cole-mswmag.imgix.net/https%3A%2F%2Fwww.mswmag.com%2Fuploads%2Fimages%2Fparis-sewers_171030_090042.jpg?fit=clip&ixlib=php-1.1.0&q=75&w=1024&s=00d6af931a45e45368421495b5b359a7"
              );
              setUpdateTrigger((prev) => !prev);
            }}
          >
            Select Image
          </h2>
        </div>
      </div>
      <div className="w-[121px] h-[121px] mt-auto overflow-clip border-2 border-darkerOrange rounded-lg">
        {selectedImage && (
          <img
            src={selectedImage || "./icons/missingImaage.svg"}
            alt="Your selected image"
            className=" minw-full "
          />
        )}
        {!selectedImage && (
          <img
            src="./icons/missingImage.svg"
            alt="no image selected"
            className=" min-wfull"
          />
        )}
      </div>
    </div>
  );
}
