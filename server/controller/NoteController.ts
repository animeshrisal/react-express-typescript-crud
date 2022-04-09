import { Request, Response } from "express";
import { validate } from "class-validator";

import { Note } from "../entity/Note";
import { AppDataSource } from "../data-source";


class NoteController {
  static listAll = async (req: Request, res: Response) => {
    const id: number = res.locals.jwtPayload.userId;

    const noteRepository = AppDataSource.getRepository(Note);
    const notes = await noteRepository.find({
      where: { user: { id: id } },
    });

    

    res.send(notes);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = res.locals.jwtPayload.userId;

    const noteRepository = AppDataSource.getRepository(Note);

    try {
      const note = await noteRepository.findOneOrFail({ where: { id } });
      res.send(note);
    } catch (error) {
      res.status(404).send("Note nott found");
    }
  };

  static newNote = async (req: Request, res: Response) => {
    const id: number = res.locals.jwtPayload.userId;

    let { text } = req.body;
    let note: Note = new Note();
    note.text = text;
    note.completed = true;
    note.userId = id;

    const errors = await validate(note);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const noteRepository = AppDataSource.getRepository(Note);

    try {
      await noteRepository.save(note);
    } catch (e) {
      res.status(400).send("Could nott save note");
      return;
    }

    res.status(201).send("Note created");
  };

  static editNote = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = res.locals.jwtPayload.userId;

    //Get values from the body
    const { text, completed } = req.body;

    //Try to find user on database
    const noteRepository = AppDataSource.getRepository(Note);
    let note: Note;
    try {
      note = await noteRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }

    //Validate the new values on model
    note.text = text;
    note.completed = completed;

    const errors = await validate(note);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await noteRepository.save(note);
    } catch (e) {
      res.status(409).send("Could not edit note");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = res.locals.jwtPayload.userId;

    const noteRepository = AppDataSource.getRepository(Note);
    let note: Note;
    try {
      note = await noteRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      res.status(404).send("Note not found");
      return;
    }
    noteRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default NoteController;
