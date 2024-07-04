/*
  Warnings:

  - A unique constraint covering the columns `[bar_code]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bar_code` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "bar_code" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Sale" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_bar_code_key" ON "products"("bar_code");
