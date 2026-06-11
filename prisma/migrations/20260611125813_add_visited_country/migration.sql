-- CreateTable
CREATE TABLE "visited_country" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visited_country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "visited_country_userId_idx" ON "visited_country"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "visited_country_userId_countryCode_key" ON "visited_country"("userId", "countryCode");

-- AddForeignKey
ALTER TABLE "visited_country" ADD CONSTRAINT "visited_country_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
