class ObjectUtils {
  /**
   * A function to find a key based on value given from the object
   * for - in: return a key of object
   * @param object
   * @param value
   */
  static findKeyByValue<T extends Object>(
    object: T,
    value: T[keyof T]
  ): keyof T | undefined {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === value) {
        return key as keyof T;
      }
    }
    return undefined;
  }
}

export default ObjectUtils;
