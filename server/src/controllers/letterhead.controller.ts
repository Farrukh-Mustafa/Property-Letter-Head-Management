import type { Request, Response } from "express";
import { addSchema, getSchema } from "../schemas/letterhead.schema";
import { logger } from "../libs/logger";
import { addNewLetterHead, getLetterHeadById } from "../services/letterhead.service";

export const addLetterHead = async (req: Request, res: Response) => {
  const validatedFields = addSchema.safeParse(req.body);
  if (!validatedFields.success) {
    logger.error("LetterHead -> Add = Invalid fields.");
    return res.status(422).send({ success: false, error: { code: 422, message: "Invalid fields." } });
  }

  const {
    letterHeadId,
    plotNumber,
    blockNumber,
    plotSize,
    memberName,
    memberCnic,
    dealerOfficeName,
    dealerPhoneNumber,
    dealerCnic
  } = validatedFields.data;

  try {
    await addNewLetterHead({
      letterHeadId,
      plotNumber,
      blockNumber,
      plotSize,
      memberName,
      memberCnic,
      dealerOfficeName,
      dealerPhoneNumber,
      dealerCnic
    });

    // Log and return success message.
    logger.info("LetterHead -> Add = LetterHead added successfully.");
    return res.status(201).send({ success: true, code: 201, message: "Your letter head has been added successfully." });
  } catch (err) {
    logger.error(`LetterHead -> Add = ${(err as Error).message}`);
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};

export const getLetterHead = async (req: Request, res: Response) => {
  const validatedFields = getSchema.safeParse(req.body);
  if (!validatedFields.success) {
    logger.error("Letterhead -> Get = Invalid fields.");
    return res.status(422).send({ success: false, error: { code: 422, message: "Invalid fields." } });
  }

  const { id } = validatedFields.data;

  try {
    const letterHead = await getLetterHeadById({ id });

    if (!letterHead) {
      logger.error("Letterhead -> Get = Letterhead not found.");
      return res.status(404).send({ success: false, error: { code: 404, message: "Letterhead not found." } });
    }
    // Log and return the letter head.
    logger.info("Letterhead -> Get = Letter head fetched successfully.");
    return res.status(200).send({ success: true, code: 200, data: letterHead });
  } catch (err) {
    logger.error(`Letterhead -> Get = ${(err as Error).message}`);
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};
