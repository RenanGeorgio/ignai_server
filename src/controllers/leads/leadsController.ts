import User from "../../models/user/User";
import { Request, Response, NextFunction } from "express";
import RefreshTokenService from "../../services/refreshTokenService";
import { AxiosError } from "axios";
import Leads from "../../models/leads/Leads";

export const list = async (req: Request, res: Response) => {

  const { userId } = req.body;

  const checkUser = await User.findOne({ _id: userId });
  
  if(!checkUser) {
    return res.status(404).send({ message: "User not found" });
  }

  const leads = await Leads.find({ companyId: checkUser.companyId });

  return res.status(200).send(leads);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, userId } = req.body;

    const checkUser = await User.findOne({ _id: userId });

    if (!checkUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const leadRepository = await Leads.create({
      companyId: checkUser.companyId,
      title,
    });

    return res.status(201).send(leadRepository);

  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params;
    const { title } = req.body;

    const lead = await Leads.findOne({ _id });

    if(!lead) {
      return res.status(404).send({ message: "Lead not found" });
    }

    lead.items.push({ title });

    await lead.save();

    return res.status(201).send(lead);
  } catch (error) {
    next(error);
  }
};

// atualiza no drag and drop
export const updateLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { leads } = req.body;

    /// melhorar query
    leads.forEach(async (lead: any) => {
      await Leads.updateOne({ _id: lead._id }, lead);
    });
    
    return  res.status(204).send();

  } catch (error) {
    next(error);
  }
};

export const updateCardInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { _id } = req.params;
    const { title, comments } = req.body;

    const card = await Leads.findOne({ items: { $elemMatch: { _id } } });

    if(!card) {
      return res.status(404).send({ message: "Card not found" });
    }

    const cardIndex = card.items.findIndex((item: any) => item._id == _id);

    card.items[cardIndex].title = title;
    card.items[cardIndex].comments = comments;

    const updatedCardInfo = await card.save();
    
    res.status(200).send(updatedCardInfo);

  } catch (error) {
    next(error);
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