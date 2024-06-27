-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- CreateIndex
CREATE INDEX "Category_storeId_idx" ON "Category"("storeId");
