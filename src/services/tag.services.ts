import { ITag } from "../models/tag.model";
import { tagRepositoy } from "../repositories/repositories";

export class TagServices {
  async createTag({ name }: ITag) {
    try {
      if (!name) {
        throw new Error("Name is required");
      }

      const nameAlreadyExists = await tagRepositoy.findOneBy({ name });

      if (nameAlreadyExists) {
        throw new Error("Tag already exists");
      }

      const tag = tagRepositoy.create({ name });

      await tagRepositoy.save(tag);

      return tag;
    } catch (err) {
      throw new Error(err);
    }
  }

  async listTags() {
    try {
      const tags = await tagRepositoy.find();

      return tags;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteTag({ name }: ITag) {
    try {
      const tag = await tagRepositoy.findOneBy({ name });
      if (!tag) {
        throw new Error("Tag not found");
      }
      await tagRepositoy.delete({ name });
      return;
    } catch (err) {
      throw new Error(err);
    }
  }
}
