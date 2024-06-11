class EnumUtils {
  /**
   * A function to convert enum into an object of key-value pair
   * - Object.entries: return an array of key-value pair
   * - keyof: a type of union type of ENUM's left value
   * - [key, value]: array destructuring
   */
  static enumToObject<T extends object>(
    enumObj: T
  ): { id: keyof T; name: T[keyof T] }[] {
    return Object.entries(enumObj).map(([key, value]) => {
      return { id: key as keyof T, name: value };
    });
  }
}

export default EnumUtils;
