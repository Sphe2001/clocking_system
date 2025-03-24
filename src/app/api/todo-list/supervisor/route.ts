import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/studentModel";
import Task from "@/models/taskModel";
//import Task from "@/models/Task";


export default async function handler(req: { method: string; body: { username: any; surname: any; initials: any; contactNo: any; message: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message?: any; task?: any; tasks?: any[]; }): void; new(): any; }; }; }) {
  await connect();

  if (req.method === "POST") {
    try {
      const { username, surname, initials, contactNo, message } = req.body;

      if (!username || !surname || !initials || !contactNo || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      const newTask = await Task.create({ username, surname, initials, contactNo, message });

      res.status(201).json({ success: true, task: newTask });
    } catch (error:any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } 
  
  else if (req.method === "GET") {
    try {
      const tasks = await Task.find();
      res.status(200).json({ success: true, tasks });
    } catch (error:any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } 
  
  else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

