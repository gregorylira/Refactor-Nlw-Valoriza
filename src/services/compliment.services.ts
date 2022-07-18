import { ICompliment } from "../models/compliment.model";
import {
  complimentRepository,
  userRepositoy,
} from "../repositories/repositories";

export class ComplimentService {
  async createCompliment({
    userSender,
    userReceiver,
    message,
    tagId,
  }: ICompliment) {
    if (userSender == userReceiver) {
      throw new Error("Can't send praise for you");
    }

    const userSenderExists = await userRepositoy.findOneBy({
      id: Number(userSender),
    });

    if (!userSenderExists) {
      throw new Error(`user ${userSender} not found`);
    }

    const userReceiverExists = await userRepositoy.findOneBy({
      id: Number(userReceiver),
    });

    if (!userReceiverExists) {
      throw new Error(`user ${userReceiver} not found`);
    }

    const compliment = {
      user_sender: userSender,
      user_receiver: userReceiver,
      tag_id: tagId,
      message,
    };

    await complimentRepository.save(compliment);

    return compliment;
  }

  async ListUserSenderCompliment(userId: string) {
    const compliment = await complimentRepository.find({
      where: {
        user_sender: userId,
      },
      relations: ["userSender", "userReceiver", "tag"],
    });

    return compliment;
  }
  async ListUserReceiverCompliment(userId: string) {
    const compliment = await complimentRepository.find({
      where: {
        user_receiver: userId,
      },
      relations: ["userSender", "userReceiver", "tag"],
    });

    return compliment;
  }
}
