function FilePreview({ selectedImgPreview, selectedImgAltTxt }) {
    return (
        <img src={selectedImgPreview} alt={selectedImgAltTxt} className="add-product__form__file-img" width="320" height="320" />
    );
}

export default FilePreview;
