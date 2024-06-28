class EnumUtils {
  /**
   * A function to convert enum into an object of key-value pair
   * - Object.entries: return an array of key-value pair
   * - keyof: a type of union type of ENUM's left value
   * - [key, value]: array destructuring from Enum object
   */
  static enumToObject<T extends object>(
    enumObj: T
  ): { id: T[keyof T]; name: T[keyof T] }[] {
    return Object.entries(enumObj).map(([key, value]) => {
      return { id: value, name: value };
    });
  }
}

export default EnumUtils;
