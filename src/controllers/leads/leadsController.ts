import User from "../../models/user/User";
import { Request, Response, NextFunction } from "express";
import RefreshTokenService from "../../services/refreshTokenService";
import { AxiosError } from "axios";
import Leads from "../../models/leads/Leads";

export const list = async (req: Request, res: Response) => {
  const leads = await Leads.find();
  return res.status(200).send(leads);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, companyId, topic, lead, company, leadOrigin, idNumber, assignedEmployees, files, activity } = req.body;
    // todo: implementar validação do nivel de acesso
    console.log(req.body)
    const leadRepository = await Leads.create({
      companyId,
      topic,
      lead,
      company,
      leadOrigin,
      idNumber,
      assignedEmployees,
      files,
      activity,
    });

    return res.status(201).send(leadRepository);

  } catch (error) {
    next(error);
  }
};
