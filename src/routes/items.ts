import { Router } from "express";
import prisma from "../prisma";
import { authenticate, authorize, AuthRequest } from "../middleware/auth";

const router = Router();

// Only Admin can create items
router.post("/", authenticate, authorize(["ADMIN"]), async (req: AuthRequest, res) => {
  const { name, sku, quantity, minQuantity } = req.body;
  const item = await prisma.item.create({
    data: { name, sku, quantity, minQuantity },
  });
  res.json(item);
});

// Both Admin and Staff can view items
router.get("/", authenticate, authorize(["ADMIN", "STAFF"]), async (req: AuthRequest, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

export default router;
