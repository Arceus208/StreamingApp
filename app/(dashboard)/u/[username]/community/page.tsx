import React from "react";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getBlockedUsers } from "@/lib/block-service";
import { format } from "date-fns";

async function CommunityPage() {
  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map(
    (block) => ({
      ...block,
      userId: block.blocked.id,
      imageUrl: block.blocked.imageUrl,
      username: block.blocked.username,
      createAt: format(
        new Date(block.blocked.createAt),
        "dd/MM/yyyy"
      ),
    })
  );
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Community Settings
        </h1>
      </div>
      <DataTable
        columns={columns}
        data={formattedData}
      ></DataTable>
    </div>
  );
}

export default CommunityPage;
