import { Router } from "express";
import mongoose from "mongoose";
import {
  PaginatedResponse,
  Response,
  ErrorResponse,
  InvalidIdErrorResponse,
  NotFoundErrorResponse,
  CreateErrorResponse,
  NoRequiredFieldErrorResponse,
  UpdateErrorResponse,
  DeleteErrorResponse,
  SuccessfullyDeletedResponse,
  ServerErrorResponse,
  ListResponse,
  RetrieveErrorResponse,
  UnauthorizedErrorResponse,
  UserNotFoundErrorResponse,
  InvalidRequestErrorResponse,
} from "../interfaces/response";
import * as U from "../utils";
import { jwtMiddleware } from "../middlewares/jwtMiddleware";
import { Date } from "mongoose";
import { IUser, User } from "../schemas/user";
import {
  IPasswordUpdate,
  IUserInfo,
  IUserUpdate,
} from "../interfaces/extended";

export const myRouter = (...args: any[]) => {
  const router = Router();
  return router
    .get("/", jwtMiddleware, async (req, res) => {
      try {
        const userId = req.user?.userId;
        const userInfo = await User.findById(userId).select("-password");

        if (!userInfo) {
          return res.status(404).json(NotFoundErrorResponse);
        }

        const response: Response<IUserInfo> = { data: userInfo };
        res.json(response);
      } catch (e) {
        res.status(500).json(RetrieveErrorResponse);
      }
    })
    .patch("/", jwtMiddleware, async (req, res) => {
      const updates = req.body as Partial<IUserUpdate>;
      const userId = req.user?.userId;
      try {
        if (!userId) {
          return res.status(401).json(UnauthorizedErrorResponse);
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json(InvalidIdErrorResponse);
        }

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json(NotFoundErrorResponse);
        }

        if (!updates.password) {
          return res.status(400).json(InvalidRequestErrorResponse("비밀번호"));
        }

        if (!(await U.comparePasswordP(updates.password, user.password))) {
          return res.status(404).json(UserNotFoundErrorResponse);
        }
        const updated = await User.findByIdAndUpdate(
          userId,
          { $set: { updates } },
          { new: true, runValidators: true }
        );

        if (!updated) {
          return res.status(404).json(NotFoundErrorResponse);
        }

        const response: Response<IUser> = { data: updated };
        res.json(response);
      } catch (e) {
        res.status(500).json(UpdateErrorResponse);
      }
    })
    .patch("/password", jwtMiddleware, async (req, res) => {
      const updates = req.body as IPasswordUpdate;
      const userId = req.user?.userId;
      try {
        if (!userId) {
          return res.status(401).json(UnauthorizedErrorResponse);
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json(InvalidIdErrorResponse);
        }

        const newHashedPassword = await U.hashPasswordP(updates.newPassword);
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json(NotFoundErrorResponse);
        }

        if (!(await U.comparePasswordP(updates.password, user.password))) {
          return res.status(404).json(UserNotFoundErrorResponse);
        }
        const updated = await User.findByIdAndUpdate(
          userId,
          { $set: { password: newHashedPassword } },
          { new: true, runValidators: true }
        );

        if (!updated) {
          return res.status(404).json(NotFoundErrorResponse);
        }

        const response: Response<IUser> = { data: updated };
        res.json(response);
      } catch (e) {
        res.status(500).json(UpdateErrorResponse);
      }
    });
};
