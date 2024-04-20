import express from "express"
import { getAllUsers, loginUser, registerUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)

userRouter.post("/login",loginUser)

userRouter.get("/alluser",getAllUsers)

// userRouter.post("/register-vendor",registerVendor)

// userRouter.post("/logout",authenticateToken,logout)

// userRouter.get("/allusers", authenticateToken, ensureIsAdmin, getAll)

// userRouter.put("/users/:id/block", authenticateToken, ensureIsAdmin, blockUser)

// userRouter.put("/profile/update", authenticateToken, updateProfile)

// router.post("/forget-password", resetPassword)

export default userRouter;
