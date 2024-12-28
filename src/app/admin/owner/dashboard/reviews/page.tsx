"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/reviews/columns";
import { ReviewsDialog } from "@/components/reviews/reviews-dialog";
import { withRole } from "@/app/utils/withRole";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ReviewsPage() {
  const { data: reviews, error } = useSWR("/api/reviews", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  if (error) return <div>Failed to load reviews</div>;
  if (!reviews) return <div>Loading...</div>;

  const filteredReviews = reviews.filter((payment: any) => {
    const searchQuery = searchTerm.toLowerCase();

    return Object.values(payment).some((value) => {
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(searchQuery);
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add reviews
        </Button>
      </div>

      {/* Поле для поиска */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search payments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>

      <DataTable columns={columns} data={filteredReviews} />

      <ReviewsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

export default withRole(ReviewsPage, "owner");
