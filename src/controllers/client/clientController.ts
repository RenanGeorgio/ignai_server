import { Request, Response, NextFunction } from "express";
import { IAddress, IContactInfo } from "../../types/interfaces";
import { createNewClient, listClients } from "../../repositories/clientRepository";
import { findUser } from "../../repositories/userRepository";

interface IRequestBody {
  name: string;
  email: string;
  tel: string;
  priority: string;
  sector: string;
  contactInfo: IContactInfo;
  address: IAddress;
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, tel, priority, sector, contactInfo, address }: IRequestBody = req.body;
   
    if (!name || !email || !tel || !priority || !sector || !contactInfo || !address) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    
    const user = await findUser(req.body.userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const client = await createNewClient({ 
      companyId: user.companyId, 
      name, 
      email, 
      tel, 
      priority, 
      sector, 
      contactInfo, 
      address 
    });
    
    if (!client) {
      return res.status(400).send({ 
        message: "Client already exists",
        success: false
      });
    }

    return res.status(200).send(client);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUser(req.body.userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const client = await listClients(user.companyId);

    if (!client) {
      return res.status(400).send({ message: "Client not found" });
    }
    
    return res.status(200).send(client);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};