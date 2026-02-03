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

/**
 * READ SINGLE ITEM (Admin + Staff)
 */
router.get(
  "/:id",
  authenticate,
  authorize(["ADMIN", "STAFF"]),
  async (req, res) => {
    const item = await prisma.item.findUnique({
      where: { id: req.params.id as string },
    });

    if (!item) return res.status(404).json({ error: "Item not found" });

    res.json(item);
  }
);

/**
 * UPDATE ITEM (Admin only)
 */
router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  async (req, res) => {
    try {
      const item = await prisma.item.update({
        where: { id: req.params.id as string },
        data: req.body,
      });
      res.json(item);
    } catch {
      res.status(404).json({ error: "Item not found" });
    }
  }
);

/**
 * DELETE ITEM (Admin only)
 */
router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  async (req, res) => {
    try {
      await prisma.item.delete({
        where: { id: req.params.id as string },
      });
      res.json({ message: "Item deleted successfully" });
    } catch {
      res.status(404).json({ error: "Item not found" });
    }
  }
);

export default router;
