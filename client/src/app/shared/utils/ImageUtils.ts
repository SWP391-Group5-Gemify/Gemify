class ImageUtils {
  /**
   * A function to concat essential token's info from firebase to get the image
   * @param link
   * @returns
   */
  static concatLinkToTokenFirebase(link: string): string {
    return link
      .concat('?')
      .concat('alt=media&token=48a1fbda-cfb3-4b72-9c4f-8b18473ceabd');
  }
}

export default ImageUtils;
