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
    // const { userId, companyId, topic, lead, company, leadOrigin, idNumber, assignedEmployees, files, activity } = req.body;
    // todo: implementar validação do nivel de acesso

    // const checkIfLeadExist = await Leads.findOne({ $and: [{ companyId }, { idNumber }] });
    
    // if (checkIfLeadExist) {
    //   return res.status(409).send({ message: "Lead already exists" });
    // }

    // const leadRepository = await Leads.create({
    //   companyId,
    //   topic,
    //   lead,
    //   company,
    //   leadOrigin,
    //   idNumber,
    //   assignedEmployees,
    //   files,
    //   activity,
    // });

    const { title, companyId, items } = req.body;
    const leadRepository = await Leads.create({
      companyId: "1",
      title,
    });

    return res.status(201).send(leadRepository);

  } catch (error) {
    next(error);
  }
};

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params;
    const { content } = req.body;

    const lead = await Leads.findOne({ _id });

    if(!lead) {
      return res.status(404).send({ message: "Lead not found" });
    }

    lead.items.push({ content });

    await lead.save();

    return res.status(201).send(lead);
  } catch (error) {
    next(error);
  }
};

export const updatePosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params;
    const { position } = req.body;

    const lead = await Leads.findOne
    ({ _id });

    if(!lead) {
      return res.status(404).send({ message: "Lead not found" });
    }

};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params;
    const { userId } = req.body;
 
    const user = await User.findOne({ _id: userId })

    if(!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const { companyId } = user;

    const checkIfLeadExist = await Leads.deleteOne({ _id }).catch((error) => {
      return res.status(404).send({ message: "Lead not found" });
    })
  
    return res.status(200).send({ message: "Lead removed" });
  } catch (error) {
    console.log(error)
    next(error);
  }

};