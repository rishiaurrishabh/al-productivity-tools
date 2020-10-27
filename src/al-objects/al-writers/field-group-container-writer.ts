import StringBuilder from "../models/string-builder";
import IFieldGroupContainer from "../models/IFieldGroupContainer";
import FieldGroupWriter from "./field-group-writer";

export default class FieldGroupContainerWriter {
  static write(container: IFieldGroupContainer, indentation: number): string {
    return new StringBuilder()
      .write("fieldgroups", indentation)
      .write(container.postLabelComments, indentation)
      .write("{", indentation)
      .write(this.writeBody(container, indentation + 4))
      .write("}", indentation)
      .toString();
  }

  private static writeBody(
    container: IFieldGroupContainer,
    indentation: number
  ): string {
    return new StringBuilder()
      .write(container.comments, indentation)
      .writeEach(container.fieldGroups, (key) =>
        FieldGroupWriter.write(key, indentation)
      )
      .popEmpty()
      .toString();
  }
}
