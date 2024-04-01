import { Request, Response } from "express";
import { createBusiness } from "../../repositories/businessRepository";

export const create = async (req: Request, res: Response) => {
  const {
    client,
    assignedTo,
    title,
    description,
    sku,
    barCode,
    price,
    files,
    status,
  } = req.body;
  try {
    const businessRepo = await createBusiness({
      client,
      assignedTo,
      title,
      description,
      sku,
      barCode,
      price,
      includeTax: true,
      files,
      status,
    });

    if (!businessRepo) {
      return res.status(400).send({ message: "O negócio não foi criado" });
    }

    if (!businessRepo.success) {
      return res.status(400).send(businessRepo);
    }

    return res.status(200).send(businessRepo);
  } catch (error: any) {
    console.log(error);
    return;
  }
};
